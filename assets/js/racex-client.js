import {generateServerSetupResponse} from './test-server'

var canvas, ctx, gridXSize, gridYSize;

const tileSize = 5

// WINDOW LOAD
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  gridXSize = (canvas.width / tileSize)
  gridYSize = (canvas.height / tileSize)

  document.addEventListener("keydown", keyDownEvent);
  renderInitialState()

  var x = 30;
  setInterval(renderServerUpdates(), 1000 / x);
};

// HANDLE PLAYER INPUT
function keyDownEvent(e) {
  console.log("AAAAA")
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

// RENDER GAME WORLD

 function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.heigth);
}


function drawPlayer(x,y, player) {
  ctx.moveTo(x, y);
  ctx.lineTo(x-15, y+15);
  ctx.lineTo(x+15, y+15);
  ctx.closePath();


  ctx.lineWidth = 1;
  ctx.strokeStyle = player.color;
  ctx.stroke();

  ctx.fillStyle = player.color

  ctx.font = "15px Arial";
  ctx.fillText(player.name, x-15, y + 30);
  
  ctx.fillStyle = player.color
  ctx.fill();
}

function drawWall(x, y) {
  ctx.fillStyle = "black"
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawLine(x, y) {
  ctx.fillStyle = "blue"
  ctx.fillRect(x, y, tileSize, tileSize);
}

function drawMap(mapMatrix) {
  mapMatrix.forEach((rowArray, indexRow) => {
    rowArray.forEach((columnValue, indexColumn) => {
      const x = indexColumn * tileSize
      const y = indexRow * tileSize
      switch (columnValue.type) {
        case "wall": drawWall(x, y); break;
        case "line": drawLine(x, y); break;
        case "player": drawPlayer(x, y, columnValue); break;
        default: break;
      }
    })
  })
}

function renderInitialState(serverResponse) {
  serverResponse = generateServerSetupResponse()
  
  drawBackground()
  drawMap(serverResponse.map)
}

function renderServerUpdates(serverResponse) {
  serverResponse = generateServerSetupResponse()
  
  drawBackground()
  drawMap(serverResponse.map)
}