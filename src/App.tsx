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
      <footer className="w-screen text-center md:p-10 py-5 fixed bottom-0 z-500 bg-gray-950 font-bold">Made with <span className="animate-pulse">💌</span> By:{" "}
      <a rel="noopener" href="http://ziaulkarim.netlify.app" className="font-[stormfaze] text-purple-400 underline hover:text-amber-400" target="_blank">Md Ziaul Karim</a>
        </footer>
    </>
  );
}

export default App;
