import React, { useState, useRef, useEffect } from "react";
import styles from './select.css';

function Select({ onSelect, options, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const selectRef = useRef(null);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option); // Обновляем выбранную опцию
        setIsOpen(false); // Закрываем список
        onSelect(option); // Вызываем onSelect после закрытия списка
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
                {selectedOption ? selectedOption : placeholder}
            </div>
            
            {isOpen && (
                <div className="select-options"> 
                    {options.map((option, index) => (
                        <button key={index} onClick={() => handleSelectOption(option)}>{option}</button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;
