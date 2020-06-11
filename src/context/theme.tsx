import React, { createContext, useState } from "react";
import { patterns, CardPattern } from "../models/CardPattern";

type ThemeProviderValue = {
  theme: CardPattern;
  setTheme: React.Dispatch<React.SetStateAction<CardPattern>>;
};
export const ThemeContext = createContext({
  theme: patterns[0],
} as ThemeProviderValue);

type ThemeProviderProps = { children?: JSX.Element };

export default function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState(patterns[0]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
      {...props}
    />
  );
}
