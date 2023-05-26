import mongoose, { Schema } from "mongoose";


const BlogModelSchema = new Schema({
    user_id: String,
    media: String,
    text: String
}, { timestamps: true, versionKey: false });


const BlogModel = mongoose.model('blog', BlogModelSchema);

export default BlogModel;