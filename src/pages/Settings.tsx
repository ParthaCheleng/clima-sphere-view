
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useWeather } from "@/contexts/WeatherContext";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { weatherProvider, setWeatherProvider, units, setUnits } = useWeather();

  return (
    <div className="min-h-screen container mx-auto py-6 px-4">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">Customize your ClimaSphere experience</p>
      </header>

      <main className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how ClimaSphere looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Theme Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={() => toggleTheme()}
                />
                <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weather</CardTitle>
            <CardDescription>
              Configure weather data sources and units
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">Weather Provider</h3>
              <Select
                value={weatherProvider}
                onValueChange={(value) => setWeatherProvider(value as "openweathermap" | "weatherapi")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openweathermap">OpenWeatherMap</SelectItem>
                  <SelectItem value="weatherapi">WeatherAPI</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred weather data provider
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Temperature Units</h3>
              <Select
                value={units}
                onValueChange={(value) => setUnits(value as "metric" | "imperial")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Celsius (°C)</SelectItem>
                  <SelectItem value="imperial">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose your preferred temperature measurement units
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
              Information about ClimaSphere
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">ClimaSphere - Your Smart Weather Companion</h3>
              <p className="text-sm text-muted-foreground mt-1">
                A sleek, responsive weather web app that provides real-time weather data
                and forecasts with intelligent insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Version</h3>
              <p className="text-sm text-muted-foreground mt-1">1.0.0</p>
            </div>
            
            <div>
              <h3 className="font-medium">Data Sources</h3>
              <div className="text-sm text-muted-foreground mt-1 space-y-1">
                <p>• OpenWeatherMap API</p>
                <p>• WeatherAPI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
