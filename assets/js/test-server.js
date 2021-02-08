const tileSize = 1
const maxX = 1000 / tileSize
const maxY = 800 / tileSize

function generateMap() {
  

  const result = {}
  for(let i = 0; i <= maxX; i++) {
    for(let j = 0; j <= maxY; j++) {
      result[i] = result[i] || {}
      result[i][j] = generateValue(j, i)
    }
  }
  return result
 }
 
 function generateValue(row, col) {
   if(row <= maxY * 0.05 || row >= maxY * 0.95) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black" }
   if(col <= maxX*0.05 || col >= maxX*0.95 ) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black"}
 
   if (
     (row >= maxY * 0.40 && row <= maxY * 0.60) &&
     (col >= maxX * 0.40 && col <= maxX * 0.60)
   ) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black"  }

   if (
    (row >= maxY * 0.48 && row <= maxY * 0.50) &&
    (col > maxX * 0.60 && col < maxX * 0.95)
   ) return { type: "line", position: {x: col * tileSize, y: row * tileSize}, color: "blue" }



   return {type: "background", position: {x: col * tileSize, y: row * tileSize}, color: "white" }
 }

 function generateServerSetupResponse() {
  return generateMap()
 }

 let test = 0
 function generateServerUpdateResponse() {
  if (test > 999) return []
  test++
  return [
    { type: "player", id: 1, color: "green", position: {x: maxX * 0.65 * tileSize, y: (maxY * 0.51 - test * 5) * tileSize}, rotation: test * 10},
    { type: "player", id: 2, color: "orange", position: {x: maxX * 0.70 * tileSize, y: (maxY * 0.51 - test * 7) * tileSize}, rotation: test * 10},    
    { type: "player", id: 3, color: "red", position: {x: maxX * 0.75 * tileSize, y: (maxY * 0.51 - test * 10) * tileSize}, rotation: test * 10},
    { type: "shoot", id: 1, color: "green", position: {x: maxX * 0.65 * tileSize, y: (maxY * 0.51 - test) * tileSize}, rotation: test * 10},
  ]
 }

 module.exports = {
  generateServerSetupResponse,
  generateServerUpdateResponse
 }