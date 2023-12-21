import Participant from "../models/Participant";
import Room from "../models/Room";

const read_myRooms = async (user_id:number, page:number, size:number) => {
    try{
        const rooms = await Participant.findAndCountAll({
            
            limit: size,
            offset: page,
        });
        return rooms;
    }catch(e){ 
        throw e;
    }
};

const create_Room = async (title: string) => {
    try{  
        const newRoom = await Room.create({
            title: title
        });
        return newRoom;
    }catch(e){
        throw e;
    }
}


export {
    read_myRooms,
}