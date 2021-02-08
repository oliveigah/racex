import {generateServerSetupResponse, generateServerUpdateResponse} from './test-server'

var canvas, ctx

const baseMap = {} 

let gameState = {}

const playersPositions = {}

const tileSize = 1

// WINDOW LOAD
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  renderInitialState()

  var x = 30;
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
  const {x: oldX, y: oldY, rotation: oldRotation} = playersPositions[player.id]

  for (let i = - 22; i <= 22; i++ ) {
    for (let j = - 22; j <=  22; j++){
      const xToClean = oldX + i * tileSize
      const yToClean = oldY + j * tileSize
      const basePixel = baseMap[xToClean][yToClean]
      if (basePixel) drawPixel(basePixel)
    }
  }

  playersPositions[player.id] = {x: newX, y: newY}
}

function rotate(x,y,sin,cos, centerX, centerY) {
  return {
    x: cos * (x - centerX) - sin * -1 * (y - centerY) + centerX,
    y: sin * -1 * (x - centerX) + cos * (y - centerY) + centerY
  }
}
function drawPlayer(x,y, player) {

  if (playersPositions[player.id]) updatePlayerPosition(x,y,player)
  else playersPositions[player.id] = {x, y}
  
  const radian =Math.PI /(180/ player.rotation)

  const sin = Math.sin(radian);
  const cos = Math.cos(radian);

  const x1 = x
  const x2 = x-15
  const x3 = x+15

  const y1 = y
  const y2 = y + 15
  const y3 = y + 15 

  const {x: finalX1, y: finalY1} = rotate(x1, y1, sin, cos, x1, y1)
  const {x: finalX2, y: finalY2} = rotate(x2, y2, sin, cos, x1, y1) 
  const {x: finalX3, y: finalY3} = rotate(x3, y3, sin, cos, x1, y1) 

  // console.log({finalX1, finalY1})
  ctx.beginPath()
  ctx.moveTo(finalX1, finalY1);
  ctx.lineTo(finalX2 *tileSize, finalY2 * tileSize);
  ctx.lineTo(finalX3 *tileSize, finalY3 * tileSize);
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

function drawShoot(x,y,shoot) {
  ctx.fillStyle = shoot.color
  ctx.fillRect(x, y, tileSize, tileSize);
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
    case "shoot": drawShoot(x, y, value); break;
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