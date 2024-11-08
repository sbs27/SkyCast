import { getHumidityValue, getSunTime, getVisibilityValue } from "../helpers";
import { forecastType } from "../types";
import Sunset from "./Icons/Sunset";
import Sunrise from "./Icons/Sunrise";
import Tile from "./Tile";

// Function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number): number => Math.round(kelvin - 273.15);

type Props = {
  data: forecastType;
};

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0]; // Assuming 'list' is an array in forecastType

  return (
    <div className="w-full md:max-w-[500px] py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]"></div>
      <section className="text-center">
        <h2 className="text-2xl font-black">
          {data.name}, <span className="font-thin">{data.country}</span>
        </h2>
        <h1 className="text-4xl font-extrabold">
          {/* Convert temperature to Celsius */}
          {kelvinToCelsius(today.main.temp)}°C
        </h1>
        <p className="text-sm">
          {today.weather[0].main} - {today.weather[0].description}
        </p>
        <p className="text-sm">
          H: {kelvinToCelsius(today.main.temp_max)}°C L: {kelvinToCelsius(today.main.temp_min)}°C
        </p>
      </section>

      <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
        {data.list.map((item, i) => (
          <div className="inline-block text-center w-[50px] flex-shrink-0" key={i}>
            <p className="text-sm">
              {i === 0 ? "Now" : new Date(item.dt * 1000).getHours() + ":00"}
            </p>
            <img
              alt={`weather-icon-${item.weather[0].description}`}
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
            <p className="text-sm font-bold">
              {/* Convert temperature to Celsius */}
              {kelvinToCelsius(item.main.temp)}°C
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap justify-between text-zinc-700">
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
          <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
        </div>
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
          <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
        </div>
        
        <Tile 
          icon="wind" 
          title="Wind" 
          info={`${Math.round(today.wind.speed)} km/h`} 
          description={`Gusts: ${today.wind.gust?.toFixed(1)} km/h, Direction: ${Math.round(today.wind.deg)}°`} 
        />
        <Tile 
          icon="feels" 
          title="Feels like" 
          info={`${kelvinToCelsius(today.main.feels_like)}°C`} 
          description={`Feels ${
            kelvinToCelsius(today.main.feels_like) < kelvinToCelsius(today.main.temp) ? "colder" : "warmer"
          }`} 
        />
        <Tile 
          icon="humidity" 
          title="Humidity" 
          info={`${today.main.humidity}%`} 
          description={getHumidityValue(today.main.humidity)} 
        />
        <Tile 
          icon="pop" 
          title="Precipitation" 
          info={`${Math.round(today.pop * 100)}%`} 
          description={`Chance of rain, clouds at ${today.clouds.all}%`} 
        />
        <Tile 
          icon="pressure" 
          title="Pressure" 
          info={`${today.main.pressure} hPa`} 
          description={`${
            today.main.pressure < 1013 ? "Lower" : "Higher"
          } than standard`}
        />
        <Tile 
          icon="visibility" 
          title="Visibility" 
          info={`${(today.visibility / 1000).toFixed(1)} km`} 
          description={getVisibilityValue(today.visibility)} 
        />
      </section>
    </div>
  );
};

export default Forecast;
