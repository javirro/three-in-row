import CONSTANT from "../constants"
import "../styles/winModal.css"

const WinModal = ({ winner, setWinner, setAllTokenUsed, setPositions }) => {
  const playAgain = () => {
    setAllTokenUsed({ player1: 0, player2: 0 })
    setPositions(new Map())
    setWinner(undefined)
  }

  return (
    <div id="win-modal" className="modal">
      <div className="modal-content">
        <header>
          <h2> 🥇 Congratulations {winner === CONSTANT.player1 ? "Player 1" : "Player 2"} !</h2>
        </header>
        <section className="play-again-section">
          <button onClick={() => playAgain()}>Play again</button>
          <button onClick={() => setWinner(undefined)}>Cancel</button>
        </section>
      </div>
    </div>
  )
}

export default WinModal
