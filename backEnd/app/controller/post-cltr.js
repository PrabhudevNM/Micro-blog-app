import Post from "../model/post-model.js";
import getDataUri from "../../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
const postsCltr={}

postsCltr.list=async(req,res)=>{
  try{
      const posts=await Post.find()
      res.json(posts)
  }catch(err){
    console.log(err)
  }
}


postsCltr.create= async(req,res)=>{
     const body = req.body;
    const file=req.file

    try {
        // Handle file upload to Cloudinary
            const fileUri = getDataUri(file); // or  getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Profile",
            });
            body.file = result.secure_url; // Store the secure URL from Cloudinary
        
        const posts = new Post(body);
        posts.user = req.userId; // Set the user ID from request
        await posts.save()
        res.status(201).json(posts)
    }catch(err){
        console.log(err)
    }
}

postsCltr.delete=async (req,res)=>{
    try{
    const id=req.params.id
    const posts =await Post.findOneAndDelete({_id:id, user:req.userId})
    if(!posts){
        return res.status(404).json({})
    }
    res.json(posts)
    }catch(err){
    res.json(err)
    }
} 

postsCltr.like = async (req, res) => {
    try {
      const postlikeupdate = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.userId } },
        { new: true }
      );
      res.json(postlikeupdate);
    } catch (err) {
      res.status(500).json("something went wrong");
    }
  };
  
  postsCltr.unlike = async (req, res) => {
    try {
      const postlikeupdate = await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.userId } },
        { new: true }
      );
      res.json(postlikeupdate);
    } catch (err) {
      res.status(500).json("something went wrong");
    }
  };
  
  postsCltr.comment = async (req, res) => {
    const comment = {
      commentBody: req.body.commentBody,
      postedBy: req.userId,
    };
    try {
      const postCommentUpdate = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        { new: true }
      );
      res.json(postCommentUpdate);
    } catch (err) {
      res.status(500).json({ error: "something went wrong" });
    }
  };

export default postsCltr