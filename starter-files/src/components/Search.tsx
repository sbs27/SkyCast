import React, { ChangeEvent } from 'react';
import { optionType } from './../types';

type Props = {
  term: string;
  options: optionType[];  // Update: Correct prop type for `options`
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an option from the dropdown
        </p>

        <div className="relative mt-10 md:mt-4 w-full">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-md border-2 border-white w-full"
            onChange={onInputChange}
          />

          {options.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white rounded-b-md shadow-md z-10">
              {options.map((option, index) => (
                <li key={option.name + '-' + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="mt-4 rounded-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-700 px-4 py-1 cursor-pointer"
          onClick={onSubmit}
        >
          Search
        </button>
      </section>
    </main>
  );
};

export default Search;

