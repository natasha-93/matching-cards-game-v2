import { CardType } from "../models/Card";
import { CardPattern, patterns } from "../models/CardPattern";
import { Difficulty, easy } from "../models/Difficulty";
import { useReducer } from "react";

type AppState = {
  isLoading: boolean;
  cards: CardType[];
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
      payload: { cards: CardType[] };
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
      return { ...state, isLoading: true, cards: [], guess: [] };
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

export default function useGame(): [AppState, React.Dispatch<AppAction>] {
  const [state, dispatch] = useReducer(appReducer, {
    isLoading: false,
    cards: [],
    guess: [],
    cardPattern: patterns[0],
    category: "nature",
    difficulty: easy,
  });

  return [state, dispatch];
}
