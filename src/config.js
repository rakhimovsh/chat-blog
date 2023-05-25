import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), "src", ".env") });


const dbUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;

const secret = process.env.SECRET;

const port = process.env.PORT;

export { secret, dbUrl, port };
