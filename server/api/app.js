import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import * as models  from './models/index.js';
import * as CONST from './constants.js';

const app = express();

console.log("before connection");
mongoose.connect(`mongodb+srv://${CONST.DB_USERNAME}:${CONST.DB_PASSWORD}@cluster0.uc08h.mongodb.net/${CONST.DB_DATABASE}`);
console.log("after connection");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function callback () {
  console.log("Database connected");
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://friends.app.neu:3000');

  // // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(cookieParser());
routes(app);
export {app,mongoose};
