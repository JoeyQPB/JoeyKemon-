const battleBackgroungImage = new Image();
battleBackgroungImage.src = `./img/battleBackground.png`;
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroungImage,
});

const draggleImage = new Image();
draggleImage.src = `./img/draggleSprite.png`;
const draggle = new Sprite({
  position: {
    x: 800,
    y: 100,
  },
  image: draggleImage,
  frames: {
    max: 4,
    hold: 23,
  },
  animate: true,
  isEnemy: true,
  name: "Draggle",
});

const embyImage = new Image();
embyImage.src = `./img/embySprite.png`;
const emby = new Sprite({
  position: {
    x: 285,
    y: 340,
  },
  image: embyImage,
  frames: {
    max: 4,
    hold: 10,
  },
  animate: true,
  name: "Emby",
});

// aqui criamos oq ira aparecer quando a batalha iniciar

const renderedSprites = [draggle, emby];

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animateBattle();

// create a QUEUE
const queue = [];

// eventos para os botões (ataques)
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites,
    });

    queue.push(() => {
      draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        renderedSprites,
      });
    });

    queue.push(() => {
      draggle.attack({
        attack: attacks.Fireball,
        recipient: emby,
        renderedSprites,
      });
    });
  });
});

document.querySelector(".dialogue").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
