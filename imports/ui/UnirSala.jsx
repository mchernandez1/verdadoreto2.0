import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Salas } from "../api/salas.js";

import "./Form.css";

import { withTracker } from 'meteor/react-meteor-data';
class UnirSala extends Component {
    constructor(props) {
        super(props);
        this.renderSalas = this.renderSalas.bind(this);

    }

    unirseSala(idSala) {

        Meteor.call('salas.join',idSala,(err,res)=>{
            console.log(err);
            
            console.log(res)
            if(!err)
            FlowRouter.go("/sala/" + idSala);
        }
        )

     

    };

    renderSalas() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                </th>
                        <th>
                            Owner
                </th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.salas.map((sala, id) => {
                        return (
                            <tr key={id} style={{ cursor: "pointer" }} onClick={() => this.unirseSala(sala.owner)}>
                                <td>
                                    {sala.name}
                                </td>
                                <td>
                                    {sala.owner}
                                </td>
                            </tr>

                        )
                    }
                    )}
                </tbody>

            </table>
        )

    }

    render() {
        return (
            <div className="container contact-form">
                <div className="new-task2" >

                    <h2>Unirte a una sala </h2>
                    <p></p>
                    {this.props.salas && this.renderSalas()}
                </div>

            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('salas');
    return {
        currentUser: Meteor.user(),
        salas: Salas.find({}).fetch(),
    };
})(UnirSala);