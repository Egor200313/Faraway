import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.js';
import { Offers } from './components/Offers.js';
import { SearchPage } from './components/Search.js';
import { SearchZone } from './components/SearchZone.js';
import { LoginPage } from './components/LoginPage.js';
import { Register } from './components/Register.js';
import { NotFound } from './components/NotFound.js';
import './index.css';
import { Welcome } from './components/Welcome.js';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store.js';
import { Profile } from './components/Profile.js';
import { ajaxMainService } from './service/ajaxService.js';
import { setUser } from './features/user/userSlice.js';
import { useDispatch } from 'react-redux';

function Footer() {
  return <div className="footer">©Egor Burdin, 2022. All rights reserved.</div>;
}

function MainPage(props) {
  return (
    <div className="content">
      <div id="searchzone"></div>
      <SearchZone />
      <Offers />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS')) {
      ajaxMainService('/user/current/').then((data) => {
        dispatch(setUser(data));
      });
    }
  }, []);

  const user = useSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<MainPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route exact path="/greeting/:name" element={<Welcome />} />
        <Route path="/profile" element={user ? <Profile /> : <MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
