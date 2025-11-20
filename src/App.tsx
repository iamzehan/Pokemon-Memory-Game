import {useState } from "react";
import Header from "./components/header";
import Cards from "./components/cards";

function App() {
  const [score, setScore] = useState<number>(0);
  const [best, setBest] = useState<number>(0);
  
  

  return (
    <>
      <main className="h-screen w-screen font-[stormfaze] text-yellow-500 text-shadow-2xs">
        <Header score={score} best={best} />
        <Cards score={score} setScore={setScore} setBest={setBest}/>
      </main>
    </>
  );
}

export default App;
