import { AuthRequest } from "../../../../interface/request.interface";
import { IProfile } from "../../../userprofile/v1/interface";
import { Profile } from "../../../userprofile/v1/model/userprofile.model";
import { User } from "../model/user.model";
import { Response } from "express";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { IUser } from "../interface";

export const updateProfileImage = async (
  req: AuthRequest<IUser, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    console.log(userId, req.file.path);
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
