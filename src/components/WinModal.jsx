import CONSTANT from '../constants'
import '../styles/winModal.css'
const WinModal = ({ player, setFinishModal }) => {
  return (<div className="modal">
    <div className="modal-content">
      <header>
        <h2> 🥇 Congratulations {player === CONSTANT.player1 ? "Player 1" :"Player 2"} !</h2>
      </header>
      <section className='play-again-section'>
        <button onClick={() => window.location.reload(false)}>Play again</button>
        <button onClick={() => setFinishModal(s => !s)}>Cancel</button>
      </section>
    </div>
  </div>)
}

export default WinModal