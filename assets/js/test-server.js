const tileSize = 5

function generateMap() {
  const maxX = 1000 / tileSize
  const maxY = 800 / tileSize

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
   if(row <= 4 || row >= 155) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black" }
   if(col <= 4 || col >= 195) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black"}
 
   if (
     (row >= 70 && row <= 90) &&
     (col >= 90 && col <= 110)
   ) return { type: "wall", position: {x: col * tileSize, y: row * tileSize}, color: "black"  }

   if (
    (row >= 79 && row <= 81) &&
    (col > 110 && col < 195)
   ) return { type: "line", position: {x: col * tileSize, y: row * tileSize}, color: "blue" }



   return {type: "background", position: {x: col * tileSize, y: row * tileSize}, color: "white" }
 }

 function generateServerSetupResponse() {
  return generateMap()
 }

 let test = 0
 function generateServerUpdateResponse() {
   test ++
   if (test > 100) return []
  return [
    { type: "player", id: 1, color: "green", position: {x: 120 * tileSize, y: (85-test) * tileSize}},
    { type: "player", id: 2, color: "orange", position: {x: 130 * tileSize , y: (85-test) * tileSize}},    
    { type: "player", id: 3, color: "red", position: {x: 140 *  tileSize, y: (85-test) * tileSize}},
  ]
 }

 module.exports = {
  generateServerSetupResponse,
  generateServerUpdateResponse
 }