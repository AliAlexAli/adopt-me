import { ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.css';
import AuthPages from './components/AuthForms/AuthPages';
import Login from './components/AuthForms/Login';
import Register from './components/AuthForms/Register';
import PetAdd from './components/Pets/PetAdd/PetAdd';
import PetProfile from './components/Pets/PetProfile/PetProfile';
import Pets from './components/Pets/Pets';
import PetList from './components/Pets/PetList';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CookieModal from './components/Modal/CookieModal';
import NotFound from './components/NotFound/NotFound';
import AuthContextProvider from './components/AuthContextProvider';
import UserProfile from './components/User/UserProfile/UserProfile';
import Store from './store/store';
import { appTheme } from './themes/theme';

function App() {
  const cookies = new Cookies();
  const [cookieConsent, setCookieConsent] = useState(cookies.get('consent'));

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <React.StrictMode>
          <Provider store={Store} >
            <AuthContextProvider>
              {!cookieConsent && < CookieModal setCookieConsent={setCookieConsent} />}
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/bejelentkezes' element={<Login />} />
                <Route path='/regisztracio' element={<Register />} />
                <Route path="" element={<AuthPages />}>
                  <Route path='/profilom' element={<UserProfile />} />
                  <Route path='/kutyaim' element={<Pets own />}>
                    <Route index element={<PetList />} />
                    <Route path=":page" element={<PetList />} />
                  </Route>
                  <Route path="/kutyaim/add" element={<PetAdd />} />
                </Route>
                <Route path='/kutyak' element={<Pets />}>
                  <Route index element={<PetList />} />
                  <Route path=":page" element={<PetList />} />
                </Route>
                <Route path='/kutya/:id/' element={<PetProfile />}>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </AuthContextProvider>
          </Provider>
        </React.StrictMode>
      </BrowserRouter >
    </ThemeProvider >
  );
}

export default App;
