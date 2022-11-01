// Map Creation

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// contruindo um loop para pegar sub array do nosso array collision
// vamos pegar de 70 e 70 -> pq nosso mapa tem 70 BLOCOS DE LARGURA por 40 de altura
// vamos usar o slice para pegar o sub array

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

// vamos criar obj para nossas fontreiras
// com o static vc cria variaveis estaticas para serem usadas na classe e fora dela

class Boundary {
  static width = 44.4;
  static height = 44.4;
  constructor({ position, width, height }) {
    this.position = position;
    this.width = 44.4;
    this.height = 44.4;
  }

  draw() {
    c.fillStyle = `red`;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2049)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
        })
      );
  });
});

console.log(boundaries);

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

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: -550,
    y: -650,
  },
  image: image,
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

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 1.75,
    canvas.height / 2 - playerImage.height,
    playerImage.width / 4,
    playerImage.height
  );

  if (keys.w.pressed && lastKey === `w`) background.position.y += 3;
  else if (keys.a.pressed && lastKey === `a`) background.position.x += 3;
  else if (keys.s.pressed && lastKey === `s`) background.position.y -= 3;
  else if (keys.d.pressed && lastKey === `d`) background.position.x -= 3;
}

// nos ifs adicionaremos a movimentação conforme a tecla for pressionada

animate();
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
