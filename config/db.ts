import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); //carg variables de entorno 

const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI ?? '');

    console.log('MongoDB se conecto correctamente.🟢');
  }catch(error){
    console.error('MongoDB no se ha podido conectar.🔴');
    process.exit(1);
  }
};
export default connectDB;