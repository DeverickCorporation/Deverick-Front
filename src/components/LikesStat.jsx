import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';

function LikesStat({ setShowLikesStat }) {
    const [date_from, setDateFrom] = useState("");
    const [date_to, setDateTo] = useState("");
    const [data, setData] = useState("");


    const handleLikesStat = () => {
        axios.get(API_URL + '/create_post', {

            headers: {
                "jwt-token": localStorage.getItem("jwt_token")
            },
            params: { date_from: date_from, date_to: date_to }
        })
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleClose = () => {
        console.log("Close show activity");
        setShowLikesStat(false);
    }

    return (
        <div>
            <h1>Your Activity</h1>
            <label>likes data: {JSON.stringify(data)} </label>


            <br />
            <div className='auth-button-container'>
                <button onClick={handleLikesStat}>Get data</button>

                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default LikesStat;