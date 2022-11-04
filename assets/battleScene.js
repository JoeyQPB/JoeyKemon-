const battleBackgroungImage = new Image();
battleBackgroungImage.src = `./img/battleBackground.png`;
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroungImage,
});

let draggle;
let emby;
let renderedSprites;
let battleAnimationId;
// create a QUEUE
let queue;

function initBattle() {
  document.querySelector(".battle-bar").style.display = `flex`;
  document.querySelector(".draggle-bar").style.display = `block`;
  document.querySelector(".emby-bar").style.display = `block`;
  document.querySelector("#userinterface").style.display = `block`;
  document.querySelector(".dialogue").style.display = `none`;
  document.querySelector(".health-draggle-bar-life").style.width = `100%`;
  document.querySelector(".health-emby-bar-life").style.width = `100%`;
  document.querySelector(".attack-options").replaceChildren();

  draggle = new Monsters(monsters.Draggle);
  emby = new Monsters(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector(".attack-options").append(button);
  });

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
        queue.push(() => {
          // fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();

              document.querySelector("#userinterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              battle.initiated = false;
            },
          });
        });
      }

      // draggle attacks
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

      queue.push(() => {
        draggle.attack2({
          attack: randomAttack,
          recipient: emby,
          renderedSprites,
        });
        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });

          queue.push(() => {
            // fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();

                document.querySelector("#userinterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });

                battle.initiated = false;
              },
            });
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
}

// aqui criamos oq ira aparecer quando a batalha iniciar

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();
// initBattle();
// animateBattle();

document.querySelector(".dialogue").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
