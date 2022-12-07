import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie';

import './productRegister.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    img_url: yup.string().required('Esse campo é obrigatório'),
    name: yup.string().required('Esse campo é obrigatório'),
    description: yup.string().required('Esse campo é obrigatório'),
    category: yup.string().required('Esse campo é obrigatório'),
    qnt: yup.number().required('Esse campo é obrigatório'),
    deliveryMethod: yup.string().required('Esse campo é obrigatório'),
  })
  .required();

interface productRegisterForm {
  img_url: string;
  name: string;
  description: string;
  category: string;
  qnt: number;
  deliveryMethod: string;
}

export const ProductRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productRegisterForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const userToken = Cookie.get('userToken')
  const navigate = useNavigate()
  const [err, setErr] = useState({ type: 'undefined', message: '' });

  const onSubmit = async (data: productRegisterForm) => {
    await fetch(`http://localhost:3333/item?owner_id=${userToken}`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
      },
      body: `{"nome": "${data.name}", "descricao": "${data.description}", "categoria": "${data.category}", "img_url": "${data.img_url}", "quantidade": ${data.qnt}, "formas_de_entrega": "${data.deliveryMethod}"}`,
    }).then(r => r.json())
      .then(jsonResponse => {

        if (jsonResponse.error) {
          throw new Error('Erro ao registrar');
        } else {
          navigate('/perfil/anuncios');
        }
      })
      .catch(err => {
        console.log(err);
        setErr({ type: 'error', message: 'Error ao registrar produto' });
      })
  };

  return (
    <main className='limit'>
      <form id='product-register-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome do produto"
          name={register('name').name}
          register={register('name')}
          error={errors.name}
        />
        <TextField
          label="Url da imagem"
          name={register('img_url').name}
          register={register('img_url')}
          error={errors.img_url}
        />
        <TextField
          label="Descrição"
          name={register('description').name}
          register={register('description')}
          error={errors.description}
        />
        <TextField
          label="Categoria"
          name={register('category').name}
          register={register('category')}
          error={errors.category}
        />
        <TextField
          label="Quantidade"
          name={register('qnt').name}
          register={register('qnt')}
          error={errors.qnt}
        />
        <TextField
          label="Forma de entrega"
          name={register('deliveryMethod').name}
          register={register('deliveryMethod')}
          error={errors.deliveryMethod}
        />
        <Button value='Cadastrar produto' type="submit" />
      </form>
    </main>
  )
}