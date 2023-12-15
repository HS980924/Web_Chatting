import { Router } from 'express';
import authController from '../controllers/authController';

const router: Router = Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.login);


export default router;