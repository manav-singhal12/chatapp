import mongoose from "mongoose";
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected")
    }
    catch(error){
            console.log("Error",error)
    }
}
export default connectToMongoDB;