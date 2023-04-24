import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';


function WritePosts({ setShowCreatePost }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [writePost_resp, setResp] = useState("");


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
                setShowCreatePost(false);
            })
            .catch(error => {
                console.log(error);
                setResp(error.response.data["message"]);
            });
    }


    return (
        <div>
            <h1 className='popup-title'>Create your Post</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <label className='fail-response write-post-resp'>{writePost_resp}</label>
            <div className='main-buttons-container write-post-buttons'>
                <button onClick={() => setShowCreatePost(false)}>Cancel</button>
                <button onClick={handlePostSave}>Publish</button>
            </div>
        </div>
    );
}

export default WritePosts;