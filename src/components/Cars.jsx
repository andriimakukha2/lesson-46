import React, { useEffect } from 'react';
import CarCard from './CarCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/slices/carsSlice';

const Cars = () => {
    const dispatch = useDispatch();
    const { list: cars, isLoading, error } = useSelector((state) => state.cars);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    return (
        <div className="cars">
            <h2>Список автомобілів</h2>
            {/* Відображення стану завантаження або помилки */}
            {isLoading && <p>Завантаження...</p>}
            {error && <p className="error">Помилка: {error}</p>}

            {/* Відображення списку автомобілів */}
            {cars.length === 0 ? (
                <p>Автомобілі не знайдені.</p>
            ) : (
                <div className="car-list">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cars;
