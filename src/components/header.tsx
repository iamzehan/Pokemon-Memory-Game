import { Loop } from '@mui/icons-material';
export default function Header({score, best, setRefresh} : {
    score:number,
    best:number,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="
    sticky z-500 top-0 backdrop-blur-2xl xl:static bg-zinc-950/20
    flex font-bold items-center md:justify-between p-4 border-b shadow">
      <div className="flex flex-col items-center md:flex-row md:place-items-baseline flex-2 md:flex-4 gap-2">
        <img src="./logo.svg" className="h-10" alt="logo" />
        <p className="text-2xl md:text-3xl">Memory Game</p>
      </div>
      <div className="text-left flex-1 text-shadow-lg">
        <p>Score: {score}</p>
        <p>Best Score: {best}</p>
      </div>
      <button onClick={()=>setRefresh(true)}>
        Refresh <Loop/>
      </button>
    </header>
  );
}
