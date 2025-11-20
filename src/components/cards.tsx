import { useState, useEffect, useRef } from "react";
import { getRandomPokemon } from "../lib/data";
import type { PokemonItem } from "../lib/data";
import { shuffleArray } from "../lib/data";

export default function Cards({
  score,
  setScore,
  setBest,
  refresh,
  setRefresh,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBest: React.Dispatch<React.SetStateAction<number>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [data, setData] = useState<PokemonItem[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const didFetch = useRef(false);
  // Fetch Pokémon when component mounts or refresh is triggered
  useEffect(() => {
    async function load() {
      const pokemons = await getRandomPokemon();
      setData(pokemons);
      localStorage.setItem("data", JSON.stringify(pokemons));

      setScore(0);
      setChoices([]);
      setRefresh(false);
    }

    load();
    // cleanup
    didFetch.current = true;
  }, [refresh, setScore, setRefresh]);

  const handleShuffle = () => {
    if (data.length > 0) {
      const shuffledData = [...shuffleArray(data)];
      setData(shuffledData);
    }
  };

  const handleChoice = (choice: string) => {
    if (choices.includes(choice)) {
      setBest(prev => Math.max(prev, score));
      setScore(0);
      setChoices([]);
    } else {
      setChoices(prev => [...prev, choice]);
      setScore(prev => prev + 1);
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-2 lg:gap-0 xl:max-w-[60%] justify-self-center lg:grid-cols-4 md:grid-cols-3 pb-30 m-3">
      {data.map(pokemon => (
        <Card
          key={pokemon.id}
          image={pokemon.image}
          name={pokemon.name}
          shuffle={handleShuffle}
          choose={handleChoice}
        />
      ))}
    </div>
  );
}

function Card({
  name,
  image,
  shuffle,
  choose,
}: {
  name: string;
  image: string;
  shuffle: () => void;
  choose: (name: string) => void;
}) {
  return (
    <div
      className="
    p-3 rounded-xl bg-amber-300 shadow flex flex-col gap-2 items-center
    lg:scale-95 max-w-[300px] xl:max-w-[400px]
    active:bg-amber-400 hover:bg-amber-500 hover:md:scale-100 transition-all duration-300 cursor-pointer
    "
      onClick={() => {
        shuffle();
        choose(name);
      }}
    >
      <div className="bg-white w-full aspect-square items-center justify-center flex flex-col rounded-lg">
        <img
          alt="img"
          className="rounded-lg h-30 aspect-square drop-shadow-md drop-shadow-zinc-950"
          src={image}
        />
      </div>
      <p className="text-blue-600 text-2xl text-center w-full">{name}</p>
    </div>
  );
}
