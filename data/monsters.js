const monsters = {
  Emby: {
    position: {
      x: 285,
      y: 340,
    },
    image: {
      src: "./img/embySprite.png",
    },
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
    image: {
      src: "./img/draggleSprite.png",
    },
    frames: {
      max: 4,
      hold: 23,
    },
    animate: true,
    isEnemy: true,
    name: "Draggle",
    attacks: [attacks2.Tackle, attacks2.Fireball],
  },
};
