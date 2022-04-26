import express from "express";
import *  as scheduleController from '../controllers/schedule-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();

// //user related paths
// router.route('/')
// .post(authenticate,chatController.createChatRoom);

router.route('/:room_name')
.post(authenticate,scheduleController.addTaskInScheduleGroup)
.get(authenticate,scheduleController.getScheduleGroupRoom);
router.route('/:room_name/:taskname')
.put(authenticate,scheduleController.updateTaskInScheduleGroup)
.get(authenticate,scheduleController.getTaskInScheduleGroup)
.delete(authenticate,scheduleController.deleteTaskInScheduleGroup);


export default router;