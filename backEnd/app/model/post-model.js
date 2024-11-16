import { Schema,model } from "mongoose";

const commentSchema= new Schema({              //Afetr connecting to DB, then we are writing model
    title:String,
    body:String,
    user:Schema.Types.ObjectId
},{timestamps:true})

const likesSchema= new Schema({
    user:Schema.Types.ObjectId
})
const postSchema=new Schema({
    body:String,
    file:String,
    keyword:String,
    likes:[likesSchema],
    comments:[commentSchema],
    user:Schema.Types.ObjectId
},{timestamps:true})

const Post = model('Post',postSchema)

export default Post