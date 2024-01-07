import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { validationCheckError } from '../middlewears/validationCheck';
import { authJWT } from '../middlewears/tokenCheck';
import { 
    read_MyFriend, 
    create_IdMyFriend, 
    create_EmailMyFriend, 
    read_recommendFriends, 
    read_Friend,
    deleteMyFriend,
    updateMyFriend
} from '../controllers/friendController';


const router:Router = Router();


/** 내 친구 목록 조회 */ 
router.get('/me',[
    query("page").isInt(),
    query("size").isInt(),
    validationCheckError 
    ],
    authJWT,
    read_MyFriend    
);

/** 추천 친구 조회 */
// 모든 유저에서 내 친구 목록을 뺀 나머지
router.get('/recommend',
    authJWT,
    read_recommendFriends    
);

/** 내 친구 조회 */
router.get('/:id',[
    param("id").isInt(),
    validationCheckError],
    authJWT,
    read_Friend
);


/** 이메일로 친구 등록 하기 */ 
router.post('/',[
    body("email").isEmail(),
    validationCheckError],
    authJWT,
    create_EmailMyFriend    
)

/** Id로 친구 등록 하기 */ 
router.post('/:id',[
    param("id").isInt(),
    validationCheckError
    ],
    authJWT,
    create_IdMyFriend,
);

/** 친구 삭제 */ 
router.delete('/:id',[
    param("id").isInt(),
    validationCheckError
    ],
    authJWT,
    deleteMyFriend,
);

/** 친구 삭제 */ 
router.put('/:id',[
    param("id").isInt(),
    body("friend_name").isString(),
    validationCheckError
    ],
    authJWT,
    updateMyFriend,
)

export default router;