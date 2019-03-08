import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

class Home extends Component {

    constructor(){
      super()
      this.state = { loggedInUser: null };

    }
  
    
  
    render() {
      if(this.props.loggedInUser){
        return (
          <div className="Home">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            </header>
            <div>
              <Link to='/generate'> Create New Level </Link>
              <Link to='/piece'> Add new Piece </Link>
              <Link to='/levelList'> Level List </Link>
            </div>
            
          </div>
        );
      } else {
        //si no estás logeado, mostrar opcionalmente o login o signup
        return (
          <div className="Home">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            </header>
            <div>
                <Link to='/levelList'><h1>Play Game</h1></Link>
            </div>
          </div>
        );
      }
    }
  }
  
  export default Home;
  