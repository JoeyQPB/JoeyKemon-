class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
  }

  draw() {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.globalAlpha = this.opacity;
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    c.restore();

    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

// personalizamos o metodo draw para aceitar qq img, e criamos um paramatreo no
// constructor para receber os frames da img, por padrao ele sera 1
// pq algumas img serao estaticas
// onload p/ quando nossa img estiver disponivel

// no metodo attack teremos qual attack sera feito, o seu dano e quem ira receber
// a animação fara nosso personagem se mover
// o timeline é um recurso usado para saber a ordem das animações

class Monsters extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
  }) {
    super({ position, image, frames, sprites, animate, rotation });
    this.name = name;
    this.isEnemy = isEnemy;
    this.health = 100;
    this.attacks = attacks;
  }

  faint() {
    document.querySelector(".dialogue").innerHTML = this.name + " fainted!";
    gsap.to(this.position, {
      y: this.position.y + 20,
    });
    gsap.to(this, {
      opacity: 0,
    });
    console.log("faint");
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector(".dialogue").style.display = "block";
    document.querySelector(".dialogue").innerHTML =
      this.name + " used " + attack.name;

    let healthBar = ".health-draggle-bar-life";
    if (this.isEnemy) healthBar = ".health-emby-bar-life";

    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;

    recipient.health = this.health - attack.damage;

    switch (attack.name) {
      case "Fireball":
        const FireballImage = new Image();
        FireballImage.src = "./img/fireball.png";
        const Fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: FireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation: rotation,
        });

        renderedSprites.splice(1, 0, Fireball);

        gsap.to(Fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit
            gsap.to(healthBar, {
              width: recipient.health + `%`,
            });

            gsap.to(recipient.position, {
              x: recipient.position.x + 15,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
            renderedSprites.splice(1, 1);
          },
        });

        break;

      case "Tackle":
        const tl = gsap.timeline();

        let movementDistance = 20;
        if (this.isEnemy) movementDistance = -20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.2,
            onComplete: () => {
              // Enemy actually gets hit
              gsap.to(healthBar, {
                width: recipient.health + `%`,
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 15,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;
    }
  }
}

class Boundary {
  static width = 44.4;
  static height = 44.4;
  constructor({ position, width, height }) {
    this.position = position;
    this.width = 35;
    this.height = 25;
  }

  draw() {
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "rgba(255, 0, 0, 0)";
  }
}

// vamos criar obj para nossas fontreiras
// com o static vc cria variaveis estaticas para serem usadas na classe e fora dela

class zonaB {
  static width = 44.4;
  static height = 44.4;
  constructor({ position, width, height }) {
    this.position = position;
    this.width = 44.4;
    this.height = 44.4;
  }

  draw() {
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "rgba(255, 0, 0, 0.4)";
  }
}

// vamos criar obj para nossas fontreiras
// com o static vc cria variaveis estaticas para serem usadas na classe e fora dela
