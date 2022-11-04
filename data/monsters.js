const embyImage = new Image();
embyImage.src = `./img/embySprite.png`;

const draggleImage = new Image();
draggleImage.src = `./img/draggleSprite.png`;

const monsters = {
  Emby: {
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
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Draggle: {
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
    attacks: [attacks.Tackle, attacks.Fireball],
  },
};
