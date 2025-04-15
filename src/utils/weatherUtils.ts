
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

type WeatherConditionMapping = {
  [key: string]: {
    icon: LucideIcon;
    label: string;
    bgClass: string;
  };
};

// This mapping is simplified and would need to be expanded based on actual API codes
export const weatherConditions: WeatherConditionMapping = {
  // Clear/Sunny
  "1000": {
    icon: Sun,
    label: "Sunny",
    bgClass: "bg-weather-sunny"
  },
  // Partly cloudy
  "1003": {
    icon: CloudSun,
    label: "Partly cloudy",
    bgClass: "bg-weather-cloudy"
  },
  // Cloudy
  "1006": {
    icon: Cloud,
    label: "Cloudy",
    bgClass: "bg-weather-cloudy"
  },
  "1009": {
    icon: Cloudy,
    label: "Overcast",
    bgClass: "bg-weather-cloudy"
  },
  // Mist / Fog
  "1030": {
    icon: CloudFog,
    label: "Mist",
    bgClass: "bg-weather-foggy"
  },
  "1135": {
    icon: CloudFog,
    label: "Fog",
    bgClass: "bg-weather-foggy"
  },
  // Rain
  "1063": {
    icon: CloudDrizzle,
    label: "Patchy rain",
    bgClass: "bg-weather-rainy"
  },
  "1180": {
    icon: CloudRain,
    label: "Light rain",
    bgClass: "bg-weather-rainy"
  },
  "1183": {
    icon: CloudRain,
    label: "Moderate rain",
    bgClass: "bg-weather-rainy"
  },
  "1186": {
    icon: CloudRain,
    label: "Heavy rain",
    bgClass: "bg-weather-rainy"
  },
  // Snow
  "1066": {
    icon: CloudSnow,
    label: "Patchy snow",
    bgClass: "bg-weather-snowy"
  },
  "1210": {
    icon: Snowflake,
    label: "Light snow",
    bgClass: "bg-weather-snowy"
  },
  "1213": {
    icon: CloudSnow,
    label: "Moderate snow",
    bgClass: "bg-weather-snowy"
  },
  "1216": {
    icon: CloudSnow,
    label: "Heavy snow",
    bgClass: "bg-weather-snowy"
  },
  // Thunder
  "1087": {
    icon: CloudLightning,
    label: "Thundery outbreaks",
    bgClass: "bg-weather-stormy"
  },
  "1273": {
    icon: CloudLightning,
    label: "Thunder",
    bgClass: "bg-weather-stormy"
  },
  // Default
  "default": {
    icon: Cloud,
    label: "Weather",
    bgClass: "bg-weather-cloudy"
  }
};

export const getWeatherInfo = (conditionCode: string) => {
  return weatherConditions[conditionCode] || weatherConditions.default;
};

export const formatTemperature = (temp: number, units: "metric" | "imperial"): string => {
  return `${Math.round(temp)}°${units === "metric" ? "C" : "F"}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { 
    weekday: "short", 
    month: "short", 
    day: "numeric" 
  }).format(date);
};

export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return new Intl.DateTimeFormat("en-US", { 
    hour: "numeric", 
    minute: "2-digit",
    hour12: true 
  }).format(date);
};

export const getHourlyForecastData = (
  hourlyForecast: Array<{
    time: string;
    temp_c: number;
    temp_f: number;
    condition: string;
    conditionCode: string;
    chanceOfRain: number;
  }>,
  units: "metric" | "imperial"
) => {
  return hourlyForecast.slice(0, 12).map(hour => ({
    time: formatTime(hour.time),
    temperature: units === "metric" ? hour.temp_c : hour.temp_f,
    condition: hour.condition,
    conditionCode: hour.conditionCode,
    chanceOfRain: hour.chanceOfRain
  }));
};
