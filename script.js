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

class Character {
  constructor(frameWidth, frameHeigth, scale, fps, xPos, yPos, eachFrame) {
    this.frameWidth = frameWidth,
    this.frameHeigth = frameHeigth,
    this.scale = scale,
    this.fps = fps
    this.secondsToUpdate = 1 * fps,
    this.xPos = xPos,
    this.yPos = yPos,
    this.eachFrame = eachFrame
  }
}
const player = new Character(64, 100, 1, 60, 4, 3, 0)
const demon = new Character(80, 80, 1, 60, 200, 0, 0)

const playerImage = new Image()
playerImage.src = "assets/player.png"

const demonImage = new Image()
demonImage.src = "assets/demonio.png"
  


const animate = () => {
  context.drawImage(
    playerImage,
    player.eachFrame,
    0,
    player.frameWidth,
    player.frameHeigth,
    player.xPos,
    player.yPos,
    player.frameWidth *  player.scale,
    player.frameHeigth * player.scale
  )
  context.drawImage(
    demonImage,
    demon.eachFrame,
    0,
    demon.frameWidth,
    demon.frameHeigth,
    demon.xPos,
    demon.yPos,
    demon.frameWidth * demon.scale,
    demon.frameHeigth * demon.scale
  )
}

const frame = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  animate()
  requestAnimationFrame(frame)
}
frame()

const moves = {
  WalkDown: () => {
    player.eachFrame = 2 * player.frameWidth
    player.yPos += 10
    if (player.yPos === demon.yPos) {
      console.log("oi")
    }
    
    animate()
  },
  walkUp: () => {
    player.eachFrame = 0 * player.frameWidth
    player.yPos -= 10
    animate() 
  },
  walkLeft: () => {
    player.eachFrame = 1 * player.frameWidth
    player.xPos -= 10
    animate()
  },
  walkRight: () => {
    player.eachFrame = 3 * player.frameWidth
    player.xPos += 10
    animate()
  }

}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    moves.WalkDown()
  } else if (e.key === "ArrowUp") {
    moves.walkUp()
  } else if (e.key === "ArrowLeft") {
    moves.walkLeft()
  } else if (e.key === "ArrowRight") {
    moves.walkRight()
  }
})

