import { NextFunction, Request, Response } from "express";
import { read_myRooms, create_RoomService, read_myRoomIdentifier, update_Room } from "../services/roomService";
import { check_myRoom, create_Participant } from "../services/participantService";


const read_myAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_id = Number(req.user_id);
        const page = Number(req.query.page);
        const size = Number(req.query.size);
        
        const rooms = await read_myRooms(user_id, page, size);
        if(rooms){
            return res.status(200).json({status:200, msg:"채팅방 목록 조회 성공", data:rooms});
        }
        return res.status(400).json({status:400, msg:"채팅방 목록 조회 실패"});
    }catch(e){
        console.log(e);
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const create_Room = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user_id = req.user_id;
        let { title, members } = req.body;

        if(members.length == 1){
            title = members[0].friend_name;
        }

        members.push({friend_id: user_id, friend_name: null});
        members.sort((a:any, b:any) => a.friend_id - b.friend_id);
        const memberIdList = members.map((user:any) => user.friend_id); 
        const identifier = memberIdList.join(',');

        const isRoom = await read_myRoomIdentifier(identifier);

        if(isRoom){
            return res.status(400).json({status:400, msg:"이미 방이 존재합니다."});
        }
        const room = await create_RoomService(title, identifier);
        if(room){
            const participant = await create_Participant(room.room_id, title, members);
            if(participant){
                return res.status(200).json({status:200, msg:"방 생성 완료"});
            }
            return res.status(400).json({status:400, msg:"참가자 추가 에러"});
        }
        return res.status(400).json({status: 400, msg:"방 생성 실패"});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

export const updateRoom = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user_id: number = Number(req.user_id);
        const room_id: number = Number(req.params.id);
        const { room_title } = req.body;

        const check = await check_myRoom(room_id, user_id);

        if(check){
            const result = await update_Room(room_id, user_id, room_title);
            if(result){
                return res.status(200).json({status:200, msg:"채팅 방 제목 수정 완료"}, );
            }
            return res.status(400).json({status:400, msg:"채팅 방 제목 수정 실패"});
        }
        return res.status(400).json({status:400, msg:"해당 방은 존재하지 않는 방입니다."});
    }catch(e){
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const getOut_Room = async(req: Request, res:Response, next:NextFunction) => {
    try{
        const user_id: number = Number(req.user_id);
        


    }catch(e){
        console.log(e);
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

const delete_Room = async(req: Request, res:Response, next:NextFunction) => {
    try{
        const friend_id = req.params.friendId;
        const user_id = req.user_id;

    }catch(e){
        console.log(e);
        return res.status(500).json({status:500, msg:"서버 내부 에러"});
    }
}

export {
    read_myAllRooms,
    create_Room,
    update_Room,
    getOut_Room,
    delete_Room,
}