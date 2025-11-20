import { useState, useEffect } from "react";
import { getRandomPokemon } from "../lib/data";
import type { PokemonItem } from "../lib/data";
import { shuffleArray } from "../lib/data";

export default function Cards({
  score,
  setScore,
  setBest,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setBest: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [data, setData] = useState<PokemonItem[]>();
  useEffect(() => {
    async function load() {
      if (!data) {
        const pokemons = await getRandomPokemon();
        setData(pokemons);
        localStorage.setItem("data", JSON.stringify(pokemons));
      }
      return;
    }
    load();
  }, [data]);

  function handleShuffle() {
    if (data) {
      const shuffledData = [...shuffleArray(data)];
      setData(shuffledData);
    }
  }
  const [choices, setChoices] = useState<string[]>([]);

  const handleChoice = (choice: string) => {
    if (choices.includes(choice)) {
      setBest((prev) => Math.max(prev, score));
      setScore(0);
      setChoices([]);
    } else {
      setChoices((prev) => [...prev, choice]);
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div
      className="
        grid grid-flow-row grid-cols-2 
        gap-2 lg:gap-0 xl:max-w-[60%] justify-self-center
        lg:grid-cols-4 md:grid-cols-3
        m-3"
    >
      {data?.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            shuffle={handleShuffle}
            choose = {handleChoice}
          />
        );
      })}
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
  choose: (name:string)=> void;
}) {
  return (
    <div
      className="
    p-3 rounded-xl bg-amber-300 shadow flex flex-col gap-2 items-center
    lg:scale-95 max-w-[300px]
    active:bg-amber-400 hover:bg-amber-500 hover:md:scale-100 transition-all duration-300 cursor-pointer
    "
      onClick={() => {shuffle(); choose(name)}}
    >
      <img
        alt="img"
        className="rounded-lg h-30 aspect-square drop-shadow-md drop-shadow-zinc-950"
        src={image}
      />
      <p className="text-blue-600 text-2xl">{name}</p>
    </div>
  );
}
