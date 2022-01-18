import { rocketsImages, spaceImages, SETTINGS_LS_KEY } from "../constants.js";
import { GAME_STATE } from "../game-state/game-state.js";
import { Rocket } from "../rockets/Rocket.class.js";
import { saveInLs } from "../utils.js";
import { GAME_SETTINGS_DEFAULTS } from "./constants.js";

export const GAME_SETTINGS = {
  rocketsImage: GAME_SETTINGS_DEFAULTS.rocketsImage,
  rocketsImageIndex: GAME_SETTINGS_DEFAULTS.rocketsImageIndex,
  spaceImage: GAME_SETTINGS_DEFAULTS.spaceImage,
  spaceImageIndex: GAME_SETTINGS_DEFAULTS.spaceImageIndex,
  finishLine: document.querySelector(".world").clientHeight - 80,
};

export const changeRockets = (image) => {
  const rockets = document.querySelectorAll(".rocket");

  rockets.forEach((rocket) => {
    rocket.style.backgroundImage = "url(" + image + ")";
  });

  // const rockets = document.querySelectorAll(".rocket");
  // for (let i = 0; i < rockets.length; i++) {
  //   rockets[i].style.backgroundImage = "url(" + image + ")";
  // }
};

export const changeSpace = (image) => {
  const world = document.querySelector(".world");

  world.style.backgroundImage = `url(${image})`;
};

export const getNextRocket = () => {
  if (GAME_SETTINGS.rocketsImageIndex < rocketsImages.length - 1) {
    GAME_SETTINGS.rocketsImageIndex = GAME_SETTINGS.rocketsImageIndex + 1;
  } else {
    GAME_SETTINGS.rocketsImageIndex = 0;
  }

  const indexRocket = GAME_SETTINGS.rocketsImageIndex;
  const image = rocketsImages[indexRocket];
  console.log(image);

  return image;
};

export const getPreviousRocket = () => {
  if (GAME_SETTINGS.rocketsImageIndex > 0) {
    GAME_SETTINGS.rocketsImageIndex = GAME_SETTINGS.rocketsImageIndex - 1;
  } else {
    GAME_SETTINGS.rocketsImageIndex = rocketsImages.length - 1;
  }

  const indexRocket = GAME_SETTINGS.rocketsImageIndex;
  const image = rocketsImages[indexRocket];

  return image;
};

export const getNextSpace = () => {
  if (GAME_SETTINGS.spaceImageIndex < spaceImages.length - 1) {
    GAME_SETTINGS.spaceImageIndex = GAME_SETTINGS.spaceImageIndex + 1;
  } else {
    GAME_SETTINGS.spaceImageIndex = 0;
  }
  const indexImage = GAME_SETTINGS.spaceImageIndex;
  const image = spaceImages[indexImage];

  return image;
};

export const getPreviousSpace = () => {
  if (GAME_SETTINGS.spaceImageIndex > 0) {
    GAME_SETTINGS.spaceImageIndex = GAME_SETTINGS.spaceImageIndex - 1;
  } else {
    GAME_SETTINGS.spaceImageIndex = spaceImages.length - 1;
  }
  const indexImage = GAME_SETTINGS.spaceImageIndex;
  const image = spaceImages[indexImage];

  return image;
};

export const setGameState = (gameState) => {
  GAME_STATE.gameStatus = gameState;
};
