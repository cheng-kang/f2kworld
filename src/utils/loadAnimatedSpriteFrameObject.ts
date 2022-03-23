import * as PIXI from "pixi.js";

export default function loadAnimatedSpriteFrameObject(
  spriteName: string[],
  frameDuration: number[],
  speed: number = 1,
) {
  return spriteName.map((key, idx) => {
    return {
      texture: PIXI.Texture.from(localStorage.getItem(key) || ""),
      time: frameDuration[idx] / speed,
    };
  });
}
