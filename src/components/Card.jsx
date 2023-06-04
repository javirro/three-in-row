
import { verifyIfAllTokensMoved, addNewTokenToMap, moveTokenFromOtherPosition } from "../helpers/helper"
import { OccupiedError } from "../Errors/CustomizeError"
import CONSTANT from "../constants"
import "../styles/card.css"

// One of this component for each of the 9 table buttons.
const Card = ({ tokenPositionNumber, turn, isChosen, allTokenUsed, setAllTokenUsed, positions, setPositions, setShowError }) => {
  const move = tokenPositionNumber => {
    try {
      if (!positions.has(tokenPositionNumber)) {
        // This position in MAP is still empty
        if (verifyIfAllTokensMoved(turn, allTokenUsed)) {
          const newPositions = addNewTokenToMap(tokenPositionNumber, positions, isChosen, turn)
          setPositions(newPositions)
        } else {
          const newPositions = moveTokenFromOtherPosition(positions, isChosen, turn, tokenPositionNumber)
          setPositions(newPositions)
        }
      } else throw new OccupiedError("This field in the table is ocuppied.")

      setAllTokenUsed(s => ({ ...s, [turn]: s[turn] + 1 }))

    } catch (error) {
      setShowError(error)
    }

  }

  // Returns the correct claseName for Table button to show what players has put their tokens in a specific position.
  const getClassName = () => {
    if (positions.has(tokenPositionNumber)) {
      const player = positions.get(tokenPositionNumber).player
      if (player === CONSTANT.player1) return "card-button left"
      else if (player === CONSTANT.player2) return "card-button right"
      else return "card-button"
    } else return "card-button"
  }

  return (
    <>
    <button key={tokenPositionNumber} className={getClassName()} onClick={() => move(tokenPositionNumber)}>
      {positions.has(tokenPositionNumber) ? positions.get(tokenPositionNumber).tokenToMove : "X"}
    </button>
    </>
  )
}

export default Card
