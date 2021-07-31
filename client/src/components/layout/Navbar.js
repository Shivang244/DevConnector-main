import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks = (
    <ul>
      <li>
        <Link className="hide-sm" to="/profiles">Developers</Link>
      </li>
      <li>
        <Link className="hide-sm" to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          {/* <i className="fas fa-user" />{' '} */}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/collaboration">
          <span className="hide-sm">Collaboration</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          {/* <i className="fas fa-sign-out-alt" />{' '} */}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

    const guestLinks=(
      <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>

    );

    return (

        <nav className="navbar bg-dark">
        <h1>
          {/* <Link to="/"><i className="fas fa-code"></i> LancerConnect</Link> */}

          {/* <i class="fas fa-user-friends"></i>  */}

          <Link to="/"><i>Lancer<span style={{color:"#339af0"}}>Connect</span></i> </Link>
        </h1>
        {!loading && 
        (<Fragment>{isAuthenticated? authLinks:guestLinks}</Fragment>)
        }
      </nav>

    )
}

Navbar.propTypes={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);