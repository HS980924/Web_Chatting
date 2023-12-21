import { Router } from 'express';
import { query, param } from 'express-validator';
import { validationCheckError } from '../middlewears/validationCheck';
import { authJWT } from '../middlewears/tokenCheck';
import { read_myInfo, read_UserAll, read_User } from '../controllers/userController';
import { read_UserId } from '../services/userService';


const router:Router = Router();

router.get('/me', authJWT, read_myInfo);

router.get('/all',[
    query("page").isInt(),
    query("size").isInt(),
    validationCheckError ],
    authJWT, 
    read_UserAll);

router.get(':id',[
    param("id").isInt(),
    validationCheckError],
    authJWT,
    read_UserId);


export default router;