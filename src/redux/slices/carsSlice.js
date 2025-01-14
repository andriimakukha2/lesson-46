import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import teslaImg from "./images/tesla-model-s.jpg";
import bmwImg from "./images/bmw-m3.jpg";
import audiImg from "./images/audi-a8.jpg";
import mercedesImg from "./images/mercedes-benz-s-class.jpg";
import porscheImg from "./images/porsche-911.jpg";
import fordImg from "./images/ford-mustang.jpg";
import lamborghiniImg from "./images/lamborghini-aventador.jpg";
import ferrariImg from "./images/ferrari-488.jpg";
import toyotaImg from "./images/toyota-camry.jpg";
import hondaImg from "./images/honda-accord.jpg";
import chevroletImg from "./images/chevrolet-corvette.jpg";
import nissanImg from "./images/nissan-gtr.jpg";
import vwGolfImg from "./images/volkswagen-golf.jpg";
import hyundaiImg from "./images/hyundai-elantra.jpg";
import kiaImg from "./images/kia-stinger.jpg";
import mazdaImg from "./images/mazda-mx5.jpg";
import subaruImg from "./images/subaru-wrx.jpg";
import volvoImg from "./images/volvo-xc90.jpg";

// Асинхронна дія для завантаження брендів автомобілів з API Dadata
export const fetchCarBrands = createAsyncThunk(
    'cars/fetchCarBrands',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://dadata.ru/api/suggest/car_brand/',
                { query },
                {
                    headers: {
                        'Authorization': `4de23b2d8b1bfa2545cc1e3c86cd6e73ddba4115`,  // Замініть на ваш API ключ
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.suggestions;  // Повертаємо отримані бренди
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Початковий стан
const initialState = {
    list: [
        {
            id: 1,
            name: 'Tesla Model S',
            description: 'Електричний седан з вражаючими характеристиками.',
            img: teslaImg
        },
        {
            id: 2,
            name: 'BMW M3',
            description: 'Спортивний автомобіль з вражаючими динамічними характеристиками.',
            img: bmwImg
        },
        {
            id:
                3,
            name: 'Audi A8',
            description: 'Розкішний седан з високим рівнем комфорту і технологій.',
            img: audiImg
        },
        {
            id: 4,
            name: 'Mercedes-Benz S-Class',
            description: 'Символ розкоші та інновацій у світі автомобілів.',
            img: mercedesImg
        },
        {
            id: 5,
            name: 'Porsche 911',
            description: 'Класичний спортивний автомобіль з видатними характеристиками.',
            img: porscheImg
        },
        {
            id: 6,
            name: 'Ford Mustang',
            description: 'Американський класичний спортивний автомобіль з потужним двигуном.',
            img: fordImg
        },
        {
            id: 7,
            name: 'Lamborghini Aventador',
            description: 'Суперкар з неймовірним дизайном і потужністю.',
            img: lamborghiniImg
        },
        {
            id: 8,
            name: 'Ferrari 488',
            description: 'Спортивний автомобіль з видатною продуктивністю та дизайном.',
            img: ferrariImg
        },
        {
            id: 9,
            name: 'Toyota Camry',
            description: 'Надійний седан з комфортом та ефективністю.',
            img: toyotaImg
        },
        {
            id: 10,
            name: 'Honda Accord',
            description: 'Комфортний седан з високим рівнем надійності.',
            img: hondaImg
        },
        {
            id: 11,
            name: 'Chevrolet Corvette',
            description: 'Суперкар, що поєднує стиль і продуктивність.',
            img: chevroletImg
        },
        {
            id: 12,
            name: 'Nissan GT-R',
            description: 'Спортивний автомобіль з неймовірною швидкістю та технологіями.',
            img: nissanImg
        },
        {
            id: 13,
            name: 'Volkswagen Golf',
            description: 'Практичний хетчбек, який поєднує стиль і функціональність.',
            img: vwGolfImg
        },
        {
            id: 14,
            name: 'Hyundai Elantra',
            description: 'Комфортний і економічний седан для щоденного використання.',
            img: hyundaiImg
        },
        {
            id: 15,
            name: 'Kia Stinger',
            description: 'Спортивний автомобіль з елегантним дизайном та високими показниками.',
            img: kiaImg
        },
        {
            id: 16,
            name: 'Mazda MX-5',
            description: 'Легкий спортивний автомобіль, що забезпечує відмінну керованість.',
            img: mazdaImg
        },
        {
            id: 17,
            name: 'Subaru WRX',
            description: 'Спортивний автомобіль з відмінною прохідністю та потужним двигуном.',
            img: subaruImg
        },
        {
            id: 18,
            name: 'Volvo XC90',
            description: 'Розкішний SUV з високими показниками безпеки та комфортом.',
            img: volvoImg
        },
    ],
    isLoading: false,
    error: null,
    carBrands: []  // Сюди будемо зберігати бренди автомобілів з Dadata
};

// Слайс
const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar: (state, action) => {
            state.list.push({
                ...action.payload,
                id: state.list.length ? state.list[state.list.length - 1].id + 1 : 1,
            });
        },
        removeCar: (state, action) => {
            state.list = state.list.filter(car => car.id !== action.payload);
        },
        updateCar: (state, action) => {
            const index = state.list.findIndex(car => car.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarBrands.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCarBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carBrands = action.payload;
            })
            .addCase(fetchCarBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Не вдалося завантажити бренди автомобілів';
            });
    },
});

// Експортуємо дії та редюсер
export const { addCar, removeCar, updateCar } = carsSlice.actions;
export const selectCars = (state) => state.cars.list;
export const selectCarBrands = (state) => state.cars.carBrands;  // Вибірка брендів автомобілів
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;

export default carsSlice.reducer;
