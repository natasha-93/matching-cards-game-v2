import React, { useContext } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import styled from "styled-components";
import { CardPattern } from "./models/CardPattern";
import { ThemeContext } from "./context/theme";

type WinModalProps = {
  onRestart: () => void;
};

export default function WinModal({ onRestart }: WinModalProps) {
  const { theme } = useContext(ThemeContext);

  return createPortal(
    <StyledModalBackground>
      <StyledModalContent cardPattern={theme}>
        <p>Congrats!</p>
        <Button onClick={(e) => onRestart()}>New Game</Button>
      </StyledModalContent>
    </StyledModalBackground>,
    document.body
  );
}

const StyledModalContent = styled.div<{ cardPattern: CardPattern }>`
  padding: 2rem 4rem;
  background: ${(p) => p.cardPattern.gradient};
  text-align: center;
  font-size: 2rem;
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
