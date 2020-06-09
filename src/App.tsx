import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { shuffle } from "lodash";
import Card from "./Card";
import Sidebar from "./Sidebar";
import { Difficulty, easy } from "./models/Difficulty";
import { CardPattern, patterns } from "./models/CardPattern";
import { ReactComponent as ConfigureIcon } from "./img/configure.svg";

type Card = {
  url: string;
  isMatched: boolean;
  id: number;
};

function createCards(urls: string[]) {
  const cards: Card[] = [];
  urls.forEach((url) => {
    cards.push({ url, isMatched: false, id: cards.length });
    cards.push({ url, isMatched: false, id: cards.length });
  });
  return shuffle(cards);
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [guess, setGuess] = useState<number[]>([]);
  const [cardPattern, setCardPattern] = useState<CardPattern>(patterns[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState("nature");
  const [difficulty, setDifficulty] = useState<Difficulty>(easy);

  const loadCards = (urls: string[]) => {
    const cards = createCards(urls);

    setCards(cards);
    setIsLoading(false);
  };

  const loading = <div>Loading...</div>;

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${category}&category=${category}&image_type=photo&per_page=${difficulty.size}`
    )
      .then((response) => response.json())
      .then(({ hits }) => loadCards(hits.map((hit: any) => hit.previewURL)));
  }, [category, difficulty]);

  useEffect(() => {
    if (guess.length === 2) {
      const cardOneIndex = cards.findIndex((card) => card.id === guess[0]);
      const cardTwoIndex = cards.findIndex((card) => card.id === guess[1]);
      if (cards[cardOneIndex].url === cards[cardTwoIndex].url) {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[cardOneIndex].isMatched = true;
          newCards[cardTwoIndex].isMatched = true;

          return newCards;
        });
        setGuess([]);
      } else {
        setTimeout(() => {
          setGuess([]);
        }, 1000);
      }
    }
  }, [guess]);

  return (
    <>
      <AppContainer>
        <StyledButton
          onClick={() => setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)}
        >
          <ConfigureIcon />
        </StyledButton>

        <Sidebar
          isOpen={isSidebarOpen}
          category={category}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
          difficulty={difficulty}
          onClose={() => setIsSidebarOpen(false)}
          cardPattern={cardPattern}
          onPatternChange={setCardPattern}
        />

        <h2> Memory Card Game</h2>

        {isLoading === true ? (
          loading
        ) : (
          <CardContainer difficulty={difficulty}>
            {cards.map((card) => (
              <Card
                key={card.id}
                url={card.url}
                id={card.id}
                isFlipped={guess.includes(card.id) || card.isMatched}
                cardPattern={cardPattern.url}
                onFlip={(id: number) => {
                  if (guess.length === 0) {
                    setGuess([id]);
                  } else if (guess.length === 1) {
                    setGuess([...guess, id]);
                  }
                }}
              />
            ))}
          </CardContainer>
        )}
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
  width: 100%;
`;

const StyledButton = styled.button`
  font-size: 2rem;
  display: flex;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;

const gridGap = "1rem";

const CardContainer = styled.div<{ difficulty: Difficulty }>`
  display: grid;
  margin: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - ${gridGap}), 1fr));
  grid-gap: ${gridGap};

  @media (min-width: 500px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc(33% - ${gridGap}), 1fr)
    );
  }

  ${(p) =>
    p.difficulty.label === "Medium" &&
    `
    @media (min-width: 900px) {
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(25% - ${gridGap}), 1fr)
      );
    }
  `}

  ${(p) =>
    p.difficulty.label === "Hard" &&
    `@media (min-width: 900px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc(${100 / 6}% - ${gridGap}), 1fr)
    );
  }`}
`;

export default App;
