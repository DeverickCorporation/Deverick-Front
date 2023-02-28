import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from "../config";
import '../styles/login.css';

function UserActivity({ setShowActivity }) {

    const [data, setData] = useState("");


    useEffect(() => {
        async function fetchData() {
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
        fetchData();
    }, []);

    if (!data) {
        return <p>Loading data...</p>;
    }


    return (
        <div>
            <h1>Your Activity</h1>
            <label>Last login: {data["last_login"]} </label>
            <br />
            <label>Last request: {data["last_request"]} </label>
        </div>
    );
}

export default UserActivity;