import mongoose, { Mongoose, mongo } from "mongoose";
const UserSchema=new mongoose.Schema({
    fullname:{
        require:true,
        type:String
    },
    username:{
        require:true,
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    gender:{
        type:String,
        require:true,
        enum:["Male","Female"]
    },
    profilepic:{
        type:String,
        default:""
    }

},{timestamps:true})

const User=mongoose.model("User",UserSchema)
export default User