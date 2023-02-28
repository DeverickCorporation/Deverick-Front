import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Logout_image from '../images/logout.png';
import '../styles/mainPage.css';
import LikesStat from './LikesStat';
import Popup from './Popup';
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
    async function verifyToken() {
      try {
        const response = await axios.get(API_URL + '/check_auth',
          { headers: { "jwt-token": localStorage.getItem("jwt_token") } });

        console.log(response.data.message);
      } catch (error) {
        console.error(error.response.data.message);
        if (error.response.status === 403) {
          handleLogout()
        }

      }
    }
    verifyToken();
  }, []);


  async function fetchPosts() {
    try {
      const response = await axios.get(API_URL + '/posts',
        {
          headers: { "jwt-token": localStorage.getItem("jwt_token") },
          params: { limit: 50 }
        });
      setPostsList(response.data["posts_dict"]);
      console.log("posts loaded")
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [showCreatePost]);


  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  }

  const toggleShowActivity = () => {
    setShowActivity(!showActivity);
  }

  return (
    <div className='main-page'>
      <header>
        <h1 className='starnavi-label'>StarNavi-Network</h1>
        <img className='logout' onClick={handleLogout} src={Logout_image} alt="Logout"></img>
      </header>
      <hr className='under-header'></hr>
      <div className='container-main'>
        <aside>
          <div className='avatar'></div>
          <p className='name'>{user_data["name"]}</p>
          <p className='login'>{user_data["login"]}</p>
          <button onClick={toggleShowCreatePost} className='create-post'>Create post</button>
          <button onClick={toggleShowActivity} className='my-activity'>My activity</button>
        </aside>
        <main>

          {showLikesStat ?
            <div className='status-bar'>
              <div onClick={() => setShowLikesStat(false)} className='Posts'>
                <p className=''>Posts</p>
              </div>
              <div className='Likes'>
                <p className='active'>Likes</p>
              </div>
            </div>
            :
            <div className='status-bar'>
              <div className='Posts'>
                <p className='active'>Posts</p>
              </div>
              <div onClick={() => setShowLikesStat(true)} className='Likes'>
                <p className=''>Likes</p>
              </div>
            </div>}

          {showLikesStat ?
            <LikesStat setShowLikesStat={setShowLikesStat} /> :
            posts_list ? <PostList posts_list={posts_list} /> : <p>Loading...</p>
          }
        </main>
      </div>

      {showCreatePost && <Popup
        content={
          <WritePosts setShowCreatePost={setShowCreatePost} />
        }
        handleClose={toggleShowCreatePost}
      />}

      {showActivity && <Popup
        content={
          <UserActivity />
        }
        handleClose={toggleShowActivity}
      />}

    </div>

  );
}

export default MainPage;