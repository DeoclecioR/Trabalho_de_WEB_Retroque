import mongoose from '../database/index.js';

//Schema da troca
const TradeSchema = new mongoose.Schema({
 
    id_user_1: {
      type: String,
      required: true,
    },
    id_item_1: {
      type: String,
      required: true,
    },
    id_user_2: {
      type: String,
      required: true,
    },
    id_item_2: {
      type: String,
      required: true,
    },
    //Para confirmar a troca entre os produtos
    aceppted_1: {
      type: Number,
    },
    aceppted_2: {
      type: Number,
    },
  });
  
  
  const Trade = mongoose.model('Trade', TradeSchema);
  ///////////////////////////////////////////////////////////////

  //Exportando modulos
export default Trade;