import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from 'fs'




const app = express();
//app.use  is middleware by  app.use(cors()) cors is  confug but  for better use
app.use(cors({
    origin: true,
    credentials: true
}))

//multer  to  file transfer
//body-parse  for  previous 
app.use(express.json({ limit: "16kb" }))
//for url 
//coz url  are  in differnt  way  and chnage  somme so  we  need to encode
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
//here  extended  keyword  is  used  which is  used to pass obj  ka  ander obj

app.use(express.static("public")) //remember we   create a  dir  public
//static is  used --> to store  the  file image   which  any one  can acces 

/*
----------
*/

//in user  browser  i  can  set and get cookies => basic  crud operation  (Create  read  update delete)

app.use(cookieParser())//yaha  pa  ya   lagan  ka  faida ya  hua  ki m acontroller  ma  cookie  use kar  parhahu

import word from "./route/word.router.js"
app.use("/api/v1", word)

export { app }