import { AuthRequest } from "../../../../interface/request.interface";
import { Idea } from "../../../ideas/v1/model/ideas.model";
import { User } from "../../../user/v1";
import { IReview } from "../interface";
import { Review } from "../model/reviews.model";
import { Response } from "express";

export const CreateReview = async (
    req: AuthRequest<IReview, {}, {}>,
    res:Response
) => {
    try {
        const userId = req.user?.userId;
        let user = await User.findById({ _id: userId })
        console.log(user);
        
        let userReview = await Review.find({userId:userId })
        console.log(userReview)

        if (user) {
            if (userReview) {
                await Review.deleteOne({userId:userId});
            }
            const { review } = req.body || {};

            const reviewData=await Review.create({
                userId: userId,
                review: review,
            });
            
            res.sendResponse(reviewData);
            
        }
    }
    catch(e:any) {
        res.sendError(500,e,"internal server error")
    }
}