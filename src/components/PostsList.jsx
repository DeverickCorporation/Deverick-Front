import React from 'react';
import PostItem from './PostItem';

function PostList({ posts_list }) {

    return (

        <div>
            {posts_list.map(post =>
                <PostItem post_json={post} key={post.post_id} />
            )}
        </div>
    )
}

export default PostList