
import { verifyIfAllTokensMoved, addNewTokenToMap, moveTokenFromOtherPosition } from '../helpers/helper'
import '../styles/card.css'

const Card = ({ tokenPositionNumber, turn, setTurn, isChosen, allTokenUsed, setAllTokenUsed, positions, setPositions }) => {
  // Mpa formed with:
  // key: Position in the MAP (1 - 9)
  // Value: Object { player, tokenToMove (1-3)}

  const move = (tokenPositionNumber) => {

    if (!positions.has(tokenPositionNumber)) { // This position in MAP is still empty
      if (verifyIfAllTokensMoved(turn, allTokenUsed)) {
        const newPositions = addNewTokenToMap(tokenPositionNumber, positions, isChosen, turn)
        setPositions(newPositions)
      } else {
        const newPositions = moveTokenFromOtherPosition(positions, isChosen, turn, tokenPositionNumber)
        setPositions(newPositions)
      }
    } else throw new Error('This field in the table is ocuppied.')

    setAllTokenUsed( s=> ({...s, [turn]: s[turn] +1}))
    setTurn(turn === "player1" ? "player2" : "player1")
  }

  const getClassName = () => {
    if (positions.has(tokenPositionNumber)) {
      const player = positions.get(tokenPositionNumber).player
      if (player === "player1") return "card-button left"
      else if (player === "player2") return "card-button right"
      else return "card-button"
    } else return "card-button"
  }

  return (
    <button
      key={tokenPositionNumber}
      className={getClassName()}
      onClick={() => move(tokenPositionNumber)}>
      {positions.has(tokenPositionNumber)
        ? positions.get(tokenPositionNumber).tokenToMove
        : "X"}</button>)
}

export default Card