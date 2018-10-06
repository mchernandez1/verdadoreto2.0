import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Salas} from "../api/salas.js";
import { withTracker } from 'meteor/react-meteor-data';



    class Sala extends Component {
    constructor(props) {
        super(props);

        this.state={
            esperando:true,
            players:[]
            
        }
        this.renderJugadores = this.renderJugadores.bind(this);
    }

    renderJugadores()
    {
        return this.props.sala.players.map((player)=>{
            return(
            <p>
            {player}
            </p>  )
        })
    }

    render() {
        return (
            <div>
                {this.props.sala ? 
                <div>
                <h1>Bienvenidos a la sala {this.props.sala.name}</h1>
                <h2>los jugadores en esta sala son:</h2>
                <ul>
                    <li>{this.renderJugadores()}</li>

                </ul>
                <button>Empezar el juego</button>
                </div>
                : ""}
            </div>
        );
    }
}

export default withTracker(({owner}) => {
    console.log("entro a sala")
    console.log(owner)
    Meteor.subscribe('sala',owner);
    return {
      currentUser: Meteor.user(),
      sala: Salas.findOne({})
    };
  })(Sala);