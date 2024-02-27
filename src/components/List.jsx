import React from 'react';

function List({ day }) {
    const getWeatherIcon = (preciptype, cloudcover, precipprob, snow) => {
        switch (true) {
            case preciptype && preciptype.includes('rain') && precipprob >= 70:
                return '🌧️';
            case preciptype && preciptype.includes('rain') && cloudcover < 60 && precipprob > 40:
                return '🌦️';
            case snow && snow.includes(1):
                return '🌨️';
            case cloudcover >= 75 && precipprob < 60:
                return '☁️';
            case cloudcover > 15 && precipprob < 40 && cloudcover < 50:
                return '️🌤️';
            case cloudcover >= 50 && precipprob < 40:
                return '🌥️';
            default:
                return '☀️';
        }
    };
    

    const roundTemperature = (temperature) => {
        return Math.round(temperature);
    };

    return (
        <div className='list'>
            <ul>
                <li>
                    <p>{new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    
                    <span className='icon'>
                        {getWeatherIcon(day.preciptype, day.cloudcover, day.precipprob)}
                    </span>

                    <div className='deg'>
                        <p>{roundTemperature(day.tempmax)}°/{roundTemperature(day.tempmin)}°</p>
                    </div>
                    
                </li>
            </ul>
        </div>
    );
}

export default List;
