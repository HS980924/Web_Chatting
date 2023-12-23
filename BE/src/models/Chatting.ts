import { Model, DataTypes } from 'sequelize';

interface ChattingAttributes {
    chat_id: number;
    message: string;
    not_read_userCnt: number;
}


export default class Chatting extends Model<ChattingAttributes> {
    declare chat_id: number;
    declare message: string;
    declare not_read_userCnt: number;
}

// class User extends Model {}

// User.init({
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING
//         // allowNull defaults to true
//     }
// }, {
//     sequelize, // We need to pass the connection instance
//     modelName: 'User' // We need to choose the model name
// });




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
