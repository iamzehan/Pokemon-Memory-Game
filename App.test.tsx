import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shuffleArray, getRandomPokemon, type PokemonItem } from "./src/lib/data";
import Cards, { Card } from "./src/components/cards";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});


describe("Shuffle", () => {
  const cardsData = [
  {
    id: 1,
    name: "something1",
    image: "www.example.com/image1.png",
  },
  {
    id: 2,
    name: "something2",
    image: "www.example.com/image2.png",
  },
  {
    id: 3,
    name: "something3",
    image: "www.example.com/image3.png",
  },
  {
    id: 4,
    name: "something4",
    image: "www.example.com/image4.png",
  },
];
  function sameList(a: PokemonItem[], b: PokemonItem[]) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  it("Data Shuffle", () => {
    const shuffledList = shuffleArray(cardsData);
    const isShuffled = !sameList(cardsData, shuffledList);
    expect(isShuffled).toBe(true);
  });
});

describe("Card component", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let setResults: { choice: string; shuffled: boolean };

  const data = {
    name: "something1",
    image: "www.example.com/image1.png",
  };

  function shuffle() {
    setResults.shuffled = true;
  }

  function choose(name: string) {
    setResults.choice = name;
  }

  beforeEach(() => {
    // Reset results for each test
    setResults = { choice: "", shuffled: false };

    user = userEvent.setup();

    render(
      <Card
        name={data.name}
        image={data.image}
        shuffle={shuffle}
        choose={choose}
      />
    );
  });

  it("calls shuffle when clicked", async () => {
    await user.click(screen.getByTestId("card"));
    expect(setResults.shuffled).toBe(true);
  });

  it("calls choose with correct name", async () => {
    await user.click(screen.getByTestId("card"));
    expect(setResults.choice).toBe("something1");
  });
});

// mock data for pokemon
const mockPokemons = [
  { id: 1, name: "pikachu", image: "pikachu.png" },
  { id: 2, name: "bulbasaur", image: "bulbasaur.png" },
];

// Mock getRandomPokemon
vi.mock("./src/lib/data", () => ({
  getRandomPokemon: vi.fn(() => Promise.resolve(mockPokemons)),
  shuffleArray: vi.fn((arr) => [...arr].reverse()), // predictable shuffle
}));



describe("Cards Component", () => {
  const setScore = vi.fn();
  const setBest = vi.fn();
  const setRefresh = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders Pokémon returned by getRandomPokemon", async () => {
    render(
      <Cards
        score={0}
        setScore={setScore}
        setBest={setBest}
        refresh={false}
        setRefresh={setRefresh}
      />
    );

    const cards = await screen.findAllByTestId("card");
    expect(cards.length).toBe(2);

    expect(getRandomPokemon).toHaveBeenCalled();
  });

  it("clicking a card increases score", async () => {
    const user = userEvent.setup();

    render(
      <Cards
        score={0}
        setScore={setScore}
        setBest={setBest}
        refresh={false}
        setRefresh={setRefresh}
      />
    );

    const card = await screen.findByText("pikachu");
    await user.click(card);

    expect(setScore).toHaveBeenCalledWith(expect.any(Function)); // state updater
  });

  it("clicking the same card twice resets score and updates best", async () => {
    const user = userEvent.setup();

    render(
      <Cards
        score={2}
        setScore={setScore}
        setBest={setBest}
        refresh={false}
        setRefresh={setRefresh}
      />
    );

    const card = await screen.findByText("pikachu");

    await user.click(card); // first time → add choice
    await user.click(card); // second time → repeat → fail

    expect(setBest).toHaveBeenCalled();
    expect(setScore).toHaveBeenCalledWith(0);
  });

  it("shuffleArray is used when clicking a card", async () => {
    const user = userEvent.setup();

    render(
      <Cards
        score={0}
        setScore={setScore}
        setBest={setBest}
        refresh={false}
        setRefresh={setRefresh}
      />
    );

    const card = await screen.findByText("pikachu");
    await user.click(card);

    expect(shuffleArray).toHaveBeenCalled();
  });

  it("refresh triggers a refetch", async () => {
    render(
      <Cards
        score={0}
        setScore={setScore}
        setBest={setBest}
        refresh={true}
        setRefresh={setRefresh}
      />
    );

    await waitFor(() => {
      expect(getRandomPokemon).toHaveBeenCalled();
    });

    expect(setRefresh).toHaveBeenCalledWith(false);
  });
});
