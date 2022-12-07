import { Link } from 'react-router-dom';

import './style.css';

export const Nav: React.FC = () => {
  return (
    <nav id='headerNav'>
      <Link to="/categoria/roupas">Roupas</Link>
      <Link to="/categoria/livros">Livros</Link>
      <Link to="/categoria/acessorios">Acessórios</Link>
      <Link to="/categoria/eletronicos">Eletrônicos</Link>
      <Link to="/categoria/objetos">Objetos</Link>
    </nav>
  )
}