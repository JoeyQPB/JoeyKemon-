// Map Creation

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// aq estaremos chamando nassa biblioteca de animação e passando para ela o q
// queremos animar como primeiro argumento
// e a segunda propriedade sera um obj com tdas as propriedades da animação

canvas.width = 1024;
canvas.height = 576;

// contruindo um loop para pegar sub array do nosso array collision
// vamos pegar de 70 e 70 -> pq nosso mapa tem 70 BLOCOS DE LARGURA por 40 de altura
// vamos usar o slice para pegar o sub array

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

// contruindo um loop para pegar sub array do nosso array battleZones
// vamos pegar de 70 e 70 -> pq nosso mapa tem 70 BLOCOS DE LARGURA por 40 de altura
// vamos usar o slice para pegar o sub array

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}
// const criada para definir a posição do background

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

// para incluir ele aq, nos importamos o arquivo para o nosso index
// ent quando rodarmos o codigo ele consegue fzr essa referencia

//  levando à criação de um CanvasRenderingContext2D - objeto representando
//    um contexto de renderização bidimensional.

// c.fillStyle = `white`;

// aqui estamos especificando a cor ou o estilo para usar regiões internas.
// tem q vir antes do retângulo

c.fillRect(0, 0, canvas.width, canvas.height);

// O método CanvasRenderingContext2D.fillRect() da API Canvas 2D desenha um retângulo
// preenchido na posição (x, y), no qual o tamanho é determinado pela width (largura)
// e pela height (altura)
// x -> coordenada X p/ o ponto inicial do retângulo
// y -> coordenada Y p/ o ponto inicial do retângulo
// RELACIONADO A TAG CANVAS

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

// novo obj da img do player
// usamos a largura e altura definidas no nosso png

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 1.75,
    y: canvas.height / 2 - 68,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUPImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

// novo obj da img de backgroung

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

// importando a img para um obj JS
// estamaos criando uma imagem como ojeto para renderiza-la no nosso canvas

// c.drawImage(image, 0, 0);

// O CanvasRenderingContext2D.drawImage()método da API Canvas 2D fornece
// diferentes maneiras de desenhar uma imagem na tela.
// recebe 3 argumentos ( a img, e onde vai ficar posicionada em relação aos eixos: x e y)
// RELACIONADO A IMG DENTRO DA TAG CANVAS
// isso chama a image para a tela

// image.onload = () => {
//   c.drawImage(image, -550, -650);
//   c.drawImage(
//     playerImage,
//     0,
//     0,
//     playerImage.width / 4,
//     playerImage.height,
//     canvas.width / 2 - playerImage.width / 4 / 1.5,
//     canvas.height / 2 - playerImage.height / 2,
//     playerImage.width / 4,
//     playerImage.height
//   );
// };

// nossa img é mto pesada, ent tivemos que achar um jeito para ela carregar na tela
// quando a img carregar dentro do nosso objeto "image" vamos chamar nossa função
// para exibir a image na tela
// ela foi exportada do tilde com o zoom desejado (400%)

// -------------------------------------------------------------------------------

// Player Creation

// const playerImage = new Image();
// playerImage.src = "./img/playerDown.png";

// criamos um obj para essa img, mas usaremos ela em conjunto com a arrow function
// ela será declarada antes de sua chamda
// image -> para que ela seja chamada DPS do nosso mapa, para ficar acima dele

// 4 primeiros argumentos:
// 1-> a cordenada x na qual quermos começar a cortar a img
// 2-> a cordenada y na qual quermos começar a cortar a img
// 1-> a cordenada x na qual quermos finalizar a cortar a img
// 2-> a cordenada y na qual quermos finalizar a cortar a img

// 4 ultimos argumentos:
// a ref de x e y vai ser em relação a img ja posicionada
// ou seja  colocar a img do boneco no lugar q queremos dentro da img no canvas
// para posiciona-lo no centro utilizamos a largura e a altura do canvas como base
// largura e altura
// são relacionados ao posicionamento da renderização da img na tela

// -------------------------------------------------------------------------------

// Move Player Through Map on Keydown

// window.addEventListener("keydown", (e) => {
//   console.log(e);
// });

// aqui estamos add um evento para cada "keydown" no obj global(window)
// dessa forma - cm o console.log() conseguimos ver as propriedades de cada tecla pressionada
// faremos um switch case para definir oq fazermos quando a tecla for pressionada

// precisaremos criar uma animação para quando o nosso player for andar
// faremos um window.requestanimationframe para parar e ordenar funcionara quando chamarmos ela
// traremos as img para essa função para q ela possa fzr a animação frame a frame
// alteraremos suas posições conforme o keydown escolhido
// como ela vai alterar é interessante criarmos uma variável para ela no inicio do codigo
// mais interessante é criar uma classe, pois teremos de declarar varias coisas do msm
// criaremos as img em cima da classe
// ao usarmos um obj no constructor ñ precisaremos lembrar da ordem dos argumentos
// teremos metodos para cirar as img

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

// para testar qual tecla foi pressionada criaremos uma variavel de obj

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

// com essa constante conseguimos pegar cada img que deve se mover quando pressionamos
// um tecla, assim dando sensação de movimento para nosso player
// cada img q se movera sera um el do array, se vamos usar para todos e n queremos um
// array resultante, usaremos o forEach para passar por cada um deles

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

//##-------------------------------------------------------------------------------##

// essa função determina basicamente tudo oq acontece na tela
// temos a img de backgroung, as colisoes o player e seu movimentos

function animate() {
  const animationId = window.requestAnimationFrame(animate);
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
  player.moving = false;

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
        Math.random() < 0.037
      ) {
        console.log("Activate battle");

        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 2,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to(`#overlappingDiv`, {
              opacity: 1,
              duration: 0.4,
            });

            // activate a new animation loop
            animateBattle();
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === `w`) {
    player.moving = true;
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
    player.moving = true;
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
    player.moving = true;
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
    player.moving = true;
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

//###-------------------------------------------------------------------------------##

// nos ifs adicionaremos a movimentação conforme a tecla for pressionada

animate();

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
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

// vamos alterar o status do pressed na nossa chave 'keys'
// vamos precisar de outro evento keyup para voltar a ser falso
