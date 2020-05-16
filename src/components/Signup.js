import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Signup extends Component {
  state = {
    name: '',
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    let { name, username, email, password } = this.state
    this.props.registerUser(name, username, email, password)
  }

  render() {
    return (
      <div className='login-component'>
        <div id='login-header'>
          <h2>Signup</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={this.handleChange}
            value={this.state.name}
          />{" "}
          <br />
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email}
          /> <br></br>
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
        <p><Link to={'/login'}>Back to Login</Link></p>
        {/* <marquee behavior="scroll" direction="right"><img id="doggie-running" src="https://media.giphy.com/media/6CB3hti3o9QGODWTWO/giphy.gif" alt="doggie"/></marquee> */}
      </div>
    );
  }
}

export default Signup;