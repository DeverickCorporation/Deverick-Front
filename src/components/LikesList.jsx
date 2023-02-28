import React from 'react';
import LikeItem from './LikeItem';

function LikesList({ likes_data }) {
    return (
        <div>
            <br />
            <label>You have <b>{likes_data.likes_num}</b> likes for this period </label>
            <div>
                {likes_data["likes_dict"].map(like =>
                    <LikeItem like_json={like} key={like.like_id} />
                )}
            </div>
        </div>
    )
}

export default LikesList