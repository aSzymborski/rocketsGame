export const rocketsImages = [
  "/assets/rocket.svg",
  "/assets/rocket2.svg",
  "/assets/rocket3.png",
];
export const spaceImages = [
  "/assets/space1.jpg",
  "/assets/space2.jpg",
  "/assets/space3.jpg",
];

export const HIGHSCORE_LS_KEY = "highscores";
export const SETTINGS_LS_KEY = "settings";

export const loadFromLs = (lsKey) => {
  const currentValue = localStorage.getItem(lsKey);
  return JSON.parse(currentValue);
};

export const saveInLs = (newValue, lsKey) => {
  if (!newValue) return;
  const stringNewValue = JSON.stringify(newValue);
  localStorage.setItem(lsKey, stringNewValue);
};
