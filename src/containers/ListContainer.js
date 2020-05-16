import React, { Component } from 'react'
import ListCards from './ListCards'

class ListContainer extends Component {


  state = {
    listCards: this.props.currentProject.lists,
    inputValue: '',
    clicked: false
  }



  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit = (e, name) => {
    e.preventDefault();
    let project_id = document.URL.split('projects/')[1]
   
    fetch(`http://localhost:3000/lists`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        project_id,
        name: this.state.inputValue,
      })
    })
   
    .then(resp => resp.json())
    .then(respData => {
      console.log(respData)
      debugger
      
      this.setState({
        listCards: [...this.state.listCards, respData.data.attributes],
        clicked: false,
        inputValue: ''
      })
    })
  }


  render() {
    // debugger;
    return (
      <div className="list-container">
        <ListCards listCards={this.state.listCards} loadCurrentProject={this.props.loadCurrentProject}/>
        { !this.state.clicked ?
        <div onClick={this.handleClick} className='list-card-container list-container-add-list-btn'>
          <h3>Add a List</h3>
        </div>
        :
        <form onSubmit={this.handleSubmit} className='list-container-form'>
          <input type="text" onChange={this.handleChange} value={this.state.inputValue} placeholder="Enter a List title..."/>
          <div className='list-container-form-submit-wrapper'>
            <input type="submit"/>
            <h2 onClick={this.handleClick}>x</h2>
          </div>
        </form>
        }
      </div>
    )
  }
}

export default ListContainer