import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../asset/signin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../utils/authSlice';
import { url } from '../utils/const';

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        console.log('res', res);
        setCookie('token', res.data.token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate replace to="/" />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={onSignIn}>
          <label className="email-label" htmlFor="email">
            メールアドレス
          </label>
          <br />
          <input type="email" id="email" className="email-input" onChange={handleEmailChange} />
          <br />
          <label className="password-label" htmlFor="password">
            パスワード
          </label>
          <br />
          <input
            type="password"
            id="password"
            className="password-input"
            onChange={handlePasswordChange}
          />
          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};
