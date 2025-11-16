import mongoose from "mongoose";

const connectDB = async()=>{
    await mongoose.connect(process.env.MONNGODB_URL);
    
}
if(connectDB){
    console.log("data base connected");
}


export default connectDB;