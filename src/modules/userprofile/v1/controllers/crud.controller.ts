import { AuthRequest } from "../../../../interface/request.interface";
import { User } from "../../../user/v1";
import { IProfile } from "../interface";
import { Profile } from "../model/userprofile.model";
import { Response } from "express";

export const CreateProfile = async (
  req: AuthRequest<IProfile, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    let user = await User.findById({ _id: userId });

    let profile = await Profile.find({ userId: userId });

    if (user) {
      if (profile) {
        await Profile.deleteOne({ userId: userId });
      }
      const createdProfile = await Profile.create({
        userId: userId,
        name: user.name,
        address: "",
        gender: "",
        institution: "",
        about: "",
        skills: user.skills,
      });
      res.sendResponse(createdProfile);
    }
  } catch (e: any) {
    // console.log(e);

    res.sendError(500, e, "internal server error");
  }
};

export const UpdateProfile = async (
  req: AuthRequest<IProfile, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);

    const name = req.body?.name;
    const profile = await Profile.find({ userId: userId });
    console.log(profile);

    if (profile) {
      const updatedProfile = await Profile.updateOne(
        { userId: userId },
        req.body
      );
      await User.updateOne({ _id: userId }, { name: name });
      res.sendResponse(updatedProfile);
    }
  } catch (e: any) {
    console.log("error section");

    console.log(e);
    res.sendError(500, e, "internal server error");
  }
};
