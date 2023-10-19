import { Response ,Request } from "express";
import { ILogin, IUser } from "../interface";
import { User } from "../model/user.model";

interface request<T>  extends Request{
    body:T,
}


//user register
export const registerUser =async(
    req:request<IUser>,
    res:Response,
)=>{
    try{
        
        
        let user;
        const userExist=await User.findOne({email:req.body.email});
        if(userExist)
        {
            return res.status (400).json({message:"User Already registered"})
            
        }
        else
        {
            user=await User.create(req.body);
        }
        return res.status(200).json({
            success:true,
            data:user,
            message:'Success',
        })
    } catch (e)
    {
        return res.status(500).json({
            success:false,
            error:e,
            message:"Error"
        })
    }
}

//user login
export const login =async ( 
    req:request<ILogin>,
    res:Response,
)=>{
    try{
        
        const user =await User.findOne({email:req.body.email});
        if(user)
        {
            if(user.password==req.body.password)
            {
                const token=user.createToken();
                res.cookie("token",token);
                return res.status(200).json({
                    success:true,
                    token:token,
                    message:'Success',
                })
            }
            else
            {
                return res.status (400).json({message:"Incorrect Password"})
            }
        }
        else
        {
            return res.status (400).json({message:"User doesn't exist"})
        }
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success:false,
            error:e,
            message:"Error"
        })
    }
}

//otp
