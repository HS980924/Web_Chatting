import { Op } from "sequelize";
import Participant from "../models/Participant";
import Chatting from "../models/Chatting";
import Room from "../models/Room";
import User from "../models/User";

export const read_chattings = async (room_id:number, page:number) => {
    try{
        const messages = await Chatting.findAndCountAll({
            where: {
                room_id: room_id,
            },
            limit: 30,
            offset: page,
            order: [["created_at","DESC"],]
        });
        return messages;
    }catch(e){ 
        throw e;
    }
};

export const create_chatting = async (room_id:number, user_id:number, message:string, userCnt:number) => {
    try{
        const chatting = await Chatting.create({ 
            room_id: room_id,
            user_id: user_id,
            message: message,
            not_read_userCnt: userCnt,
         });
         return chatting;
    }catch(e){
        throw e;
    }
}

export const update_chatOne = async (room_id: number, chat_id: number, user_id:number, message:string) => {
    try{
        const updatedMessage = await Chatting.update({
            message: message
        },{
            where: {
                room_id: room_id,
                chat_id: chat_id,
                user_id: user_id,
                createdAt: {
                    [Op.gt]: new Date(+new Date() -  5 * 60 * 1000)
                },
            }
        });

        return updatedMessage;
    }catch(e){
        throw e;
    }
}

export const delete_chatOne = async (room_id: number, chat_id:number, user_id: number) => {
    try{
        const deleteMessage = await Chatting.destroy({
            where:{ 
                room_id: room_id,
                chat_id: chat_id,
                user_id: user_id,
                createdAt: {
                    [Op.gt]: new Date(+new Date() -  5 * 60 * 1000)
                },
            }
        });
        return deleteMessage;
    }catch(e){
        throw e;
    }
}

export const delete_chatAll = async (room_id: number) => {
    try{
        const deletedChat = await Chatting.destroy({where : { room_id: room_id}});
        return deletedChat;
    }catch(e){
        throw e;
    }
}