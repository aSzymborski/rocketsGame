import { ProgressBar } from "../progress-bar/Progress-bar.class.js";
import { GAME_SETTINGS_DEFAULTS } from "../settings/constants.js";
import { getRandomNumber } from "../utils.js";

export class Rocket {
  constructor(name) {
    this.id = Math.random();
    this.alt = GAME_SETTINGS_DEFAULTS.rocketAltitude;
    this.img = GAME_SETTINGS_DEFAULTS.rocketsImage;
    if (name) {
      this.name = name;
    }
  }

  flyUp() {
    const flyValue = getRandomNumber(10, 50);
    this.alt = this.alt + flyValue;
    console.log(this.alt);
    new ProgressBar(document.querySelector(".progress-bar"), this.alt);
  }

  changeName(name) {
    this.name = name;
  }

  changeImage(image) {
    this.img = image;
  }
}
