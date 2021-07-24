import { rocketsImages, spaceImages } from "./constants.js";
import {
  addRocketToHighscores,
  grantPoints,
  renderHighscores,
  resetHighscores,
} from "./highscore.js";
import { GAME_SETTINGS, setGameState } from "./settings/settings.js";
import { GameStates, GAME_SETTINGS_DEFAULTS } from "./settings/constants.js";
import {
  modalClose,
  modalOpen,
  getRandomNumber,
  toggleModal,
} from "./utils.js";
import { bindSettingsListeners } from "./settings/event-listeners.js";
import { GAME_STATE } from "./game-state/game-state.js";

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
const inputRename = document.getElementById("input-rename").value;
const buttonAutoPlay = document.querySelector(".button-auto-play");

export const rocketList = [
  // {
  //   id: Math.random(),
  //   altitude: GAME_SETTINGS_DEFAULTS.rocketAltitude,
  // },
  // {
  //   id: Math.random(),
  //   altitude: GAME_SETTINGS_DEFAULTS.rocketAltitude,
  // },
  // {
  //   id: Math.random(),
  //   altitude: GAME_SETTINGS_DEFAULTS.rocketAltitude,
  // },
];

const addRocket = () => {
  if (GAME_STATE.gameStatus === GameStates.started) {
    return;
  }

  const idRocket = rocketList.length + 1;
  const rocket = {
    id: idRocket,
    altitude: GAME_SETTINGS_DEFAULTS.rocketAltitude,
  };
  rocketList.push(rocket);
  addRocketToHighscores(idRocket);
  rocketContainer.append(createRocket());
  console.log(rocket.id);
  return rocket.id;
};

const renderRockets = () => {
  const rockets = document.querySelectorAll(".rocket");

  if (rockets.length > 0) {
    for (let i = 0; i < rockets.length; i++) {
      rockets[i].style.transform =
        "translateY(-" + rocketList[i].altitude + "px)";
    }
  }
};

const createRocket = () => {
  const rocketdiv = document.createElement("div");
  rocketdiv.classList.add("rocket");
  rocketdiv.setAttribute("id", Math.random);
  rocketdiv.style.backgroundImage = `url(${
    rocketsImages[GAME_SETTINGS.rocketsImageIndex]
  })`;

  return rocketdiv;
};

const gameOver = () => {
  modalOpen(modalGameOver);
  let highestAlt;
  for (let i = 0; i < rocketList.length; i += 1) {
    if (rocketList[i].altitude >= (highestAlt?.altitude || 0)) {
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
    rocketList[i].altitude = GAME_SETTINGS_DEFAULTS.rocketAltitude;
  }
  setGameState(GameStates.notStarted);

  renderRockets();
  createRocket();
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
  if (GAME_STATE.gameStatus === GameStates.notStarted) {
    setGameState(GameStates.started);
  }

  for (let i = 0; i < rocketList.length; i++) {
    const flyValue = getRandomNumber(10, 50);
    const newAltitude = rocketList[i].altitude + flyValue;
    rocketList[i].altitude = newAltitude;
  }

  renderRockets();

  const valueExceeded = rocketList.some((roc) => roc.altitude > finishLine);

  if (valueExceeded) {
    clearInterval(GAME_SETTINGS.autoplayInterval);
    gameOver();
  }
};

const setupGame = () => {
  addRocket();
  renderRockets();
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
  addRocket();
  renderHighscores();
});

buttonCloseModalRename.addEventListener("click", () => {
  modalClose(modalRename);
});

buttonAutoPlay.addEventListener("click", autoPlay);
