
import { createContext, useContext, useState } from "react";

// Weather API types
export type WeatherProvider = "openweathermap" | "weatherapi";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: string;
    conditionCode: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    feelsLike_c: number;
    feelsLike_f: number;
    uv: number;
    pressure: number;
    precipitation: number;
    lastUpdated: string;
    isDay: number;
  };
  forecast: {
    daily: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: string;
        conditionCode: string;
        chanceOfRain: number;
      };
    }>;
    hourly: Array<{
      time: string;
      temp_c: number;
      temp_f: number;
      condition: string;
      conditionCode: string;
      chanceOfRain: number;
    }>;
  };
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (cityName: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  weatherProvider: WeatherProvider;
  setWeatherProvider: (provider: WeatherProvider) => void;
  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  loading: false,
  error: null,
  fetchWeather: async () => {},
  fetchWeatherByCoords: async () => {},
  weatherProvider: "openweathermap",
  setWeatherProvider: () => {},
  units: "metric",
  setUnits: () => {},
});

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherProvider, setWeatherProvider] = useState<WeatherProvider>(() => {
    const savedProvider = localStorage.getItem("clima-provider") as WeatherProvider | null;
    return savedProvider || "openweathermap";
  });
  const [units, setUnits] = useState<"metric" | "imperial">(() => {
    const savedUnits = localStorage.getItem("clima-units") as "metric" | "imperial" | null;
    return savedUnits || "metric";
  });

  const savePreferences = (provider: WeatherProvider, units: "metric" | "imperial") => {
    localStorage.setItem("clima-provider", provider);
    localStorage.setItem("clima-units", units);
  };

  const handleSetWeatherProvider = (provider: WeatherProvider) => {
    setWeatherProvider(provider);
    savePreferences(provider, units);
  };

  const handleSetUnits = (newUnits: "metric" | "imperial") => {
    setUnits(newUnits);
    savePreferences(weatherProvider, newUnits);
  };

  // Placeholder for API fetching - will be implemented with actual API calls
  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be replaced with actual API calls
      // For now, we'll simulate a fetch with a timeout
      const mockResponse = await new Promise<WeatherData>((resolve) => {
        setTimeout(() => {
          resolve({
            location: {
              name: cityName,
              country: "Country",
              lat: 0,
              lon: 0,
            },
            current: {
              temp_c: 22,
              temp_f: 71.6,
              condition: "Sunny",
              conditionCode: "1000",
              humidity: 65,
              windSpeed: 15,
              windDirection: "NE",
              feelsLike_c: 23,
              feelsLike_f: 73.4,
              uv: 4,
              pressure: 1012,
              precipitation: 0,
              lastUpdated: new Date().toISOString(),
              isDay: 1,
            },
            forecast: {
              daily: Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 24 + Math.random() * 5,
                  maxtemp_f: 75.2 + Math.random() * 9,
                  mintemp_c: 18 + Math.random() * 3,
                  mintemp_f: 64.4 + Math.random() * 5.4,
                  condition: "Partly cloudy",
                  conditionCode: "1003",
                  chanceOfRain: Math.random() * 30,
                },
              })),
              hourly: Array.from({ length: 24 }, (_, i) => ({
                time: new Date(Date.now() + i * 3600000).toISOString(),
                temp_c: 22 + Math.sin(i / 3) * 5,
                temp_f: 71.6 + Math.sin(i / 3) * 9,
                condition: "Clear",
                conditionCode: "1000",
                chanceOfRain: Math.random() * 10,
              })),
            },
          });
        }, 500);
      });
      
      setWeatherData(mockResponse);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be replaced with actual API calls
      // For now, we'll simulate a fetch with a timeout
      const mockResponse = await new Promise<WeatherData>((resolve) => {
        setTimeout(() => {
          resolve({
            location: {
              name: "Current Location",
              country: "Country",
              lat,
              lon,
            },
            current: {
              temp_c: 22,
              temp_f: 71.6,
              condition: "Sunny",
              conditionCode: "1000",
              humidity: 65,
              windSpeed: 15,
              windDirection: "NE",
              feelsLike_c: 23,
              feelsLike_f: 73.4,
              uv: 4,
              pressure: 1012,
              precipitation: 0,
              lastUpdated: new Date().toISOString(),
              isDay: 1,
            },
            forecast: {
              daily: Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 24 + Math.random() * 5,
                  maxtemp_f: 75.2 + Math.random() * 9,
                  mintemp_c: 18 + Math.random() * 3,
                  mintemp_f: 64.4 + Math.random() * 5.4,
                  condition: "Partly cloudy",
                  conditionCode: "1003",
                  chanceOfRain: Math.random() * 30,
                },
              })),
              hourly: Array.from({ length: 24 }, (_, i) => ({
                time: new Date(Date.now() + i * 3600000).toISOString(),
                temp_c: 22 + Math.sin(i / 3) * 5,
                temp_f: 71.6 + Math.sin(i / 3) * 9,
                condition: "Clear",
                conditionCode: "1000",
                chanceOfRain: Math.random() * 10,
              })),
            },
          });
        }, 500);
      });
      
      setWeatherData(mockResponse);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
        fetchWeatherByCoords,
        weatherProvider,
        setWeatherProvider: handleSetWeatherProvider,
        units,
        setUnits: handleSetUnits,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
