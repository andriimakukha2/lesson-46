import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
    const [isLoaded, setIsLoaded] = useState(false); // Стан для відстеження завантаження
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/cars/${car.id}`);
    };

    return (
        <div className="car-card">
            <img
                src={car.img}
                alt={car.name}
                className={`car-card__image ${isLoaded ? 'loaded' : ''}`} // Додає клас після завантаження
                loading="lazy"
                onLoad={() => setIsLoaded(true)} // Встановлює стан після успішного завантаження
                onError={(e) => (e.target.src = '/images/default-car.jpg')} // Замінює на зображення за замовчуванням
            />
            <h3 className="car-card__name">{car.name}</h3>
            <p className="car-card__description">{car.description}</p>
            <button
                className="button car-card__button"
                onClick={handleDetailsClick}
                aria-label={`Детальна інформація про ${car.name}`}
            >
                Детальніше
            </button>
        </div>
    );
};

export default CarCard;
