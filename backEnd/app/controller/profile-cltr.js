import Profile from "../model/profile-model.js";
import getDataUri from "../../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";

const profileCltr={}


profileCltr.list=async(req,res)=>{
    try{
        const profiles=await Profile.find()
        res.json(profiles)
    }catch(err){
        console.log(err)
    }
}

//multer
profileCltr.create = async (req, res) => {
    const body = req.body;
    const file=req.file

    try {
        // Handle file upload to Cloudinary
            const fileUri = getDataUri(file); // or  getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Profile",
            });
            body.file = result.secure_url; // Store the secure URL from Cloudinary
        
        const profile = new Profile(body);
        profile.user = req.userId; // Set the user ID from request

        await profile.save(); // Save the profile to the database
        res.status(201).json(profile); // Return the profile as a response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

profileCltr.show=async (req,res)=>{
    try{
        const profile=await Profile.findOne({ user:req.userId})
        if(!profile){
            return res.status(404).json({})
        }
        res.json(profile)
    }catch(err) {
    res.json(err)
    }

}

profileCltr.modify=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const profile= await Profile.findOneAndUpdate({_id:id, user:req.userId }, body,{ new:true })
        if(!profile){
            return res.status(404).json({})
        }
        res.json(profile)
    }catch(err){
        res.json(err)
    }
}

//usiong cloudinary
profileCltr.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const file=req.file
  
    try {
        const fileUri = getDataUri(file); 
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "profiles", // Organize files in a folder
        });
  
        // Add the new file URL to the body for updating
        body.file = result.secure_url;
  
      // Update the profile
      const profile = await Profile.findOneAndUpdate({ _id: id, user: req.userId },body,{ new: true });
  
      if (!profile) {
        return res.status(404).json({ error: "Profile not found or unauthorized" });
      }
  
      res.status(200).json(profile);
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

profileCltr.delete=async (req,res)=>{
    try{
    const id=req.params.id
    const profile =await Profile.findOneAndDelete({_id:id, user:req.userId})
    if(!profile){
        return res.status(404).json({})
    }
    res.json(profile)
    }catch(err){
    res.json(err)
    }
} 



profileCltr.checkProfile= async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is available in req.user after authentication
      const profile = await Profile.findOne({ userId });
      if (profile) {
        res.status(200).json({ profileExists: true, profileId: profile._id });
      } else {
        res.status(200).json({ profileExists: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  

export default profileCltr