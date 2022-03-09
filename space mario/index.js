// import platform from "./img/platform.png"
const platfom = document.querySelector("#platform");
const platfomSmallTall = document.querySelector("#smallplatform");
const hills = document.querySelector("#hills");
const spriteRunLeft = document.querySelector("#spriteRunLeft");
const spriteRunRight = document.querySelector("#spriteRunRight");
const spriteStandLeft = document.querySelector("#spriteStandLeft");
const spriteStandRight = document.querySelector("#spriteStandRight");
const background = document.querySelector("#backgroud");

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

var gravity = 0.8;
// class Player {
//   constructor() {
//     this.speed = 10;
//     this.position = {
//       x: 100,
//       y: 100,
//     };
//     this.velocity = {
//       x: 0,
//       y: 0,
//     };
//     this.width = 30;
//     this.height = 30;
//   }

//   draw() {
//     c.fillStyle = "red";
//     c.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }

//   update() {
//     this.draw();
//     this.position.y += this.velocity.y;
//     this.position.x += this.velocity.x;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height) {
//       this.velocity.y += gravity;
//     // } else {
//     //   this.velocity.y = 0;
//     }
//   }
// }

// class Platform {
//   constructor({ x, y, image }) {
//     this.position = {
//       x,
//       y,
//     };
//     this.image = image;
//     this.width = image.width;
//     this.height = 20;
//   }

//   draw() {
//     // c.fillStyle = "blue";
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height);
//     c.drawImage(this.image, this.position.x, this.position.y);
//   }
// }

// class GenericObject {
//   constructor({ x, y, image }) {
//     this.position = {
//       x,
//       y,
//     };
//     this.image = image;
//     this.width = image.width;
//     this.height = 20;
//   }

//   draw() {
//     // c.fillStyle = "blue";
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height);
//     c.drawImage(this.image, this.position.x, this.position.y);
//   }
// }

var genericObjects = [
  // new GenericObject({ x: -1, y: -1, image:background }),
  // new GenericObject({ x: -1, y: -1, image:hills }),
];

// var player = new Player();
var platforms = [
  // new Platform({ x: -1, y: 470, image:platfom }),
  // new Platform({ x: platfom.width-2, y: 470, image:platfom }),
  // new Platform({ x: platfom.width * 2 + 100, y: 470, image:platfom }),
];
let lastKey;
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrolOffset = 0;

function init() {
  var gravity = 0.8;
  class Player {
    constructor() {
      this.image = spriteStandRight;
      this.speed = 10;
      this.position = {
        x: 100,
        y: 100,
      };
      this.velocity = {
        x: 0,
        y: 0,
      };
      this.width = 66;
      this.height = 150;
      this.frames = 0;
      this.sprites = {
        stand: {
          right: spriteStandRight,
          left: spriteStandLeft,
          cropWidth: 177,
          width: 66
        },
        run: {
          right: spriteRunRight,
          left: spriteRunLeft,
          cropWidth: 341,
          width: 127.875
        },
      };

      this.currentSprite = this.sprites.stand.right;
      this.currentCropWidth = 177;
    }

    draw() {
      //  c.fillStyle = "red";
      //  c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.drawImage(
        this.currentSprite,
        this.currentCropWidth * this.frames,
        0,
        this.currentCropWidth,
        400,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }

    update() {
      this.frames++;
      console.log(this.frames)
      if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right) || this.currentSprite === this.sprites.stand.left) {
        this.frames = 0;
      }else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right) || this.currentSprite === this.sprites.run.left) {
        this.frames = 0;
      }

      this.draw();
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;

      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity;
        // } else {
        //   this.velocity.y = 0;
      }
    }
  }

  class Platform {
    constructor({ x, y, image }) {
      this.position = {
        x,
        y,
      };
      this.image = image;
      this.width = image.width;
      this.height = 20;
    }

    draw() {
      // c.fillStyle = "blue";
      // c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  class GenericObject {
    constructor({ x, y, image }) {
      this.position = {
        x,
        y,
      };
      this.image = image;
      this.width = image.width;
      this.height = 20;
    }

    draw() {
      // c.fillStyle = "blue";
      // c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: background }),
    new GenericObject({ x: -1, y: -1, image: hills }),
  ];

  player = new Player();
  platforms = [
    new Platform({ x: -1, y: 470, image: platfom }),
    new Platform({ x: platfom.width - 2, y: 470, image: platfom }),
    new Platform({ x: platfom.width * 2 + 100, y: 470, image: platfom }),
    new Platform({ x: platfom.width * 3 + 100, y: 470, image: platfom }),
    new Platform({ x: platfom.width * 4 + 100, y: 470, image: platfom }),
    new Platform({
      x: platfom.width * 4 + 100,
      y: 470,
      image: platfomSmallTall,
    }),
  ];

  // const keys = {
  //   right: {
  //     pressed: false,
  //   },
  //   left: {
  //     pressed: false,
  //   },
  // };

  let scrolOffset = 0;
}
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  //platfom collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // move player and platforms
  // ||
  // (keys.left.pressed && scrolOffset === 0)

  if (
    (keys.left.pressed)  && (player.position.x > 100)
  ) {
    player.velocity.x = -player.speed;
  } else if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrolOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
      
    } else if (keys.left.pressed && scrolOffset > 0) {
      scrolOffset -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

// sprite switching

  if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if(keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;

  }else if(!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left ) {
     player.currentSprite = player.sprites.stand.left;
     player.currentCropWidth = player.sprites.stand.cropWidth;
     player.width = player.sprites.stand.width;
 
  }else if(!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;

  }

  //  win condition
  if (scrolOffset > platfom.width * 5 * 300 - 2) {
    console.log("you Win");
  }

  //loss condition
  if (player.position.y > canvas.height) {
    init();
  }
}
init();
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
    case "ArrowLeft":
      keys.left.pressed = true;
      lastKey = 'left'
      
      break;
    case "d":
    case "ArrowRight":
      keys.right.pressed = true;
      lastKey = 'right';

      break;
    case "w":
    case "ArrowUp":
      player.velocity.y -= 5;
      break;
    default:
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
    case "ArrowLeft":
      keys.left.pressed = false;
      break;
    case "d":
    case "ArrowRight":
      keys.right.pressed = false;
    
      break;
    case "w":
    case "ArrowUp":
      // player.velocity.y -= 20;
      break;
    default:
      break;
  }
});
