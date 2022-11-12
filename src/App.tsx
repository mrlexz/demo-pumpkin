import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import { ProfileObj } from './services/profile/types';
import PrivateRoute from './Routers/PrivateRoute';

export const GoogleAuthContext = React.createContext<{
  profile: ProfileObj | null;
  setProfile: (pf: ProfileObj) => void
}>({
  profile: null,
  setProfile: (pf: ProfileObj) => {}
})

function App() {
  const [profile, setProfile] = useState<ProfileObj | null>(null);

  return (
    <div className='App'>
      <BrowserRouter>
        <GoogleAuthContext.Provider value={{ profile, setProfile }}>
          <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/list" element={<PrivateRoute />}>
              <Route path="" element={<List />} />
            </Route>
            {/* <Route path="/login" element={<PublicRoute />}>
              <Route path="" element={<Login />} />
            </Route> */}
            <Route path="/login" element={<Login />} />
          </Routes> 
        </GoogleAuthContext.Provider>    
      </BrowserRouter>
      <div className="typewriter">
        <h3>Please ignore the result, because the result of API example does not work right, so i just add call api in this app</h3>
      </div>
    </div>
  );
}

export default App;
