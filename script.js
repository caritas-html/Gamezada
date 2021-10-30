const gameBox = document.getElementById("game__box")
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const generateMap = (lines, columns) => {
  let twoDimensionMap = []
  let rowWidth = 40 * columns
  let columnWidth = 40 * lines
  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      if (j === columns - 1) {
        twoDimensionMap.push([j])
        let limitWall = document.createElement("div")
        limitWall.className = "limit__wall"
        gameBox.style.width = `${rowWidth}px`

        canvas.style.width = `${rowWidth}px`
        canvas.style.height = `${columnWidth}px`

        gameBox.appendChild(limitWall)
      } else {
        twoDimensionMap.push([j])
        let path = document.createElement("div")
        path.className = "path"
        let pathId = `${[i]}__${[j]}`
        path.classList.add(pathId)
        gameBox.appendChild(path)
      }
    }
  }
  return twoDimensionMap
};
generateMap(20, 40);

// classe character //
class Character {
  constructor(frameWidth, frameHeigth, scale, fps, xPos, yPos, eachFrame, speed) {
    this.frameWidth = frameWidth,
    this.frameHeigth = frameHeigth,
    this.scale = scale,
    this.fps = fps
    this.secondsToUpdate = 1 * fps,
    this.xPos = xPos,
    this.yPos = yPos,
    this.eachFrame = eachFrame
    this.speed = speed
  }
}
const player = new Character(64, 100, 1.6, 60, 4, 3, 0, 10)
const demon = new Character(80, 80, 1.6, 60, 200, 0, 0, 2)
 // 

 // declarando imagens //
const playerImage = new Image()
playerImage.src = "assets/player.png"

const playerMoves = new Image()
playerMoves.src = "assets/character.png"

const demonImage = new Image()
demonImage.src = "assets/demonio.png"
//

// Sprites //
const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

//
// função animate //

const animate = () => {
  context.drawImage(
    playerImage,
    player.eachFrame,
    0,
    player.frameWidth,
    player.frameHeigth,
    player.xPos,
    player.yPos,
    player.frameWidth /  player.scale,
    player.frameHeigth / player.scale
  )
  
  context.drawImage(
    demonImage,
    demon.eachFrame,
    0,
    demon.frameWidth,
    demon.frameHeigth,
    demon.xPos,
    demon.yPos,
    demon.frameWidth / demon.scale,
    demon.frameHeigth / demon.scale
  )
  
  // context.drawImage(
  //   playerMoves,
  //   0,
  //   0,
  //   64, // 1536 / 21 = cálculo baseado na sprite "character.png"
  //   100, // 2112 / 33 = cálculo baseado na sprite "character.png"
  //   0,
  //   11,
  //   player.frameWidth *  player.scale,
  //   player.frameHeigth * player.scale
  // )
}

const frame = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  animate()
  requestAnimationFrame(frame)
}
frame()

//

// Movimentos //
const moves = {
  WalkDown: () => {
    player.eachFrame = 2 * player.frameWidth
    player.yPos += 10
    if (player.yPos > canvas.height - 0.5 * player.frameWidth) {
      player.yPos -= player.speed
    }
    
    animate()
  },
  walkUp: () => {
    player.eachFrame = 0 * player.frameWidth
    player.yPos -= 10
    if (player.yPos < -10) {
      player.yPos += player.speed
    }

    animate() 
  },
  walkLeft: () => {
    player.eachFrame = 1 * player.frameWidth
    player.xPos -= 10
    if (player.xPos < -17) {
      player.xPos += player.speed
    }

    animate()
  },
  walkRight: () => {
    player.eachFrame = 3 * player.frameWidth
    player.xPos += 10
    if (player.xPos > canvas.width - 0.5 * player.frameWidth) {
      player.xPos -= player.speed
    }

    animate()
  }

}
//

// event listeners //
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    moves.WalkDown(e)
  } else if (e.key === "ArrowUp") {
    moves.walkUp(e)
  } else if (e.key === "ArrowLeft") {
    moves.walkLeft(e)
  } else if (e.key === "ArrowRight") {
    moves.walkRight(e)
  }
})
//
