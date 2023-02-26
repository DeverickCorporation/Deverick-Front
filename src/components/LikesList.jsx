import React from 'react';
import LikeItem from './LikeItem';

function LikesList({ likes_data }) {

    console.log(likes_data)

    if (!likes_data) {
        return <label>Choose dates </label>

    }

    return (

        <div>
            <label>You have {likes_data.likes_num} for this period </label>

            <ul>
                {likes_data["likes_dict"].map(post =>
                    <LikeItem like_json={post} key={post.post_id} />
                )}
            </ul>
        </div>
    )
}

export default LikesList