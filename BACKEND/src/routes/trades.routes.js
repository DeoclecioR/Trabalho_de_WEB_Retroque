import { Router } from 'express';
import tradesController from '../controllers/TradesController.js';

//Criando rotas referentes aos itens
const tradesRoutes = Router();


  ///Adição
  tradesRoutes.post('/', tradesController.store);


  ///Listagem
  tradesRoutes.get('/', tradesController.show);


  ///Busca
  tradesRoutes.put('/:id', tradesController.update);



  ///Exclusão
  tradesRoutes.delete('/:id', tradesController.destroy);


export default tradesRoutes;