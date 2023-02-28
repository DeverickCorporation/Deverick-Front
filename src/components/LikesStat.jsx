import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config";
import LikesList from './LikesList';

function LikesStat({ setShowLikesStat }) {

    var def_date_from = new Date();
    def_date_from.setDate(def_date_from.getDate() - 5);
    var def_date_to = new Date();
    def_date_to.setDate(def_date_to.getDate() + 2);

    const [date_from, setDateFrom] = useState(def_date_from);
    const [date_to, setDateTo] = useState(def_date_to);
    const [data, setData] = useState("");

    console.log(formatDate(date_from))

    function formatDate(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)
    }
    function handleLikesStat() {
        axios.get(API_URL + '/analitics', {

            headers: {
                "jwt-token": localStorage.getItem("jwt_token")
            },
            params: { date_from: formatDate(date_from), date_to: formatDate(date_to) }
        })
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Likes of your posts</h1>
            <div>
                <label>Date from</label>
                <DatePicker selected={date_from} onChange={(date) => setDateFrom(date)} />
                <label>Date to</label>
                <DatePicker selected={date_to} onChange={(date) => setDateTo(date)} />
            </div>
            <div className='auth-button-container'>
                <button onClick={() => setShowLikesStat(false)}>Cancel</button>
                <button onClick={handleLikesStat}>Get data</button>
            </div>
            <LikesList likes_data={data} />

        </div>
    );
}

export default LikesStat;