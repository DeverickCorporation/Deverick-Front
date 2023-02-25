import jwtDecode from 'jwt-decode';
import React from 'react';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import WritePosts from './WritePost';
import UserActivity from './UserActivity';
import LikesStat from './LikesStat';

function MainPage({ jwt_token, setJwtToken }) {
  let user_data = jwtDecode(jwt_token)
  console.log(user_data)

  const [data, setData] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showLikesStat, setShowLikesStat] = useState(false);


  const handleLogout = () => {
    console.log("Loged out");
    localStorage.clear()
    setJwtToken(false)
  }

  const handleCreatePost = () => {
    console.log("handleCreatePost");
    setShowCreatePost(true)
  }

  const handleShowActivity = () => {
    console.log("handleCreatePost");
    setShowActivity(true)
  }

  const handleShowLikesStat = () => {
    console.log("handleShowLikesStat");
    setShowLikesStat(true)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL + '/posts', {
          headers: {
            "jwt-token": jwt_token
          },
          params: { limit: 5 }
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

  console.log(data)

  return (
    <div>
      <h1>Main Page</h1>

      <label>{user_data["name"]}</label>
      <button onClick={handleLogout}>Logout</button>
      {showCreatePost ? <WritePosts setShowCreatePost={setShowCreatePost} /> : <button onClick={handleCreatePost}>Create post</button>}
      {showActivity ? <UserActivity setShowActivity={setShowActivity} /> : <button onClick={handleShowActivity}>My activity</button>}

      <br />
      {showLikesStat ?
      <LikesStat /> : 
      <label>{JSON.stringify(data["posts_dict"], null, 2)}</label>
      }

    </div>
  );
}

export default MainPage;