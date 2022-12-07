import logo from '../../assets/logo.png';
import { TextField } from '../../components/TextField';
import './register.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie'
import { addMonths } from 'date-fns'
import { useState } from 'react';

const phoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/

const schema = yup
  .object({
    name: yup.string().min(6, 'Minimo de 6 letras').required('Esse campo é obrigatório'),
    email: yup.string().email('Digite um email válido').required('Esse campo é obrigatório'),
    phone: yup.string().matches(phoneRegExp, 'Digite um telefone válido: (99) 99999-9999'),
    address: yup.string(),
    password: yup
      .string()
      .min(10, 'Senha fraca! Mínimo de 10 caracteres')
      .max(20, 'Senha longa! Máximo de 20 caracteres')
      .required('Esse campo é obrigatório'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
      .required('Esse campo é obrigatório'),

  })
  .required();

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  passwordConfirmation: string;
}

const Register = () => {

  const navigate = useNavigate();
  const [err, setErr] = useState({ type: 'undefined', message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    await fetch('http://localhost:3333/user', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
      },
      body: `{"nome": "${data.name}","endereco": "${data.address}","email": "${data.email}","senha": "${data.password}","contato": "${data.phone}"}`,
    }).then(r => r.json())
      .then(jsonResponse => {
        if (jsonResponse._id) {
          Cookie.set('userToken', jsonResponse._id, {
            expires: addMonths(new Date(), 1)
          });
          Cookie.set('userName', jsonResponse.nome, {
            expires: addMonths(new Date(), 1)
          });
          navigate('/');
        } else {
          throw new Error('Erro ao registrar');
        }
      })
      .catch(err => {
        console.log(err);
        setErr({ type: 'error', message: 'Erro ao registrar, confirme os dados e tente novamente' });
      })
  };

  return (
    <>
      <main className='limit'>

        <section id='loginContainer'>
          <img src={logo} alt="Logo da Retroque" width={141} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              name={register('name').name}
              register={register('name')}
              error={errors.name}
              forceError={err.message?.length ? true : false}
            />
            <TextField
              label="Email"
              name={register('email').name}
              register={register('email')}
              error={errors.email}
              forceError={err.message?.length ? true : false}
            />
            <TextField
              label="Endereço"
              name={register('address').name}
              register={register('address')}
              error={errors.address}
              forceError={err.message?.length ? true : false}
            />
            <TextField
              label="Telefone"
              name={register('phone').name}
              register={register('phone')}
              error={errors.phone}
              forceError={err.message?.length ? true : false}
            />
            <div id='passwordsContainer'>
              <TextField
                label="Senha"
                type="password"
                name={register('password').name}
                register={register('password')}
                error={err.message?.length ? err : errors.password}
              />
              <TextField
                label="Confirmar senha"
                type="password"
                name={register('passwordConfirmation').name}
                register={register('passwordConfirmation')}
                error={errors.passwordConfirmation}
                forceError={err.message?.length ? true : false}
              />
            </div>
            <p id='recoveryMessage'>
              Esqueceu a senha? <Link to="#">Recuperar</Link>
            </p>
            <Button value='Registrar' type="submit" />
            <Button onClick={() => navigate('/entrar')} value='Entrar com minha conta' mode='stroked' />
          </form>

        </section>

      </main>
    </>
  );
}

export default Register;