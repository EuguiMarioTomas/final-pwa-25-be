import User from '../models/userModels';
import { Request, Response } from 'express';


//CREACION DE USUARIOS
const createUser = async(req: Request, res: Response) =>{
  try{
    const {userName, email, firebaseUid} = req.body;
    if(!firebaseUid){
      res.status(400).json({
        message: 'Falta el id de firebase.🔴',
        error: true,
      });
      return;
    }
    const existingUser = await User.findOne({
      $or: [{email}, {firebaseUid}],
    });
    if(existingUser){
      res.status(409).json({
        message: 'El usuario ya existe.🟡',
        error: true,
      });
      return;
    }
    
    const newUser = new User({userName, email, firebaseUid});
    await newUser.save();
    res.status(201).json({
      message: 'Usuario registrado correctamente.🟢',
      data: newUser,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al intentar registrar el usuario.🔴',
      error: error.message,
    });
  }
};

//Obtener usuario por ID de firebase
const getUserByFirebaseUid = async(req: Request, res: Response) => {
  try{
    const {firebaseUid} = req.params;
    const user = await User.findOne({firebaseUid});
    if(!user){
      return res.status(404).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
    })};
    res.status(200).json({
      message: 'Usuario encontrado.🟢',
      data: user,
      error: false,
    });
  }catch(error: any){
    res.status(500).json({
      message: 'Error al intentar obtener el usuario.🔴',
      error: error.message,
    });
  }
};

//OBTENER USUARIO POR EMAIL
const getUserByEmail = async(req: Request, res: Response)=>{
  try{
    const {email} = req.params;
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
      });
    }

    res.status(200).json({
      message: 'Usuario encontrado.🟢',
      data: user,
      error: false,
    });
  }catch(error:any){
    res.status(500).json({
      message:'Error al buscar usuario por Email.🔴',
      error: error.message,
    });
    
  }
}


//ACTUALIZAR USUARIO
const updateUser = async(req:Request, res:Response) =>{
  try{
    const {id} = req.params;
    const {userName, password} = req.body;
    const user = await User.findByIdAndUpdate(id,{userName, password},{new: true, runValidation: true});
    if(!user){
      res.status(400).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
      });
      return;
    };
    res.status(200).json({
      message: 'Usuario editado exitosamente.🟢',
      data: user,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al intentar editar el usuario.🔴',
      error: error.message,
    });
  }
};

//BAJA FISICA USUARIO
const deleteUser = async(req:Request, res:Response) =>{
  try{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
      res.status(400).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
      });
      return;
    };
    res.status(200).json({
      message: 'Usuario eliminado correctamente.🟢',
      data: user,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al intentar eliminar el usuario.🔴',
      error: error.message,
    });
  }
};

//BAJA LOGICA USUARIO
const softDeleteUser = async(req:Request, res:Response) =>{
  try{  
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
      res.status(400).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
      });
      return;
    };
    const newStatus = !user.isActive;
    const updatedUser = await User.findByIdAndUpdate(id, {isActive: newStatus}, {new: true, runValidators: true});
    res.status(200).json({
      message: newStatus ? 'Usuario activado correctamente.🟢' : 'Usuario desactivado correctamente.🟢',
      data: updatedUser,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al intentar desactivar al usuario.🔴',
      error: error.message,
    });
  }
};

export {
  createUser,
  getUserByFirebaseUid,
  getUserByEmail,
  updateUser,
  deleteUser,
  softDeleteUser,
};