import { configureStore } from '@reduxjs/toolkit';

import carsReducer from './slices/carsSlice';

const store = configureStore({
    reducer: {
        cars: carsReducer, // Підключення carsSlice до глобального стану
    },
    // Middleware за замовчуванням вже включає Redux Thunk, але можна його модифікувати
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Вимикає перевірку на серіалізацію (корисно, якщо є несеріалізовані дані, наприклад, Date)
        }),
    devTools: process.env.NODE_ENV !== 'production', // Увімкнення Redux DevTools для налагодження
});

export default store;
