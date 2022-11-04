const battleBackgroungImage = new Image();
battleBackgroungImage.src = `./img/battleBackground.png`;
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroungImage,
});

const draggle = new Monsters(monsters.Draggle);
const emby = new Monsters(monsters.Emby);

// aqui criamos oq ira aparecer quando a batalha iniciar

const renderedSprites = [draggle, emby];

emby.attacks.forEach((attack) => {
  const button = document.createElement("button");
  button.innerHTML = attack.name;
  document.querySelector(".attack-options").append(button);
});

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

    if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint();
      });
    }

    // draggle attacks
    const randomAttack =
      draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

    queue.push(() => {
      draggle.attack({
        attack: randomAttack,
        recipient: emby,
        renderedSprites,
      });
      if (emby.health <= 0) {
        queue.push(() => {
          emby.faint();
        });
      }
    });
  });

  button.addEventListener("mouseenter", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    document.querySelector(".attack-type").innerHTML = selectedAttack.type;
    document.querySelector(".attack-type").style.color = selectedAttack.color;
  });
  button.addEventListener("mouseout", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    document.querySelector(".attack-type").innerHTML = "Attack Type";
    document.querySelector(".attack-type").style.color = "black";
  });
});

document.querySelector(".dialogue").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
