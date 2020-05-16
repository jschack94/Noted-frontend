import React, { Component } from 'react'
import ProjectForm from "../components/ProjectForm";
import { Link } from 'react-router-dom';

export class Project extends Component {

  state = {
    projectCreationMode: false
  }

  // Render project form
  renderProjectForm = () => {
    // Turn on Production Creation Mode
    this.setState({
      projectCreationMode: true
    })
     debugger;
    // Show the form to add a
  }

  closeProjectForm = () => {
    this.setState({
      projectCreationMode: false
    })
  }

  handleClick = (evt, projectId) => {
    // Method that gets the project information
    this.props.loadCurrentProject(projectId)
  }

  render() {
    const renderProjects = this.props.projects.map(project => {
      return <Link to={`/projects/${project.id}`}><div onClick={evt => this.handleClick(evt, project.id)} className="project"><h3>{project.name}</h3></div></Link>
    })
    return (
      <div className='single-project-container'>
        {renderProjects}
        {
          this.state.projectCreationMode
            ? 
          <div className='project create-project'>
            <ProjectForm closeProjectForm={this.closeProjectForm} createNewProject={this.props.createNewProject} />  
          </div>   
            :
          <div onClick={this.renderProjectForm} className='project create-project'>
            <h3>Create Project</h3>
          </div>
        }
            
      </div>
      
    )
  }
}

export default Project