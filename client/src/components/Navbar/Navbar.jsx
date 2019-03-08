
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../AuthService/authService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <ul>
            <li><a onClick={this.handleLogout}>Logout</a></li>
          </ul>

          <h2>Welcome, {this.state.loggedInUser.username}</h2>
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
            <li><Link to='/signup' className="link" style={{ textDecoration: 'none' }}>Signup</Link></li>
            <li><Link to='/login' className="link" style={{ textDecoration: 'none' }}>Login</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;