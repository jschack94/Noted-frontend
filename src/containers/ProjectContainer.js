import React, { Component } from 'react';
import Project from '../components/Project';

class ProjectContainer extends Component {
  state = {
    projectList: this.props.projectList
  };

  // takes the project id and a name for the project.
  createNewProject = name => {
    // Get the current user's ID
    const user_id = this.props.currentUser.user_id;
    // Make the post request
    fetch('https://chello-api.herokuapp.com/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({ user_id, name })
    })
      .then(res => res.json())
      .then(projectData => {
        let { id, attributes } = projectData.data
        let newProjectObj = { id, ...attributes }
          this.setState({
            projectList: [newProjectObj, ...this.state.projectList]
          });
      });
  };

  render() {
    // console.log(this.props.currentUser)
    return (
      <div className="project-container">
        <div>
          <h2>All Projects</h2>
        </div>
        <Project
          currentProject={this.props.currentProject}
          projects={this.state.projectList}
          loadCurrentProject={this.props.loadCurrentProject}
          renderProjectForm={this.renderProjectForm}
          createNewProject={this.createNewProject}
        />
      </div>
    );
  }
}

export default ProjectContainer;