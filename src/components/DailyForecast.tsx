
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/contexts/WeatherContext";
import { formatDate, formatTemperature, getWeatherInfo } from "@/utils/weatherUtils";
import { CloudRain } from "lucide-react";

export const DailyForecast = () => {
  const { weatherData, loading, units } = useWeather();

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-accent/50">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {weatherData.forecast.daily.map((day, index) => {
            const weatherInfo = getWeatherInfo(day.day.conditionCode);
            const WeatherIcon = weatherInfo.icon;
            const maxTemp = units === "metric" ? day.day.maxtemp_c : day.day.maxtemp_f;
            const minTemp = units === "metric" ? day.day.mintemp_c : day.day.mintemp_f;
            
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center p-3 rounded-lg ${index === 0 ? 'bg-primary/10' : 'bg-accent/50'} hover:bg-accent/70 transition-colors`}
              >
                <span className="text-sm font-medium mb-2">{formatDate(day.date)}</span>
                <WeatherIcon className="h-8 w-8 mb-2" />
                <span className="font-medium">{formatTemperature(maxTemp, units)}</span>
                <span className="text-sm text-muted-foreground">{formatTemperature(minTemp, units)}</span>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <CloudRain className="h-3 w-3 mr-1" />
                  {Math.round(day.day.chanceOfRain)}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
