import Profile from "../model/profile-model.js";
const profileCltr={}


profileCltr.list=async(req,res)=>{
    try{
        const profiles=await Profile.find()
        res.json(profiles)
    }catch(err){
        console.log(err)
    }
}

profileCltr.create= async(req,res)=>{
    const body=req.body
    const file=req.file ? `/uploads/${req.file.filename}`:undefined
    if(file) body.file=file
    try{
        const profile=new Profile(body)
        profile.user=req.userId
        await profile.save()
        res.status(201).json(profile)
    }catch(err){
        console.log(err)
    }
}

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


// profileCltr.show = async (req, res) => {
//     const { id } = req.params; // Destructuring to extract the ID from req.params
//     try {
//       // Fetch the profile with the provided ID and ensure it belongs to the logged-in user
//       const profile = await Profile.findOne({ _id: id, user: req.userId });
      
//       // If the profile is not found, return a 404 status
//       if (!profile) {
//         return res.status(404).json({ message: "Profile not found" });
//       }
      
//       // Return the found profile data
//       res.json(profile);
//     } catch (err) {
//       // If an error occurs, return a 500 status with an error message
//       res.status(500).json({ error: "Server error, please try again later", details: err.message });
//     }
//   };
  

profileCltr.update=async(req,res)=>{
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