import BlogModel from "./model.js";



async function getAllBlogs(page = 1, limit = 20) {
    const blogs = await BlogModel.find().limit(limit * 1).skip((page - 1) * limit);

    const count = await BlogModel.countDocuments();
    return {
        blogs,
        totalPages: Math.ceil(count / limit),
        currentPage: +page,
    };
}


async function findBlogById(blogId) {
    return await BlogModel.findById(blogId);
}

async function deletedBlog(blogId) {
    return await BlogModel.findByIdAndDelete(blogId);
}

async function createBlog(user_id, text = null, media = null) {
    if (media) media = media.filename;
    return await BlogModel.create({ user_id, text, media });
}

async function uploadBlog(blogId, text, media) {
    return await BlogModel.findByIdAndUpdate(blogId, { text, media });
}

export default { getAllBlogs, findBlogById, deletedBlog, createBlog, uploadBlog };