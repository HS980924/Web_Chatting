import { Model, DataTypes } from 'sequelize';

interface ParticipantAttributes{
    id: number;
}

export default class Participant extends Model<ParticipantAttributes>{
    declare id: number;
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