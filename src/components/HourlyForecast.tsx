
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/contexts/WeatherContext";
import { formatTemperature, getHourlyForecastData, getWeatherInfo } from "@/utils/weatherUtils";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CloudRain } from "lucide-react";

export const HourlyForecast = () => {
  const { weatherData, loading, units } = useWeather();

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  const hourlyData = getHourlyForecastData(weatherData.forecast.hourly, units);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const weatherInfo = getWeatherInfo(data.conditionCode);
      const WeatherIcon = weatherInfo.icon;

      return (
        <div className="p-3 bg-background border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <div className="flex items-center gap-2 my-1">
            <WeatherIcon className="h-4 w-4" />
            <span>{weatherInfo.label}</span>
          </div>
          <p className="font-bold">{formatTemperature(data.temperature, units)}</p>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <CloudRain className="h-3 w-3 mr-1" />
            <span>{Math.round(data.chanceOfRain)}% chance of rain</span>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={hourlyData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
          {hourlyData.map((hour, index) => {
            const weatherInfo = getWeatherInfo(hour.conditionCode);
            const WeatherIcon = weatherInfo.icon;
            
            return (
              <div key={index} className="flex flex-col items-center py-2">
                <span className="text-xs font-medium">{hour.time}</span>
                <WeatherIcon className="h-5 w-5 my-1" />
                <span className="text-xs">{formatTemperature(hour.temperature, units)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
