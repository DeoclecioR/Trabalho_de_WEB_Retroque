
import Trade from '../models/Trades.js';

//Cria as funções das rotas referente as trocas
export default {
  async show(request, response) {
    //Para retornar uma quantidade limitada de trocas deve-se passar na querystring
    // ".../trade?limit=<quantidade desejada>"
    //Para retornar as trocas de um usuário deve-se passar na querystring
    // ".../trade?id_user=<id_do_usuario>"

    const { limit } = request.query;
    const { id_user } = request.query;
  
    try {
      const result = id_user
      ?await Trade.find({"id_user_1": id_user}).limit(limit)
      : id_user ? Trade.find({"id_user_2": id_user}).limit(limit)
      :await Trade.find().limit(limit);
  
      return response.json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async store(request, response) {
    const { id_user_1, 
            id_item_1, 
            id_user_2, 
            id_item_2, } = request.body;
  
    const newTrade = {
      id_user_1, 
      id_item_1, 
      id_user_2, 
      id_item_2
    }
  
    try {
      const trade = await Trade.create(newTrade);
      return response.status(201).json(trade);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async update(request, response) {
    //Deve ser passado o id da troca para atualizar
    // .../"trade/<id_da_trade>"
    const { id } = request.params;
    const { id_user_1, 
            id_item_1, 
            id_user_2, 
            id_item_2,
            accepted_1,
            accepted_2 } = request.body;
  
    const editedTrade = {
      id_user_1, 
      id_item_1, 
      id_user_2, 
      id_item_2,
      accepted_1,
      accepted_2
    }
    
    try {
      const tradeUpdateInformation = await Trade.updateOne({_id: id}, editedTrade)
      
      if(tradeUpdateInformation.matchedCount === 0){
        return response.status(404).json({ error: "Troca não encontrada." });
      }
      
      return response.json(editedTrade);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async destroy(request, response) {
    //Deve ser passado o id da troca para deletar
    // .../trade/<id_do_trade>
    const { id } = request.params;
  
    try {
      const tradeDeleteInformation = await Trade.deleteOne({_id: id})
  
      if(tradeDeleteInformation.deletedCount === 0){
        return response.status(404).json({ error: "Troca não encontrada." });
      }
      
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
};