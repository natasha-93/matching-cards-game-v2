import React from "react";
import { animated, useSpring } from "react-spring";
import {
  Difficulty,
  findDifficulty,
  DifficultyLabel,
} from "./models/Difficulty";
import { CardPattern, patterns, findPattern } from "./models/CardPattern";
import { categories } from "./data";
import styled from "styled-components";
import Dropdown from "./Dropdown";

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

  const difficulties: DifficultyLabel[] = ["Easy", "Medium", "Hard"];

  const { x } = useSpring({
    x: isOpen ? 0 : 100,
  });

  return (
    <SidebarContainer
      style={{
        transform: x.interpolate((x) => `translate3d(${x * -1}%, 0, 0)`),
      }}
    >
      <StyledButton onClick={(e) => onClose()}>x</StyledButton>

      <DropdownContainer>
        <label>
          Category:
          <Dropdown
            value={category}
            onChange={onCategoryChange}
            options={categories}
          />
        </label>
      </DropdownContainer>

      <DropdownContainer>
        <label>
          Difficulty:
          {/* <Dropdown
            value={difficulty.label}
            onChange={onDifficultyChange}
            options={difficulties}
          /> */}
          <select
            value={difficulty.label}
            onChange={(e) => {
              const difficulty = findDifficulty(e.target.value);

              onDifficultyChange(difficulty);
            }}
          >
            {difficulties.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </label>
      </DropdownContainer>
      <DropdownContainer>
        <label>
          Card Pattern:
          {/* <Dropdown
            value={cardPattern.label}
            onChange={onPatternChange}
            options={patterns}
          /> */}
          <select
            value={cardPattern.label}
            onChange={(e) => {
              const pattern = findPattern(e.target.value);

              onPatternChange(pattern);
            }}
          >
            {patterns.map((option) => {
              return (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </label>
      </DropdownContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20rem;
  max-width: 100%;
  background-color: yellow;
  z-index: 5;
  padding: 1rem;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 1.5rem;
  display: flex;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  margin: 3rem auto;
`;
