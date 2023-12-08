import { Response, Request } from "express";
import { ILogin, IUser } from "../interface";
import { User } from "../model/user.model";

interface request<T> extends Request {
  body: T;
}

//user register
export const registerUser = async (req: request<IUser>, res: Response) => {
  try {
    
    
    let user;
    const userExist =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ email: req.body.phoneNo }));
    if (userExist) {
      res.sendError(600, "Invalid Credentials", "User Already Registered");
      
      
    } else {
      // console.log("inside else");
      // console.log(req.body);
      
      user = await User.create(req.body);
      // console.log("below");
      res.sendResponse(user);
    }
  } catch (e) {
    // console.log("Error:", e);
    
    res.sendError(500, e, "Internal Server Error");
  }
};

//user login
export const login = async (req: request<ILogin>, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.password === req.body.password) {
        const token = user.createToken();

        res.cookie("token", token);
        res.sendResponse({
          token: token,
          userId: user._id,
        });
      } else {
        res.sendError(400, "Invalid Credentials", "Incorrect Password");
      }
    } else {
      res.sendError(400, "Invalid Credentials", "User doesn't exist");
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

//otp
