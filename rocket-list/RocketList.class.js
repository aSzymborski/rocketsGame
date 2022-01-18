import { Rocket } from "../rockets/Rocket.class.js";

class RocketList {
  constructor(parentElement) {
    this.list = [];
    this.size = 0;
    if (parentElement) {
      this.parentElement = parentElement;
    }
  }

  add(name) {
    const newRocket = new Rocket(name, this.remove);
    this.list.push(newRocket);
    this.size = this.size + 1;
    return newRocket;
  }

  remove(id) {
    const foundIndex = this.list.findIndex((roc) => {
      return roc.id === id;
    });

    if (foundIndex === -1) return;

    this.list.splice(foundIndex, 1);
    this.size = this.size - 1;
    this.parentElement.innerHTML = "";
    this.mountRockets();
  }

  flyAllRockets() {
    const alts = [];

    this.list.forEach((rocket) => {
      const newAlt = rocket.flyUp();
      alts.push(newAlt);
    });

    const highestAlt = Math.max(...alts);
    return highestAlt;
  }

  mountRockets() {
    this.list.forEach((rocket) => rocket.mount(this.parentElement));
    const rockets = this.parentElement.querySelectorAll(".rocket");

    for (let i = 0; i < rockets.length; i++) {
      const rocket = rockets[i];
      const removeBtn = rocket.querySelector(".button-small");

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.remove(parseInt(rocket.id, 10));
      });
    }
  }
}
const rocketContainer = document.querySelector(".rockets-container");

export const rocketList = new RocketList(rocketContainer);
