import { NextFunction, Request, Response } from "express";
import { read_UserId, read_UserAllList } from "../services/userService";


const read_myInfo = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        
        const user = await read_UserId(user_id);
        if(user){
            return res.status(200).json({status:200, msg:"내 정보 조회 성공", data:user});
        }
        return res.status(200).json({status:200, msg:"내 정보 조회 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const read_UserAll = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const page: number = Number(req.query.page) || 0;
        const size = Number(req.query.size) || 20;
    
        const userList = await read_UserAllList(page, size); 
        if(userList){
            return res.status(200).json({status:200, msg:"모든 유저 정보 조회 성공", data:userList});
        }
        return res.status(400).json({status:400, msg:"유저 정보 조회 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const read_User = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user_id: number = Number(req.params.id);
        
        const user = await read_UserId(user_id); 
        if(user){
            return res.status(200).json({status:200, msg:"유저 정보 조회 성공", data:user});
        }
        return res.status(400).json({status:400, msg:"존재하지 않는 유저입니다."});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const create_UserFriend = async(req: Request, res:Response, next:NextFunction) => {
    try{
        const friend_id = req.params.friendId;
        const user_id = req.user_id;

    }catch(e){
        console.log(e);
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

export {
    read_myInfo,
    read_UserAll,
    read_User,
}