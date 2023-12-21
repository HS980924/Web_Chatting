import { Router } from 'express';
import { query, param } from 'express-validator';
import { validationCheckError } from '../middlewears/validationCheck';
import { authJWT } from '../middlewears/tokenCheck';
import { create_MyFriend, read_MyFriend } from '../controllers/friendController';


const router:Router = Router();

// 특정 친구 조회 하기
// 굳이 만들어야 하나?  user 조회 기능도 있는데?
router.get(':id',[
    param("id").isInt(),
    validationCheckError],
    authJWT,
);

// 내 친구 목록 불러오기
router.get('/me',[
    query("page").isInt(),
    query("size").isInt(),
    validationCheckError 
    ],
    authJWT,
    read_MyFriend    
)

// 친구 등록 하기
router.post('/:id',[
    param("id").isInt(),
    validationCheckError
    ],
    authJWT,
    create_MyFriend,
);

export default router;