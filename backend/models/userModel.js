import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    verifyotp:{type:String,default:''},
    verifyotpexpireAt:{type:Number,default:0},
    isAccountVerfied:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetotpExpireAt:{type:Number,default:''}

})
const userModel=mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;