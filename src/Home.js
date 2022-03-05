import './Home.css';
import React, { useEffect, useReducer } from 'react';
import Feed from './Feed';
import Layout from './Layout';
import axios from 'axios';

function Home() {

  const [loggedIn, setLoggedIn] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      status: false,
      userData: [],
    });

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const data = JSON.parse(sessionStorage.getItem('user'));
      setLoggedIn({
        status: true,
        userData: data,
      })
    }
  }, [])

  const loginUser = () => {

    const data = {
      user: {
        email: "dasdasd@gmail.com",
        password: "dsfafsdfsd"
      }
    }

    axios.post('https://api.realworld.io/api/users/login', data)
      .then(res => {
        console.log('successfully fetched user', res)
        setLoggedIn({
          status: true,
          userData: res.data.user,
        });
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        sessionStorage.setItem('token', res.data.user.token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const user = loggedIn.userData;

  return (
    <Layout padding={false}>
      <div className={`sign-in-container light-dark ${!loggedIn.status && 'justify-content-flex-end'}`}>
        {
          !loggedIn.status ?
            <div className="sign-in-text" onClick={loginUser}>Sign in</div>
            :
            <div>
              <div className="user-info-container">
                <img className="icon" src={user.image} alt="user-icon" />
                <span>{user.username}</span>
              </div>
            </div>
        }
      </div>
      {/* {feedList.articles[0].author} */}
      <Feed />
    </Layout>
  );
}

export default Home;
