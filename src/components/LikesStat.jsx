import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from "../config";
// import '../styles/login.css';
import DatePicker from "react-datepicker";

function LikesStat({ setShowLikesStat }) {
    const [date_from, setDateFrom] = useState("");
    const [date_to, setDateTo] = useState("");
    const [data, setData] = useState("");


    const handleLikesStat = () => {
        axios.get(API_URL + '/analitics', {

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
            <h1>Likes of your posts</h1>
            <div>
            <DatePicker/>
            </div>
            <div className='auth-button-container'>
                <button onClick={handleLikesStat}>Get data</button>
                <button onClick={handleClose}>Cancel</button>
            </div>

            <label>likes data: {JSON.stringify(data)} </label>

        </div>
    );
}

export default LikesStat;