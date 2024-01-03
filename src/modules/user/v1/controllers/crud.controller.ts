import { AuthRequest } from "../../../../interface/request.interface";

import { User } from "../model/user.model";
import { Response } from "express";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { IUser } from "../interface";
export const updateUserDeatils = async (
  req: AuthRequest<IUser, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body);
    console.log(user);
    res.sendResponse(user!);
  } catch (e) {
    res.sendError(500, e, "internal server error");
  }
};
export const updateProfileImage = async (
  req: AuthRequest<IUser, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (req.file) {
      let uploadedFile: UploadApiResponse | undefined;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "sharing",
          resource_type: "auto",
        });
      } catch (error: any) {
        return res.status(400).json({ message: "Cloudinary Error" });
      }
      if (!uploadedFile) {
        return res
          .status(400)
          .json({ message: "Cloudinary Error: File not uploaded" });
      }
      let avatar = uploadedFile.secure_url;
      console.log(avatar);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        {
          avatar: avatar,
        }
      );
      res.send(updatedProfile);
    } else {
      res.sendError(500, "Empty Field", "Image FIle is Required");
    }
  } catch (e: any) {
    res.sendError(500, e, "internal server error");
  }
};
