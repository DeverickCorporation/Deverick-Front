import React from 'react';
import PostItem from './PostItem';

function PostList({ posts_list }) {

    return (

        <ul>
            {posts_list.map(post =>
                <PostItem post_json={post} key={post.post_id} />
            )}
        </ul>
    )
}

export default PostList