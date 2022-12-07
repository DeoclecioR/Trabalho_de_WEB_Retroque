import { Router } from 'express';
import itensController from '../controllers/ItensController.js';

//Criando rotas referentes aos itens
const itensRoutes = Router();


  ///Adição
  itensRoutes.post('/', itensController.store);


  ///Listagem
  itensRoutes.get('/', itensController.show);


  ///Busca
  itensRoutes.put('/:id', itensController.update);



  ///Exclusão
  itensRoutes.delete('/:id', itensController.destroy);


export default itensRoutes;