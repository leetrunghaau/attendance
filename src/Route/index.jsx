import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { configureFakeBackend, authHeader, handleResponse } from '../Services/fack.backend';
import Callback from '../Auth/Callback';
import Loader from '../Layout/Loader';
import { authRoutes } from './AuthRoutes';
import LayoutRoutes from '../Route/LayoutRoutes';
import Signin from '../Auth/Signin';
import PrivateRoute from './PrivateRoute';
import { classes } from '../Data/Layouts';
import { LocalStorageKey } from '../Util/define';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAsnc } from '../redux/actions/loginAction';
import jwt from 'jwt-decode'

// setup fake backend
configureFakeBackend();
const Routers = () => {
  const dispatch=useDispatch();
  let jwt_token = null;
  console.log("ACCESS ROUTE...");
  const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
  if (loginInfo) {    
    let expiration = moment(loginInfo.expiration);

    var now =moment();
    console.log("EXPIRATEION=",expiration,"---now---",now);
    console.log("DIFF=",now.diff(expiration, "seconds"));
    if(now.diff(expiration, "seconds") < 0 )
    {
      jwt_token = loginInfo.token;
      var decodedToken = jwt(jwt_token);
      loginInfo.details={
        UserName:decodedToken.UserName,
        HoTen:decodedToken.HoTen,
        DonVi:decodedToken.DonVi,
        TenDonVi:decodedToken.TenDonVi,
        Role:decodedToken.Role,
        Khoi:decodedToken.Khoi
      };
      
      //loginInfo.permission=JSON.parse(decodedToken.Permission);
      dispatch(loginSuccessAsnc(loginInfo))
    }
    else
      dispatch(loginSuccessAsnc({token:null}))
  }
 
  console.log("TOKEN ON ROUTER==========>",jwt_token);
  const defaultLayoutObj = classes.find((item) => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    let abortController = new AbortController();
    const requestOptions = { method: 'GET', headers: authHeader() };
    fetch('/users', requestOptions).then(handleResponse);

    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter basename={'/'}>
      {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          <Route path={'/'} element={<PrivateRoute />}>
            {jwt_token!=null ? (
              <>
                <Route exact path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/danhmuc/nhasanxuat/:layout`} />} />
                <Route exact path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/danhmuc/nhasanxuat/:layout`} />} />
              </>
            ) : (
              <>
              <Route exact path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/login`} />} />
              <Route exact path={`/*`} element={<Navigate to={`${process.env.PUBLIC_URL}/login`} />} />
              </>
            )}
            <Route path={`/*`} element={<LayoutRoutes />} />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
          {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))}
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
};

export default Routers;
