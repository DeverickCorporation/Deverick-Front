import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';

function UserActivity() {

    const [data, setData] = useState("");
    const last_login = new Date(data["last_login"] * 1000).toLocaleString();
    const last_request = new Date(data["last_request"] * 1000).toLocaleString();

    async function fetchActivity() {
        try {
            const response = await axios.get(API_URL + '/my_activity', {
                headers: {
                    "jwt-token": localStorage.getItem("jwt_token")
                }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchActivity();
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }


    return (
        <div>
            <h1>Your Activity</h1>
            <br />
            <label>Last login: {last_login} </label>
            <br />
            <label>Last request: {last_request} </label>
        </div>
    );
}

export default UserActivity;