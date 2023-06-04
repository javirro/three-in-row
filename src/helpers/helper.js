// True if the player who is playing now has moved all the tokens previously.
// False if the player who is playing now has NOT moved all the tokens previously.

// AllTokenUsed in an object formed by player1 and player2. Each of them are arrays with false or true in the tokens positions.
export const verifyIfAllTokensMoved = (turn, allTokenUsed) => {
  return allTokenUsed[turn] < 3
}

export const addNewTokenToMap = (positionInMap, currentPositions, isChosen, turn) => {
  const newPosition = new Map(currentPositions)
  const tokenToMove = isChosen.indexOf(true) + 1
  if (tokenToMove === 0) throw new Error("Must select one token to play with")
  newPosition.set(positionInMap, { player: turn, tokenToMove })
  return newPosition
}

export const moveTokenFromOtherPosition = (currentPositions, isChosen, turn, newPositionForToken) => {
  const tokenToMove = isChosen.indexOf(true) + 1
  if (tokenToMove === 0) throw new Error("Must select one token to play with")
  let positionToRemoveFromMap // First step is to remove the position for the tokenToMove.
  currentPositions.forEach((value, key) => {
    if (value.tokenToMove === tokenToMove && value.player === turn) {
      positionToRemoveFromMap = key
    }
  })
  const newPosition = new Map(currentPositions)
  newPosition.delete(positionToRemoveFromMap)
  newPosition.set(newPositionForToken, { player: turn, tokenToMove })
  return newPosition
}
