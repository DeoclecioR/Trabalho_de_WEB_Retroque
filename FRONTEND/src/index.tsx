import { IconContext } from 'phosphor-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/';

import { Header } from './layout/Header';
import Category from './pages/category';
import Login from './pages/login';
import Product from './pages/product';
import { Profile } from './pages/profile';
import { Adverts } from './pages/profile/adverts';
import { Config } from './pages/profile/edit';
import { Exchanges } from './pages/profile/exchanges';
import Register from './pages/register';
import './styles/patterns.css';
import './styles/Reset.css';
import { ProductRegister } from './pages/productRegister';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <IconContext.Provider value={{ size: 24, weight: 'duotone', }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/entrar' element={<Login />} />
          <Route path='/registrar' element={<Register />} />
          <Route path='/categoria/:slug' element={<Category />} />
          <Route path='/produto/:slug' element={<Product />} />
          <Route path='/perfil' element={<Profile />} >
            <Route path='anuncios' element={<Adverts />} />
            <Route path='trocas' element={<Exchanges />} />
            <Route path='configuracoes' element={<Config />} />
          </Route>
          <Route path='/registrar-produto' element={<ProductRegister />} />
        </Routes>
      </BrowserRouter>
    </IconContext.Provider>
  </React.StrictMode>
);
