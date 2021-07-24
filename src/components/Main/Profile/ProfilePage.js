import React from 'react'
import axios from 'axios'
import ContentCard from '../Posts/contentCard'
import Header from '../Header/Header'

let postDetails, userPosts=[]
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            posts: [{}],
            user: {}
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentWillMount() {
        var {username} = this.props.location
        console.log(username)
        this.setState({
            username: username
        })
    }
    componentDidMount() {
        var username = window.location.href.toString()
        for(var i=username.length-1; i>0 ; i--) {
            if(username.charAt(i) == '/') 
            username = username.slice(i+1, username.length)
        }
        console.log(username)
        var query={
            user: username
        }
        axios.get('http://localhost:8080/profile/find-user')
          .then(res => {
              console.log(res.data)
              this.setState({
                  user: res.data
              })
          })
        axios.post('http://localhost:8080/profile', query)
          .then(res => console.log(res.data))
        axios.get('http://localhost:8080/profile')
          .then(res => {
            this.setState({
              posts: res.data  
            })
            this.fetchData()
            this.setState({
                posts: [{}]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    fetchData() {
        console.log(this.state.posts)
        postDetails = this.state.posts.map((post)=> {
            for(var i=0; i<post.post[0].content.length; i++)
            userPosts.push(<ContentCard id={post._id} username={post.username} index={i} content={post.post[0].content[i]} likes={post.post[0].likes[i]} />)
        });
    }
    render() {
        return (
            <>
            <Header />
            <div style={{backgroundColor: "white", height: "100vh", width: "50rem", margin: "10% 25% 0% 25%", padding: "5rem"}}>
                {userPosts}
            </div>
            </>
        )
    }
}

export default Profile