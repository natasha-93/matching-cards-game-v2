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

type AppState = {
  isLoading: boolean;
  cards: Card[];
  guess: number[];
  cardPattern: CardPattern;
  category: string;
  difficulty: Difficulty;
};

type AppAction =
  | {
      type: "REVEAL_CARD";
      payload: { url: string };
    }
  | {
      type: "LOAD_CARDS";
      payload: { cards: Card[] };
    }
  | {
      type: "LOAD_CARDS_START";
    }
  | {
      type: "FLIP_CARD";
      payload: { id: number };
    }
  | {
      type: "CHECK_MATCH";
    }
  | {
      type: "CLEAR_GUESS";
    }
  | {
      type: "CHANGE_CATEGORY";
      payload: { category: string };
    }
  | {
      type: "CHANGE_DIFFICULTY";
      payload: { difficulty: Difficulty };
    }
  | {
      type: "CHANGE_PATTERN";
      payload: { cardPattern: CardPattern };
    };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOAD_CARDS": {
      return { ...state, cards: action.payload.cards, isLoading: false };
    }
    case "LOAD_CARDS_START": {
      return { ...state, isLoading: true };
    }
    case "FLIP_CARD": {
      const { id } = action.payload;
      let guess = state.guess;

      if (guess.length === 1) {
        guess = [...guess, id];
      } else {
        guess = [id];
      }

      return { ...state, guess };
    }
    case "REVEAL_CARD": {
      const { url } = action.payload;

      const cards = state.cards.map((card, i) => {
        if (card.url !== url) return card;

        return { ...card, isMatched: true };
      });

      return { ...state, cards };
    }
    case "CLEAR_GUESS": {
      return { ...state, guess: [] };
    }
    case "CHANGE_CATEGORY": {
      const { category } = action.payload;
      return { ...state, category };
    }
    case "CHANGE_DIFFICULTY": {
      const { difficulty } = action.payload;
      return { ...state, difficulty };
    }
    case "CHANGE_PATTERN": {
      const { cardPattern } = action.payload;
      return { ...state, cardPattern };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}

function App() {
  const [
    { isLoading, cards, guess, cardPattern, category, difficulty },
    dispatch,
  ] = useReducer(appReducer, {
    isLoading: false,
    cards: [],
    guess: [],
    cardPattern: patterns[0],
    category: "nature",
    difficulty: easy,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadCards = (urls: string[]) => {
    const cards = createCards(urls);

    dispatch({ type: "LOAD_CARDS", payload: { cards } });
  };

  const loading = <div>Loading...</div>;

  useEffect(() => {
    dispatch({ type: "LOAD_CARDS_START" });

    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${category}&category=${category}&image_type=photo&per_page=${difficulty.size}`
    )
      .then((response) => response.json())
      .then(({ hits }) => loadCards(hits.map((hit: any) => hit.previewURL)));
  }, [category, difficulty]);

  useEffect(() => {
    if (guess.length === 2) {
      const cardOne = cards.find((card) => card.id === guess[0]) as Card;
      const cardTwo = cards.find((card) => card.id === guess[1]) as Card;
      const isMatch = cardOne.url === cardTwo.url;

      if (isMatch) {
        dispatch({ type: "REVEAL_CARD", payload: { url: cardOne.url } });
        dispatch({ type: "CLEAR_GUESS" });
      } else {
        setTimeout(() => {
          dispatch({ type: "CLEAR_GUESS" });
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
          onCategoryChange={(category) => {
            dispatch({ type: "CHANGE_CATEGORY", payload: { category } });
          }}
          onDifficultyChange={(difficulty) => {
            dispatch({ type: "CHANGE_DIFFICULTY", payload: { difficulty } });
          }}
          difficulty={difficulty}
          onClose={() => setIsSidebarOpen(false)}
          cardPattern={cardPattern}
          onPatternChange={(cardPattern) => {
            dispatch({ type: "CHANGE_PATTERN", payload: { cardPattern } });
          }}
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
                  if (guess.length !== 2) {
                    dispatch({ type: "FLIP_CARD", payload: { id } });
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
