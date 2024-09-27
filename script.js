const NUMBER_OF_HOLES = 10;

const wrapper = document.querySelector(".wrapper");

let loopStart = Date.now();

const mole = {
  id: Math.floor(Math.random() * 10),
  status: "hidden",
  isKing: false,
};

const createHoles = () => {
  for (let i = 0; i < NUMBER_OF_HOLES; i++) {
    const div = document.createElement("div");
    div.classList.add("hole");
    div.setAttribute("id", i);
    wrapper.appendChild(div);
  }
};

const showMoleRandomly = () => {
  (mole.id = Math.floor(Math.random() * 10)), console.log(mole.id);
};

const mainLoop = () => {
  if (Date.now() > loopStart) {
    showMoleRandomly();
  }
  loopStart = Date.now() + 100;
  requestAnimationFrame(mainLoop);
};
createHoles();
showMoleRandomly();
mainLoop();
