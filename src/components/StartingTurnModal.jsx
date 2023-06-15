import CONSTANT from "../constants"
import "../styles/startingTurnModal.css"

const StartingTurnModal = ({ setTurn }) => {
  const chooseStartingTurn = (player) => {
    if (Number(player) === 1) setTurn(CONSTANT.player1)
    else setTurn(CONSTANT.player2)
  }

  return (
    <div className="modal" id="starting-modal">
      <div className="modal-content-turn"  >
        <header>
          <h2> 🎮 Choose player to start</h2>
        </header>
        <section className="play-again-section">
          <button onClick={() => chooseStartingTurn(1)} className="btn-player1">Player 1</button>
          <button onClick={() => chooseStartingTurn(2)} className="btn-player2">Player 2</button>
        </section>
      </div>
    </div>
  )
}

export default StartingTurnModal
