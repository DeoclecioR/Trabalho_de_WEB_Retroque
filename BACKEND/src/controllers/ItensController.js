import Item from '../models/Itens.js';

//Cria as funções das rotas referente aos itens
export default {
  async show(request, response) {
    //Para retornar uma quantidade limitada de itens deve-se passar na querystring
    // ".../item?limit=<quantidade desejada>"
    //Para pesquisar uma categoria especéfica, deve se passar como parâmetro na querystring
    // ".../item?categoria=<categoria_desejada>"
    //Para pesquisar uma lista de itens de um usuario especéfico, deve se passar como parâmetro na querystring
    // ".../item?owner_id=<id_do_usuario>"


    const { categoria } = request.query;
    const { limit } = request.query;
    const {owner_id} = request.query;
    try {
      const result = categoria
        ? await Item.find({ "categoria": categoria }).limit(limit)
        : owner_id ? await Item.find({ "owner_id": owner_id }).limit(limit) 
        : await Item.find().limit(limit);


      //const result = categoria
      //? await Item.find({"categoria": categoria},{"owner_id": owner_id}).limit(limit)
      //: await Item.find().limit(limit);

      return response.json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async store(request, response) {
    //Dever ser passado o ID do usuário que é dono do objeto a se cadastrar
    //item/<ID_do_usuário>
    const { 
      nome,
      descricao,
      categoria,
      quantidade,
      formas_de_entrega,
      img_url } = request.body;
      
      //criando Slug do item
      const slug = request.body.nome.toString().toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
      .replace(/[èÈéÉêÊëË]+/g, 'e')           // Special Characters #2
      .replace(/[ìÌíÍîÎïÏ]+/g, 'i')           // Special Characters #3
      .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')           // Special Characters #4
      .replace(/[ùÙúÚûÛüÜ]+/g, 'u')           // Special Characters #5
      .replace(/[ýÝÿŸ]+/g, 'y')               // Special Characters #6
      .replace(/[ñÑ]+/g, 'n')                   // Special Characters #7
      .replace(/[çÇ]+/g, 'c')                   // Special Characters #8
      .replace(/[ß]+/g, 'ss')                   // Special Characters #9
      .replace(/[Ææ]+/g, 'ae')                   // Special Characters #10
      .replace(/[Øøœ]+/g, 'oe')               // Special Characters #11
      .replace(/[%]+/g, 'pct')                   // Special Characters #12
      .replace(/\s+/g, '-')                   // Replace spaces with -
      .replace(/[^\w-]+/g, '')               // Remove all non-word chars
      .replace(/--+/g, '-')                 // Replace multiple - with single -
      .replace(/^-+/, '')                     // Trim - from start of text
      .replace(/-+$/, '');

    const owner_id = request.query.owner_id;
  
    const newItem = {
      nome,
      descricao,
      categoria,
      owner_id,
      quantidade,
      formas_de_entrega,
      slug,
      img_url
    }
  
    try {
      const item = await Item.create(newItem);
      return response.status(201).json(item);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async update(request, response) {
    //Deve ser passado o id do item para atualizar
    // ../item/<id_do_item> 
    const { id } = request.params;
    
    const { 
      nome,
      descricao,
      categoria,
      quantidade,
      formas_de_entrega,
      formas_de_pagamento,
      img_url } = request.body;
      //cria Slug do item
      const slug = request.body.nome.toString().toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
      .replace(/[èÈéÉêÊëË]+/g, 'e')           // Special Characters #2
      .replace(/[ìÌíÍîÎïÏ]+/g, 'i')           // Special Characters #3
      .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')           // Special Characters #4
      .replace(/[ùÙúÚûÛüÜ]+/g, 'u')           // Special Characters #5
      .replace(/[ýÝÿŸ]+/g, 'y')               // Special Characters #6
      .replace(/[ñÑ]+/g, 'n')                   // Special Characters #7
      .replace(/[çÇ]+/g, 'c')                   // Special Characters #8
      .replace(/[ß]+/g, 'ss')                   // Special Characters #9
      .replace(/[Ææ]+/g, 'ae')                   // Special Characters #10
      .replace(/[Øøœ]+/g, 'oe')               // Special Characters #11
      .replace(/[%]+/g, 'pct')                   // Special Characters #12
      .replace(/\s+/g, '-')                   // Replace spaces with -
      .replace(/[^\w-]+/g, '')               // Remove all non-word chars
      .replace(/--+/g, '-')                 // Replace multiple - with single -
      .replace(/^-+/, '')                     // Trim - from start of text
      .replace(/-+$/, '');
  
    const editedItem = {
      nome,
      descricao,
      categoria,
      quantidade,
      formas_de_entrega,
      formas_de_pagamento,
      slug,
      img_url
    }
    
    try {
      const itemUpdateInformation = await Item.updateOne({_id: id}, editedItem)
      
      if(itemUpdateInformation.matchedCount === 0){
        return response.status(404).json({ error: "Item não encontrado." });
      }
      
      return response.json(editedItem);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },

  async destroy(request, response) {
    //Deve ser passado o id do item para deletar
    // .../item/<id_do_item>
    const { id } = request.params;
  
    try {
      const itemDeleteInformation = await Item.deleteOne({_id: id})
  
      if(itemDeleteInformation.deletedCount === 0){
        return response.status(404).json({ error: "Item não encontrado." });
      }
      
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
};