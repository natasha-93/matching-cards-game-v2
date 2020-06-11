import React, { useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CardPattern } from "./models/CardPattern";
import { ThemeContext } from "./context/theme";

export default function PageLoader() {
  const { theme } = useContext(ThemeContext);

  return createPortal(
    <Overlay>
      <LoadingIcon cardPattern={theme}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </LoadingIcon>
    </Overlay>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const LoadingIcon = styled.div<{ cardPattern: CardPattern }>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${(p) => p.cardPattern.gradient};
    animation: lds-grid 1.2s linear infinite;
  }
  div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
