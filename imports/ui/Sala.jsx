import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Form.css";

export default class Sala extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Bienvenidos jugadores</h1>
                <h2>los jugadores en esta sala son:</h2>
                <ul>
                    <li></li>
                </ul>

            </div>
        );
    }
}