import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';


function WritePosts({ setShowCreatePost }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");


    function handlePostSave() {
        axios.post(API_URL + '/create_post', {
            "title": title,
            "text": text
        }, {
            headers: {
                "jwt-token": localStorage.getItem("jwt_token")
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div>
            <h1>Create your Post</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Text:</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

            <br />
            <div className='auth-button-container'>
                <button onClick={handlePostSave}>Publish</button>
                <button onClick={() => setShowCreatePost(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default WritePosts;