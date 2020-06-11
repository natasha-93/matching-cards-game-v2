import React, { useContext } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { ThemeContext } from "./context/theme";

type CardProps = {
  url: string;
  id: number;
  isFlipped: boolean;
  onFlip: (id: number) => void;
};

export default function Card({ url, id, isFlipped, onFlip }: CardProps) {
  const { theme } = useContext(ThemeContext);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <StyledCard
      onClick={() => {
        if (!isFlipped) {
          onFlip(id);
        }
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StyledDiv
          style={{
            backgroundImage: `url(${theme.url})`,

            opacity: opacity.interpolate((o) => 1 - Number(o)),
            transform,
          }}
        />
        <StyledDiv
          style={{
            backgroundImage: `url(${url})`,
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        />
      </div>
    </StyledCard>
  );
}

const StyledDiv = styled(animated.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  will-change: transform, opacity;
  background-size: cover;
`;

const StyledCard = styled.div`
  padding-top: 100%;
  flex: 1;
  position: relative;
  cursor: pointer;
`;
