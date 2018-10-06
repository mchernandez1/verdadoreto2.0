import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Form.css";
export default class UnirSala extends Component {
    constructor(props) {
        super(props);
    }

    unirseSala() {
        console.log(ReactDOM.findDOMNode(this.refs.textInput).value)
        FlowRouter.go("/sala/" + ReactDOM.findDOMNode(this.refs.textInput).value)
    };

    render() {
        return (
            <div className="container contact-form">
                <form className="new-task2" >

                    <h2>Unirte a una sala </h2>
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Escribe el codigo para unirte a una sala"
                    />
                    <p></p>
                    <button className="btnContactSubmit" onClick={this.unirseSala.bind(this)} >unirteSala</button>
                </form>

            </div>
        );
    }
}