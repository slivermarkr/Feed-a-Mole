const MOLE_COUNT = 10;

const wrapper = document.querySelector(".wrapper");

const moles = [];

let initTime = Date.now();

const randomNumber = () => Math.floor(Math.random() * MOLE_COUNT);

const createHoles = () => {
  for (let i = 0; i < MOLE_COUNT; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "hole");
    wrapper.appendChild(div);
  }
};

const createMoleObj = () => {
  for (let i = 0; i < MOLE_COUNT; i++) {
    const mole = {
      index: i,
      status: "hungry",
      node: "./images/mole-hungry.png",
    };
    moles.push(mole);
  }
};

const putMoleInTheHole = () => {
  const holes = document.querySelectorAll(".hole");

  holes.forEach((hole, index) => {
    hole.textContent = "";
    const img = document.createElement("img");
    img.src = moles[index].node;
    img.dataset.id = index;
    img.dataset.status = moles[index].status;
    img.classList.add("mole");
    // img.classList.add("hidden");

    img.addEventListener("click", (e) => {
      feedTheMole(e, index);
    });
    hole.appendChild(img);
  });
};
const refreshMoleStatus = () => {
  moles.forEach((mole) => {
    mole.status = "hungry";
    mole.node = "images/mole-hungry.png";
  });
};
const feedTheMole = (e, index) => {
  // if (!e.target.className.includes("mole")) return;
  if (e.target.dataset.status.includes("hungry")) {
    moles[index].status = "fed";
    moles[index].node = "images/mole-fed.png";
    e.target.classList.add("fed");
    e.target.classList.remove("hungry");
    putMoleInTheHole();
  } else {
    moles[index].status = "hungry";
    // moles[index].node = "images/mole-hungry.png";
    putMoleInTheHole();
  }
  console.log(e.target);
  // consolen/i.log(moles[index]);
};

const showMoleRandomly = () => {
  const molesElement = Array.from(document.querySelectorAll(".mole"));
  molesElement.forEach((mole) => mole.classList.remove("hungry"));
  refreshMoleStatus();
  const num = randomNumber();
  molesElement[num].classList.add(moles[num].status);
  // console.log(molesElement[nu]);
};

const replayAnimation = () => {
  if (Date.now() > initTime) {
    showMoleRandomly();
    initTime = Date.now() + 100;
  }

  requestAnimationFrame(replayAnimation);
};

createHoles();
createMoleObj();
putMoleInTheHole();
// showMoleRandomly();
replayAnimation();
