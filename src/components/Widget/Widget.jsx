import React, { useState, useEffect } from "react";
import styles from './widget.css';

function Widget(props) {
  const [weatherData, setWeatherData] = useState({});
  // const [bgColor,  setBgColor] = useState('');

  const getTodayWeekday = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    return weekdays[today];
  };
  
  
  const todayWeekday = getTodayWeekday();

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


  const getBgColor = (preciptype, cloudcover, precipprob, snow) => {
    switch (true) {
      case preciptype && preciptype.includes('rain') && precipprob >= 70:
        return 'rgba(0, 96, 255, 0.88)';
      case preciptype && preciptype.includes('rain') && cloudcover < 60 && precipprob > 40:
        return 'rgba(157, 194, 255, 0.88)'; // Showers
      case snow && snow.includes(1):
        return 'rgba(202, 218, 244, 0.88)'; // Snow
      case cloudcover >= 75 && precipprob < 60:
        return 'rgba(87, 95, 108, 0.88)'; // Cloudy
      case cloudcover <= 50 && precipprob < 40:
        return 'rgba(123, 187, 241, 0.88)'
      case cloudcover >= 50 && precipprob < 40:
        return 'rgba(65, 155, 231, 0.88)'
      default:
        return 'rgba(255, 247, 0, 0.879)'; // Clear
    }
  }
  

  const roundTemperature = (temperature) => {
    return Math.round(temperature);
  };

  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.city || 'Kyiv'}?unitGroup=metric&elements=temp%2Chumidity%2Cprecip%2Cprecipprob%2Cpreciptype%2Csnow%2Ccloudcover&key=4SE3FPLD89TBMXVEHKZ92TWNW&contentType=json`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('widget data:', data); 
        
        const firstDay = data.days[0];
        let { temp, preciptype, cloudcover, snow, precipprob } = firstDay;
  
        let temperature = roundTemperature(temp);
      
        let weatherIcon = getWeatherIcon(preciptype, cloudcover, precipprob);
        let bgColor = getBgColor(preciptype, cloudcover, precipprob);
        const snowIcon = snow > 0 ? '❄️' : '';
        // Update weather data state
        setWeatherData({
          temperature,
          weatherIcon,
          snowIcon,
          precipitationProbability: precipprob,
          bgColor
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    fetchWeatherData();
  }, [props.city]);

  return (
    <div className="widget" style={{ backgroundColor: weatherData.bgColor }}>
        <div className="background"> /
            {/* цвет фона день/ночь и погода   */}
            <span className="icon1">{weatherData.weatherIcon}</span>
            <span className="icon2">{weatherData.weatherIcon}</span>
            <span className="icon3">{weatherData.weatherIcon}</span>
            <span className="icon4">{weatherData.weatherIcon}</span>
        </div>

        <div className="widget-top">
            <h1>{todayWeekday}</h1>
            <div className="widget-main">
                <span className="icon">{weatherData.weatherIcon}</span>
                <span className="number">
                    {weatherData.temperature}&deg;C
                    {weatherData.snowIcon}
                </span>
            </div>

            <p className="widget-top-text">{props.city || "Kyiv"}</p>
        </div>

        <div className='time'>
            <div className="time-block">
                <span>30</span>
                <p>DAYS</p>
            </div>
            <div className="time-block">
                <span>30</span>
                <p>HOURS</p>
            </div>
            <div className="time-block">
                <span>30</span>
                <p>MINUTES</p>
            </div>
            <div className="time-block">
                <span>30</span>
                <p>SECONDS</p>
            </div>
        </div>
    </div>
);

}

export default Widget;
