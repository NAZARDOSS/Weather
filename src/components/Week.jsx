import React, { useState, useEffect } from 'react';
import List from "./List";

function Week(props) {
    const [weatherData, setWeatherData] = useState([]);

    function reformatDate(dateString) {
        // Разбиваем строку по разделителю "/"
        const parts = dateString.split('/');
        
        // Переупорядочиваем части даты в нужном формате
        const formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        
        return formattedDate;
      }

    let startDate = reformatDate(props.startDate);
    let endDate = reformatDate(props.endDate)
    let city = props.city;

    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Cprecip%2Cprecipprob%2Cpreciptype%2Csnow%2Ccloudcover&include=days&key=4SE3FPLD89TBMXVEHKZ92TWNW&contentType=json`;

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
            const response = await fetch(url);

    
            const data = await response.json();
            
            const transformedData = data.days.map(day => ({
                ...day,
                tempmax: fahrenheitToCelsius(day.tempmax),
                tempmin: fahrenheitToCelsius(day.tempmin)
            }));
            setWeatherData(transformedData);
            console.log(transformedData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    fetchWeatherData();
    }, [city, startDate, endDate]);


/* my default data, if I have reached max number of requests (because of free API)*/
//     const defaultDayData = {
//       datetime: "2023-07-14",
//       tempmax: 25,
//       tempmin: 20,
//       preciptype: "rain",
//       cloudcover: 50
//   };
//   const defaultWeatherData = Array(11).fill(defaultDayData);

//   useState(() => {
//       setWeatherData(defaultWeatherData);
//   }, []);
/* ------------------------------------- */

    const fahrenheitToCelsius = (fahrenheit) => {
        return (fahrenheit - 32) * (5 / 9);
    };

    return (
        <div className="week">
            {weatherData.map((day, index) => (
                <div className="forecast-day" key={index}>
                    <List day={day} />
                </div>
            ))}
        </div>
    );
}

export default Week;
