import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authJWT = (req: Request, res: Response, next:NextFunction) => {
    try{
        if(!req.headers.authorization){
            return res.status(401).json({status:401, msg:"인증 쿠키가 존재하지 않습니다."});
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        const privateKey: string = process.env.JWTSECERTKEY || "jwt-secret-key";
        const checkToken: any = jwt.verify(token, privateKey);
        console.log(checkToken);
        if(checkToken.user_id){
            req.user_id = checkToken.user_id;
        }
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({status:500, msg:"쿠키 기간이 만료되었습니다."});
    }
}

export {
    authJWT,
}