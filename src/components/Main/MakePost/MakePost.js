import React from 'react'
import axios from 'axios'
import './styles.css'

class MakePost extends React.Component {
    constructor() {
        super()
        this.state = {
            type: "",
            title: "",
            content: ""
        }
        this.handleType = this.handleType.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleContent = this.handleContent.bind(this)

        this.postContent = this.postContent.bind(this)
    }
    handleType(e) {this.setState({type: e.target.value})}
    handleTitle(e) {this.setState({title: e.target.value})}
    handleContent(e) {this.setState({content: e.target.value})}

    postContent(e) {
        e.preventDefault()
        const query = {
            username: "Shobhit",
            title: this.state.title,
            content: this.state.content
        }
        console.log(query)
        axios.post('http://localhost:8080/post-content', query).
           then(res => console.log(res))
        
    }
    render() {
        return (
            <div className="makePost-form-container">
            <form class="pure-form" onSubmit={this.postContent}>
            <fieldset>
            <h7>Type of Post: &nbsp; &nbsp; </h7>
            <select id="stacked-state">
            <option>Poem</option>
            <option>Short-Story</option>
            <option>Shayari in Hindi</option>
        </select>
        <hr />
        </fieldset>
            <fieldset class="pure-group">
        <input type="text" class="pure-input-1-2" onChange={this.handleTitle} placeholder="A title" />
        <textarea class="pure-input-1-2" onChange={this.handleContent} placeholder="Content..."></textarea>
    </fieldset> <hr/> <br /> 
    <button type="submit" class="pure-button pure-input-1 pure-button-primary submit">Submit Post</button>
    </form>
    </div>
        )
    }
}

export default MakePost