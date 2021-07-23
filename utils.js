export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const modalOpen = (modal) => {
  modal.classList.add("modal-open");
};

export const modalClose = (modal) => {
  modal.classList.remove("modal-open");
};

export const toggleModal = (modal) => {
  modal.classList.toggle("modal-open");
};
