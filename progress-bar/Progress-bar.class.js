import { GAME_STATE } from "../game-state/game-state.js";
import { finishLine } from "../script.js";
import { GameStates } from "../settings/constants.js";

export class ProgressBar {
  constructor(element, currentValue) {
    this.alt = element.querySelector(".progress-bar-alt");
    this.fill = element.querySelector(".progress-bar-fill");

    this.setValue(currentValue);
  }

  setValue(newValue) {
    if (newValue > finishLine + 40) {
      newValue = 0;
    }

    this.value = newValue;
    this.addValue();
  }

  addValue() {
    const mile = this.value + "m.";
    const percentage = (this.value / finishLine) * 100 + "%";

    this.alt.textContent = mile;
    this.fill.style.height = percentage;
  }
}
