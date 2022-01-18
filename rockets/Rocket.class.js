import { GAME_SETTINGS_DEFAULTS } from "../settings/constants.js";
import { getRandomNumber, modalClose } from "../utils.js";

export class Rocket {
  constructor(name) {
    this.id = getRandomNumber(1, 100000);
    this.alt = GAME_SETTINGS_DEFAULTS.rocketAltitude;
    this.img = GAME_SETTINGS_DEFAULTS.rocketsImage;

    if (name) {
      this.name = name;
    }
  }

  flyUp() {
    const flyValue = getRandomNumber(10, 50);
    this.alt = this.alt + flyValue;

    return this.alt;
  }

  changeName(name) {
    this.name = name;
  }

  changeImage(image) {
    this.img = image;
  }

  mount(parentElement) {
    const rocketElement = document.createElement("div");
    rocketElement.setAttribute("id", this.id);
    rocketElement.classList.add("rocket");
    rocketElement.style.backgroundImage = `url(${this.img})`;
    rocketElement.innerHTML = `
      <span class="name">${this.name || ""}</span>
      <button class="button-small">Remove</button>
    `;

    rocketElement.addEventListener("click", () => this.openSettings());
    parentElement.append(rocketElement);
  }

  openSettings() {
    const modal = document.createElement("div");
    modal.classList.add("modal", "modal-open");
    modal.innerHTML = `
    <div class="modal-content">
      <h1>NAME</h1>
      <input class="input-rename" type="text" value="${this.name || ""}" />
      <button class="button button-modal-close">
        SAVE & CLOSE
      </button>
    </div>
    `;
    const input = modal.querySelector(".input-rename");
    const closeBtn = modal.querySelector(".button");

    closeBtn.addEventListener("click", () => {
      const rocket = document.getElementById(this.id);
      const nameSpan = rocket.querySelector(".name");

      nameSpan.innerHTML = input.value;
      this.changeName(input.value);

      document.body.removeChild(modal);
    });

    document.body.append(modal);
  }
}
