import React from 'react';
import LikeItem from './LikeItem';

function LikesList({ likes_data }) {

    console.log(likes_data)

    if (!likes_data) {

        return <div><br /> <label>Choose dates </label></div>

    }

    return (

        <div>
            <br />
            <label>You have <b>{likes_data.likes_num}</b> likes for this period </label>

            <div>
                {likes_data["likes_dict"].map(post =>
                    <LikeItem like_json={post} key={post.post_id} />
                )}
            </div>
        </div>
    )
}

export default LikesList