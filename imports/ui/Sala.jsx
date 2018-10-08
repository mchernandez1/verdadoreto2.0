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
        let arreglo=[
            "debes bailarle a la persona de al lado",
            "¿quien fue tu primer novio ?",
            "¿te gusta alguien de esta sala ?",
            "¿si tuvieras que irte con alguien de esta sala con quien te irias?",
            "hacer el ocho con la cola "
        ]
        let p=Random.choice(arreglo);
        let jugadores=this.props.sala.players;
        let r=Random.choice(jugadores);
        Meteor.call('salas.player',this.props.sala.owner,r,(err,res)=>{
                console.log(err);
                
                console.log(res)
                
        });
        if(this.props.sala.seleccionado == this.props.currentUser.username)
        {
        return (
            <div>
            <p>Fuiste seleccionado {r}</p>
            <p></p>
            <p>La pregunta/reto es {p}</p>
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
        

    };


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