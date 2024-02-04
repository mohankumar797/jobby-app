import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="headerEl">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      className="logoHeader"
      alt="website logo"
    />
    <ul className="listEl">
      <Link to="/" className="listItems">
        <li className="listItems">Home</li>
      </Link>
      <Link to="/jobs" className="listItems">
        <li className="listItems">Jobs</li>
      </Link>
    </ul>
    <button type="button" className="button">
      Logout
    </button>
  </div>
)

export default Header
