const MOLE_COUNT = 10;

const wrapper = document.querySelector(".wrapper");

let moles = [];

function init() {
  createHoles();
  putMoleInTheHole();
  createMoleObj();
  const firstMole = moles[0].node;
  console.log(firstMole);
  // firstMole.src = "images/king-mole-fed.png";
}

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
      status: "hungry",
      king: false,
      node: document.querySelector(`.mole [data-id="${i}"]`),
      next: Date.now() + 1000,
    };
    moles.push(mole);
  }
};

const putMoleInTheHole = () => {
  const holes = document.querySelectorAll(".hole");
  holes.forEach((hole, index) => {
    const img = document.createElement("img");
    img.src = "images/mole-hungry.png";
    img.setAttribute("data-id", index);
    img.setAttribute("id", index);
    img.classList.add("mole");
    img.classList.add("hungry");

    hole.appendChild(img);
  });
};

init();
