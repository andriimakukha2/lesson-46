import { createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронна дія для отримання списку автомобілів
export const fetchCars = createAsyncThunk(
    'cars/fetchCars',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.example.com/cars'); // Замініть на реальний API
            if (!response.ok) {
                throw new Error('Не вдалося завантажити список автомобілів');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронна дія для додавання нового автомобіля
export const addCarAsync = createAsyncThunk(
    'cars/addCarAsync',
    async (newCar, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.example.com/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCar),
            });
            if (!response.ok) {
                throw new Error('Не вдалося додати автомобіль');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронна дія для видалення автомобіля
export const deleteCarAsync = createAsyncThunk(
    'cars/deleteCarAsync',
    async (carId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.example.com/cars/${carId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Не вдалося видалити автомобіль');
            }
            return carId; // Повертаємо id для видалення з локального стану
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
