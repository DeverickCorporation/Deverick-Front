import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { API_URL } from '../config';
import { GITHUB_URL } from '../config';
import Logout_image from '../images/logout.png';
import Github_logo from '../images/github-logo.png';
import Deverick_logo from '../images/logo-label.svg';
import '../styles/mainPage.css';
import LikesStat from './LikesStat';
import Popup from './Popup';
import PostList from './PostsList';
import UserActivity from './UserActivity';
import WritePosts from './WritePost';

function MainPage({ jwt_token, setJwtToken }) {
  let user_data = jwtDecode(jwt_token)
  console.log(user_data)

  let className = ""
  if (isMobile) {
    className = "mob"
  }

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

  const toggleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  }

  const toggleShowActivity = () => {
    setShowActivity(!showActivity);
  }

  return (
    <div className={className}>
      <div className='main-page'>
        <header>
          <div>
            <img src={Deverick_logo} alt='Deverick-logo' />
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><img src={Github_logo} alt='Github-logo-link' /></a>
          </div>
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
              <PostList />}
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
    </div>

  );
}

export default MainPage;