import mongoose from '../database/index.js';

//Schema do item
const ItemSchema = new mongoose.Schema({
 
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    owner_id: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    formas_de_entrega: {
      type: String,
      required: true,
    },
    data_de_criacao: {
      type: Date,
      default: Date.now,
    },
    img_url: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    }
  });
  
  
  const Item = mongoose.model('Item', ItemSchema);
  ///////////////////////////////////////////////////////////////

  //Exportando modulos
export default Item;