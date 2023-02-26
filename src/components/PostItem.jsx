import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";

function PostItem(props) {
    let post_json = props.post_json

    const [like, setLike] = useState(false);


    function handleSetLike() {
        axios.post(API_URL + '/like_post', {
            "post_id": post_json.post_id
        }, {
            headers: {
                "jwt-token": localStorage.getItem("jwt_token")
            }
        })
            .then(response => {
                console.log(response.data);
                setLike(true)
            })
            .catch(error => {
                console.log(error);
                if (error.response.status == 400) {
                    setLike(true)
                    post_json.likes_num -= 1

                }
            });
    }

    function handleSetUnlike() {
        axios.post(API_URL + '/unlike_post', {
            "post_id": post_json.post_id
        }, {
            headers: {
                "jwt-token": localStorage.getItem("jwt_token")
            }
        })
            .then(response => {
                console.log(response.data);
                setLike(false)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (

        <li>
            <label>Author: {post_json.author_name}</label>
            <br />
            <label>Title: {post_json.post_title}</label>
            <br />
            <label>Text: {post_json.post_text}</label>
            <br />

            <label>Time: {post_json.time}</label>
            <br />
            <label>Likes: {like ? post_json.likes_num + 1 : post_json.likes_num}</label>
            {like ? <button onClick={handleSetUnlike}>Unike</button> : <button onClick={handleSetLike}>Like</button>}
        </li>
    )
}

export default PostItem