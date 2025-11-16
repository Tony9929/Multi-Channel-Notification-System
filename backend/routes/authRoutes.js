import express from 'express'
import { forgotpass, isAuthenticated, login, logout, register, resetPassword, sendverifyemail, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/sendverifyemail',userAuth,sendverifyemail);
authRouter.post('/verifyEmail',userAuth,verifyEmail);
authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/sendfrogototp',forgotpass);
authRouter.post('/verifyforgot',resetPassword);

export default authRouter;