import React from 'react';

function LikeItem(props) {
    let like_json = props.like_json

    return (

        <li>
            <label>{like_json.person_name} liked your "{like_json.post_name}" post at {like_json.time}</label>
        </li>
    )
}

export default LikeItem