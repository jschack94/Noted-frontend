import React, { Component } from 'react'
import ListCards from './ListCards'

class ListContainer extends Component {


  state = {
    listCards: this.props.currentProject.lists,
    inputValue: '',
    clicked: false
  }

  // this.props.currentProject.lists.map

  // handleClick = () => {
  //   this.setState({
  //     listCards: [ {name: 'New Taskslakjshdflkajshdflkjahsdflkjhasdflkjhasdflkjhasdflkjhasdflkhjasd'}, ...this.state.listCards ]
  //   })
  // }

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

  handleSubmit = (e) => {
    e.preventDefault();
    let project_id = document.URL.split('projects/')[1]
    console.log(this.props)
    fetch(`https://chello-api.herokuapp.com/lists`, {
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
      // debugger;
      // Use destructuring to reform the data
      let id = respData.data.id
      let { name, project_id, tasks } = respData.data.attributes
      let newListCardObj = { 
        id,
        name,
        tasks
      }
      this.setState({
        listCards: [...this.state.listCards, newListCardObj],
        clicked: false,
        inputValue: ''
      })
    })

    // this.setState({
    //   listCards: [{name: this.state.inputValue}, ...this.state.listCards]
    // })
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