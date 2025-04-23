import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

// Type definitions
export type WeatherProvider = "weatherapi";

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
      dt: number;
      temp: number;
      weather: { id: number; description: string }[];
      pop: number;
    }>;
  };
}

const WeatherContext = createContext({
  weatherData: null as WeatherData | null,
  loading: false,
  error: null as string | null,
  fetchWeather: async (cityName: string) => {},
  fetchWeatherByCoords: async (lat: number, lon: number) => {},
  weatherProvider: "weatherapi" as WeatherProvider,
  setWeatherProvider: (provider: WeatherProvider) => {},
  units: "metric" as "metric" | "imperial",
  setUnits: (units: "metric" | "imperial") => {}
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherProvider] = useState<WeatherProvider>("weatherapi");
  const [units, setUnits] = useState<"metric" | "imperial">(() => {
    return (localStorage.getItem("clima-units") as "metric" | "imperial") || "metric";
  });

  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

  const savePreferences = (unit: "metric" | "imperial") => {
    localStorage.setItem("clima-units", unit);
  };

  const handleSetUnits = (unit: "metric" | "imperial") => {
    setUnits(unit);
    savePreferences(unit);
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather data");

      const data = await res.json();

      const formattedData: WeatherData = {
        location: {
          name: data.location.name,
          country: data.location.country,
          lat: data.location.lat,
          lon: data.location.lon
        },
        current: {
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          condition: data.current.condition.text,
          conditionCode: data.current.condition.code.toString(),
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph / 3.6, // convert to m/s
          windDirection: data.current.wind_dir,
          feelsLike_c: data.current.feelslike_c,
          feelsLike_f: data.current.feelslike_f,
          uv: data.current.uv,
          pressure: data.current.pressure_mb,
          precipitation: data.current.precip_mm,
          lastUpdated: data.current.last_updated,
          isDay: data.current.is_day
        },
        forecast: {
          daily: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            day: {
              maxtemp_c: day.day.maxtemp_c,
              maxtemp_f: day.day.maxtemp_f,
              mintemp_c: day.day.mintemp_c,
              mintemp_f: day.day.mintemp_f,
              condition: day.day.condition.text,
              conditionCode: day.day.condition.code.toString(),
              chanceOfRain: Number(day.day.daily_chance_of_rain)
            }
          })),
          hourly: data.forecast.forecastday[0].hour.map((hour: any) => ({
            dt: new Date(hour.time).getTime() / 1000,
            temp: units === "metric" ? hour.temp_c : hour.temp_f,
            weather: [
              {
                id: hour.condition.code,
                description: hour.condition.text
              }
            ],
            pop: hour.chance_of_rain / 100
          }))
        }
      };

      setWeatherData(formattedData);
    } catch (err) {
      console.error(err);
      setError("WeatherAPI fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather data");

      const data = await res.json();

      const lat = data.location.lat;
      const lon = data.location.lon;
      await fetchWeatherByCoords(lat, lon);
    } catch (err) {
      console.error(err);
      setError("City fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => setError("Geolocation permission denied")
    );
  }, [units]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
        fetchWeatherByCoords,
        weatherProvider,
        setWeatherProvider: () => {},
        units,
        setUnits: handleSetUnits
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
