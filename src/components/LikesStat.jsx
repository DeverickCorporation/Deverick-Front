import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
    const [likes_data, setDataLikes] = useState("");

    const [resp, setResp] = useState("");


    console.log(formatDate(date_from))

    function formatDate(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)
    }

    async function handleLikesStat() {
        try {
            const response = await axios.get(API_URL + '/analitics', {
                headers: { "jwt-token": localStorage.getItem("jwt_token") },
                params: { date_from: formatDate(date_from), date_to: formatDate(date_to) }
            });
            setDataLikes(response.data);
            setResp(response.status)
            console.log("likes loaded")
        } catch (error) {
            setResp(error.response.status)
            if (error.response.status === 409) {
                setDataLikes(error.response.data.message);
            }
            console.error(error);

        }
    }

    useEffect(() => {
        handleLikesStat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className='likesstat'>
            <h2>Likes of your posts</h2>
            <div className='data-input-container'>
                <div>
                    <label className='data-label'>Date from</label>
                    <DatePicker selected={date_from} onChange={(date) => setDateFrom(date)} />
                </div>
                <div>
                    <label className='data-label'>Date to</label>
                    <DatePicker selected={date_to} onChange={(date) => setDateTo(date)} />
                </div>
            </div>
            <div className='main-buttons-container'>
                <button onClick={() => setShowLikesStat(false)}>Cancel</button>
                <button onClick={handleLikesStat}>Get data</button>
            </div>
            {
                resp === 200 ? <LikesList likes_data={likes_data} /> :
                    resp === 409 ? <p>You don't have any posts yet</p> :
                        resp === 400 ? <p>Bad request</p> :
                            <p>Loading...</p>
            }
        </div>
    );
}

export default LikesStat;