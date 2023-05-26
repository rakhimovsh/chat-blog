import { ForbiddenError, InternalServerError, NotFoundError } from '../../lib/error.js';
import blogService from './service.js';

async function getAllBlogs(req, res, next) {
    try {
        const { page, limit } = req.query;
        const blogs = await blogService.getAllBlogs(page, limit);
        res.json({
            status: 200,
            message: "OK",
            data: blogs
        });
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

async function deleteBlog(req, res, next) {
    try {
        const { blogId } = req.params;
        const userId = req.userId;
        const blog = await blogService.findBlogById(blogId);
        if (!blog) return next(new NotFoundError(404, "Blog not found"));
        if (blog.user_id != userId) return next(new ForbiddenError(403, "Forbidden"));
        const deletedBlog = await blogService.deletedBlog(blog._id);
        res.json({
            status: 200,
            message: "OK",
            data: deletedBlog
        });
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

async function createBlog(req, res, next) {
    try {
        const { text } = req.body;
        const createdBlog = await blogService.createBlog(req.userId, text, req.file);
        res.json({
            status: 200,
            message: "OK",
            data: createdBlog
        });
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

async function updateBlog(req, res, next) {
    try {
        const { text } = req.body;
        const { blogId } = req.params;
        const userId = req.userId;
        const blog = await blogService.findBlogById(blogId);
        if (!blog) return next(new NotFoundError(404, "Blog not found"));
        if (blog.user_id != userId) return next(new ForbiddenError(403, "Forbidden"));
        const updatedBlog = await blogService.uploadBlog(blog._id, text, req.file ? req.file.filename : undefined);
        res.json({
            status: 200,
            message: "OK",
            data: updatedBlog
        });
    } catch (error) {
        next(new InternalServerError(500, error.message));
    }
}

export default { getAllBlogs, deleteBlog, createBlog, updateBlog };