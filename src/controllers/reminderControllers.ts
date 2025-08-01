import { Request, Response } from "express";
import Reminder from "../models/reminderModels";
import User from "../models/userModels";

//Crear recordatorio
const createReminder = async(req: Request, res: Response) =>{
  try{
    const {title, description, type, authorId, dueDate} = req.body;
    const author = await User.findById(authorId);
    if(!author){
      res.status(400).json({
        message: 'Autor es necesario para crear un recordatorio.🟡',
        error: true,
      });
      return;
    }
    const newReminder = new Reminder({title, description, type, author: authorId, sharedWith:[], dueDate,});
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

//Obtener recordatorios por autor
const getRemindersByAuthor = async(req:Request, res:Response)=>{
  try{
    const {authorId} = req.params;
    if(!authorId){
      res.status(400).json({
        message: 'ID de autor es necesario para obtener recordatorios.🟡',
        error: true,
      });
      return;
    }
    const reminders = await Reminder.find({
      author: authorId,
      isArchived: false, // Solo obtener recordatorios no archivados
    }).populate('sharedWith', 'userName email').sort({type: 1});
    res.status(200).json({
      message: 'Recordatorios obtenidos exitosamente.🟢',
      data: reminders,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al obtener los recordatorios del autor.🔴',
      error: error.message,
    });
  }
}

//Obtener recordatorios compartidos
const getSharedReminders = async(req: Request, res: Response) => {
  try{
    const {userId} = req.params;
    if(!userId){
      res.status(400).json({
        message: 'ID de usuario es necesario para obtener recordatorios compartidos.🟡',
        error: true,
      });
      return;
    }
    const reminders = await Reminder.find({
      sharedWith: userId,
      isArchived: false, // Solo obtener recordatorios no archivados
    }).populate('author', 'userName email').populate('sharedWith', 'userName email').sort({type: 1});
    res.status(200).json({
      message: 'Recordatorios compartidos obtenidos exitosamente.🟢',
      data: reminders,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al obtener los recordatorios compartidos.🔴',
      error: error.message,
    });
  }
}

//obtener recordatorios archivados por autor
const getArchivedRemindersByAuthor= async(req: Request, res: Response) => {
  try{
    const {authorId} = req.params;
    if(!authorId){
      res.status(400).json({
        message: 'ID de autor es necesario para obtener recordatorios archivados.🟡',
        error: true,
      });
      return;
    }
    const reminders = await Reminder.find({
      author: authorId,
      isArchived: true,
    }).populate('author', 'userName email').sort({type: 1});
    res.status(200).json({
      message: 'Recordatorios archivados obtenidos exitosamente.🟢',
      data: reminders,
      error: false,
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al obtener los recordatorios archivados.🔴',
      error: error.message,
    });
  }
}

//Autoactivacion de recordatorios
// (Esta funcionalidad no está implementada en el código actual, pero se puede agregar en el futuro si es necesario)

//Obtener recordatorios por id
const getReminderById = async(req: Request, res: Response)=>{
  try{
    const {reminderId} = req.params;
    const reminder = await Reminder.findById(reminderId);
    if(!reminder){
      return res.status(404).json({
        message:('Recordatorio no encontrado.🔴'),
        error: true,
      });
    }
    res.status(200).json({
      message:'Recordatorio obtenido.🟢',
      data: reminder,
      error: false,
    });
  }catch(error:any){
    res.status(500).json({
      message: "Error al obtener el recordatorio.🔴",
      error: error.message,
    });
  }
};

//Otener recordatorios a punto de vencer
const getUpcomingReminders = async(req:Request, res:Response)=>{
  try{
    const {authorId} = req.params;
    const now = new Date();
    const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),0,0,0,0));
    const endOfRangeUTC = new Date(startOfTodayUTC.getTime()); //Clonar la fecha de inciio
    endOfRangeUTC.setUTCDate(startOfTodayUTC.getUTCDate() + 7); //sumar 7 dias al dia utc
    endOfRangeUTC.setUTCHours(23, 59, 59, 999); //Establece la hora final del dia 7 UTC

    const reminders = await Reminder.find({
      author: authorId,
      isArchived: false,
      dueDate: {$gte: startOfTodayUTC, $lte: endOfRangeUTC} //Solo los que aun no vencieron, solo compara la fecha no las horas
    }).sort({dueDate: 1}).limit(4); //Ordenar por fecha mas proxima y maximo 4
    res.status(200).json({
      message: 'Recordatorios proximos obtenidos.🟢',
      data: reminders,
      error: false
    });
  }catch(error:any){
    res.status(400).json({
      message: 'Error al obtener recordatorios por vencer.🔴',
      error: error.message,
    });
  }
};

//Actualizar recordatorios
const updateReminder = async(req: Request, res: Response)=>{
  try{
    const {reminderId} = req.params;
    const {title, description, type, dueDate} = req.body;
    const reminder = await Reminder.findByIdAndUpdate(reminderId,{title, description, type, dueDate}, {new: true, runValidators: true});
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

//Compartir recordatorios
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

//Archivar o restaurar recordatorios
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
  getRemindersByAuthor,
  getSharedReminders,
  getArchivedRemindersByAuthor,
  getReminderById,
  getUpcomingReminders,
  updateReminder,
  sharedWith,
  softDeleteReminder
}