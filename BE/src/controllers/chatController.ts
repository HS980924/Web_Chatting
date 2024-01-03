import { NextFunction, Request, Response } from "express";
import { create_chatting, read_chattings } from "../services/chatService";
import { read_countParticipant } from "../services/participantService";

export const read_Chatting = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        const page = Number(req.query.page);

        const messages = await read_chattings(user_id, page);
        if(messages){
            return res.status(200).json({status:200, msg:"채팅 목록 조회 성공", data:messages});
        }
        return res.status(400).json({status:400, msg:"채팅 목록 조회 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

export const create_Chatting = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        const room_id = Number(req.params.roomId);
        const { message } = req.body;

        const userCnt = await read_countParticipant(room_id);
        if(userCnt){
            const chatting = await create_chatting(room_id, user_id, message, userCnt);
            if(chatting){
                return res.status(200).json({status:200, msg:"메시지 생성 완료", data:chatting});
            }
            return res.status(400).json({status:400, msg:"메시지 생성 실패"});
        }
        return res.status(400).json({status:400, msg:"유저가 존재하지 않습니다."});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}