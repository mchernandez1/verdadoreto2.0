import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Form.css";

import { withTracker } from 'meteor/react-meteor-data';

class CrearSala extends Component {
    constructor(props) {
        super(props);
    }

    crearSala() {
        Meteor.call('salas.insert', ReactDOM.findDOMNode(this.refs.textInput).value, (err, res) => {
            console.log(err);
            console.log(res)
            if (!err)
                FlowRouter.go("/sala/" + this.props.currentUser.username)
        });

    };

    regresarSala()
    {
        FlowRouter.go("/")
    }

    render() {
        return (
            <div className="container contact-form">
                <div className="new-task2" >

                    <h2>Crear una sala </h2>
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Escribe como quieres que se llame tu sala "
                    />
                    <p></p>
                    <button className="btnContactSubmit" onClick={this.crearSala.bind(this)} >crearSala</button>
                    
                </div>
            </div>

        
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(CrearSala);