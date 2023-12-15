import { NextFunction, Request, Response } from 'express';

const signUp = async(req: Request, res: Response, next:NextFunction) => {

    const { email, password } = req.body;
    

}

const login = async(req: Request, res: Response, next:NextFunction)  => {

}


export default {
    signUp,
    login,
}