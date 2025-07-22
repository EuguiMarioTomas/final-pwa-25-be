import { Request, Response } from "express";
import Reminder from "../models/reminderModels";
import User from "../models/userModels";

//Crear recordatorio
const createReminder = async(req: Request, res: Response) =>{
  try{
    const {title, description, type, authorId} = req.body;
    const author = await User.findById(authorId);
    if(!author){
      res.status(400).json({
        message: 'Autor es necesario para crear un recordatorio.🟡',
        error: true,
      });
      return;
    }
    const newReminder = new Reminder({title, description, type, author: authorId, sharedWith:[],});
    await newReminder.save();
    res.status(201).json({
      message: 'Recordatorio creado exitosamente.🟢',
      data: newReminder,
      error: false,
    });
  }catch(error){
    res.status(400).json({
      message: 'Error al crear el Recordatorio.🔴\n Intente nuevamente.',
      error: true,
    });
  }
};

//Actualizar recordatorios
const updateReminder = async(req: Request, res: Response)=>{
  try{
    const {id} = req.params;
    const {title, description, type} = req.body;
    const reminder = await Reminder.findByIdAndUpdate(id,{title, description, type}, {new: true, runValidators: true});
    if(!reminder){
      res.status(404).json({
        message: 'Recordatorio no encontrado.🟡',
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: 'Recordatorio actualizado exitosamente.🟢',
      data: reminder,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      error: error.message,
    });
  }
};

const sharedWith = async(req: Request, res: Response)=>{
  try{
    const {reminderId} = req.params;
    const {userId} = req.body;
    console.log('ID de Recordatorio:', reminderId, '\nID de Usuario:', userId);
    const user = await User.findById(userId);
    if(!user){
      res.status(404).json({
        message: 'Usuario no encontrado.🔴',
        error: true,
      });
      return;
    }
    const reminder = await Reminder.findByIdAndUpdate(reminderId,{$addToSet:{sharedWith:userId}}, {new: true});
    if(!reminder){
      res.status(404).json({
        message: 'Recordatorio no encontrado.🔴',
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: 'Se compartio correctamente el recordatorio.🟢',
      data: reminder,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      error: error.message,
    });
  }
}

const softDeleteReminder = async(req: Request, res: Response) =>{
  try{
    const {reminderId} = req.params;
    const reminder = await Reminder.findById(reminderId);
    if(!reminder){
      res.status(404).json({
        message: 'Recordatorio no encontrado.🔴',
        error: true,
      });
      return;
    }
    const wasArchived = reminder.isArchived;
    reminder.isArchived = !reminder.isArchived;
    await reminder.save();
    let responseMessage: string;
    if (wasArchived) {
      responseMessage = 'Recordatorio restaurado exitosamente.🟢';
    } else {
      responseMessage = 'Recordatorio archivado exitosamente.🟢';
    }
    res.status(200).json({
      message: responseMessage,
      data: reminder,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al intentar archivar o restaurar el recordatorio.🔴',
      error: error.message,
    });
  }
}

export{
  createReminder,
  updateReminder,
  sharedWith,
  softDeleteReminder
}