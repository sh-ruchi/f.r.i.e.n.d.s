import express from "express";
import *  as roomController from '../controllers/room-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();

//user related paths
router.route('/')
.get(authenticate,roomController.getAllRoomsForUser)
.post(authenticate,roomController.createRoom);

router.route('/:room_name')
.put(authenticate,roomController.updateUserInRoom)
.get(authenticate,roomController.getRoom);
// .delete(authenticate,roomController.r)



export default router;