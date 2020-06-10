export type CardPattern = {
  label: string;
  gradient: string;
  url: string;
};

export const patterns: CardPattern[] = [
  {
    label: "waves",
    gradient: `linear-gradient(
      111deg,
      rgba(62, 165, 238, 1) 13%,
      rgba(3, 215, 249, 0.8) 91%
    )`,
    url:
      "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop",
  },
  {
    label: "geometric",
    gradient: `linear-gradient(291deg, rgba(255,154,224,0.8) 13%, rgba(252,63,195,1) 91%);`,
    url:
      "https://images.pexels.com/photos/430207/pexels-photo-430207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "brick",
    gradient: `linear-gradient( 111deg, rgb(241, 144, 67, 1) 13%, rgb(255, 195, 87, 0.8) 91% );`,
    url:
      "https://images.pexels.com/photos/220152/pexels-photo-220152.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "tile",
    gradient: `linear-gradient( 111deg, rgba(34, 58, 232, 1) 13%, rgba(84, 136, 253, 0.8) 91% )`,
    url:
      "https://images.pexels.com/photos/242616/pexels-photo-242616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "sky",
    gradient: `linear-gradient( 111deg, rgba(1, 91, 255, 1) 13%, rgba(0, 137, 255, 0.8) 91% )`,
    url:
      "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    label: "sunset",
    gradient: `linear-gradient( 111deg, rgb(237, 80, 90, 1) 13%, rgb(246, 171, 50, 0.8) 91% )`,
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
