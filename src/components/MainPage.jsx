import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import LikesStat from './LikesStat';
import PostList from './PostsList';
import UserActivity from './UserActivity';
import WritePosts from './WritePost';

function MainPage({ jwt_token, setJwtToken }) {
  let user_data = jwtDecode(jwt_token)
  console.log(user_data)

  const [posts_list, setPostsList] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showLikesStat, setShowLikesStat] = useState(false);


  function handleLogout() {
    console.log("Loged out");
    localStorage.clear()
    setJwtToken(false)
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
        setPostsList(response.data["posts_dict"]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!posts_list) {
    return <p>Loading data...</p>;
  }

  console.log(posts_list)

  return (
    <div>
      <h1>Main Page</h1>

      <label>{user_data["name"]}</label>
      <button onClick={handleLogout}>Logout</button>
      {showCreatePost ? <WritePosts setShowCreatePost={setShowCreatePost} /> : <button onClick={() => setShowCreatePost(true)}>Create post</button>}
      {showActivity ? <UserActivity setShowActivity={setShowActivity} /> : <button onClick={() => setShowActivity(true)}>My activity</button>}
      {showLikesStat ? null : <button onClick={() => setShowLikesStat(true)}>Like statistic</button>}


      <br />
      {showLikesStat ?
        <LikesStat setShowLikesStat={setShowLikesStat} /> :
        <PostList posts_list={posts_list} />
      }

    </div>
  );
}

export default MainPage;