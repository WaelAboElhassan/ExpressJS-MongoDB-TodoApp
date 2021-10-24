import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todosRouter from "./routes/todos.js";
/* import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url"; */
const app = express();
// const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const api = process.env.API_PATH;
const dbConnection = process.env.DB_CONNECTION;

app.use(cors());

app.use(express.json({ extends: true }));
app.use(express.urlencoded());
//app.use(express.static(path.resolve(__dirname, "./client/build")));
// All other GET requests not handled before will return our React app
/* app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
}); */
//Routing

app.use(`${api}/todos`, todosRouter);
app.get(`${api}/`, (req, res) => res.send("API is running ...."));

//DB Connection
mongoose.connect(
  dbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todoAppDB",
  },
  (err) => {
    if (err) throw err;
    console.log("DB is Connected  ...");
  }
);

//Development

/*app.listen(3000, () =>{
    console.log("API is running on port 3000 ");
})
*/

// Production
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log(`Express server is working on port ${port}`);
});
