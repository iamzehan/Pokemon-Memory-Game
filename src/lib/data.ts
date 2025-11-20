export interface PokemonItem{
    id:string|number;
    name:string;
    image: string;
}

export async function getRandomPokemon() {
  const maxPokemon = 1025; // current PokéAPI count
  const ids = new Set();

  while (ids.size < 12) {
    ids.add(Math.floor(Math.random() * maxPokemon) + 1);
  }

  const pokemon = await Promise.all(
    [...ids].map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      };
    })
  );

  return pokemon;
}

export function shuffleArray(array:PokemonItem[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}