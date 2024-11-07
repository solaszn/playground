
import { LuChevronRight, LuCloudSun } from 'react-icons/lu';
import './App.css';
import 'react-icons/lu'
import React, { useEffect, useState } from 'react';

interface Weather {
  ip: string;
  time: string;
  location: string;
  weather: string;
  iconUrl?: string;
}

interface WeatherData {
  name?: string;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  sys: {
    country?: string;
  };
  dt: number;
}

function App({ children }: {
  params?: any,
  children: React.ReactNode
}) {
  const [weather, setWeather] = useState<Weather>({
    ip: '',
    time: '',
    location: '',
    weather: '',
  });

  // Fetch client IP and location
  const fetchClientIp = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      const location = `${data.city ? `${data.city}, ${data.country_name}` : `${data.country_name}`}`;

      setWeather((prevState) => ({
        ...prevState,
        ip: data.IPv4,
        location: location,
      }));

      fetchWeatherData(location); // Fetch weather based on the location
      setWeather((prevState) => ({
        ...prevState,
        time: getFormattedTime(new Date()), // Update time
      }));
    } catch (error) {
      console.error('Error fetching client IP and location:', error);
    }
  };

  const fetchWeatherData = async (location: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      const weatherData: WeatherData = await response.json();

      // Use city name if available, otherwise default to country
      const locationName = weatherData.name || weatherData.sys.country || 'Unknown location';

      if (weatherData.weather && weatherData.weather.length > 0) {
        const { description, icon } = weatherData.weather[0];
        const formattedWeather = formatWeather(description);

        // Set weather with icon URL
        setWeather((prevState) => ({
          ...prevState,
          location: locationName,
          weather: formattedWeather,
          iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        }));
      } else {
        console.warn("Weather data not found for the location.");
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Format time for display
  const getFormattedTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  };

  // Format weather description
  const formatWeather = (description: string) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  useEffect(() => {
    fetchClientIp();
    console.log("🚨")
    console.log(weather.ip)
    console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY)
  }, []);

  return (
    <div className="App max-w-[2400px] mx-auto">

      <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-10 h-fit font-inter transition-any smooth overflow-x-hidden">

        {/* Heading */}
        <div className="flex justify-between h-8 text-sm">
          <div className="flex gap-1.5 rounded-md bg-white items-center">
            <div className="text-neutral-400 flex gap-1.5 items-center">Works <LuChevronRight size={18} /> </div>
            <span className="font-medium">Features</span>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-1.5 rounded-md bg-white items-center">{weather.time}</div>
            <div className="hidden sm:flex gap-1.5 rounded-md bg-white items-center">
              {weather.iconUrl && (
                <img src={weather.iconUrl} alt="Weather icon" className="w-12 h-12 weather-icon" />
              )}
              {weather.location}
            </div>
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
