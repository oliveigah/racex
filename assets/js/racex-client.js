import {generateServerSetupResponse, generateServerUpdateResponse} from './test-server'

var canvas, ctx, gridXSize, gridYSize

const baseMap = {} 

let gameState = {}

const playersPositions = {}

const tileSize = 5

// WINDOW LOAD
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  gridXSize = (canvas.width / tileSize)
  gridYSize = (canvas.height / tileSize)

  document.addEventListener("keydown", keyDownEvent);
  renderInitialState()

  var x = 1;
  setInterval(renderServerUpdates, 1000 / x);
};

// HANDLE PLAYER INPUT
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}

function updatePlayerPosition(newX, newY, player) {
  const {x: oldX, y: oldY} = playersPositions[player.id]

  for (let i = - 3; i <= 3; i++ ) {
    for (let j = - 3; j <=  3; j++){
      const xToClean = oldX + i * tileSize
      const yToClean = oldY + j * tileSize
      const basePixel = baseMap[xToClean][yToClean]
      if (basePixel) drawPixel(basePixel)
    }
  }

  playersPositions[player.id] = {x: newX, y: newY}
}

function drawPlayer(x,y, player) {

  if (playersPositions[player.id]) updatePlayerPosition(x,y,player)
  else playersPositions[player.id] = {x, y}

  ctx.beginPath()
  ctx.moveTo(x, y);
  ctx.lineTo(x-3*tileSize, y+3*tileSize);
  ctx.lineTo(x+3*tileSize, y+3*tileSize);
  ctx.closePath();

  ctx.fillStyle = player.color
  ctx.fill();


}

function drawWall(x, y, wall) {
  ctx.fillStyle = wall.color
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawLine(x, y, line) {
  ctx.fillStyle = line.color
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawBackground(x, y, bg) {
  ctx.fillStyle = bg.color
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawPixelSetup(value) {
  const x = value.position.x
  const y = value.position.y 

  baseMap[x] = baseMap[x] || {}
  baseMap[x][y] = value

  gameState[x] = gameState[x] || {}
  gameState[x][y] = value

  switch (value.type) {
    case "wall": drawWall(x, y, value); break;
    case "line": drawLine(x, y, value); break;
    case "player": drawPlayer(x, y, value); break;
    case "background": drawBackground(x, y, value); break;
    default: break;
  }
}

function drawPixel(value) {
  const x = value.position.x 
  const y = value.position.y
  switch (value.type) {
    case "wall": drawWall(x, y, value); break;
    case "line": drawLine(x, y, value); break;
    case "player": drawPlayer(x, y, value); break;
    case "background": drawBackground(x, y, value); break;
    default: break;
  }
}

function renderInitialState() {
  const serverResponse = generateServerSetupResponse()
  Object.keys(serverResponse).forEach(x => {
    Object.keys(serverResponse[x]).forEach(y =>{
      drawPixelSetup(serverResponse[x][y])
    })
  })
}

function renderServerUpdates() {
  const serverResponse = generateServerUpdateResponse()

  serverResponse.forEach(updatePixel => {
    drawPixel(updatePixel)
  })
}