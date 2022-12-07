import { BellSimple, UserCircle } from 'phosphor-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';
import { Nav } from './Nav';
import Cookie from 'js-cookie';
import './style.css';

export const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('')
  const userToken = Cookie.get('userToken')
  return (
    <header className='limit'>
      <div id='header-container'>

        <section id='logo-and-search'>
          <img onClick={() => navigate('/')} src={logo} alt="Logo da Retroque" width={141} />

          <SearchBar
            label='Busque aqui um item'
            name='productSearch'
            value={searchValue}
            setValue={setSearchValue}
          />
        </section>

        <section id='nav-and-actions'>
          <Nav />

          {userToken &&
            <div className='actions-container'>
              <Button value={<BellSimple />} mode='icon' />
              <Button onClick={() => navigate('/perfil/anuncios')} value={<UserCircle size={42} />} mode='icon' />
            </div>
          }

          {!userToken &&
            <div className='actions-container'>
              <Button onClick={() => navigate('/entrar')} value='Entrar' mode='text' />
              <Button onClick={() => navigate('/registrar')} value='Quero trocar' />
            </div>
          }
        </section>

      </div>
    </header>
  )
}