import { AuthRequest } from "../../../../interface/request.interface";
import { Iget } from "../../../ideas/v1/interface";
import { Review } from "../model/reviews.model";
import { Response } from "express";

export const GetReviews = async (req: AuthRequest<Iget>, res: Response) => {
  try {
    const reviews = await Review.find({}).populate({
      path: "userId",
      select: {
        name: 1,
        avatar: 1,
        _id: 1,
      },
    });
    res.sendResponse(reviews);
  } catch (e: any) {
    throw new Error(e);
  }
};
