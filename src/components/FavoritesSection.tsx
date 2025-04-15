
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/contexts/WeatherContext";
import { Heart, MapPin, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type FavoriteCity = {
  name: string;
  country?: string;
};

export const FavoritesSection = () => {
  const { fetchWeather } = useWeather();
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [cityInput, setCityInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("clima-favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        localStorage.removeItem("clima-favorites");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("clima-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (cityInput.trim() && !favorites.some(city => city.name.toLowerCase() === cityInput.toLowerCase())) {
      setFavorites([...favorites, { name: cityInput.trim() }]);
      setCityInput("");
      setShowInput(false);
    }
  };

  const removeFavorite = (cityName: string) => {
    setFavorites(favorites.filter(city => city.name !== cityName));
  };

  if (favorites.length === 0 && !showInput) {
    return (
      <div className="flex justify-center mt-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm"
          onClick={() => setShowInput(true)}
        >
          <Plus className="mr-1 h-4 w-4" /> Add favorite cities
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" /> Favorite Locations
          </CardTitle>
          {!showInput && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowInput(true)}
              title="Add favorite"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showInput && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter") addFavorite();
                if (e.key === "Escape") {
                  setCityInput("");
                  setShowInput(false);
                }
              }}
            />
            <Button size="sm" onClick={addFavorite} disabled={!cityInput.trim()}>
              Add
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setCityInput("");
                setShowInput(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {favorites.map((city, index) => (
              <div 
                key={index} 
                className="relative group rounded-lg bg-accent/50 p-3 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => fetchWeather(city.name)}
              >
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium truncate">{city.name}</p>
                    {city.country && (
                      <p className="text-xs text-muted-foreground truncate">{city.country}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(city.name);
                  }}
                  title="Remove from favorites"
                >
                  <Heart className="h-3 w-3 fill-current text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-sm py-2">
            No favorite cities added yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
