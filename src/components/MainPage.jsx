import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Logout_image from '../logout.png';
import Avatar from '../github-octocat.png'
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
  const [isOpen, setIsOpen] = useState(false);
  const [IsOpenActivity, setIsOpenActivity] = useState(false);


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
          params: { limit: 50 }
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

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const togglePopupActivity = () => {
    setIsOpenActivity(!IsOpenActivity);
  }

  console.log(posts_list)

  return (
    <div className='main-page'>
      <header>
        <img className='logout' onClick={handleLogout} src={Logout_image} alt="Logout"></img>
      </header>
      <hr className='under-header'></hr>
      <div className='container-main'>
        <aside>
          <div className='avatar'></div>
          <p className='name'>{user_data["name"]}</p>
          <p className='login'>{user_data["login"]}</p>
          <button onClick={togglePopup} className='create-post'>Create post</button>
          <button onClick={togglePopupActivity} className='my-activity'>My activity</button>
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
            <PostList posts_list={posts_list} />
          }
        </main>
      </div>

      {isOpen && <Popup
        content={
          <WritePosts setShowCreatePost={setIsOpen} />
        }
        handleClose={togglePopup}
      />}

      {IsOpenActivity && <Popup
        content={
          <UserActivity setShowActivity={setIsOpenActivity} />
        }
        handleClose={togglePopupActivity}
      />}

    </div>

  );
}

export default MainPage;