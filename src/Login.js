import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Bootstrap from "react-bootstrap";
import ControlLabel from "react-bootstrap";
import "./Login.css";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: " "
    };
    console.log(this.props.navigation);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    var token = "";
    axios
      .post("http://localhost:10524/auths", {
        pseudo: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.auth_token != null) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.auth_token)
          );
          this.props.history.push("/Compte");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" /*bsSize="large"*/>
            <label>Pseudo:</label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" /*bsSize="large"*/>
            <label>MotdePasse</label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            /*bsSize="large"*/
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
