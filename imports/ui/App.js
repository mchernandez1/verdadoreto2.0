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
  
  handleSubmit(event) {
    event.preventDefault();
    
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    
    Meteor.call('tasks.insert', text);
    
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
      
      return (
        <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton}
        />
        );
      });
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
        
        <ul>
        {this.renderTasks()}
        </ul>
        </div>
        );
      }
    }
    
    export default withTracker(() => {
      Meteor.subscribe('tasks');
      
      return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
      };
    })(App);