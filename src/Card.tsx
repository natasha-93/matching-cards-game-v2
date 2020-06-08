import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

type CardProps = {
  url: string;
  id: number;
  isFlipped: boolean;
  onFlip: (id: number) => void;
  cardPattern: string;
};

export default function Card({
  url,
  id,
  isFlipped,
  onFlip,
  cardPattern,
}: CardProps) {
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <StyledCard onClick={() => onFlip(id)}>
      <StyledDiv
        style={{
          backgroundImage: `url(${cardPattern})`,

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
  position: relative;
  width: 9rem;
  height: 9rem;
  cursor: pointer;
  margin: 0.5rem;
`;
