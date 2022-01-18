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
import { rocketList } from "./rocket-list/RocketList.class.js";
import { progressbar } from "./progress-bar/ProgressBar.class.js";

const flyButton = document.querySelector(".button-fly");

const world = document.querySelector(".world");
export const finishLine = world.clientHeight - 80;
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
const buttonCloseModalSettingsRocket = document.querySelector(
  "#button-close-modal-rename"
);
const modalSettingsRocket = document.querySelector("#modal-settings-rocket");
const inputRename = document.querySelector("#input-rename").value;
const buttonAutoPlay = document.querySelector(".button-auto-play");

const addRocket = () => {
  if (GAME_STATE.gameStatus === GameStates.started) return;

  const newRocket = rocketList.add();
  addRocketToHighscores(newRocket.id);

  renderRockets();
};

const renderRockets = () => {
  const rocketContainer = document.querySelector(".rockets-container");

  rocketContainer.innerHTML = "";
  rocketList.mountRockets(rocketContainer);
};

const renderRocketsAlt = () => {
  const rockets = document.querySelectorAll(".rocket");
  if (rockets.length <= 0) return;

  rockets.forEach((rocket, i) => {
    rocket.style.transform = "translateY(-" + rocketList.list[i].alt + "px)";
  });
};

const gameOver = () => {
  modalOpen(modalGameOver);
  let highestAlt;
  for (let i = 0; i < rocketList.size; i += 1) {
    if (rocketList.list[i].alt >= (highestAlt?.alt || 0)) {
      highestAlt = rocketList.list[i];
    }
  }

  grantPoints(highestAlt.id);
  renderHighscores();
  winnerSpanId.innerHTML = highestAlt.id;

  setGameState(GameStates.over);
  return highestAlt;
};

const resetGame = () => {
  for (let i = 0; i < rocketList.size; i++) {
    rocketList.list[i].alt = GAME_SETTINGS_DEFAULTS.rocketAltitude;
  }

  progressbar.reset();
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
  }, 300);
  2;
};

const getNextGameTurn = () => {
  const valueExceeded = rocketList.list.some((roc) => roc.alt > finishLine);

  if (GAME_STATE.gameStatus === GameStates.notStarted) {
    setGameState(GameStates.started);
  }

  const highestAlt = rocketList.flyAllRockets();
  console.log(highestAlt);
  progressbar.set(highestAlt);
  renderRocketsAlt();

  if (valueExceeded) {
    clearInterval(GAME_SETTINGS.autoplayInterval);
    gameOver();
  }
};

const setupGame = () => {
  bindSettingsListeners();
  addRocket();
  renderRocketsAlt();
  const currentBgImageIndex = GAME_SETTINGS.spaceImageIndex;
  const image = spaceImages[currentBgImageIndex];

  world.style.backgroundImage = `url(${image})`;
  renderHighscores();
};

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
  addRocket();
  renderHighscores();
});

buttonCloseModalSettingsRocket.addEventListener("click", () => {
  modalClose(modalSettingsRocket);
});

buttonAutoPlay.addEventListener("click", autoPlay);
