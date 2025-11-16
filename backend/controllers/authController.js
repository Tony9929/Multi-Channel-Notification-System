import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register =async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name|| !email || !password){
        return res.json({success:false,message:"missing info"})
    }
    try {
        const exsistinguser = await userModel.findOne({email})
        if(exsistinguser){
            return res.json({success:false,message:"user exsists"})
        }

        const hashedpassword=await bcrypt.hash(password,10);

        const user = new userModel({name,email,password:hashedpassword});
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000

        });

        //sending email
        const mailoptions={
            from:process.env.SENDER_EMAIL||'arushmaurya736@gmail.com',
            to:email,
            subject: 'Welcome to Our Platform 🎉',
             html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4CAF50;">Welcome, ${name}!</h2>
            <p>We're excited to have you on board. Your account has been successfully created.</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd;"/>
            <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} MyApp. All rights reserved.</p>
             </div>
    `

        }
        await transporter.sendMail(mailoptions);
        console.log("email send");
      
        return res.json({
         success: true,
         message: `User registered successfully${email}`,

        
});

        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const login = async(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        return res.json({success:false, message:"email and pass is req"})

    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'invalid email id or password'})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'invalid email or password'})
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000

        });
        return res.json({success:true})





    }catch(e){
        return res.json({success:false,message:e.message})

    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            maxAge:7*24*60*60*1000

        })
        return res.json({succes:true,message:'logged out'})
    } catch (error) {
        return res.json({succes:false,message:error.message})  
    }
}

export const sendverifyemail= async(req,res)=>{
    try {
        const userID= req.userID;
        const user= await  userModel.findById(userID);

        if(user.isAccountVerfied){
            return res.json({success:false,message:"account already verified"})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();;

        user.verifyotp=otp;
        user.verifyotpexpireAt= Date.now()+24*60*60*1000

        await user.save();

        const mailoptions={
             from:process.env.SENDER_EMAIL||'arushmaurya736@gmail.com',
            to:user.email,
            subject: 'Welcome to Our Platform 🎉',
             html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2196F3;">Email Verification</h2>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Thank you for signing up! Please use the following One-Time Password (OTP) to verify your email address:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 12px 24px; font-size: 24px; font-weight: bold; background-color: #f0f0f0; border-radius: 8px; color: #333;">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for the next <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} MyApp. All rights reserved.</p>
    </div>
  `

        }
         await transporter.sendMail(mailoptions);
         console.log("verification mail sent")


         return res.json({success:true})



        
    } catch (error) {
        return res.json({succes:false,message:error.message})
    }
}

export const verifyEmail = async(req,res)=>{

    const userID= req.userID;
    const {otp}= req.body;
    if(!userID||!otp){
        return res.json({success:false,message:'Missing Details'})
    }
    try {
        const user = await userModel.findById(userID);
        if(!user){
            return res.json({succes:false,message:"user does not exsit"})
        }


        if(user.verifyotp===''|| otp!==user.verifyotp){
            return res.json({succes:false,messgae:"Invalid OTP"})
        }
        if(user.verifyotpexpireAt<Date.now()){
            return res.json({success:false,message:'OTP Expired'})
        }
       
        user.isAccountVerfied = true;
        user.verifyotp='';
        user.verifyotpexpireAt=0;
        await user.save();
        return res.json({success:true,messgae:'Email verified'})
        
    } catch (error) {
        return res.json({succes:false,message:error.message})
        
    }
}

export const isAuthenticated = async(req,res)=>{
    try {
        return res.json({succes:true});
    } catch (error) {
        return res.json({succes:false,message:error.message});
    }
}

export const forgotpass = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailoptions = {
      from: process.env.SENDER_EMAIL || 'arushmaurya736@gmail.com',
      to: user.email,
      subject: 'Reset Your Password 🔐',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #e53935;">Password Reset Request</h2>
        <p>Hi <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your password. Use the OTP below to proceed:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; padding: 12px 24px; font-size: 24px; font-weight: bold; background-color: #f0f0f0; border-radius: 8px; color: #333;">
            ${otp}
          </span>
        </div>

        <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <p>If you did not request a password reset, you can ignore this email safely.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;" />
        <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} MyApp. All rights reserved.</p>
      </div>
      `
    };

    await transporter.sendMail(mailoptions);
    console.log("Password reset OTP sent");

    return res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    
    if (user.resetOtp===''|| otp!==user.resetOtp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetotp = '';
    user.resetOtpExpireAt = null;

    await user.save();

    return res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

