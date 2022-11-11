import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PublicPage from './pages/PublicPage';
import List from './pages/List';
import { ProfileObj } from './services/profile/types';
import PrivateRoute from './Routers/PrivateRoute';
import PublicRoute from './Routers/PublicRoute';

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
            <Route path="/" element={<PublicPage />} />
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
    </div>
  );
}

export default App;
