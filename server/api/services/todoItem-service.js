
import model from '../models/TodoItem-model.js';
import TodoItem from '../models/TodoItem-model.js';
import * as roomService from './../services/room-service.js';

export const getAllItemsForRoom = async (room_name) =>{
  console.log(room_name)
  const todolists = await model.findOne({name:room_name}).exec(); 
  console.log({"Lists for the room :":todolists,"room":room_name})
  return todolists;
}

export const createTodoList = async (room_name) =>{
  console.log(room_name)
  const todolist = new model({
    name:room_name,
    todolist:[]
  });
  todolist.save();
  console.log({"Lists for the room :":todolist,"room":room_name})
  return todolist;
}

export const addItemToList = async (room_name,todoItem) =>{
  console.log('here')
  const room = await roomService.getRoom({room_name});
  if(room === null  || room === {}){
    throw "ROOM_NOT_FOUND";
  }
  const updatedList = await model.findOneAndUpdate({name:room_name},{$push:{todolist:[todoItem]}},{new:true}).exec();
  //const todolists = await model.findByIdAndUpdate({todolist:[{$all:{roomid:roomid}}]}).exec(); 
  return updatedList;
}



/**
 * Updates the item based on Id.
 * @param {TodoItem} newItem - updated Item
 */
export const updateTodoItem =  async (room_name,item_name,todo) =>{
  // newItem.modifiedDate = new Date();
  // delete newItem.createdDate;
  const temp = await TodoItem.findOne({name:room_name,todolist:[{$all:{title:item_name}}]});
  console.log({"temp item:":temp})
  const updatedItem = await TodoItem.findOneAndUpdate({name:room_name,"todolist.title":item_name},{$set:{"todolist.$":todo}},{new:true}).exec();
    // Room.find({users:[{user:[todoItemID]}]}).exec();
    console.log({"updated item ":updatedItem})
  return updatedItem;
}


/**
 * Updates the item based on Id.
 * @param {TodoItem} newItem - updated Item
 */
 export const removeTodoItem = async (room_name,item_name) =>{
  newItem.modifiedDate = new Date();
  delete newItem.createdDate;
  const updatedList = await model.findOneAndUpdate({name:room_name},{$pull:{name:[item_name]}},{new:true}).exec();
    // Room.find({users:[{user:[todoItemID]}]}).exec();
  return updatedItem;
}

