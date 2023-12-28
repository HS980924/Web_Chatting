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

const create_Participant = async(room_id: number, title:string, members: any) => {
    try{
        const result = await Promise.all(
            members.map(async (user: any) => {
                await Participant.create({
                    room_id: room_id,
                    user_id: user?.friend_id,
                    room_title : title,
                });
            })
        );
        return result;
    }catch(e){
        throw e;
    }
}

export {
    create_Participant,
}