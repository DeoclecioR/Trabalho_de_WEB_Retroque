
import User from '../models/Users.js';

//Cria as funções das rotas referente aos usuários
export default {
  async show(request, response) {
    //Para retornar uma quantidade limitada de usuarios deve-se passar na querystring
    // ".../user?limit=<quantidade desejada>"
    //Para pesquisar User por ID basta passar o id na query
    // ".../user?id=<id_desejado>"

    const { limit } = request.query;
    const { id } = request.query;
  
    try {
      const result = id 
      ?await User.find({"_id":id})
      :await User.find().limit(limit);
  
      return response.json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async store(request, response) {
    const { nome, 
            endereco, 
            email, 
            senha, 
            contato } = request.body;
  
    const newUser = {
      nome,
      endereco,
      email,
      senha,
      contato
    }
  
    try {
      const user = await User.create(newUser);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },


  async update(request, response) {
    //Deve ser passado o id do user para atualizar
    // .../user/<id_do_user>
    const { id } = request.params;
    const { nome, 
            endereco, 
            email, 
            senha, 
            contato } = request.body;
  
    const editedUser = {
      nome,
      endereco,
      email,
      senha,
      contato
    }
    
    try {
      const userUpdateInformation = await User.updateOne({_id: id}, editedUser)
      
      if(userUpdateInformation.matchedCount === 0){
        return response.status(404).json({ error: "Usuario não encontrado." });
      }
      
      return response.json(editedUser);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async destroy(request, response) {
    //Deve ser passado o id do user para deletar
    // .../user/<id_do_user>
    const { id } = request.params;
  
    try {
      const userDeleteInformation = await User.deleteOne({_id: id})
  
      if(userDeleteInformation.deletedCount === 0){
        return response.status(404).json({ error: "Usuario não encontrado." });
      }
      
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async login(request, response) {
    //Deve ser passado no body o email e senha do usuário
    //Caso haja no sistema tais dados, será retornado o ID desse usuáruio

    const { email } = request.body;
    const { senha } = request.body;
  

    try {
      const result = await User.find({"email": email});

      if(result[0].senha == senha){
        return response.json(result[0].id);
      }
      throw new Error("Senha incorreta!")
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
};