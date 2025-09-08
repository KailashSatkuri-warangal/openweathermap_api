import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

interface AnimatedSearchProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: () => void;
}

export default function AnimatedSearch({ city, setCity, fetchWeather }: AnimatedSearchProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="z-10 flex shadow-lg rounded-full overflow-hidden bg-white bg-opacity-30 backdrop-blur-lg"
    >
      <input
        type="text"
        className="flex-grow p-3 text-black rounded-l-full focus:outline-none"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="bg-blue-600 p-3 rounded-r-full hover:bg-blue-700"
      >
        <FiSearch size={24} color="white" />
      </button>
    </motion.div>
  );
}
