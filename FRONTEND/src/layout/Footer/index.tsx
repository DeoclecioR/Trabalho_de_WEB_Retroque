import { EnvelopeSimple } from 'phosphor-react';
import { Link } from 'react-router-dom'
import { InstaIcon } from '../../assets/instaIcon';
import { LinkedinIcon } from '../../assets/linkedinIcon';
import logo from '../../assets/whiteLogo.png';
import './styleFooter.css';

export const Footer = () => {
  return (

    <footer className='limit'>
      <section id='footer-container'>
        <img src={logo} alt="Logo da Retroque" />
        <div className="linhas">
          <div className="colum">
            <span className="name"><b>Navegação</b></span>
            <ul><Link to="/">Roupas</Link></ul>
            <ul><Link to="/">Livros</Link></ul>
            <ul><Link to="/">Acessórios</Link></ul>
            <ul><Link to="/">Eletrônicos</Link></ul>
            <ul><Link to="/">Objetos</Link></ul>
          </div>

          <div className="colum">
            <span className="name"><b>Contato</b></span>
            <ul><Link to="/"><InstaIcon /> Instagram</Link></ul>
            <ul><Link to="/"><LinkedinIcon />Linkedin</Link></ul>
            <ul><Link to="/"><EnvelopeSimple />Email</Link></ul>
          </div>

          <div className="colum">
            <span className="name"><b> Sede</b> </span>
            <ul>Sem localização fixa</ul>
          </div>
        </div>
      </section>




    </footer >

  );
};