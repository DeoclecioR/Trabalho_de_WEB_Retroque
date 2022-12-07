import { Router } from 'express';
import usersController from '../controllers/UsersController.js';

//Criando rotas referentes aos usuários
const usersRoutes = Router();


  ///Adição
  usersRoutes.post('/', usersController.store);


  ///Listagem
  usersRoutes.get('/', usersController.show);


  ///Busca
  usersRoutes.put('/:id', usersController.update);


  ///Exclusão
  usersRoutes.delete('/:id', usersController.destroy);

  
  ///Login
  usersRoutes.post('/login', usersController.login);


export default usersRoutes;