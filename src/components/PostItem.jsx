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
        <div className='post'>
            <h2>{post_json.post_title}<span> ({post_json.author_name})</span></h2>
            <div className='heart-container'>
                <span>{like ? post_json.likes_num + 1 : post_json.likes_num}</span>
                {like ?
                    <svg onClick={handleSetUnlike} className='liked' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6.12245L17.4904 3.49656C19.4068 1.47583 22.4994 1.12741 24.8174 2.67109C27.6066 4.52853 28.211 8.37385 26.1263 10.9975L15 25L3.87367 10.9975C1.78895 8.37385 2.39345 4.52853 5.1826 2.67109C7.50061 1.12741 10.5932 1.47583 12.5096 3.49656L15 6.12245Z" stroke="black" />
                    </svg>
                    :
                    <svg onClick={handleSetLike} className='' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 6.12245L17.4904 3.49656C19.4068 1.47583 22.4994 1.12741 24.8174 2.67109C27.6066 4.52853 28.211 8.37385 26.1263 10.9975L15 25L3.87367 10.9975C1.78895 8.37385 2.39345 4.52853 5.1826 2.67109C7.50061 1.12741 10.5932 1.47583 12.5096 3.49656L15 6.12245Z" stroke="black" />
                    </svg>}
            </div>
            <p className='text'>{post_json.post_text}</p>
            <p className='data'>{post_json.time}</p>
        </div>
    )
}

export default PostItem