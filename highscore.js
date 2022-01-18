import { HIGHSCORE_LS_KEY } from "./constants.js";
import { rocketList } from "./rocket-list/RocketList.class.js";

import { loadFromLs, saveInLs } from "./utils.js";

const scoreBoard = document.querySelector(".score-board");

const addPoints = (id, highscores) => {
  if (highscores) {
    if (highscores[id]) {
      highscores[id].score = highscores[id].score + 1;
    } else {
      highscores = {
        ...highscores,
        [id]: {
          score: 1,
        },
      };
    }
  }

  return highscores;
};

export const grantPoints = (id) => {
  const currentHighscores = loadFromLs(HIGHSCORE_LS_KEY) || {};

  const newHighscores = addPoints(id, currentHighscores);

  saveInLs(newHighscores, HIGHSCORE_LS_KEY);
};

export const addRocketToHighscores = (id) => {
  let highscores = loadFromLs(HIGHSCORE_LS_KEY);

  highscores = {
    ...highscores,
    [id]: {
      score: 0,
    },
  };

  saveInLs(highscores, HIGHSCORE_LS_KEY);
};

export const renderHighscores = () => {
  scoreBoard.innerHTML = "";

  const highscores = loadFromLs(HIGHSCORE_LS_KEY);
  const isEmpty = JSON.stringify(highscores) === "{}";

  if (!highscores || isEmpty) {
    for (let i = 0; i < rocketList.length; i++) {
      const p1 = createScoreElement(i + 1);
      scoreBoard.append(p1);
    }

    return;
  }

  const highscoresArray = Object.entries(highscores);

  const sortedHighscores = [...highscoresArray].sort((a, b) => {
    if (a[1].score > b[1].score) {
      return -1;
    }

    if (a[1].score < b[1].score) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < sortedHighscores.length; i++) {
    const key = sortedHighscores[i][0];
    const value = sortedHighscores[i][1];

    const p = createScoreElement(i + 1, key, value.score * 100);

    scoreBoard.append(p);
  }
};

export const createScoreElement = (position, rocketNo, score) => {
  const p = document.createElement("p");
  const span = document.createElement("span");
  span.classList.add("rocket-id-points");
  let rocketLabel = `RocketNo #${rocketNo}: `;
  if (!rocketNo) {
    rocketLabel = "---";
  }
  p.append(`${position}. ${rocketLabel}`);

  p.append(span);
  if (score) {
    span.append(score);
  } else {
    span.append("---");
  }

  return p;
};

export const resetHighscores = () => {
  saveInLs({}, HIGHSCORE_LS_KEY);
  renderHighscores();
};
