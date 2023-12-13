import { AuthRequest } from "../../../../interface/request.interface";
import { Iget } from "../../../ideas/v1/interface";
import { Review } from "../model/reviews.model";
import { Response } from "express";

export const GetReviews= async (req: AuthRequest<Iget>, res: Response) => {
    try {
        const reviews = await Review.find({});
        res.sendResponse(reviews)
    }
    catch (e: any) {
        throw new Error(e)
    }
}