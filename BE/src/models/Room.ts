import { Model, DataTypes } from 'sequelize';

interface RoomAttributes{
    room_id: number | null;
    title: string;
    identifier: string;
    last_message: string | null;
}

export default class Room extends Model<RoomAttributes> {
    declare room_id: number;
    declare title: string;
    declare identifier: string;
    declare last_message: string;
}
// module.exports = (sequelize: any, DataTypes: any) => {
//     class Room extends Model<RoomAttributes> implements RoomAttributes{
//         room_id!: number;
//         title!: string;

//         static associate(models: any){
//             Room.hasMany(models.Chatting,{
//                 foreignKey: "room_id",
//             });
            
//             Room.hasMany(models.Participant,{
//                 foreignKey: "room_id",
//             });
//         }
//     }
//     Room.init({
//         room_id:{
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         title:{
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         }
//     },{ 
//         sequelize,
//         modelName: 'Room',
//         tableName: 'room',
//         charset: 'utf8',
//         freezeTableName: true,
//         timestamps: true,
//         paranoid: true,
//         underscored: true,
//     });

//     return Room;
// }
