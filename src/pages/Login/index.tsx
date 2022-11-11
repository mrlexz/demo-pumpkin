import React, { useContext, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
import { GoogleAuthContext } from '../../App';
import { Navigate } from 'react-router-dom';

import './styles.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

function Login() {

  const { setProfile, profile } = useContext(GoogleAuthContext);

  useEffect(() => {
    const initClient = () => {
        gapi.client.init({
        clientId,
        scope: ''
      });
     };
    gapi.load('client:auth2', initClient);
 });

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in res) { 
      setProfile(res?.profileObj);
    }
  };
  const onFailure = (err: any) => {
    console.log('failed:', err);
  };

  if (profile) {
    return <Navigate to="/list" replace={true} />
  }
  
  return (
    <div className="card">
      <div className="card-block">
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  )
}

export default Login