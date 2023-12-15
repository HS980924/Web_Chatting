import { Router } from 'express';
import { body } from 'express-validator';
import { signUpvalidationCheck } from '../middlewears/signupValidator';
import authController from '../controllers/authController';

const router: Router = Router();

router.post('/signup',[
    body('email').isEmail(),
    body('password').isStrongPassword({minLength: 3, minUppercase:0, minLowercase:1, minNumbers:1, minSymbols:1}),
    body('username').isLength({min:1}),
    signUpvalidationCheck
    ], authController.signUp);

router.post('/login',[
    body('email').isEmail(),
    body('password').isStrongPassword({minLength: 3, minUppercase:0, minLowercase:1, minNumbers:1, minSymbols:1}),
    signUpvalidationCheck
    ],authController.login);


export default router;