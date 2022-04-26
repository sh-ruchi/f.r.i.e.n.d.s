
import {Schedule,Task} from '../models/index.js';

/**
 * Creates a Schedule Group
 * @param {String} room_name - New Schedule Group that needs to be created
 */
export const createScheduleGroup = async ({room_name,username})=>{
  const existingScheduleGroup = await getScheduleGroup(room_name);
  if(existingScheduleGroup == null){
    let data = {room_name:room_name,tasks:[]}
    const scheduleGroup = new Schedule(data);
    return scheduleGroup.save();
  }
  else{
    throw "Schedule Group Already Exists";
  }
}

/**
 * Returns Schedule Group based on name
 * @param {string} room_name - schedule group room name that needs to be returned
 */
export const getScheduleGroup =async ({room_name}) =>{
  // console.log(User.User.findOne);
  let data =  await Schedule.findOne({room_name:room_name}).exec();
  console.log({"data from findOne":data});
  return data;
}

/**
 * Adds task in Schedule Group
 * @param {Task} task - message that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
export const addTaskToScheduleGroup = async (username,room_name,task) =>{
  const data = await getScheduleGroup({room_name});
  task["created_by"]=username;
  if(data == null){
    throw "CHAT_ROOM_NOT_FOUND";
  }
  let newTask={}; 
  try{
    newTask= new Task(
    {
      'name':task.task.name,
      'users':task.task.users,
      'created_by':username,
      'current_turn':task.task.current_turn
  });
}
catch(e){
  console.log(e);
  throw e
}
  let updatedScheduleGroup;
  try{
    updatedScheduleGroup = await Schedule.findByIdAndUpdate(data.id,{$push:{tasks:[newTask]},'updated_time':new Date()},{new:true}).exec();
  }
  catch(e){
    console.log(e);
    throw e
  }
  return updatedScheduleGroup;
}


/**
 * Deletes task in Schedule Group
 * @param {Task} task - task that needs to be deleted in room
 * @param {String} room_name - room in which the user needs to be added
 */
 export const deleteTaskInScheduleGroup = async (username,room_name,task) =>{
  const data = await getScheduleGroup({room_name});
  if(data == null){
    throw "CHAT_ROOM_NOT_FOUND";
  }
  
  let deletedScheduleGroup;
  try{
    const temp_data = await Schedule.findOne({id:data.id,tasks:{$all:{name:task}}}).exec();
    console.log(temp_data);
    deletedScheduleGroup = await Schedule.updateOne({id:data.id,name:data.room_name},{$pull:{tasks:{name:task}}}).exec();
  }
  catch(e){
    console.log(e);
    throw e
  }
  if(deletedScheduleGroup=== null || deletedScheduleGroup==={}){
    throw "TASK_NOT_FOUND";
  }
  return deletedScheduleGroup;
}

/**
 * updates task in Schedule Group
 * @param {Task} task - message that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
 export const updateTaskToScheduleGroup = async (username,room_name,task,taskname) =>{
  const data = await getScheduleGroup({room_name});
  if(data == null){
    throw "CHAT_ROOM_NOT_FOUND";
  }
  let old_task=null ;
  for(let i =0;i<data.tasks.length;i++){
    if(data.tasks[i].name === taskname){
      old_task = data.tasks[i];
      break;
    }
  }
  if(old_task === null){
    throw "TASK_NOT_FOUND"
  }
  let new_task = Object.assign(old_task,task.task);
  // task.updated_time= new Date();
  const updatedTask  = new Task(
    {
      'name':new_task.name,
      'users':new_task.users,
      'created_by':username,
      'current_turn':new_task.current_turn,
      'updated_time':new Date()
  });
  let updatedScheduleGroup;
  try{
    updatedScheduleGroup = await Schedule.findOneAndUpdate({room_name:room_name,create_by:username,"tasks.name":taskname},{$set:{"tasks.$":updatedTask},'updated_time':new Date()},{new:true}).exec();
  }
  catch(e){
    console.log(e);
    throw e
  }
  return updatedScheduleGroup;
}

/**
 * get task in Schedule Group
 * @param {Task} task - message that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
 export const getTaskInScheduleGroup = async (username,room_name,taskname) =>{
  const data = await getScheduleGroup({room_name});
  if(data == null){
    throw "CHAT_ROOM_NOT_FOUND";
  }
  
  let taskDetails;
  try{
    
    for(let i =0;i<data.tasks.length;i++){
      if(data.tasks[i].name === taskname){
        taskDetails =data.tasks[i];
        break;
      }
    }
  }
  catch(e){
    console.log(e);
    throw e
  }
  return taskDetails;
}




