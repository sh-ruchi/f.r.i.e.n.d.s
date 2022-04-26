import * as scheduleService from '../services/schedule-service.js';
import * as CONST from '../constants.js';
/**
 * Sets error to the response.
 * @param {Object} error - Error Object 
 * @param {Response} response - Response Object to the client
 */
const setErrorResponse=(error, response)=>{
  response.status(500);
  response.json(error);
}

/**
 * Sets response code and body to the response.
 * @param {int} statusCode - Response status code 
 * @param {Object} object - Response body object 
 * @param {Response} response - Response Object to the client
 */
const setSuccessResponse=(statusCode,object, response)=>{
  response.status(statusCode);
  response.json(object);
}

/**
 * 
 * Creates a Schedule Group.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const createScheduleGroupRoom=async (request, response)=>{
  try{
  const payload = request.body;
  const scheduleGroup = await scheduleService.createScheduleGroup(payload);
  //need to validate user emails if user is present or not
  setSuccessResponse(201,scheduleGroup,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}

/**
 * Returns a Schedule Group Room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const getScheduleGroupRoom=async (request, response)=>{
  try{
    const room_name = request.params.room_name;
    const scheduleGroup = await scheduleService.getScheduleGroup({room_name});
    //need to validate user emails if user is present or not
    setSuccessResponse(201,scheduleGroup,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}

/**
 * updates tasks in schedule group
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const updateTaskInScheduleGroup = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    const taskname = req.params.taskname;
    const scheduleGroup = await scheduleService.updateTaskToScheduleGroup(username,req.params.room_name,req.body,taskname);
    setSuccessResponse(200,scheduleGroup,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}

/**
 * add task in schedule group
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const addTaskInScheduleGroup = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    
    const scheduleGroup = await scheduleService.addTaskToScheduleGroup(username,req.params.room_name,req.body);
    setSuccessResponse(200,scheduleGroup,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}


/**
 * returns task details in schedule group
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const getTaskInScheduleGroup = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    const taskname = req.params.taskname;
    const taskDetails = await scheduleService.getTaskInScheduleGroup(username,req.params.room_name,taskname);
    setSuccessResponse(200,taskDetails,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}



/**
 * deletes task in schedule group
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const deleteTaskInScheduleGroup = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    const taskname = req.params.taskname;
    const taskDetails = await scheduleService.deleteTaskInScheduleGroup(username,req.params.room_name,taskname);
    setSuccessResponse(200,taskDetails,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}
