import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { shuffle } from "lodash";
import { urls1, waves } from "./data";
import Card from "./Card";

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
  const [cards, setCards] = useState<Card[]>(createCards(urls1));
  const [guess, setGuess] = useState<any>([]);
  const [cardPattern, setCardPattern] = useState(waves);

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
    <AppContainer>
      <h2> Memory Card Game</h2>
      <CardContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            url={card.url}
            id={card.id}
            isFlipped={guess.includes(card.id) || card.isMatched}
            cardPattern={cardPattern}
            onFlip={(id: number) => {
              console.log(id);

              if (guess.length === 0) {
                setGuess([id]);
              } else if (guess.length === 1) {
                setGuess([...guess, id]);
              }
            }}
          />
        ))}
      </CardContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: auto;
  text-align: center;
  padding: 0.5rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default App;
