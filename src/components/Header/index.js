import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
            <div>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link to="/Jobs" className="nav-link">
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <button
                onClick={onClickLogout}
                type="button"
                className="logout-desktop-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
