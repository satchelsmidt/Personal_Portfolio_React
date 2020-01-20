import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {deletePost} from "../actions/postActions.js"

class Post extends Component {

    //////// DO NOT NEED WHEN USING REDUX////////
    // state = {
    //     post: null
    // }

    //use componentDidMount hook to find route id
    // componentDidMount() {
    //     let id = this.props.match.params.post_id

    //     axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    //         .then(res => {
    //             this.setState({
    //                 post: res.data
    //             })
    //             console.log(res)
    //         })
    // }
    //////// DO NOT NEED WHEN USING REDUX////////

    handleClick = () => {
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/')
    }

    render() {
        console.log(this.props)
        const post = this.props.post ? (
            <div className="post">
                <h4 className="center">
                    {this.props.post.title}
                </h4>
                <p>{this.props.post.body}</p>
                <div className="center">
                    <button className="btn grey" onClick={this.handleClick}>
                        Delete Post
                    </button>
                </div>
            </div>
        ) : (
                <div className="center">Loading posts</div>
            )

        return (
            <div className="container">
                {post}
            </div>
        )
    }
}

//ownProps refers to props of components before we get data from store
const mapStatetoProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id

    return {
        post: state.posts.find(post => {
            return post.id === id
        })
    }
}

//this function takes in a dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => { dispatch(deletePost(id)) }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(Post)