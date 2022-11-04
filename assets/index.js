// Map Creation

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const offset = {
  x: -550,
  y: -650,
};

const boundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2049) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2049) {
      battleZones.push(
        new zonaB({
          position: {
            x: j * zonaB.width + offset.x,
            y: i * zonaB.height + offset.y,
          },
        })
      );
    }
  });
});

c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/JoeyKemon_Map2.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundobjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUPImage = new Image();
playerUPImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 1.75,
    y: canvas.height / 2 - 68,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10,
  },
  sprites: {
    up: playerUPImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

// novo obj da img de foreground

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

let backgroundImageX = -550;
let playerImageX = -550;

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangular1, rectangular2 }) {
  return (
    rectangular1.position.x + rectangular1.width >= rectangular2.position.x &&
    rectangular1.position.x <= rectangular2.position.x + rectangular2.width &&
    rectangular1.position.y <= rectangular2.position.y + rectangular2.height &&
    rectangular1.position.y + rectangular1.height >= rectangular2.position.y
  );
}

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  document.querySelector(".battle-bar").style.display = `none`;
  document.querySelector(".draggle-bar").style.display = `none`;
  document.querySelector(".emby-bar").style.display = `none`;

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZones) => {
    battleZones.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;

  if (battle.initiated) return;

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision({
          rectangular1: player,
          rectangular2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 3 &&
        Math.random() < 0.0092
      ) {
        console.log("Activate battle");

        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        audio.Map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to(`#overlappingDiv`, {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle();
                animateBattle();
                gsap.to(`#overlappingDiv`, {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === `w`) {
    player.animate = true;
    player.image = player.sprites.up;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangularCollision({
          rectangular1: player,
          rectangular2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movables) => {
        movables.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === `a`) {
    player.animate = true;
    player.image = player.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangularCollision({
          rectangular1: player,
          rectangular2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movables) => {
        movables.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === `s`) {
    player.animate = true;
    player.image = player.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangularCollision({
          rectangular1: player,
          rectangular2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movables) => {
        movables.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === `d`) {
    player.animate = true;
    player.image = player.sprites.right;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        rectangularCollision({
          rectangular1: player,
          rectangular2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movables) => {
        movables.position.x -= 3;
      });
  }
}

let lastKey = ``;

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case `w`:
      keys.w.pressed = true;
      lastKey = `w`;
      break;

    case `a`:
      keys.a.pressed = true;
      lastKey = `a`;
      break;

    case `s`:
      keys.s.pressed = true;
      lastKey = `s`;
      break;

    case `d`:
      keys.d.pressed = true;
      lastKey = `d`;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case `w`:
      keys.w.pressed = false;
      break;

    case `a`:
      keys.a.pressed = false;
      break;

    case `s`:
      keys.s.pressed = false;
      break;

    case `d`:
      keys.d.pressed = false;
      break;
  }
});

let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
});
