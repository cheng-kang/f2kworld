import { HSLColor, HSVColor, Sex } from "./common";

// Ref: https://stackoverflow.com/questions/3423214/convert-hsb-hsv-color-to-hsl
export function hsv_to_hsl(color: HSVColor): HSLColor {
  let h = color[0];
  let s = color[1] / 100;
  let v = color[2] / 100;
  // both hsv and hsl values are in [0, 1]
  var l = ((2 - s) * v) / 2;

  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = (s * v) / (l * 2);
    } else {
      s = (s * v) / (2 - l * 2);
    }
  }

  return [h, s, l];
}

export function getSkinColors(base: HSVColor) {
  const [h, s, v] = base;
  // TODO:
  //  1. try percentile?
  //  2. lower & upper bounds? 0, 100
  return {
    base: hsv_to_hsl([h, s, v]),
    distant1: hsv_to_hsl([h, s + 4, v - 7]),
    distant2: hsv_to_hsl([h, s, v - 14]),
    distant3: hsv_to_hsl([h, s - 3, v - 25]),
    close: hsv_to_hsl([h, s - 5, v + 8]),
  };
}

export function getDefaultColors() {
  return {
    [Sex.Female]: {
      skin: getSkinColors([40, 27, 92]),
      hair: hsv_to_hsl([0, 70.9, 67.5]),
      breast: hsv_to_hsl([19, 46, 76]),
    },
    [Sex.Male]: {
      skin: getSkinColors([27, 50, 89]),
      hair: hsv_to_hsl([240, 45.7, 45.5]),
      penis: hsv_to_hsl([21, 69, 84]),
    },
  };
}
