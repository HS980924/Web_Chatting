import { NextFunction, Request, Response } from "express";
import { read_UserEmail, read_UserId } from "../services/userService";
import { check_myFriend, create_friend, read_myFreinds, read_recommendFriend } from "../services/friendService";

const read_MyFriend = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id: number = Number(req.user_id);
        const page: number = Number(req.query.page) || 0;
        const size: number = Number(req.query.size) || 20;
        
        const friends = await read_myFreinds(user_id, page, size);
        if(friends){
            return res.status(200).json({status:200, msg:"친구 목록 조회 성공", data:friends});
        }
        return res.status(400).json({status:400, msg:"친구 목록 조회 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const create_IdMyFriend = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        const friend_id = Number(req.params.id);
        
        const friend = await read_UserId(friend_id);
        if(friend){
            const isFriend = await check_myFriend(user_id, friend_id);
            if(isFriend){
                return res.status(400).json({status:400, msg:"이미 등록된 친구 입니다."});
            }
            const createdFriend = await create_friend(friend_id, user_id, friend.username);
            if(createdFriend){
                return res.status(200).json({status:200, msg:"친구 등록 성공", data:createdFriend});
            }
            return res.status(400).json({status:400, msg:"친구 등록 실패했습니다."});
        }
        return res.status(400).json({status:400, msg:"존재하지 않는 유저입니다."});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const create_EmailMyFriend = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email } = req.body;
        const user_id = Number(req.user_id);

        const friend = await read_UserEmail(email);
        if(friend){
            const friend_id = friend.user_id;
            const isFriend = await check_myFriend(user_id, friend_id);
            if(isFriend){
                return res.status(400).json({status:400, msg:"이미 등록된 친구 입니다."});
            }
            const createdFriend = await create_friend(friend_id, user_id, friend.username);
            if(createdFriend){
                return res.status(200).json({status:200, msg:"친구 등록 성공", data:createdFriend});
            }
            return res.status(400).json({status:400, msg:"친구 등록 실패했습니다."});
        }
        return res.status(400).json({status:400, msg:"존재하지 않는 유저입니다."});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

export const read_recommendFriends = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        
        const recommend_friends = await read_recommendFriend(user_id);
        if(recommend_friends){
            return res.status(200).json({status:200, msg:"추천 친구 목록 조회 성공.", data:recommend_friends});
        }
        return res.status(400).json({status:400, msg:"추천 친구 목록 조회 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}



export {
    read_MyFriend,
    create_IdMyFriend,
    create_EmailMyFriend
}