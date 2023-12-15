import { NextFunction, Request, Response } from 'express';
import { signUpUser } from '../services/authService';

const signUp = async(req: Request, res: Response) => {
    try{
        const createUser = await signUpUser(req.body);

        if(createUser){
            return res.status(200).json({message: "회원가입이 완료되었습니다."});
        }

        return res.status(401).json({message: "이미 등록된 이메일 입니다."});
    }catch(e){
        res.status(500).json(e);
    }
    
}

const login = async(req: Request, res: Response, next:NextFunction)  => {

}


export default {
    signUp,
    login,
}