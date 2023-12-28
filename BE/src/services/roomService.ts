import { Op } from "sequelize";
import Participant from "../models/Participant";
import Room from "../models/Room";
import User from "../models/User";

export const read_myRooms = async (user_id:number, page:number, size:number) => {
    try{
        const rooms = await Participant.findAndCountAll({
            where: {
                user_id,
            },
            attributes: ["room_id", "room_title", "not_read_messageCnt", "last_read_messageId"],
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
                }]
            }],
            limit: size,
            offset: page,
            // order: [[User, 'username', 'ASC']],
            // order: [],
        });
        return rooms;
    }catch(e){ 
        throw e;
    }
};

export const read_myRoomIdentifier = async(identifier: string) => {
    try{
        const room = await Room.findOne({where : {identifier}});
        return room;
    }catch(e){
        throw e;
    }
}

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
}