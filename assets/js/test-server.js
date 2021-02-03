function generateMap() {
  const maxX = 1000 - 1
  const maxY = 800 - 1
  const result = []
  for(let i = 0; i <= maxX; i++) {
    for(let j = 0; j <= maxY; j++) {
      const value = generateValue(j, i)
      result[j] = result[j] || []
      result[j][i] = value
    }
  }
  return result
 }
 
 function generateValue(row, col) {
  if (
    (row == 83) &&
    (col == 116)
   ) {
     return { type: "player", name: "One", color: "green" }
   }

   if (
    (row == 83) &&
    (col == 126)
   ) {
     return { type: "player", name: "Two", color: "green" }
   }

   if (
    (row == 83) &&
    (col == 136)
   ) {
     return { type: "player", name: "Three", color: "green" }
   }

   if(row <= 4 || row >= 155) return { type: "wall" }
   if(col <= 4 || col >= 195) return { type: "wall" }
 
   if (
     (row >= 70 && row <= 90) &&
     (col >= 90 && col <= 110)
   ) return { type: "wall" }

   if (
    (row >= 79 && row <= 81) &&
    (col > 110 && col < 195)
   ) return { type: "line" }



   return {type: "background"}
 }

 function generateServerSetupResponse() {
  return {
    map: generateMap()
  }
 }

 module.exports = {
  generateServerSetupResponse
 }