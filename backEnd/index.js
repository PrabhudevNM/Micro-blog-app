import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import configureDB from "./config/db.js"
import { checkSchema } from "express-validator"
import usersCltr from "./app/controller/user-cltr.js"
import profileCltr from "./app/controller/profile-cltr.js"
import postsCltr from "./app/controller/post-cltr.js"
import { userRegisterSchema,userLoginSchema } from "./app/validator/user-validator.js"
import authenticateUser from "./app/middlewares/authentication.js"
import upload from "./app/middlewares/multer.js"
import cloudinary from "cloudinary"

import path from 'path'
import { fileURLToPath } from 'url';

const app=express()
const port=process.env.PORT || 9000

app.use(cors())

app.use(express.json())

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
  });

configureDB()
// Define __filename and __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/users/register',checkSchema(userRegisterSchema),usersCltr.register) //writing api's first afetr writing validation and controller updating in index.js
app.post('/api/users/login',checkSchema(userLoginSchema),usersCltr.login)
// app.get('/profile',authenticateUser,usersCltr.profile)
app.get('/api/users/account', authenticateUser, usersCltr.account)

// app.get('/api/users-profile',authenticateUser,profileCltr.list)
app.get('/api/users-profile',authenticateUser,profileCltr.show)
app.post('/api/users-profile',authenticateUser,upload.single('file'),profileCltr.create)
app.put('/api/users-profile/:id',authenticateUser,upload.single('file'),profileCltr.update)
app.delete('/api/users-profile/:id',authenticateUser,profileCltr.delete)
app.get('/api/users-profile/check',authenticateUser,profileCltr.checkProfile)

app.get('/api/users-posts',authenticateUser,postsCltr.list)
app.post('/api/users-posts',authenticateUser,upload.single('file'),postsCltr.create)
app.delete('/api/users-posts/:id',authenticateUser,postsCltr.delete)

app.listen(port,()=>{
    console.log('server running on port',port)
})