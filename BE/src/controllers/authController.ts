import { NextFunction, Request, Response } from 'express';
import { findOrCreate_User,read_UserEmail } from '../services/userService';
import User from '../models/User';
import bcrypt from "bcrypt";
import { jwtSign, refreshJwtSign } from '../services/tokenService';

const signUp = async(req: Request, res: Response) => {
    try{
        const createUser = await findOrCreate_User(req.body);

        if(createUser){
            return res.status(200).json({status: 200, msg: "회원가입이 완료되었습니다."});
        }

        return res.status(401).json({status: 401, msg: "이미 등록된 이메일 입니다."});
    }catch(e){
        res.status(500).json(e);
    }
    
}

const login = async(req: Request, res: Response, next:NextFunction)  => {
    try{
        const { email, password } = req.body;

        const userInfo: User | null | undefined = await read_UserEmail(email);
        if(userInfo){
            const checkPassword: boolean = await bcrypt.compare(password, userInfo.password);

            if(checkPassword){
                const token = await jwtSign(userInfo.user_id);
                const refresh = await refreshJwtSign();
                res.cookie("accessToken",token,{httpOnly: true});
                res.cookie("refreshToken",refresh,{httpOnly: true});
                return res.status(200).json({status: 200, msg:"로그인에 성공하셨습니다."});
                // res.status(200).redirect("/");
                // 토큰 전달 및 로그인 성공 메시지 리다이렉트 페이지(메인 홈 or 채팅 방);
            }else{
                return res.status(401).json({status:401, msg:"비밀번호가 일치하지 않습니다."});
            }
        }
        return res.status(401).json({status:401, msg:"등록되지 않은 이메일입니다."});
    }catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}


export default {
    signUp,
    login,
}