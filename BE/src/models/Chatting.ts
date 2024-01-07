import { Model, DataTypes } from 'sequelize';

interface ChattingAttributes {
    chat_id: number | null;
    message: string;
    not_read_userCnt: number;
    room_id: number;
    user_id: number;
    createdAt: Date | null;
}


export default class Chatting extends Model<ChattingAttributes> {
    declare chat_id: number;
    declare message: string;
    declare not_read_userCnt: number;
    declare room_id: number;
    declare user_id: number;
    declare createdAt: Date;
}


// module.exports = (sequelize: any, DataTypes: any) => {
//     class Chatting extends Model<ChattingAttributes> implements ChattingAttributes{

//         chat_id!: number;
//         message!: string;
        
//         static associate(models: any){
//             Chatting.belongsTo(models.User, { foreignKey: "user_id" });
//             Chatting.belongsTo(models.Room, { foreignKey: "room_id" });
//         }
//     }
    
//     Chatting.init({
//         chat_id:{
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         message:{
//             type: DataTypes.TEXT,
//             allowNull: false,
//         }
//     },{
//         sequelize,
//         modelName: "Chatting",
//         tableName: "chatting",
//         charset: 'utf8',
//         freezeTableName: true,
//         timestamps: true,
//         paranoid: true,
//         underscored: true,
//     });

//     return Chatting;
// };
