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

const frameWidth = 64
const frameHeigth = 100
const scale = 1
const fps = 60
const secondsToUpdate = 1 * fps
let xPos = 4
let yPos = 3
let eachFrame = 0

const spriteSheet = new Image()
spriteSheet.src = "assets/walk.png"

const animate = () => {
  context.drawImage(
    spriteSheet,
    eachFrame,
    0,
    frameWidth,
    frameHeigth,
    xPos,
    yPos,
    frameWidth * scale,
    frameHeigth * scale
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
    eachFrame = 2 * frameWidth
    yPos += 10
    animate()
  },
  walkUp: () => {
    eachFrame = 0 * frameWidth
    yPos -= 10
    animate() 
  },
  walkLeft: () => {
    eachFrame = 1 * frameWidth
    xPos -= 10
    animate()
  },
  walkRight: () => {
    eachFrame = 3 * frameWidth
    xPos += 10
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

