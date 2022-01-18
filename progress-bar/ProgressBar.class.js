import { GAME_SETTINGS } from "../settings/settings.js";

class ProgressBar {
  constructor(element, height = 0, finishLine) {
    this.alt = element.querySelector(".progress-bar-alt");
    this.fill = element.querySelector(".progress-bar-fill");
    this.finishLine = finishLine;

    this.set(height);
  }

  set(newHeight) {
    this.height = newHeight;
    this.render();
  }

  reset() {
    this.height = 0;
    this.render();
  }

  render() {
    this.alt.textContent = `${this.height}m.`;
    this.fill.style.height = `${(this.height / this.finishLine) * 100}%`;
  }
}

export const progressbar = new ProgressBar(
  document.querySelector(".progress-bar"),
  0,
  GAME_SETTINGS.finishLine
);
