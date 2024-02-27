import React, { useState } from "react";
import styles from "./calendar.css";

export default function Calendar({ value, onChange, availableDays }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Функция для получения массива месяцев с учетом условий задачи
  

  const handlePrevMonth = () => {
    const currentDate = selectedDate;
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const currentDate = selectedDate;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    let hasValidDateInNextMonth = false;

    for (let i = 0; i < 30; i++) {
        const dateToCheck = new Date();
        dateToCheck.setDate(dateToCheck.getDate() + i);
        
        if (dateToCheck.getMonth() === nextMonth.getMonth() && dateToCheck.getFullYear() === nextMonth.getFullYear()) {
            hasValidDateInNextMonth = true;
            break;
        }
    }

    if (nextMonth < new Date().setMonth(new Date().getMonth() + 2) && hasValidDateInNextMonth) {
        setSelectedDate(nextMonth);
    }
};

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  const renderDays = () => {
    const today = new Date();
    const endDate = new Date(today.getTime() + availableDays * 24 * 60 * 60 * 1000); // Конечная дата доступности выбора

    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() - monthStart.getDay());
    
    const days = [];
    let day = startDate;
    while (day <= monthEnd) {
      days.push(day);
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    }

    // Фильтрация дней на основе доступного периода
    const filteredDays = days.filter(day => day >= today && day <= endDate);

    return filteredDays.map((day) => {
      const classNames = ["day"];
      if (day.getMonth() !== selectedDate.getMonth()) {
        classNames.push("day--inactive");
      }
      if (day.getTime() === today.setHours(0, 0, 0, 0)) {
        classNames.push("day--today");
      }
      if (day.getTime() === selectedDate.getTime()) {
        classNames.push("day--selected");
      }
      return (
        <div className={classNames.join(" ")} key={day.getTime()} onClick={() => handleDateClick(day)}>
          {day.getDate()}
        </div>
      );
    });
  };

  const isPrevMonthAvailable = () => {
    const today = new Date();
    return selectedDate.getMonth() !== today.getMonth() || selectedDate.getFullYear() !== today.getFullYear();
  };

  const isNextMonthAvailable = () => {
    const today = new Date();
    return selectedDate.getMonth() !== 11 || selectedDate.getFullYear() !== today.getFullYear();
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
      <div
  className="calendar__prev"
  onClick={isPrevMonthAvailable() ? handlePrevMonth : null}
  style={{ color: isPrevMonthAvailable() ? '#black' : '3c86f6' , cursor: isPrevMonthAvailable() ? 'pointer' : 'not-allowed' }}
>
  &#8249;
</div>


        <div className="calendar__current">
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </div>
        {isNextMonthAvailable() && (
          <div className="calendar__next" onClick={handleNextMonth}>
            &#8250;
          </div>
        )}
      </div>
      <div className="calendar__weekdays">
        {weekdays.map((weekday) => (
          <div className="weekday" key={weekday}>
            {weekday}
          </div>
        ))}
      </div>
      <div className="calendar__days">{renderDays()}</div>
    </div>
  );
};
