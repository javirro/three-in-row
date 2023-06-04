import { useEffect, useState } from "react"
import Card from "../components/Card"
import CONSTANT from "../constants"
import WinModal from "../components/WinModal"
import calculateWinner from "../helpers/calculateWinner"
import ErrorModal from "../components/ErrorModal"
import "../styles/main.css"

/*
positions Map formed with:   // key: Position in the MAP (1 - 9)  // Value: Object { player, tokenToMove (1-3)}
isChosen: used to select what of the tokens (1, 2, 3) is used to each user. Chosen token is set as true.
allTokenUsed: is an object which increase it values in each turn. When each value is >= 3 means that the users have moved the 3 tokens.
winner: saves the winner for the game.
showError: if it is undefined there is not error. In case of error, we store in that state the value.
*/

const Main = () => {
  const [turn, setTurn] = useState(CONSTANT.player1)
  const [isChosen, setIsChosen] = useState([false, false, false])
  const [allTokenUsed, setAllTokenUsed] = useState({ player1: 0, player2: 0 })
  const [positions, setPositions] = useState(new Map())
  const [winner, setWinner] = useState(undefined)
  const [showError, setShowError] = useState(undefined)

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const chooseOne = number => {
    const newChosen = [false, false, false]
    newChosen[number - 1] = true
    setIsChosen(newChosen)
  }

  useEffect(() => {
    setIsChosen([false, false, false])
  }, [turn])

  useEffect(() => {
    const result = calculateWinner(positions)
    if (result) setWinner(result)
    setTurn(s => (s === CONSTANT.player1 ? CONSTANT.player2 : CONSTANT.player1))
  }, [positions])

  return (
    <>
      <h1>
        Turn -<span className={`${turn === CONSTANT.player1 ? "red" : "blue"}`}> {turn} </span>
      </h1>
      <main className="flex-container">
        {winner && <WinModal winner={winner} setWinner={setWinner} setPositions={setPositions} setAllTokenUsed={setAllTokenUsed} />}
        {showError && <ErrorModal player={turn} error={showError} setShowError={setShowError} />}
        <aside className="player">
          <h2>Player 1</h2>
          <button
            className={`card-button left ${isChosen[0] ? "chosen" : ""} `}
            onClick={() => chooseOne(1)}
            disabled={turn !== CONSTANT.player1 || (allTokenUsed[CONSTANT.player1] > 0 && allTokenUsed[CONSTANT.player1] < 3)}
          >
            1
          </button>

          {allTokenUsed[CONSTANT.player1] > 0 && (
            <button
              className={`card-button left ${isChosen[1] ? "chosen" : ""} `}
              onClick={() => chooseOne(2)}
              disabled={turn !== CONSTANT.player1 || (allTokenUsed[CONSTANT.player1] > 1 && allTokenUsed[CONSTANT.player1] < 3)}
            >
              2
            </button>
          )}

          {allTokenUsed[CONSTANT.player1] > 1 && (
            <button className={`card-button left ${isChosen[2] ? "chosen" : ""} `} onClick={() => chooseOne(3)} disabled={turn !== CONSTANT.player1}>
              3
            </button>
          )}
        </aside>

        <section className="main-container">
          {buttons.map(number => (
            <Card
              key={number}
              tokenPositionNumber={number}
              turn={turn}
              isChosen={isChosen}
              allTokenUsed={allTokenUsed}
              setAllTokenUsed={setAllTokenUsed}
              positions={positions}
              setPositions={setPositions}
              setShowError={setShowError}
            />
          ))}
        </section>

        <aside className="player">
          <h2>Player 2</h2>
          <button
            className={`card-button right ${isChosen[0] ? "chosen" : ""} `}
            onClick={() => chooseOne(1)}
            disabled={turn !== CONSTANT.player2 || (allTokenUsed[CONSTANT.player2] > 0 && allTokenUsed[CONSTANT.player2] < 3)}
          >
            1
          </button>

          {allTokenUsed[CONSTANT.player2] > 0 && (
            <button
              className={`card-button right ${isChosen[1] ? "chosen" : ""} `}
              onClick={() => chooseOne(2)}
              disabled={turn !== CONSTANT.player2 || (allTokenUsed[CONSTANT.player2] > 1 && allTokenUsed[CONSTANT.player2] < 3)}
            >
              2
            </button>
          )}

          {allTokenUsed[CONSTANT.player2] > 1 && (
            <button className={`card-button right ${isChosen[2] ? "chosen" : ""} `} onClick={() => chooseOne(3)} disabled={turn !== CONSTANT.player2}>
              3
            </button>
          )}
        </aside>
      </main>
    </>
  )
}

export default Main
