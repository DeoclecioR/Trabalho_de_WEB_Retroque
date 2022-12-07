import { SignOut } from "phosphor-react";
import { Button } from "../../../components/Button";
import Cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const Config = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove('userToken');
    Cookie.remove('userName');
    navigate('/');
  }

  return (
    <section id="profile-adverts-container">
      <header id="profile-adverts-header">
        <div>
          <h3>Configurações</h3>
          <p>Edite sua conta aqui</p>
        </div>
        <Button onClick={handleLogout} icon={<SignOut />} value="Sair desta conta" />
      </header>
    </section>
  )
}