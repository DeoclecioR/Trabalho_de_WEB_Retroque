import logo from '../../assets/logo.png';
import { TextField } from '../../components/TextField';
import './login.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie'
import { addMonths } from 'date-fns'
import { useState } from 'react';

const schema = yup
  .object({
    login: yup.string().email('Insira um email válido').required('Esse campo é obrigatório'),
    password: yup.string().required('Esse campo é obrigatório'),
  })
  .required();

interface LoginForm {
  login: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState({ type: 'undefined', message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    await fetch('http://localhost:3333/user/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
      },
      body: `{"email": "${data.login}","senha": "${data.password}"}`,
    }).then(r => r.json())
      .then(jsonResponse => {

        if (jsonResponse.error) {
          throw new Error('Erro ao registrar');
        } else {
          Cookie.set('userToken', jsonResponse, {
            expires: addMonths(new Date(), 1)
          });
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
        setErr({ type: 'error', message: 'Email ou senha incorretos' });
      })
  };

  return (
    <>
      <main className='limit'>

        <section id='loginContainer'>
          <img src={logo} alt="Logo da Retroque" width={141} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              name={register('login').name}
              register={register('login')}
              error={errors.login}
              forceError={err.message?.length ? true : false}
            />
            <TextField
              label="Senha"
              type="password"
              name={register('password').name}
              register={register('password')}
              error={err.message?.length ? err : errors.password}
            />
            <p id='recoveryMessage'>
              Esqueceu a senha? <Link to="#">Recuperar</Link>
            </p>
            <Button value='Entrar' type="submit" />
            <Button onClick={() => navigate('/registrar')} value='Criar conta' mode='stroked' />
          </form>

        </section>

      </main>
    </>
  );
}

export default Login;