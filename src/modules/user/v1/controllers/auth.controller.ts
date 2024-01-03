import { Response, Request } from "express";
import { ILogin, IUser } from "../interface";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
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
      res.sendError(600, "Duplicate", "User Already Registered");
    } else {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      req.body.password = await bcrypt.hash(req.body.password, 10);
      user = await User.create(req.body);
      res.sendResponse(user);
      console.log(user);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

//user login
export const login = async (req: request<ILogin>, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.body.password == user.password) {
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
