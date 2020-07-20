import React, { Component } from "react";

class Card extends Component {
  state = {
    hover: false
  };

  handleMouseOver = () => {
    this.setState({
      hover: true
    });
  };

  handleMouseOut = () => {
    this.setState({
      hover: false
    });
  };

  handleClick = () => {
    console.log(this.props);
    fetch(`http://localhost:3000/tasks/${this.props.taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'Authorization': localStorage.token
      }
    })

    this.props.deleteCard(this.props.taskId);
    
  };

  render() {
    return (
      <div className='card-component'>
        <div
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          className='to-do-card'
        >
          <h2>{this.props.task}</h2>
          {this.state.hover ? <h3 onClick={this.handleClick}>x</h3> : null}
        </div>
      </div>
    );
  }
}

export default Card;