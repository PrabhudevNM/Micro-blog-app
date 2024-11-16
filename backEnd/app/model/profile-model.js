import { Schema,model } from "mongoose";

const profileSchema= new Schema({              //Afetr connecting to DB, then we are writing model
    username:String,
    bio:String,
    file:String,
    followers:[{
        user:Schema.Types.ObjectId
    }],
    following:[{
        user:Schema.Types.ObjectId
    }],
    user:Schema.Types.ObjectId
},{timestamps:true})

const Profile = model('Profile',profileSchema)

export default Profile