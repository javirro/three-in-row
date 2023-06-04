import CONSTANT from "../constants"
import "../styles/errorModal.css"

const ErrorModal = ({ error, player, setShowError }) => {
  return (
    <div className="modal">
      <div className="modal-content" id="error-modal">
        <header>
          <h3>🚫 {player === CONSTANT.player1 ? "Player 1" : "Player 2"}</h3>
        </header>
        <section className="error-section">
          <span className="error-message">{error.message}</span>
          <button onClick={() => setShowError(undefined)}>Continue</button>
        </section>
      </div>
    </div>
  )
}

export default ErrorModal
