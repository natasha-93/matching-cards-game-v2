export type DifficultyLabel = "Easy" | "Medium" | "Hard";

export type Difficulty =
  | {
      label: "Easy";
      size: 3;
    }
  | {
      label: "Medium";
      size: 6;
    }
  | {
      label: "Hard";
      size: 12;
    };

export const easy: Difficulty = {
  label: "Easy",
  size: 3,
};

export const medium: Difficulty = {
  label: "Medium",
  size: 6,
};

export const hard: Difficulty = {
  label: "Hard",
  size: 12,
};

export const findDifficulty = (label: string) => {
  if (label === "Easy") return easy;
  if (label === "Medium") return medium;
  if (label === "Hard") return hard;

  throw new Error(`Invalid difficulty: ${label}`);
};
