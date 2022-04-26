import express from "express";
import *  as chatController from '../controllers/chat-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();

// //user related paths
// router.route('/')
// .post(authenticate,chatController.createChatRoom);

router.route('/:room_name')
.put(authenticate,chatController.addMessageToChat)
.get(authenticate,chatController.getChatRoom);



export default router;