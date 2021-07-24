import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      activePage: ""
    }
    this.gotoProfile = this.gotoProfile.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props.username)
    return {username: props.username };
  }
  componentDidMount() {
    var activeLink = window.location.href.toString()
    for(var i=activeLink.length-1; i>0 ; i--) {
        if(activeLink.charAt(i) == '/') {
        activeLink = activeLink.slice(i+1, activeLink.length)
        break;
        }
    }
    console.log(activeLink)
    this.setState({
      activePage: activeLink
    })
  }
  gotoProfile() {
    this.setState({
      goto: true
    })
  }
    render() {
      console.log(this.props.username)
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{position: "fixed", top: "0vh", width: "100vw", overflow: "none"}}>
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Lyrical House</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="home/poetry">Poetry</a>
                  </li>
                  <li class={"nav-item"+(this.state.activePage=="shayari")?"active":""}>
                    <a class="nav-link" onClick={() =>{ window.location.href = '/home/shayari'}}>Shayari</a>
                  </li>
                  <li class={(this.state.activePage=="short-stories")?"nav-item active":"nav-item"}>
                    <a class="nav-link" onClick={() => {window.location.href = '/home/short-stories'}}>Short Stories</a>
                  </li>
                  {/* <button onClick={this.gotoProfile} style={{border: "none", backgroundColor: "transparent", color: "white"}}>Welcome {this.state.username}</button> */}
                  {/* <a href='/profile' style={{color: "white", marginRight: "2rem"}}>Welcome {this.state.username}</a> */}
                  <Link to={{
                    pathname: '/profile/'+this.state.username,
                    username: this.state.username
                  }}>Welcome {this.state.username} </Link>
                </ul>
              </div>            
          </nav>
        )
    }
}

export default Header