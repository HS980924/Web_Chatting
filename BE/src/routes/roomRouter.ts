import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { validationCheckError } from '../middlewears/validationCheck';
import { authJWT } from '../middlewears/tokenCheck';
import { create_Room, read_myAllRooms, } from '../controllers/roomController';


const router:Router = Router();

/** 방 생성 라우터 */
router.post('/',[
    body("title").isString(),
    body("members").isArray(),
    validationCheckError ], 
    authJWT,
    create_Room
);

/**나의 방 목록 조회 라우터 */
router.get('/all/me',
    authJWT,
    read_myAllRooms
);


export default router;