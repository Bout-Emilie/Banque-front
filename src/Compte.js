import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      montant: 0,
      pseudo: "",
      operation: ""
    };
  }

  componentDidMount() {
    // definition des variables de recup
    let solde = 2,
      pseudo = "",
      operation = [];

    axios.defaults.headers.common["Authorization"] = JSON.parse(
      localStorage.getItem("token")
    );

    //init solde
    axios
      .get("http://localhost:10524/solde")
      .then(response => {
        this.setState({ montant: response.data.data.solde });
        this.setState({ pseudo: response.data.data.pseudo });
      })
      .catch(function(error) {
        console.log(error);
      });

    //init operation des montants

    axios
      .get("http://localhost:10524/operations")
      .then(response => {
        console.log(response);
        this.setState({ operation: response.data.data });
        console.log(this.state.operation);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Compte">
        <div className="Pseudo">Bonjour {this.state.pseudo}</div>
        <div className="Montant">
          Solde sur votre compte{this.state.montant}
        </div>
        <table>
          {this.state.operation.length &&
            this.state.operation.map(o => {
              return (
                <tr>
                  <td>
                    Nom: {o.name} Operation: {o.signe}
                    {o.somme}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}
