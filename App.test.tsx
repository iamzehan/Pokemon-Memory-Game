import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shuffleArray, type PokemonItem } from "./src/lib/data";

import { Card } from "./src/components/cards";

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
      id:3,
      name: "something3",
      image: "www.example.com/image3.png",
    },
    {
      id:4,
      name: "something4",
      image: "www.example.com/image4.png",
    },
  ];
  function sameList(a: PokemonItem[], b: PokemonItem[]) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  it("Data Shuffle", () => {
    const shuffledList = shuffleArray(cardsData);
    const isShuffled = sameList(cardsData, shuffledList);
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
