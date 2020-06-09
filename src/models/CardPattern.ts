export type CardPattern = {
  label: string;
  url: string;
};

export const patterns: CardPattern[] = [
  {
    label: "waves",
    url:
      "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop",
  },
  {
    label: "geometric",
    url:
      "https://images.pexels.com/photos/430207/pexels-photo-430207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "brick",
    url:
      "https://images.pexels.com/photos/220152/pexels-photo-220152.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "tile",
    url:
      "https://images.pexels.com/photos/242616/pexels-photo-242616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "sky",
    url:
      "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "sunset",
    url:
      "https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const findPattern = (label: string) => {
  const pattern = patterns.find((pattern) => pattern.label === label);

  if (pattern == null) {
    throw new Error(`Unable to find pattern: ${label}`);
  }

  return pattern;
};
