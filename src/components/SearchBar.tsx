
import { useState, FormEvent } from "react";
import { useWeather } from "@/contexts/WeatherContext";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeather, fetchWeatherByCoords, loading } = useWeather();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
      setCity("");
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please search by city name.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Please search by city name.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-background/60 backdrop-blur-sm focus-visible:ring-primary"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={!city.trim() || loading}
          variant="default"
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          onClick={handleGetLocation} 
          disabled={loading}
          variant="outline"
          size="icon"
          title="Use my location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
