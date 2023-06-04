import CONSTANT from '../constants'
import '../styles/winModal.css'

const WinModal = ({ winner, setWinner }) => {
  return (<div className="modal">
    <div className="modal-content">
      <header>
        <h2> 🥇 Congratulations {winner === CONSTANT.player1 ? "Player 1" : "Player 2"} !</h2>
      </header>
      <section className='play-again-section'>
        <button onClick={() => window.location.reload(false)}>Play again</button>
        <button onClick={() => setWinner(undefined)}>Cancel</button>
      </section>
    </div>
  </div>)
}

export default WinModal