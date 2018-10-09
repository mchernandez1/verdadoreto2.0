import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import "./App.css";

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
  
//Podrían hacer uso de templates en un archivo HTML y luego hacer el manejo de eventos en los archivos .js de los elementos lógicos
    render() {
      return (
        <div className="container-text">
       
        <header>
        <h1>Verdad o RETO (2.0)</h1>
        
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
