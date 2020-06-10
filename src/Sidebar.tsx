import React from "react";
import { animated, useSpring } from "react-spring";
import {
  Difficulty,
  easy,
  medium,
  hard,
  findDifficulty,
} from "./models/Difficulty";
import { CardPattern, patterns, findPattern } from "./models/CardPattern";
import { categories } from "./data";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import IconButton from "./IconButton";

type SidebarProps = {
  isOpen: boolean;
  category: string;
  onCategoryChange: (category: string) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onClose: () => void;
  cardPattern: CardPattern;
  onPatternChange: (pattern: CardPattern) => void;
};

export default function Sidebar({
  isOpen,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  onClose,
  cardPattern,
  onPatternChange,
}: SidebarProps) {
  // difficulty (number of tiles), theme (dropdown with api), card pattern image

  const difficulties: Difficulty[] = [easy, medium, hard];

  const { x } = useSpring({
    x: isOpen ? 0 : 100,
  });

  return (
    <SidebarContainer
      pattern={cardPattern}
      style={{
        transform: x.interpolate((x) => `translateX(${x * -1}%)`),
      }}
    >
      <IconButton onClick={() => onClose()}>x</IconButton>

      <DropdownContainer>
        <label>
          Category:
          <Dropdown<string>
            value={category}
            onChange={onCategoryChange}
            options={categories}
            getKey={(category) => category}
            getLabel={(category) => category}
          />
        </label>
      </DropdownContainer>

      <DropdownContainer>
        <label>
          Difficulty:
          <Dropdown<Difficulty>
            value={difficulty.label}
            onChange={(label) => {
              const difficulty = findDifficulty(label);

              onDifficultyChange(difficulty);
            }}
            options={difficulties}
            getKey={(difficulty) => difficulty.label}
            getLabel={(difficulty) => difficulty.label}
          />
        </label>
      </DropdownContainer>
      <DropdownContainer>
        <label>
          Card Pattern:
          <Dropdown<CardPattern>
            value={cardPattern.label}
            onChange={(label) => {
              const pattern = findPattern(label);

              onPatternChange(pattern);
            }}
            options={patterns}
            getKey={(pattern) => pattern.label}
            getLabel={(pattern) => pattern.label}
          />
        </label>
      </DropdownContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled(animated.div)<{ pattern: CardPattern }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20rem;
  max-width: 100%;
  z-index: 5;
  padding: 1rem;
  // backdrop-filter: blur(0.4rem);
  background: ${(p) => p.pattern.gradient};
`;

const DropdownContainer = styled.div`
  margin: 5rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;
