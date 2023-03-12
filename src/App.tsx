import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import { useAppDispatch, useAppSelector } from './app/hook';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser) {
        dispatch(
          login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayname: loginUser.displayName,
        })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? 
      (
        <>
          <Sidebar />

          <Chat />
        </>
      ): (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
