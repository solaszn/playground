
import { LuChevronRight, LuCloudSun } from 'react-icons/lu';
import './App.css';
import 'react-icons/lu'
import React, { useEffect, useState } from 'react';

interface Weather {
  ip: string;
  time: string;
  location: string;
  weather: string;
}

interface WeatherData {
  name: string;
  weather: Array<{ description: string }>;
  dt: number;
}

function App({children}:{
  params?: any,
  children: React.ReactNode
}) {
  const [weather, setWeather] = useState<Weather>({
    ip: '',
    time: '',
    location: '',
    weather: '',
  });

  const fetchClientIp = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      setWeather((prevState: any) => ({
        ...prevState,
        ip: data.IPv4,
      }));
      fetchWeatherData(data.IPv4); // Pass the IP directly to fetchWeatherData
    } catch (error) {
      console.error('Error fetching client IP:', error);
    }
  };

  const fetchWeatherData = async (ip: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ip}&appid=YOUR_API_KEY&units=metric`
      );
      const weatherData: WeatherData = await response.json();
      const { name, weather: weatherArray, dt } = weatherData;
      const formattedTime = formatTime(dt);
      const formattedWeather = formatWeather(weatherArray[0].description);

      setWeather((prevState: any) => ({
        ...prevState,
        time: formattedTime,
        location: name,
        weather: formattedWeather,
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  const formatWeather = (description: string) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  useEffect(() => {
    fetchClientIp();
    console.log("🚨")
    console.log(weather.ip)
  }, []);

  return (
    <div className="App max-w-[2400px] mx-auto">

      <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-10 h-fit font-inter transition-any smooth overflow-x-hidden">
        
        {/* Heading */}
        <div className="flex justify-between h-8 text-sm">
          <div className="flex gap-1.5 rounded-md bg-white items-center">
            <div className="text-neutral-400 flex gap-1.5 items-center">Works <LuChevronRight size={18}/> </div>
            <span className="font-medium">Features</span>
          </div>

          <div className="flex gap-5">
          <div className="flex gap-1.5 rounded-md bg-white items-center">{weather.time}</div>
          <div className="hidden sm:flex gap-1.5 rounded-md bg-white items-center"><LuCloudSun size={18}/>{weather.location}</div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex h-full justify-center overflow-y-auto bg-white rounded-lg">
          {children}
        </div>

        {/* Footer */}
        <div className="h-8 text-sm flex flex-col lg:flex-row gap-y-3 justify-between text-neutral-500">
          <div>An exploration by Feyisola Olawuyi</div>
          <div>Last updated 2 days ago</div>
        </div>

      </div>

    </div>
  );
}

export default App;
