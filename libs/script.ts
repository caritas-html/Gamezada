import * as Sprites from './assets'

const gameBox = document.getElementById("game__box")
const canvas = document.getElementById("canvas") as HTMLCanvasElement

const { drawImage, clearRect } = canvas.getContext("2d")

type Dimensions = Map<'rows' | 'columns', number>
type Rows = number
type Columns = number

type T2DMap = any[]

interface ITileMap {
  dimensions: Dimensions
}

interface ISceneConfig {
  matrix: T2DMap
}

const useDimensions = (dimensionsMap: Dimensions): [Rows, Columns] => {
  const { get } = dimensionsMap
  
  return [get('rows'), get('columns')]
}

type TRenderFunction = (config: ISceneConfig) => void
const buildSceneMatrix = (dimensions: Dimensions, render: TRenderFunction) => {
  const [rows, columns] = useDimensions(dimensions)

  let matrix = []
  

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      render({
        matrix
      })
    }
  }
}

const buildSceneLayer: (o: ITileMap) => void = (options) => {
  let matrix = []

  for (let row = 0; row < options.dimensions.get('rows'); row++) {
    for (let column = 0; column < options.dimensions.get('columns'); column++) {

    }
  }
}

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
spriteSheet.src = Sprites.Walk

const animate = () => {
  drawImage(
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
  clearRect(0, 0, canvas.width, canvas.height);
  animate()
  requestAnimationFrame(frame)
}

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

const listenInputs = () => {
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
}

export const initGame = () => {
  frame()
  listenInputs()
}

