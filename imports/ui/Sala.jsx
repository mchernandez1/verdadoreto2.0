import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Salas} from "../api/salas.js";
import { withTracker } from 'meteor/react-meteor-data';
import "./Form.css";
import { Random } from 'meteor/random';


    class Sala extends Component {
    constructor(props) {
        super(props);

        this.state={
            esperando:true,
            players:[],
            seleccionado:false,
            
        }
        this.renderJugadores = this.renderJugadores.bind(this);
        this.renderJugadorAleotorio=this.renderJugadorAleotorio.bind(this);

        
    }

    regresarHome()
    {
        FlowRouter.go("/");
    }

    regresarSala()
    {
        FlowRouter.go("/sala/" + this.props.sala.owner)
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

    
    renderJugadorAleotorio()
    {
        let players=this.props.sala.players;
        let player=Random.choice(players);

        if(this.props.currentUser.username== player)
        {
            return (
                <div>
                <p>Fuiste seleccionado {player}</p>
                <p></p>
                <button className="home">Pregunta/Reto</button>
                </div>
                )
        }
        else
        { 
            return (
                <div>
                <p>No has sido selecccionado para jugar</p>
                </div>
                )

        }
    }

    

    render() {
        return (
            <div className="container contact-form">
                {this.props.sala && this.state.esperando==true ? 
                <div>
                <h1>Bienvenidos a la sala {this.props.sala.name}</h1>
                <h2>los jugadores en esta sala son:</h2>
                <ul>
                    <li>{this.renderJugadores()}</li>

                </ul>
                <button className="home" onClick= {() => this.setState({esperando : false})}>Jugar</button>
                <p></p>
                <button className="home" onClick={this.regresarHome.bind(this)}>Regresar al inicio</button>
                </div>
                :this.props.currentUser && this.state.esperando == false ?
                <div>
                    {this.renderJugadorAleotorio()}
                    <p></p>
                    <button className="home" onClick={() => this.setState({esperando : true})}>Volver a jugar </button>
                </div>
                :this.props.currentUser  && this.state.seleccionado==true ?
                <div>
                    <h2>Pregunta/reto seleccionada:</h2>  
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