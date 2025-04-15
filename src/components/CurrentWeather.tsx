
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/contexts/WeatherContext";
import { formatTemperature, getWeatherInfo } from "@/utils/weatherUtils";
import { Droplets, Wind, ThermometerSun, Calendar } from "lucide-react";

export const CurrentWeather = () => {
  const { weatherData, loading, units } = useWeather();

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-6">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-12 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="w-full max-w-md mx-auto text-center p-8">
        <div className="text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Search for a city or use your location to get weather information</p>
        </div>
      </Card>
    );
  }

  const weatherInfo = getWeatherInfo(weatherData.current.conditionCode);
  const WeatherIcon = weatherInfo.icon;
  const temperature = units === "metric" ? weatherData.current.temp_c : weatherData.current.temp_f;
  const feelsLike = units === "metric" ? weatherData.current.feelsLike_c : weatherData.current.feelsLike_f;

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden animate-fade-in">
      <div className={`${weatherInfo.bgClass} p-6 text-white transition-all duration-500`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
            <p className="text-white/80">{weatherData.location.country}</p>
          </div>
          <WeatherIcon className="h-16 w-16 animate-float" />
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between mb-6">
          <div className="text-4xl font-bold">{formatTemperature(temperature, units)}</div>
          <div className="text-right">
            <div className="text-lg font-medium">{weatherInfo.label}</div>
            <div className="text-sm text-muted-foreground">
              Feels like {formatTemperature(feelsLike, units)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-accent/50 rounded-lg p-3 text-center">
            <Droplets className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm text-muted-foreground block">Humidity</span>
            <span className="font-medium">{weatherData.current.humidity}%</span>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-3 text-center">
            <Wind className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm text-muted-foreground block">Wind</span>
            <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-3 text-center">
            <ThermometerSun className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm text-muted-foreground block">UV Index</span>
            <span className="font-medium">{weatherData.current.uv}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
