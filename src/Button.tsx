import React from "react";
import styled from "styled-components";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {};

export default function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  font-size: 1.6rem;
  display: flex;
  border: 1px solid black;
  border-radius: 0.5rem;
  background: black;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
`;
