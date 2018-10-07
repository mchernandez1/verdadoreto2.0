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
            
            seleccionado:'',
            
        }
        this.renderJugadores = this.renderJugadores.bind(this);
        this.renderJugadorAleotorio=this.renderJugadorAleotorio.bind(this);
        this.renderPreguntaAleotorio=this.renderPreguntaAleotorio.bind(this);
        
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
        return (
            <div>
            <p>{player}</p>
            </div>
        )
    }

    renderPreguntaAleotorio()
    {
        let preguntas=[
            {
                "reto" : "quitarse una ceja "
            },
            {
                "reto" : "cuantos novios/as has tenido"
            }
        ]
        let pregunta=Random.choice(preguntas);
        return (
            <div>
            <p>{pregunta}</p>
            </div>
        )
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
                    <h2>Jugador Seleccionado:{this.renderJugadorAleotorio()}</h2>
                    
                    <h2>Pregunta/reto seleccionada:{this.renderPreguntaAleotorio()}</h2>

                    <button className="home" onClick={() => this.setState({esperando : true})}>Volver a jugar </button>
                </div>
                :this.props.currentUser && this.state.seleccionado == this.props.currentUser.username ?
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