export type optionType = {
    name: string;
    country: string;
    lat: number;
    lon: number;
};

// index.ts in the types folder
export type forecastType = {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    list: [
      {
        dt: number;
        main: {
          feels_like: number;
          humidity: number;
          pressure: number;
          temp: number;
          temp_max: number;
          temp_min: number;
        };
        weather: [
          {
            main: string;
            icon: string;   // Fixed to 'icon' based on previous errors
            description: string;  // Fixed to 'description' instead of 'descriptions'
          }
        ];
        wind: {
          speed: number;
          gust: number;
          deg: number;
        };
        clouds: {
          all: number;
        };
        pop: number;
        visibility: number;
      }
    ];
  };
  
