import CONSTANT from "../constants"

const calculateWinner = positions => {
  const matrixCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const horizontal = horinzontalCombination(positions, matrixCombinations)
  if (horizontal) return horizontal
  const invertedMatrix = invertColumsToRows(matrixCombinations)
  const vertical = horinzontalCombination(positions, invertedMatrix)
  if (vertical) return vertical
  const diagonal = horinzontalCombination(positions, getDiagonals(matrixCombinations))
  if (diagonal) return diagonal
  return undefined
}

// Returns the winner (player1/player2) or undefined in case nobody satisfies the condition.
const horinzontalCombination = (positions, matrixCombinations) => {
  let players = []
  let winner
  matrixCombinations.forEach(horizontal => {
    for (const i of horizontal) {
      const value = positions.get(i)
      players.push(value ? value.player : undefined)
    }
    if (players.every(player => player === CONSTANT.player1)) winner = CONSTANT.player1
    else if (players.every(player => player === CONSTANT.player2)) winner = CONSTANT.player2
    else if (!winner) {
      winner = undefined
      players = []
    }
    players = []
  })
  return winner
}

// Permit obtain the columns as rows
const invertColumsToRows = matrixCombinations => {
  const itemsNumber = matrixCombinations.length
  const newCombinations = []
  for (let i = 0; i < itemsNumber; i++) {
    newCombinations.push([])
  }
  matrixCombinations.forEach(row => {
    row.forEach((number, index) => {
      newCombinations[index].push(number)
    })
  })
  return newCombinations
}

// Permit obtain both diagonals as rows.
const getDiagonals = matrixCombinations => {
  const mainDiagonal = matrixCombinations.map((row, i) => row[i])
  const inverseDiagonal = matrixCombinations.map((row, i) => row[row.length - 1 - i])
  return [mainDiagonal, inverseDiagonal]
}
export default calculateWinner
