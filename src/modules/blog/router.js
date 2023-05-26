import { Router } from "express";
import checkToken from '../../middlewares/checkToken.js';
import controller from "./controller.js";
import { upload } from '../../lib/multer.js';
const router = Router();


router.get('/all-blogs', checkToken, controller.getAllBlogs);
router.post('/create-blog', checkToken, upload.single('media'), controller.createBlog);
router.delete('/delete-blog/:blogId', checkToken, controller.deleteBlog);
router.put('/update-blog/:blogId', checkToken, upload.single('media'), controller.updateBlog);
export default router;