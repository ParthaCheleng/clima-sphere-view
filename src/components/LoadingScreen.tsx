
import { Cloud, Sun } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative inline-block">
          <Sun className="h-12 w-12 text-amber-500 animate-spin-slow" />
          <Cloud className="h-10 w-10 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
        </div>
        <h2 className="text-xl font-medium mt-4">Loading ClimaSphere</h2>
        <p className="text-muted-foreground mt-2">Getting your weather information...</p>
      </div>
    </div>
  );
};
