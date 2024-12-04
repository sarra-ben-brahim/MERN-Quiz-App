import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import './index.css';



ReactDOM.render(
  <Auth0Provider
    domain="https://dev-5sm5p7w7htjuv0ne.eu.auth0.com"
    clientId="sakss2MWYNsFQH4S6daKnB2pG5ArWiA"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
