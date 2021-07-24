import React from 'react'
import Header from '../Header/Header'
import Content from './Content'

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.username
        }
    }
    componentWillMount() {
        var {state} = this.props.location
        console.log(state)
        this.setState({
            username: state
        })
    }
    render() {
        console.log(this.state.username)
        return (
            <>
            <Header username={this.state.username}/>
            <Content />
            </>
        )
    }
}

export default Posts