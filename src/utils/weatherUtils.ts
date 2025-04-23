import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Sun,
  Snowflake,
  Wind,
  type LucideIcon
} from "lucide-react";

// ✅ Mapping WeatherAPI condition codes: https://www.weatherapi.com/docs/weather_conditions.json
type WeatherConditionMapping = {
  [key: string]: {
    icon: LucideIcon;
    label: string;
    bgClass: string;
  };
};

export const weatherConditions: WeatherConditionMapping = {
  "1000": { icon: Sun, label: "Sunny", bgClass: "bg-weather-sunny" },
  "1003": { icon: CloudSun, label: "Partly Cloudy", bgClass: "bg-weather-cloudy" },
  "1006": { icon: Cloud, label: "Cloudy", bgClass: "bg-weather-cloudy" },
  "1009": { icon: Cloudy, label: "Overcast", bgClass: "bg-weather-cloudy" },
  "1030": { icon: CloudFog, label: "Mist", bgClass: "bg-weather-foggy" },
  "1063": { icon: CloudDrizzle, label: "Patchy Rain", bgClass: "bg-weather-rainy" },
  "1066": { icon: CloudSnow, label: "Patchy Snow", bgClass: "bg-weather-snowy" },
  "1069": { icon: CloudSnow, label: "Sleet", bgClass: "bg-weather-snowy" },
  "1072": { icon: CloudFog, label: "Freezing Drizzle", bgClass: "bg-weather-foggy" },
  "1087": { icon: CloudLightning, label: "Thunder", bgClass: "bg-weather-stormy" },
  "1114": { icon: CloudSnow, label: "Blowing Snow", bgClass: "bg-weather-snowy" },
  "1117": { icon: Snowflake, label: "Blizzard", bgClass: "bg-weather-snowy" },
  "1135": { icon: CloudFog, label: "Fog", bgClass: "bg-weather-foggy" },
  "1150": { icon: CloudDrizzle, label: "Light Drizzle", bgClass: "bg-weather-rainy" },
  "1180": { icon: CloudRain, label: "Light Rain", bgClass: "bg-weather-rainy" },
  "1183": { icon: CloudRain, label: "Moderate Rain", bgClass: "bg-weather-rainy" },
  "1192": { icon: CloudRain, label: "Heavy Rain", bgClass: "bg-weather-rainy" },
  "1201": { icon: CloudSnow, label: "Heavy Sleet", bgClass: "bg-weather-snowy" },
  "1210": { icon: CloudSnow, label: "Light Snow", bgClass: "bg-weather-snowy" },
  "1213": { icon: CloudSnow, label: "Moderate Snow", bgClass: "bg-weather-snowy" },
  "1216": { icon: Snowflake, label: "Heavy Snow", bgClass: "bg-weather-snowy" },
  "1273": { icon: CloudLightning, label: "Thundery Showers", bgClass: "bg-weather-stormy" },
  "1276": { icon: CloudLightning, label: "Thunderstorm", bgClass: "bg-weather-stormy" },

  // Fallback
  "default": {
    icon: Cloud,
    label: "Unknown",
    bgClass: "bg-weather-cloudy"
  }
};

// ✅ Get visual data based on WeatherAPI condition code
export const getWeatherInfo = (weatherCode: number | string) => {
  return weatherConditions[weatherCode.toString()] || weatherConditions["default"];
};

// ✅ Format temperature for UI
export const formatTemperature = (temp: number, units: "metric" | "imperial"): string => {
  return `${Math.round(temp)}°${units === "metric" ? "C" : "F"}`;
};

// ✅ Format date from ISO string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
};

// ✅ Format time from timestamp
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date);
};

// ✅ Clean hourly forecast data for UI and charts
export const getHourlyForecastData = (
  hourlyForecast: Array<{
    dt: number;
    temp: number;
    weather: { id: number; description: string }[];
    pop: number;
  }>,
  units: "metric" | "imperial"
) => {
  return hourlyForecast.slice(0, 12).map(hour => ({
    time: formatTime(hour.dt),
    temperature: Math.round(units === "metric" ? hour.temp : hour.temp * 1.8 + 32),
    condition: hour.weather[0]?.description || "Clear",
    conditionCode: hour.weather[0]?.id.toString() || "1000",
    chanceOfRain: Math.round(hour.pop * 100)
  }));
};
