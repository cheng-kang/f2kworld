import { SpriteConfig } from "./common";

const pixelSize = 8;

export default function generateSpriteImageWithConfig(config: SpriteConfig) {
  const canvas = <HTMLCanvasElement>document.getElementById("helper")!;

  const ctx = canvas.getContext("2d")!;
  ctx.canvas.width = pixelSize * 5;
  ctx.canvas.height = pixelSize * 10;

  let x = 0;
  let y = 0;

  for (const spriteName in config) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const sprite = config[spriteName];
    const width = sprite.map[0].length;
    const height = sprite.map.length;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const color = sprite.map[i][j];
        if (color !== undefined) {
          ctx.fillStyle = `hsl(${color[0]}, ${color[1] * 100}%, ${
            color[2] * 100
          }%)`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
        x += pixelSize;
      }
      x -= pixelSize * width;
      y += pixelSize;
    }
    localStorage.setItem(spriteName, canvas.toDataURL());
    y -= pixelSize * height;
  }
}

export function generateSpriteSheetWithConfig(config: SpriteConfig) {
  const canvas = <HTMLCanvasElement>document.getElementById("display")!;

  const ctx = canvas.getContext("2d")!;
  ctx.canvas.width = window.innerWidth / 2;
  ctx.canvas.height = pixelSize * 16 * 3;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = 0;
  let line = 0;

  for (const spriteName in config) {
    const sprite = config[spriteName];
    const width = sprite.map[0].length;
    const height = sprite.map.length;
    if (x > window.innerWidth / 2 - pixelSize * width) {
      x = 0;
      y = pixelSize * (height + 1) * ++line;
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const color = sprite.map[i][j];
        if (color !== undefined) {
          ctx.fillStyle = `hsl(${color[0]}, ${color[1] * 100}%, ${
            color[2] * 100
          }%)`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
        x += pixelSize;
      }
      x -= pixelSize * width;
      y += pixelSize;
    }
    y -= pixelSize * height;
    // spacing between sprites
    x += pixelSize * (width + 1);
  }
}
