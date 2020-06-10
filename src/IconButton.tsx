import React from "react";
import styled from "styled-components";

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {};

export default function IconButton(props: IconButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  font-size: 2rem;
  display: flex;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;
