import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {Route, RouterProvider, createRoutesFromElements} from "react-router";
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App/>} />)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router = {router}/>
  </Provider>
);
