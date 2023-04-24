import React from 'react';

function LikeItem(props) {
    let like_json = props.like_json

    return (
        <div className='post likepost'>
            <h2>{like_json.person_name}</h2>
            <div className='heart-container'>
            </div>
            <p className='text'>liked your "{like_json.post_name}"</p>
            <p className='data'>{new Date(like_json.time * 1000).toLocaleString()}</p>
        </div>
    )
}

export default LikeItem