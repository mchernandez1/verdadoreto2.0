import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Form.css";
export default class CrearSala extends Component {
    constructor(props) {
        super(props);
    }

    crearSala() {

        FlowRouter.go("/sala/" + ReactDOM.findDOMNode(this.refs.textInput).value)

    };

    render() {
        return (
            <div className="container contact-form">
                <form className="new-task2" >

                    <h2>Crear una sala </h2>
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Escribe el codigo para crear una sala"
                    />
                    <p></p>
                    <button className="btnContactSubmit" onClick={this.crearSala.bind(this)} >crearSala</button>
                </form>

            </div>
        );
    }
}