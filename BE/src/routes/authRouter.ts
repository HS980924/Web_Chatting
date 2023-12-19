import { Router } from 'express';
import { body } from 'express-validator';
import { validationCheckError } from '../middlewears/validationCheck';
import authController from '../controllers/authController';

const router: Router = Router();``

router.post('/signup',[
    body('email').isEmail(),
    body('password').isStrongPassword({minLength: 3, minUppercase:0, minLowercase:1, minNumbers:1, minSymbols:1}),
    body('username').isLength({min:1}),
    validationCheckError
    ], authController.signUp);

router.post('/login',[
    body('email').isEmail(),
    body('password').isStrongPassword({minLength: 3, minUppercase:0, minLowercase:1, minNumbers:1, minSymbols:1}),
    validationCheckError
    ],authController.login);


export default router;