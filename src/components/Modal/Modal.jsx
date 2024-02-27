import React, { useState } from "react";
import Select from '../Select/Select';
import styles from './modal.css';
import cities from '../cities.json';

import SelectCalendar from "../Select/SelectCalendar";

function Modal(props) {
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});

  const [endDateRange, setEndDateRange] = useState({
    daysAfter: 0,
    daysBefore: 15
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDateRange({
      daysAfter: 0,
      daysBefore: date ? (new Date(date).getTime() - new Date(date).getTime()) : 15
    });

    setErrors({ ...errors, endDate: null });
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      setErrors({ ...errors, endDate: "End date cannot be earlier than Start date" });
      return;
    }
    setEndDate(date);
    setErrors({ ...errors, endDate: null });
  };
  
  const handleCloseModal = (e) => {
    if (e.target.id === "myModal") {
      setErrors({});
      props.onClose();
    }
  };

  const handleSave = () => {
    if (!selectedCity || !startDate || !endDate) {
      setErrors({ ...errors, missingFields: "Please fill in all required fields" });
      return;
    }
  
    if (endDate < startDate) {
      setErrors({ ...errors, endDate: "End date cannot be earlier than Start date" });
      return;
    }
  
    // Форматирование даты начала поездки в строку "dd/mm/yyyy"
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1; // Месяцы начинаются с 0
    const startYear = startDate.getFullYear();
    const formattedStartDate = `${startDay < 10 ? '0' : ''}${startDay}/${startMonth < 10 ? '0' : ''}${startMonth}/${startYear}`;
  
    // Форматирование даты окончания поездки в строку "dd/mm/yyyy"
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1; // Месяцы начинаются с 0
    const endYear = endDate.getFullYear();
    const formattedEndDate = `${endDay < 10 ? '0' : ''}${endDay}/${endMonth < 10 ? '0' : ''}${endMonth}/${endYear}`;
  
    // Поиск информации о городе в cities.json
    const cityInfo = cities.find(cityInfo => cityInfo.city === selectedCity);
  
    // Создание объекта с информацией о поездке
    const tripInfo = {
      city: selectedCity,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      image: cityInfo ? cityInfo.image : null // Извлечение изображения города
    };
  
    // Вызов prop onSave и передача информации о поездке в родительский компонент
    props.onSave(tripInfo); // Убираем передачу tripData, так как его не используем в этом компоненте
  
    // Очистка ошибок и закрытие модального окна
    setErrors({});
    props.onClose();
  };
  
  
  
  

  return (
    <div id="myModal" className="modal" onClick={handleCloseModal}>
      <div className="modal-content">
        <div className="modal-header">
          <p>Create trip</p>
          <span className="close" onClick={props.onClose}>&times;</span>
        </div>
        <hr />
        <div className="modal-main">
          <div className="select-title">
            <p><span className="red-star">*</span> City</p>
            {errors && errors.missingFields && <p className="error">{errors.missingFields}</p>}
          </div>
          <Select
            placeholder="Please select a city"
            onSelect={(city) => {
              setSelectedCity(city);
              setErrors({ ...errors, missingFields: null });
            }}
            options={cities.map(city => city.city)}
          />
          <div className="select-title">
            <p><span className="red-star">*</span> Start date</p>
          </div>
          <SelectCalendar
            onSelect={handleStartDateChange}
            startDateRange={{ daysAfter: 0, daysBefore: 15 }}
            endDateRange={endDateRange}
            availableDays={15}
          />
          <div className="select-title">
            <p><span className="red-star">*</span> End date</p>
            {errors && errors.endDate && <p className="error">{errors.endDate}</p>}
          </div>
          <SelectCalendar
            onSelect={handleEndDateChange}
            startDateRange={{ daysAfter: 0, daysBefore: 15 }}
            endDateRange={endDateRange}
            availableDays={30} 
          />
        </div>
        <hr />
        <div className="modal-footer">
          <div className="modal-footer-buttons">
            <button onClick={props.onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
