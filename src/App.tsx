import { useState } from "react";
import CloudsBackground from "./components/CloudsBackground";
import AnimatedSearch from "./components/AnimatedSearch";
import WeatherCard3D from "./components/WeatherCard3D";

interface DisplayWeather {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; feels_like: number; humidity: number };
  weather: { description: string; main: string }[];
  wind: { speed: number };
  clouds: { all: number };
}

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<DisplayWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name");
    setLoading(true);

    try {
      // Use CORS proxy so it works on GitHub Pages
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        )}`
      );

      const dataWrapped = await res.json();
      const data = JSON.parse(dataWrapped.contents);

      if (data.cod !== 200) {
        alert(data.message || "City not found");
        setWeather(null);
      } else {
        const displayWeather: DisplayWeather = {
          name: data.name,
          sys: data.sys,
          main: data.main,
          weather: data.weather,
          wind: data.wind,
          clouds: data.clouds,
        };
        setWeather(displayWeather);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden text-white">
      <CloudsBackground />

      <h1 className="text-5xl font-extrabold mb-10 z-10">
        🌤️ Glossy Weather
      </h1>

      <AnimatedSearch
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
      />

      {loading && <p className="mt-6 text-lg z-10">Loading...</p>}

      {weather && <WeatherCard3D weather={weather} />}
    </div>
  );
}

export default App;
