import Cookie from 'js-cookie';
import { Bag, GearSix, Megaphone, UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import './profile.css';

export const Profile = () => {
  const userToken = Cookie.get('userToken')
  const navigate = useNavigate()

  if (!userToken) {
    navigate('/')
  }

  const isRouteAdverts = useMatch("/perfil/anuncios")
  const isRouteExchanges = useMatch("/perfil/trocas")
  const isRouteEdit = useMatch("/perfil/editar")

  const [user, setUser] = useState({
    contato: '',
    data_de_criacao: '',
    email: '',
    endereco: '',
    nome: '',
    senha: '',
    trocas_realizadas: 0,
    __v: 0,
    _id: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:3333/user?id=${userToken}`)
        .then(response => response.json())
        .then(jsonResponse => {
          setUser(jsonResponse[0])
        })
    }
    fetchData()
  }, [])

  return (
    <main className='limit'>
      <section id="profile-container">
        <UserCircle size={196} />
        <h2>{user.nome}</h2>
        <div id="profile-info-container">
          <span>{user.email}</span>
          <span>-</span>
          <span>{user.contato}</span>
        </div>

        <nav id="profile-nav">
          <Link to="/perfil/anuncios" className={isRouteAdverts ? 'active' : ''}>
            <Megaphone /> Meus anuncios
          </Link>
          <Link to="/perfil/trocas" className={isRouteExchanges ? 'active' : ''}>
            <Bag /> Minhas trocas
          </Link>
          <Link to="/perfil/configuracoes" className={isRouteEdit ? 'active' : ''}>
            <GearSix /> Configurações
          </Link>
        </nav>

        <Outlet />
      </section>
    </main>
  )
}