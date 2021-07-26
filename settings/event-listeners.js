import { rocketsImages, spaceImages } from "../constants.js";
import { saveInLs } from "../utils.js";
import {
  changeRockets,
  getNextRocket,
  getPreviousRocket,
  getNextSpace,
  getPreviousSpace,
  changeSpace,
} from "./settings.js";

const buttonArrowLeftRocket = document.querySelector("#arrow-left-rocket");
const buttonArrowRightRocket = document.querySelector("#arrow-right-rocket");
const buttonArrowLeftSpace = document.querySelector("#arrow-left-space");
const buttonArrowRightSpace = document.querySelector("#arrow-right-space");

const buttonRocket1 = document.querySelector("#rocket1");
const buttonRocket2 = document.querySelector("#rocket2");
const buttonRocket3 = document.querySelector("#rocket3");
const buttonSpace1 = document.querySelector("#space1");
const buttonSpace2 = document.querySelector("#space2");
const buttonSpace3 = document.querySelector("#space3");

export const bindSettingsListeners = () => {
  buttonArrowRightSpace.addEventListener("click", () => {
    const image = getPreviousSpace();

    changeSpace(image);
  });

  buttonArrowLeftSpace.addEventListener("click", () => {
    const image = getNextSpace();

    changeSpace(image);
  });

  buttonArrowRightRocket.addEventListener("click", () => {
    const image = getNextRocket();
    changeRockets(image);
  });

  buttonArrowLeftRocket.addEventListener("click", () => {
    const image = getPreviousRocket();
    changeRockets(image);
  });

  buttonRocket1.addEventListener("click", () => {
    changeRockets(rocketsImages[0]);
  });

  buttonRocket2.addEventListener("click", (e) => {
    changeRockets(rocketsImages[1]);
  });

  buttonRocket3.addEventListener("click", () => {
    changeRockets(rocketsImages[2]);
  });

  buttonSpace1.addEventListener("click", () => {
    changeSpace(spaceImages[0]);
  });

  buttonSpace2.addEventListener("click", () => {
    changeSpace(spaceImages[1]);
  });

  buttonSpace3.addEventListener("click", () => {
    changeSpace(spaceImages[2]);
  });
};
