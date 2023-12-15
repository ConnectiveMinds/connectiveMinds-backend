import mongoose,{Document}  from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema({
        project_id:{
            type: mongoose.Types.ObjectId,
            required:true
        },
        filename: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        sizeInByte: {
            type: String,
            required: true
        },
        sender: {
            type: String,
        },
        receiver: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


// Interface  "IFile" has all the properties of mongoose document
interface IFile extends Document{
    project_id:mongoose.Types.ObjectId,
    filename: string,
    secure_url: string,
    sizeInByte: string,
    format: string,
    sender?: string,
    receiver?: string,
}

export interface Iget{
    projectId: mongoose.Types.ObjectId;
}
export interface IDelete extends IFile
{
    fileId: mongoose.Types.ObjectId;
}

//typescript  IFILE interface
export default mongoose.model<IFile>("File", fileSchema)