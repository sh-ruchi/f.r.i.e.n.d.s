
import {Chat} from '../models/index.js';
import * as roomService from './../services/room-service.js';
/**
 * Creates a Chat Room
 * @param {String} room_name - New Room that needs to be created
 */
export const createChat = async ({room_name})=>{
  const existingChatRoom = await getChatRoom(room_name);
  if(existingChatRoom == null){
    let data = {room_name:room_name,messages:[]}
    const chatRoom = new Chat(data);
    return chatRoom.save();
  }
  else{
    throw "Chat Room Already Exists";
  }
}

/**
 * Returns Chat Room based on name
 * @param {string} room_name - chat room name that needs to be returned
 */
export const getChatRoom =async ({room_name}) =>{
  // console.log(User.User.findOne);
  let data =  await Chat.findOne({room_name:room_name}).exec();
  console.log({"data from findOne":data});
  return data;
}

/**
 * Adds message in room chat
 * @param {String} message - message that needs to be added in room
 * @param {String} room_name - room in which the user needs to be added
 */
export const addMessageToChat = async (username,room_name,message) =>{
  const data = await getChatRoom({room_name:room_name})
  if(data == null){
    throw "CHAT_ROOM_NOT_FOUND";
  }
  
  const newMsg  = {username,'message':message.message};
  let updatedChatRoom;
  try{
    updatedChatRoom = await Chat.findByIdAndUpdate(data.id,{$push:{messages:[newMsg]},'updated_time':new Date()},{new:true}).exec();
  }
  catch(e){
    console.log(e);
    throw e
  }
  return updatedChatRoom;
}


// /**
//  * Get all the message for the chat room
//  * @param {string} room_name - Chat Room name for which messages needs to be returned
//  */
// export const getAllMessageForRoom = (room_name) =>{
//   const messages = await getChatRoom({room_name});
//   console.log({"messages for the room :":messages,"room":room_name})
//   return rooms;
// }


