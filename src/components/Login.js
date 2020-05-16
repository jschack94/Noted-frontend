import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.logInUser(username, password);
  };

  render() {
    return (
      <div className='login-component'>
        <div id='login-header'>
          <h2>Login</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={this.handleChange}
            value={this.state.username}
          />{" "}
          <br />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={this.state.password}
          />{" "}
          <br />
          <input type='submit' />
        </form>
        <p>
          <Link to={"/signup"}>Create an Account</Link>
        </p>
        {/* <img
          id='puglove'
          src='https://media0.giphy.com/media/onsxwAbM8xUNa/source.gif'
          alt='doggie'
        /> */}
      </div>
    );
  }
}

export default Login;