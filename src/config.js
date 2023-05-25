import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), "src", ".env") });


const dbUri = process.env.DB_URI;

const secret = process.env.SECRET;

const port = process.env.PORT;

export { secret, dbUri, port };
