import React, { useState } from 'react';
import classNames from 'classnames'; // Для умовних класів

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Будь ласка, введіть ім’я';
        if (!formData.email) newErrors.email = 'Будь ласка, введіть електронну пошту';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Будь ласка, введіть правильну електронну пошту';

        if (!formData.message) newErrors.message = 'Будь ласка, введіть повідомлення';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Форма відправлена:', formData);
            setSuccessMessage('Ваше повідомлення надіслано успішно!');
            setTimeout(() => setSuccessMessage(''), 3000); // Прибираємо повідомлення через 3 секунди
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        }
    };

    return (
        <div className="contact-container">
            <h1>Контакти</h1>
            <p>Зв'яжіться з нами для отримання додаткової інформації.</p>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Ім'я</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={classNames('input', { 'input--error': errors.name })}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Електронна пошта</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={classNames('input', { 'input--error': errors.email })}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Повідомлення</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={classNames('textarea', { 'textarea--error': errors.message })}
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                <button type="submit" className="button">Написати нам</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Показати повідомлення про успіх */}
        </div>
    );
};

export default Contact;
