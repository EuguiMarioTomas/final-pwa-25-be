import app from './apps';
import connectDB from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () =>{
  try{
    await connectDB();
    app.listen(PORT,() =>{
      console.log('Servidor corriento en http://localhost:${PORT}.🟢');
    });
  }catch(error){
    console.error('Error al intentar iniciar el servidor.🔴');
    process.exit(1);
  }
};

startServer();