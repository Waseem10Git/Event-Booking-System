import { Link } from 'react-router-dom';
import './Congratulations.css';

function Congratulations() {
  return (
    <div className="congratulations-container">
      <div className="congratulations-card">
        <h2>Congratulations!</h2>
        <p>You have successfully booked your event!</p>
        <div className="button-container">
          <Link to="/" className="back-to-home-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Congratulations;
