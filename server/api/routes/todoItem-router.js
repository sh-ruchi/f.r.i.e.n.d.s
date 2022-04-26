import express from "express";
import * as todoItemController  from './../controllers/todoItem-controller.js'
const router  = express.Router();




// Get the list of todolist inside the rooms using each roomid
router.route('/:room_name')
.get(todoItemController.getAllItemForRoom)
.post(todoItemController.addItem)


// GET_ROOMS (ROOM_ID) --> 
 
//For a roomid, for each todolist, get the list of todo items

router.route('/:room_name/:item_name')
.put(todoItemController.updateItem)
.delete(todoItemController.removeItem)
// .put(todoItemController.updateeachtodolist)
// .delete(todoItemController.removeeachtodolist)
// .post(todoItemController.posteachtodolist);
// .get(todoItemController.getAll);

// router.route('/todorooms/:roomid/:todoid/:todoitem_id')
// .get(todoItemController.get)
// .put(todoItemController.update)
// .delete(todoItemController.remove)
// .post(todoItemController.post);
// .get(todoItemController.getAll);




export default router;