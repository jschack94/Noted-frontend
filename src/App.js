import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import Sidebar from "./containers/Sidebar";

import ProjectContainer from "./containers/ProjectContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ListContainer from "./containers/ListContainer";

class App extends Component {
  state = {
    login: false,
    currentUser: [],
    projectList: [],
    currentProject: [],
    currentProjectLoaded: false,
    projectsLoaded: false
  };

  componentDidMount() {
    // Check local storage for a token
   
    this.checkForProjectId();
  }

 

  checkForProjectId = () => {
    if (localStorage.projectId && document.URL.includes("/projects")) {
      this.loadCurrentProject(localStorage.projectId)
    }
    console.log(localStorage.projectId)
debugger
  }

 

  logOutUser = () => {
    localStorage.clear()
    this.setState({
      login: false,
      currentUser: {}
    })
  }

 

  logInUser = (username, password) => {
    fetch("http://localhost:3000//login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.errors) return alert(userInfo.errors.reduce((message, string) => message += `${string}. \n`, ''))
        this.setState(
          {
            login: true,
            currentUser: userInfo
          },
          () => {
            // store token in local storage
            localStorage.setItem("token", userInfo.token);
            // Set the user's projects to true
            this.fetchprojectList();
          }
        );
      });
  };

  fetchprojectList = () => {
    // debugger
    // if (!this.props.userLoggedIn) return;
    fetch(`http://localhost:3000/users/${this.state.currentUser.user.data.id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(respData => {
        
        this.setState({
          projectList: respData.data.attributes.projects,
          projectsLoaded: true
        });
      
      });
      
  };

  loadCurrentProject = projectId => {
    fetch(`http://localhost:3000/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      }
    })
    .then(res => res.json())
    .then(fetchData => {
      let { attributes } = fetchData.data;
      this.setState({
        currentProject: {...attributes},
        currentProjectLoaded: true
      });
    })
    .then(localStorage.setItem("projectId", projectId))
};

  resetCurrentProject = () => {
    this.setState({
      currentProject: {},
      currentProjectLoaded: false
    })
  }

  registerUser = (name, username, email, password) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, username, email, password })
    })
      .then(res => res.json())
      .then(userInfo => {
        // debugger;
        if (userInfo.errors) return alert(userInfo.error.reduce((message, string) => message += `${string}. \n`, ''))
        this.setState(
          {
            login: true,
            currentUser: userInfo
          },
          () => {
            // store token in local storage
            localStorage.setItem('token', userInfo.token);
            // Set the user's projects to true
            this.fetchprojectList();
          }
        );
      });
  };

  render() {
    return this.state.login ? (
      <Router>
        <Header login={this.state.login} currentUser={this.state.currentUser} resetCurrentProject={this.resetCurrentProject} logOutUser={this.logOutUser} />
        <Switch>
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/projects/:id'
            render={renderProps => {
              let foundProjectArr = document.URL.split("/");
              let currentProjectID = foundProjectArr[foundProjectArr.length - 1];
              if(this.state.currentProjectLoaded) return (
                <ListContainer
                  {...renderProps}
                  currentProject={this.state.currentProject}
                  loadCurrentProject={this.loadCurrentProject}
                  currentProjectId={currentProjectID}
                />
                )
                
                return (
                  <h1>Please wait while we load your project...</h1>
                )
            }}
          />
          <Route
            // exact
            path='/'
            render={routerProps => (
              <div className='home-container'>
                <Sidebar />
                {this.state.projectsLoaded ? (
                  <ProjectContainer
                    {...routerProps}
                    currentUser={this.state.currentUser}
                    userLoggedIn={this.state.login}
                    loadCurrentProject={this.loadCurrentProject}
                    projectList={this.state.projectList}
                  />
                ) : (
                  <div>
                    <h2>Please wait while we get your projects together...</h2>
                  </div>
                )}
              </div>
            )}
          />
        </Switch>
      </Router>
    ) : (
      <Router>
        <Header login={this.state.login} />
        <Switch>
          <Route
            exact
            path="/login"
            render={routerProps => (
              <Login {...routerProps} logInUser={this.logInUser} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={routerProps => (
              <Signup {...routerProps} registerUser={this.registerUser} />
            )}
          />
          <Route
            path="/*"
            render={routerProps => (
              <Login {...routerProps} logInUser={this.logInUser} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;