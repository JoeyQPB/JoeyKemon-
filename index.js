// Map Creation

const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

const c = canvas.getContext("2d");

//  levando à criação de um CanvasRenderingContext2D - objeto representando
//    um contexto de renderização bidimensional.

c.fillStyle = `white`;

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
image.src = "./img/JoeyKemon_Map.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

// importando a img para um obj JS
// estamaos criando uma imagem como ojeto para renderiza-la no nosso canvas

// c.drawImage(image, 0, 0);

// O CanvasRenderingContext2D.drawImage()método da API Canvas 2D fornece
// diferentes maneiras de desenhar uma imagem na tela.
// recebe 3 argumentos ( a img, e onde vai ficar posicionada em relação aos eixos: x e y)
// RELACIONADO A IMG DENTRO DA TAG CANVAS
// isso chama a image para a tela

image.onload = () => {
  c.drawImage(image, -550, -650);
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 1.5,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
};

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
// para posiciona-lo no centro utilizamos a largura e a altura do canvas como base
// largura e altura
// são relacionados ao posicionamento da renderização da img na tela
