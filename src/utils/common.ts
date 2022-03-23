export enum Sex {
  Male = "male",
  Female = "female",
}

export type HSVColor = [number, number, number];
export type HSLColor = [number, number, number];

export type SpriteConfig = {
  [key in string]: {
    map: Array<Array<HSLColor | undefined>>;
    anchor?: { x: number; y: number };
    alias?: Array<string>;
  };
};
