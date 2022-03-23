import { getDefaultColors, getSkinColors } from "./colors";
import { HSVColor, Sex } from "./common";
import generateSpriteImageWithConfig, {
  generateSpriteSheetWithConfig,
} from "./generateSpriteImageWithConfig";
import { getFemale } from "../sprites/female";

export interface PlayerParams {
  sex: Sex;
  skinTone?: HSVColor;
}

export class Player {
  readonly sex: Sex;
  readonly skinTone?: HSVColor;
  private colors: any;
  constructor({ sex, skinTone }: PlayerParams) {
    this.sex = sex;
    this.skinTone = skinTone;

    this.initColorPalette();
    this.generateSprite();
  }

  private initColorPalette() {
    const colors = getDefaultColors()[this.sex];
    if (this.skinTone) {
      colors.skin = getSkinColors(this.skinTone);
    }
    this.colors = colors;
  }

  private generateSprite() {
    if (this.sex === Sex.Female) {
      const femaleSpriteConfig = getFemale(this.colors);
      generateSpriteImageWithConfig(femaleSpriteConfig);
      // generateSpriteSheetWithConfig(femaleSpriteConfig);
      return;
    }
  }
}
