import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';


import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import UnirSala from './UnirSala.jsx';
import CrearSala from './CrearSala.jsx';


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      paso : 1
    };
  }

    render() {
      return (
        <div>
        <header>
        <h1>Verdad o Reto(2.0) </h1>
        
        <AccountsUIWrapper />
        
        { this.props.currentUser && this.state.paso == 1 ?
          
          <div>
          
          <form className="new-task" >
          
          <h2>Crear una sala</h2>

          <button onClick= {() => this.setState({paso : 3})}>crearSala</button>

          <h2>Unirte a una sala </h2>
          <button onClick= {() => this.setState({paso : 2})}>unirteSala</button>
          </form>
          </div> 
          : this.props.currentUser && this.state.paso == 2 ?
          <UnirSala/>
          :
          this.props.currentUser && this.state.paso == 3 ?
          <CrearSala/> : ""
        }
        </header>
        
        </div>
        );
      }
    }
    
    export default withTracker(() => {
      Meteor.subscribe('salas');

      return {
        currentUser: Meteor.user(),
        
      };
    })(App);