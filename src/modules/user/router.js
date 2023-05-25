import { Router } from "express";
import userController from "./controller.js";
import Validator from "../../middlewares/validator.js";

const router = Router();


router.post('/auth/register',Validator('register'), userController.register)
router.post('/auth/login',Validator('login'), userController.login)
export default router;