import { rocketsImages, spaceImages } from "../constants.js";

export const GameStates = {
  notStarted: "not_started",
  started: "started",
  over: "over",
};

export const GAME_SETTINGS_DEFAULTS = {
  rocketAltitude: 0,
  rocketPoints: 0,
  rocketsImage: rocketsImages[0],
  rocketsImageIndex: 0,
  spaceImage: spaceImages[0],
  spaceImageIndex: 0,
};
