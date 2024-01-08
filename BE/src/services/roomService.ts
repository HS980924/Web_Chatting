import { Op } from "sequelize";
import Participant from "../models/Participant";
import Room from "../models/Room";
import User from "../models/User";
import Friends from "../models/Friend";

export const read_myRooms = async (user_id:number, page:number, size:number) => {
    try{
        const rooms = await Participant.findAndCountAll({
            where: {
                user_id: user_id,
            },
            attributes: ["room_id", "room_title", "not_read_messageCnt", "last_read_messageId", "updatedAt"],
            include: [{
                model: Room,
                include: [{
                    model: Participant,
                    where: {[Op.not]: [{user_id: user_id}]},
                    include: [{
                        model: User,
                        attributes: ["profileImgUrl"],
                    }],
                    attributes: ["user_id"],
                    limit: 4,
                }],
                attributes: ["room_id","title" ,"last_message"],
            }],
            limit: size,
            offset: page,
            // order: [ ["updatedAt", "DESC"]]
        });
        return rooms;
    }catch(e){ 
        throw e;
    }
};

export const read_myRoomIdentifier = async(identifier: string) => {
    try{
        const room = await Room.findOne({ where : { identifier } });
        return room;
    }catch(e){
        throw e;
    }
};

export const create_RoomService = async (title: string, identifier:string) => {
    try{  
        const newRoom = await Room.create({
            title: title,
            identifier: identifier
        });
        return newRoom;
    }catch(e){
        throw e;
    }
};

export const update_Room = async(room_id: number, user_id: number, room_title: string) => {
    try{
        const updatedRoom = await Participant.update({
            room_title: room_title,
            },{
                where: {
                    room_id: room_id,
                    user_id: user_id,
                }
            });
        return updatedRoom;
    }catch(e){
        throw e;
    }
}

/** 채팅 방 퇴장 메소드 */
export const getout_Room = async(room_id: number, user_id:number) => {
    try{
        await Participant.destroy({where: {
            room_id: room_id,
            user_id: user_id,
        }});
    }catch(e){
        throw e;
    }
}

/** 채팅 방 삭제 메소드 */
export const delete_Room = async(room_id: number) => {
    try{
        
        const deletedRoom = await Room.destroy({
            where: { room_id: room_id}
        });

        return deletedRoom;
    }catch(e){
        throw e;
    }
};

