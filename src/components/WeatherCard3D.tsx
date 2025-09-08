import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow } from "react-icons/wi";

interface WeatherCardProps {
  weather: {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: { temp: number; feels_like: number; humidity: number };
    weather: { description: string; main: string }[];
    wind: { speed: number };
    clouds: { all: number };
  };
}

export default function WeatherCard3D({ weather }: WeatherCardProps) {
  const renderIcon = () => {
    const condition = weather.weather[0].main;
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={64} />;
      case "Clouds":
        return <WiCloudy size={64} />;
      case "Rain":
        return <WiRain size={64} />;
      case "Thunderstorm":
        return <WiThunderstorm size={64} />;
      case "Snow":
        return <WiSnow size={64} />;
      default:
        return <WiDaySunny size={64} />;
    }
  };

  const formatTime = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Dynamic background based on weather
  const bgClass =
    weather.weather[0].main === "Clear"
      ? "from-yellow-400 to-orange-500"
      : weather.weather[0].main === "Clouds"
      ? "from-gray-400 to-gray-700"
      : weather.weather[0].main === "Rain"
      ? "from-blue-400 to-blue-700"
      : "from-purple-400 to-pink-500";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
      className={`bg-gradient-to-r ${bgClass} bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transform cursor-pointer text-white`}
    >
      <div className="text-center">
        {renderIcon()}
        <h2 className="text-3xl font-bold mt-4">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-xl mt-2">
          {weather.main.temp}°C (Feels like: {weather.main.feels_like}°C)
        </p>
        <p className="capitalize mt-1">{weather.weather[0].description}</p>
        <p className="mt-2 text-sm">
          Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s | Clouds: {weather.clouds.all}%
        </p>
        <p className="mt-1 text-sm">
          Sunrise: {formatTime(weather.sys.sunrise)} | Sunset: {formatTime(weather.sys.sunset)}
        </p>
      </div>
    </motion.div>
  );
}
