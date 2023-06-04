import { useEffect, useState } from "react"
import Card from "../components/Card"
import CONSTANT from "../constants"
import "../styles/main.css"
import WinModal from "../components/WinModal"
import calculateWinner from "../helpers/calculateWinner"

const Main = () => {
  const [turn, setTurn] = useState(CONSTANT.player1)
  const [isChosen, setIsChosen] = useState([false, false, false])
  const [allTokenUsed, setAllTokenUsed] = useState({ player1: 0, player2: 0 })
  const [positions, setPositions] = useState(new Map())
  const [winner, setWinner] = useState(undefined)
  // Map formed with:
  // key: Position in the MAP (1 - 9)
  // Value: Object { player, tokenToMove (1-3)}

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const chooseOne = (number) => {
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
  }, [positions])

  return (
    <>
      <h1>Turn: {turn}</h1>
      <main className="flex-container">
        {winner && <WinModal player={winner} setWinner={setWinner} />}
        <aside className="player">
          <h2>Player 1</h2>
          <button
            className={`card-button left ${isChosen[0] ? "chosen" : ""} `}
            onClick={() => chooseOne(1)}
            disabled={turn !== CONSTANT.player1 || (allTokenUsed[CONSTANT.player1] > 0 && allTokenUsed[CONSTANT.player1] < 3)}
          >
            {" "}
            1{" "}
          </button>

          {allTokenUsed[CONSTANT.player1] > 0 && (
            <button
              className={`card-button left ${isChosen[1] ? "chosen" : ""} `}
              onClick={() => chooseOne(2)}
              disabled={turn !== CONSTANT.player1 || (allTokenUsed[CONSTANT.player1] > 1 && allTokenUsed[CONSTANT.player1] < 3)}
            >
              {" "}
              2{" "}
            </button>
          )}

          {allTokenUsed[CONSTANT.player1] > 1 && (
            <button className={`card-button left ${isChosen[2] ? "chosen" : ""} `} onClick={() => chooseOne(3)} disabled={turn !== CONSTANT.player1}>
              {" "}
              3
            </button>
          )}
        </aside>

        <section className="main-container">
          {buttons.map((number) => (
            <Card
              tokenPositionNumber={number}
              turn={turn}
              setTurn={setTurn}
              isChosen={isChosen}
              allTokenUsed={allTokenUsed}
              setAllTokenUsed={setAllTokenUsed}
              positions={positions}
              setPositions={setPositions}
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
            {" "}
            1{" "}
          </button>

          {allTokenUsed[CONSTANT.player2] > 0 && (
            <button
              className={`card-button right ${isChosen[1] ? "chosen" : ""} `}
              onClick={() => chooseOne(2)}
              disabled={turn !== CONSTANT.player2 || (allTokenUsed[CONSTANT.player2] > 1 && allTokenUsed[CONSTANT.player2] < 3)}
            >
              {" "}
              2{" "}
            </button>
          )}

          {allTokenUsed[CONSTANT.player2] > 1 && (
            <button className={`card-button right ${isChosen[2] ? "chosen" : ""} `} onClick={() => chooseOne(3)} disabled={turn !== CONSTANT.player2}>
              {" "}
              3
            </button>
          )}
        </aside>
      </main>
    </>
  )
}

export default Main
