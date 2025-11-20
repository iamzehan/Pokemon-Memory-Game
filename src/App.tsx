import { useState, useEffect } from "react";
import Header from "./components/header";
import Cards from "./components/cards";
import { type PokemonItem, getRandomPokemon } from "./lib/data";

function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(Number(localStorage.getItem("best")) || 0);

  return (
    <>
      <main className="h-screen w-screen font-[stormfaze] text-yellow-500 text-shadow-2xs">
        <Header score={score} best={best} />
        <Cards/>
      </main>
    </>
  );
}

export default App;
