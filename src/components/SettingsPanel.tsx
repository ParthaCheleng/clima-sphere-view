
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useWeather } from "@/contexts/WeatherContext";
import { Settings, Moon, Sun, Sliders } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SettingsPanel = () => {
  const { theme, toggleTheme } = useTheme();
  const { weatherProvider, setWeatherProvider, units, setUnits } = useWeather();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            title="Quick Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        
        <Link to="/settings">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="All Settings"
          >
            <Sliders className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your weather app experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Weather Provider</h3>
            <Select
              value={weatherProvider}
              onValueChange={(value) => setWeatherProvider(value as "openweathermap" | "weatherapi")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openweathermap">OpenWeatherMap</SelectItem>
                <SelectItem value="weatherapi">WeatherAPI</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose your preferred weather data provider
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Temperature Units</h3>
            <Select
              value={units}
              onValueChange={(value) => setUnits(value as "metric" | "imperial")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Celsius (°C)</SelectItem>
                <SelectItem value="imperial">Fahrenheit (°F)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose your preferred temperature measurement units
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme</h3>
            <div className="flex items-center gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (theme !== "light") toggleTheme();
                }}
                className="flex-1"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (theme !== "dark") toggleTheme();
                }}
                className="flex-1"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Choose light or dark mode for the interface
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
