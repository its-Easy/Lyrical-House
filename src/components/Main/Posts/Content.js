import React from 'react'
import axios from 'axios'
import ContentCard from './contentCard'
import img from '../MakePost/writePostIcon.jpg'

let postDetails,postDetail=[]
class Content extends React.Component {
    constructor() {
        super()
        this.State = {
            posts: [{}]
        }
        
        this.getData = this.getData.bind(this)
    }
    componentDidMount() {
        var contentType = window.location.href.toString()
        for(var i=contentType.length-1; i>0 ; i--) {
            if(contentType.charAt(i) == '/') {
            contentType = contentType.slice(i+1, contentType.length) 
            break;
            }
        }
        if(contentType == "home") contentType = ""
        axios.get('http://localhost:8080/home/'+contentType)
          .then(res => {
            this.setState({
              posts: res.data  
            })
            this.getData()
            this.setState({
                posts: [{}]
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getData() {
        console.log(this.state.posts)
        postDetails = this.state.posts.map((post)=> {
            for(var i=0; i<post.post[0].content.length; i++)
            postDetail.push(<ContentCard id={post._id} username={post.username} index={i} content={post.post[0].content[i]} likes={post.post[0].likes[i]} />)

        });
    }

    render() {
        return (
            <>
            <div style={{backgroundColor: "white", width: "50rem", margin: "10% 25% 0% 25%", padding: "5rem"}}>
                {postDetail}
            </div>
            <a href="/makePost"><img src={img} style={{width: "5rem", marginLeft: "80rem", marginBottom: "5rem"}}></img></a>
            </>
        )
    }
}

export default Content