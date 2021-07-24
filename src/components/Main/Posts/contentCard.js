import React from 'react'
import axios from 'axios'
// import './style.css'
import likeButton from '../Posts/likeButton.jpg'

let counter=0
class contentCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            index: this.props.index,
            likes: this.props.likes
        }
        this.increaseLikes = this.increaseLikes.bind(this)
    }
    increaseLikes() {
    if(counter++ === 0) {
        console.log(this.state.id)
        let query = {
            id: this.state.id,
            index: this.state.index,
            likes: this.state.likes+counter
        }

        axios.post('http://localhost:8080/home/updateLikes', query)
          .then(res => console.log(res.data))
        this.setState({
            likes: this.state.likes+counter
        })
    }
    }
    render() {
    return (
        <>
        <div class="card" style={{marginBottom: "2rem"}}>
        <div class="card-body" style={{backgroundColor: "black", color: "white"}}>
            <h5 class="card-title" style={{fontSize: "1rem"}} >{this.props.username}</h5> <hr />
            <h6 class="card-subtitle mb-2 text-muted" style={{fontSize: "1.5rem"}} >{this.props.content}</h6> <hr />
            <button class="card-text" onClick={this.increaseLikes} style={{backgroundColor: "transparent", border: "none", color: "wheat"}} ><img src={likeButton} style={{width: "2rem"}}></img>  {this.state.likes}</button>
        </div>
        </div>
        </>
    )
    }
}

export default contentCard