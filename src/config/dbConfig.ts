import dotenv from "dotenv";
dotenv.config();
export const dbConfig =
{
    uri:process.env.dbURL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
}