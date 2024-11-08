import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, forecastType } from '../types';

// Define the return type for the hook
type UseForecastReturnType = {
  term: string;
  options: optionType[];
  forecast: forecastType | null;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const useForecast = (): UseForecastReturnType => {
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<optionType[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    if (value === '') return;
    getSearchOptions(value);
  };

  const getForecast = (city: optionType) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16), // Get the first 16 forecasts
        };
        setForecast(forecastData); // Corrected here: Now the forecast data is properly passed to setForecast
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};

export default useForecast;
