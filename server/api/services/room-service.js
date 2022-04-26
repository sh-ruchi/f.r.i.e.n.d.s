
import {Room} from '../models/index.js';

/**
 * Creates a new room
 * @param {Room} roomDate - New Room that needs to be created
 */
export const createRoom = async (roomData)=>{
  const existingRoom = await getRoom(roomData);
  if(existingRoom == null){
    delete roomData.created_time;
    delete roomData.updated_time;
    const room = new Room(roomData);
    return room.save();
  }
  else{
    throw "ROOM_ALREADY_EXISTS";
  }
}

/**
 * Returns Room based on name
 * @param {string} room_name - username that needs to be returned
 */
export const getRoom =async ({room_name}) =>{
  // console.log(User.User.findOne);
  let data =  await Room.findOne({room_name:room_name}).exec();
  console.log({"data from findOne":data});
  return data;
}

/**
 * Adds the User in room 
 * @param {String} username - user that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
export const addUser = async (room_name,users) =>{
  const data = await getRoom({room_name});
  if(data == null){
    throw "ROOM_NOT_FOUND";
  }
  let users_need_to_be_added=[];
  for(let i=0;i<users.length;i++){
    if(data.users.indexOf(users[i])<0 && users_need_to_be_added.indexOf(users[i])<0){
      users_need_to_be_added.push(users[i]);
    }
  }
  const updatedItem = await Room.findByIdAndUpdate(data.id,{$push:{users:[...users_need_to_be_added]}},{new:true}).exec();
  return updatedItem;
}


/**
 * update the Users in room 
 * @param {String} username - user that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
 export const updateUsers = async (room_name,payload) =>{
  const data = await getRoom({room_name});
  if(data == null){
    throw "ROOM_NOT_FOUND";
  }
  let users_need_to_be_added=data.users;
  if(payload.add){
    for(let i=0;i<payload.add.length;i++){
      if( users_need_to_be_added.indexOf(payload.add[i])<0){
        users_need_to_be_added.push(payload.add[i]);
      }
    }
  }
  if(payload.remove){
    for(let i=0;i<payload.remove.length;i++){
      let idx =  users_need_to_be_added.indexOf(payload.remove[i]);
      if(idx>-1){
        users_need_to_be_added.splice(idx,1);
      }
    }
  }
  let updateObj = {users:[...users_need_to_be_added]};
  if(payload.name && payload.name!==''){
    updateObj.room_name=payload.name;
  }
  updateObj.updated_time= new Date();
  const updatedItem = await Room.findByIdAndUpdate(data.id,updateObj,{new:true}).exec();
  return updatedItem;
}

/**
 * Get all the rooms for the user
 * @param {string} username - User name for which rooms needs to be returned
 */
export const getAllRoomsForUser = async (username) =>{
  const rooms = await Room.find({users:{$all:[username]}}).exec();
  console.log({"rooms for the user :":rooms,"user":username})
  return rooms;
}


