import React, { Component } from 'react';

export default class ProjectForm extends Component {
  state = {
    name: ''
  };

  handleChange = event => {
    let {name, value} = event.target
    this.setState({
      name: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // Close the form
    this.props.closeProjectForm()
    // Create new project with the name of the project and the id of the user from the token.
    this.props.createNewProject(this.state.name)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="create-project__form" style={projectFormStyles}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
          style={projectFormInputStyles}
        />
        <input type="submit" text="Save Project!" style={projectFormSubmitStyles}/>
      </form>
    );
  }
}

const projectFormInputStyles = {
  height: '2rem'
}

const projectFormSubmitStyles = {
  width: '4rem'
}

const projectFormStyles = {
  width: 'inherit',
  height: 'inherit',
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around'
}