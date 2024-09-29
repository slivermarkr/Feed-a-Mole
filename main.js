function getSadInterval() {
  return Date.now() + 500;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 2000) + 1000;
}

function getKingStatus() {
  return Math.random() > 0.8;
}

let score = 0;

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: true,
    node: document.getElementById("hole-9"),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.status = "leaving";
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./images/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.status = "gone";
      mole.next = getGoneInterval();
      mole.node.children[0].classList.add("gone");
      break;

    case "gone":
      mole.status = "hungry";
      mole.next = getHungryInterval();
      mole.king = getKingStatus();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./images/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove("hungry");
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./images/mole-sad.png";
      }
      break;
  }
}

function win() {
  document.querySelector(".bg").classList.add("gone");
  document.querySelector(".win").classList.remove("gone");
  document.querySelector(".win").classList.add("show");
}

function feed(e) {
  if (!e.target.classList.contains("hungry")) return;

  const mole = moles[e.target.dataset.index];
  mole.status = "fed";
  mole.next = getSadInterval();

  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./images/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./images/mole-fed.png";
  }

  mole.node.children[0].classList.remove("hungry");
  if (score >= 10) {
    win();
  }
  document.querySelector(".worm-container").style.width = `${score * 10}%`;
}

let gapTimer = Date.now() + 100;
function nextFrame() {
  const now = Date.now();
  if (gapTimer <= now) {
    gapTimer = now + 100;
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    gapTimer = now + 100;
  }
  requestAnimationFrame(nextFrame);
}
nextFrame();
document.querySelector(".bg").addEventListener("click", feed);
