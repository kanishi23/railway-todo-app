import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from '../utils/authSlice';
import '../asset/header.scss';

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [, , removeCookie] = useCookies();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    history.push('/signin');
  };

  return (
    <header className="header">
      <h1>
        <Link to="/">Todoアプリ</Link>
      </h1>
      {auth ? (
        <button onClick={handleSignOut} className="sign-out-button">
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  );
};
