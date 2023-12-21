import Participant from "../models/Participant";

const read_MyParticipantList = async (user_id:number, page:number, size:number) => {
    try{
        const roomIds = await Participant.findAndCountAll({
            where: { user_id:user_id },
            attributes: ["room_id"],
            limit: size,
            offset: page,
        });
        return roomIds;
    }catch(e){ 
        throw e;
    }
};