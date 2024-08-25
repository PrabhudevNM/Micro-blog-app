import mongoose from "mongoose"

const configureDB=async ()=>{
        // const dbUrl='mongodb://localhost:27017/micro-blog'
    try {
        const db=await mongoose.connect(process.env.DB_URL)
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}

export default configureDB