import { spaceImages } from "./constants.js";
import {
  addRocketToHighscores,
  grantPoints,
  renderHighscores,
  resetHighscores,
} from "./highscore.js";
import { GAME_SETTINGS, setGameState } from "./settings/settings.js";
import { GameStates, GAME_SETTINGS_DEFAULTS } from "./settings/constants.js";
import { modalClose, modalOpen, toggleModal } from "./utils.js";
import { bindSettingsListeners } from "./settings/event-listeners.js";
import { GAME_STATE } from "./game-state/game-state.js";
import { Rocket } from "./rockets/Rocket.class.js";

const flyButton = document.querySelector(".button-fly");
const rocketContainer = document.querySelector(".rockets-container");
const world = document.querySelector(".world");
const finishLine = world.clientHeight;
const winnerSpanId = document.querySelector(".winner");
const buttonPlayAgain = document.querySelector(".button-modal-close");
const buttonSettings = document.querySelector(".button-settings");
const modalGameOver = document.querySelector("#modal-1");
const modalSettings = document.querySelector("#modal-2");
const buttonCloseSettings = document.querySelector("#button-close-settings");
const modalHighscore = document.querySelector("#modal-3");
const buttonHighscore = document.querySelector(".button-highscore");
const buttonResetHighscore = document.querySelector("#button-reset-highscore");
const buttonAddRocket = document.querySelector(".button-add-rocket");
const buttonCloseModalRename = document.querySelector(
  "#button-close-modal-rename"
);
const modalRename = document.querySelector("#modal-4");
const inputRename = document.querySelector("#input-rename").value;
const buttonAutoPlay = document.querySelector(".button-auto-play");

export const rocketList = [];

const addRocketToList = () => {
  if (GAME_STATE.gameStatus === GameStates.started) return;

  const newRocket = new Rocket();
  rocketList.push(newRocket);
  addRocketToHighscores(newRocket.id);

  renderRockets();
};

const renderRockets = () => {
  rocketContainer.innerHTML = "";

  for (let i = 0; i < rocketList.length; i++) {
    const rocketdiv = document.createElement("div");
    rocketdiv.classList.add("rocket");
    rocketdiv.style.backgroundImage = `url(${rocketList[i].img})`;

    rocketContainer.append(rocketdiv);
  }
};

const renderRocketsAlt = () => {
  const rockets = document.querySelectorAll(".rocket");
  if (rockets.length <= 0) return;

  rockets.forEach((rocket, i) => {
    rocket.style.transform = "translateY(-" + rocketList[i].alt + "px)";
  });
};

const gameOver = () => {
  modalOpen(modalGameOver);
  let highestAlt;
  for (let i = 0; i < rocketList.length; i += 1) {
    if (rocketList[i].alt >= (highestAlt?.alt || 0)) {
      highestAlt = rocketList[i];
    }
  }

  grantPoints(highestAlt.id);
  renderHighscores();
  winnerSpanId.innerHTML = highestAlt.id;

  setGameState(GameStates.over);
  return highestAlt;
};

const resetGame = () => {
  for (let i = 0; i < rocketList.length; i++) {
    rocketList[i].alt = GAME_SETTINGS_DEFAULTS.rocketAltitude;
  }

  setGameState(GameStates.notStarted);
  renderRocketsAlt();
};

const autoPlay = () => {
  if (GAME_STATE.gameStatus === GameStates.started) return;

  const interval = setInterval(() => {
    if (GAME_STATE.gameStatus === GameStates.over) {
      clearInterval(interval);
      return;
    }

    getNextGameTurn();
  }, 100);
};

const getNextGameTurn = () => {
  const valueExceeded = rocketList.some((roc) => roc.alt > finishLine);

  if (GAME_STATE.gameStatus === GameStates.notStarted) {
    setGameState(GameStates.started);
  }

  rocketList.forEach((rocket) => rocket.flyUp());
  renderRocketsAlt();

  if (valueExceeded) {
    clearInterval(GAME_SETTINGS.autoplayInterval);
    gameOver();
  }
};

const setupGame = () => {
  addRocketToList();
  renderRocketsAlt();
  const currentBgImageIndex = GAME_SETTINGS.spaceImageIndex;
  const image = spaceImages[currentBgImageIndex];

  world.style.backgroundImage = `url(${image})`;
  renderHighscores();
};

bindSettingsListeners();
setupGame();

buttonCloseSettings.addEventListener("click", () => {
  modalClose(modalSettings);
});

buttonSettings.addEventListener("click", () => {
  modalOpen(modalSettings);
});

buttonPlayAgain.addEventListener("click", () => {
  modalClose(modalGameOver);
  resetGame();
});

flyButton.addEventListener("click", getNextGameTurn);

buttonHighscore.addEventListener("click", () => {
  toggleModal(modalHighscore);
});

buttonResetHighscore.addEventListener("click", resetHighscores);

buttonAddRocket.addEventListener("click", () => {
  addRocketToList();
  renderHighscores();
});

buttonCloseModalRename.addEventListener("click", () => {
  modalClose(modalRename);
});

buttonAutoPlay.addEventListener("click", autoPlay);
