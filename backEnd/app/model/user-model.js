import { Schema, model } from "mongoose";

const userSchema= new Schema({              //Afetr connecting to DB, then we are writing model
    email:String,
    password:String
},{timestamps:true})

const User = model('User',userSchema)

export default User