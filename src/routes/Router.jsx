import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { NewTask } from '../pages/NewTask';
import { NewList } from '../pages/NewList';
import { EditTask } from '../pages/EditTask';
import { SignUp } from '../pages/SignUp';
import { EditList } from '../pages/EditList';
import Test from '../pages/test';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={auth ? <Home /> : <Navigate replace to="/signin" />} />
        <Route
          exact
          path="/task/new"
          element={auth ? <NewTask /> : <Navigate replace to="/signin" />}
        />
        <Route
          exact
          path="/list/new"
          element={auth ? <NewList /> : <Navigate replace to="/signin" />}
        />
        <Route
          exact
          path="/lists/:listId/tasks/:taskId"
          element={auth ? <EditTask /> : <Navigate replace to="/signin" />}
        />
        <Route
          exact
          path="/lists/:listId/edit"
          element={auth ? <EditList /> : <Navigate replace to="/signin" />}
        />
        <Route element={NotFound} />
        <Route exact path="/test" element={auth ? <Test /> : <Navigate replace to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
};
