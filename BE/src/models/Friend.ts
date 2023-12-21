import { Model, DataTypes } from 'sequelize';

interface FriendsAttributes{
    id: number | null;
    friend_id: number;
    user_id: number;
}

export default class Friends extends Model<FriendsAttributes>{
    declare id: number;
    declare friend_id: number;
    declare user_id: number;
}

// module.exports = (sequelize: any, DataTypes: any) => {
//     class Friends extends Model<FriendsAttributes> implements FriendsAttributes{
//         id!: number;

//         static associate(models: any){
//             Friends.belongsTo(models.User,{ foreignKey: "user_id" });
//         }
//     }

//     Friends.init({
//         id:{
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         }
//     },{
//         sequelize,
//         modelName: "Friends",
//         tableName: "friends",
//         charset: 'utf8',
//         freezeTableName: true,
//     });
    
//     return Friends;
// }