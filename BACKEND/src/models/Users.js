import mongoose from '../database/index.js';
  

//Schema do usuario
const UsersSchema = new mongoose.Schema({

  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  contato: {
    type: String,
    required: true,
  },
  data_de_criacao: {
    type: Date,
    default: Date.now,
  }
});


const User = mongoose.model('User', UsersSchema);
////////////////////////////////////////////////////////////////



//Exportando modulos
export default User;