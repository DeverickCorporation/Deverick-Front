import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import PostItem from './PostItem';

function PostList() {

    const [loading, setLoading] = useState(false);
    const [posts_list, setPostsList] = useState([]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    if (document.documentElement.clientHeight > document.body.clientHeight && !loading) {
        console.log(1)
        setLoading(true)
        loadNewPosts()
    }

    async function loadNewPosts() {
        setLoading(true)
        let params = {}
        if (posts_list.length > 0) {
            params = { limit: 3, start_from: posts_list[posts_list.length - 1].post_id - 1 }
        } else {
            params = { limit: 3 }
        }
        try {
            const response = await axios.get(API_URL + '/posts',
                {
                    headers: { "jwt-token": localStorage.getItem("jwt_token") },
                    params: params
                });
            setPostsList([...posts_list, ...response.data["posts_dict"]])
            console.log("new posts loaded")
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - (scrollHeight * 0.20) && !loading) {
            setLoading(true)
            loadNewPosts()
        }
    };

    return (

        <div>
            {posts_list.map(post =>
                <PostItem post_json={post} key={post.post_id} />
            )}
        </div>


    )
}

export default PostList