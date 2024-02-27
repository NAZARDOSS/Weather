import React, { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar"; // Импортируйте компонент Calendar из вашего файла

function SelectCalendar({ onSelect, startDateRange, endDateRange, availableDays }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectRef = useRef(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDate = (date) => {
    onSelect(date);
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="custom-select">
      <div className="select-header" onClick={toggleOptions}>
        {selectedDate.toLocaleDateString('en-GB').replace(/\//g, '.')}
      </div>

      {isOpen && (
        <div className="select-options">
          <Calendar
            value={selectedDate}
            onChange={handleSelectDate}
            startDateRange={startDateRange}
            endDateRange={endDateRange}
            availableDays={availableDays} // Добавлено
          />
        </div>
      )}
    </div>
  );
}

export default SelectCalendar;
