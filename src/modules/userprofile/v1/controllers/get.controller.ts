import { Response } from "express";
import { AuthRequest } from "../../../../interface/request.interface";
import { IGet } from "../interface";
import { Profile } from "../model/userprofile.model";

export const GetProfile = async(
    req: AuthRequest<IGet>,
    res:Response
) => {
    try {
        const profile = await Profile.find({});
        res.sendResponse(profile);
    }
    catch (e: any) {
        res.sendError(500, e, "internal server error");
    }
}