
import { CurrentWeather } from "@/components/CurrentWeather";
import { DailyForecast } from "@/components/DailyForecast";
import { FavoritesSection } from "@/components/FavoritesSection";
import { HourlyForecast } from "@/components/HourlyForecast";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SearchBar } from "@/components/SearchBar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useEffect, useState } from "react";
import { useWeather } from "@/contexts/WeatherContext";

const Index = () => {
  const { fetchWeather, loading } = useWeather();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Load default city on first render
    fetchWeather("New York").then(() => {
      // Add a slight delay to ensure a smooth loading experience
      setTimeout(() => {
        setInitialLoading(false);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen pb-10">
      <div className="weather-gradient-bg"></div>
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ClimaSphere
          </h1>
          <SettingsPanel />
        </div>
        <SearchBar />
      </header>
      
      <main className="container mx-auto px-4 space-y-8">
        <section>
          <CurrentWeather />
        </section>
        
        <section>
          <FavoritesSection />
        </section>
        
        <section>
          <DailyForecast />
        </section>
        
        <section>
          <HourlyForecast />
        </section>
      </main>
    </div>
  );
};

export default Index;
