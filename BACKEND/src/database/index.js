import mongoose from 'mongoose';

//Conectando ao banco de dados

//Para mudar o servidor, basta alterar a connectionString para a sua
//Caso haja erro de conexão certifique que seu IP está registrado na lista de IPs válidos do banco de dados
const connectionString = 
'mongodb+srv://dedev:IMsnxD0th18YxNBa@cluster0.mi1p9ay.mongodb.net/?retryWrites=true&w=majority';

//Conexão
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Banco de dados funcionando!!!");
  })
  .catch((err) => {
    console.log(err);
  })

export default mongoose;