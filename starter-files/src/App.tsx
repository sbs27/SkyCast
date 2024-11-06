import { useState, ChangeEvent } from "react";
import { optionType } from "./types";

const App = (): JSX.Element => {  
  const [term, setTerm] = useState<string>("");

const [options, setOptions] = useState<[]> ([])

  const getSearchOptions = (value: string) => {
    const apiKey = process.env.REACT_APP_API_KEY;
  
    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }
  
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
    )
      .then((res) => res.json())  // Parse the response as JSON
      .then((data) => setOptions((data)) // Display the data in the console (you can store it in the state)
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value)

    getSearchOptions(value)

    // Make the API request

      // .then((res) => res.json())
      // .then((data) => console.log(data))
      // .catch((error) => console.log("Error fetching data:", error));
  };
  const onOptionSelect = (option:optionType) => {
    console.log(option.name)
  }

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 background-blur-lg drop-shadow-lg rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an option from the dropdown
        </p>
        <div className="relative flex mt-10 md:mt-4"></div>
        <input
          type="text"
          value={term}
          className="px-2 py-1 rounded-1-md border-2 border-white"
          onChange={onInputChange}
        />
        <ul className="absolute top-9 bg-white m1-1 rounded-b-md">
          {options.map((option:optionType, index:number) =>(
            <li key={option.name + "-" + index}>
              <button className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
               onClick={()=> onOptionSelect(option)}>

           {option.name}</button>
           </li>
           ))}
        </ul>
        

        <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-1 px-2 py-1 cursor-pointer">
          Search
        </button>
      </section>
    </main>
  );
};

export default App;
