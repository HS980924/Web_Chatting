import { Model } from 'sequelize';

interface ParticipantAttributes{
    id: number | null;
    room_id: number;
    user_id: number;
    room_title: string;
    not_read_messageCnt: number | null;
    last_read_messageId: number | null;
}

export default class Participant extends Model<ParticipantAttributes>{
    declare id: number;
    declare room_id: number;
    declare user_id: number;
    declare room_title: string;
    declare not_read_messageCnt: number;
    declare last_read_messageId: number;
}

    // static associate(db: any){
    //     db.Participant.belongsTo(db.User,{ foreignKey: "user_id"});
    //     db.Participant.belongsTo(db.Room,{ foreignKey: "room_id"});
    // }
    // Participant.init({
    //     id:{
    //         type: DataTypes.INTEGER.UNSIGNED,
    //         allowNull: false,
    //         autoIncrement: true,
    //         primaryKey: true,
    //     }},{
    //         sequelize,
    //         modelName:"Participant",
    //         tableName:"participant",
    //         charset: 'utf8',
    //         freezeTableName: true,
    //     });

    //     static init(sequelize: any){
    //         return super.init({
    //             id:{
    //                 type: DataTypes.INTEGER.UNSIGNED,
    //                 allowNull: false,
    //                 autoIncrement: true,
    //                 primaryKey: true,
    //             }
    //             },{
    //                 sequelize,
    //                 modelName:"Participant",
    //                 tableName:"participant",
    //                 charset: 'utf8',
    //                 freezeTableName: true,
    //         });
    //     }

    //     static associate(db: any){
    //         db.Participant.belongsTo(db.User,{ foreignKey: "user_id"});
    //         db.Participant.belongsTo(db.Room,{ foreignKey: "room_id"});
    //     }
    // }

    

    // return Participant;
// }