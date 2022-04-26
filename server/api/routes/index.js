// import ChatRoom from '../chat-room-routes.js';
import userRoutes from './user-routes.js';
import roomRoutes from './room-routes.js';
import chatRoutes from './chat-routes.js';
import scheduleRoutes from './schedule-routes.js'
import todoRoutes from './todoItem-router.js';
export default (app) => {
  app.use('/user',userRoutes);
  app.use('/room',roomRoutes);
  app.use('/chat',chatRoutes);
  app.use('/schedule',scheduleRoutes);
  app.use('/todo',todoRoutes);
  app.use('/healthz',(req, res) => {
    console.log('inside get request');
    res.status(200);
    res.send();
  })
}