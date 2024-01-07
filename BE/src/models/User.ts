import { DataTypes, Model } from "sequelize";

interface UserAttributes {
    user_id: number | null;
    email: string;
    password: string;
    username: string;
    profileImgUrl: string | null;
    backgroundImgUrl: string | null;
    introduce: string | null;
}

export default class User extends Model<UserAttributes> {
    declare user_id: number;
    declare email: string;
    declare password: string;
    declare username: string;
    declare profileImgUrl: string;
    declare backgroundImgUrl: string;
    declare introduce: string;
    static user_id: any;
}

// module.exports = (sequelize: any, DataTypes: any) => {
//     class User extends Model<UserAttributes> implements UserAttributes{

//         user_id!: number;
//         email!: string;
//         password!: string;
//         username!: string;
//         profileImgUrl!: string;
//         introduce!: string;
        
//         static associate(models: any){
//             User.hasMany(models.Participant, {
//                 foreignKey: 'user_id',
//             });

//             User.hasMany(models.Chatting,{
//                 foreignKey: 'user_id',
//             });

//             User.hasMany(models.Friends, {
//                 foreignKey: "user_id",
//             });

//             User.hasMany(models.Friends, {
//                 foreignKey: 'friend_id'
//             });
//         }
//     }
//     User.init({
//         user_id:{
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         username:{
//             type: DataTypes.STRING(20),
//             allowNull: false,
//         },
//         email:{
//             type: DataTypes.STRING(40),
//             allowNull:false,
//             unique: true,
//         },
//         password:{
//             type: DataTypes.STRING(150),
//             allowNull:false,
//         },
//         profileImgUrl:{
//             type: DataTypes.STRING(150),
//             allowNull:true,
//         },
//         introduce:{
//             type: DataTypes.STRING(20),
//             allowNull:true,
//         }
//     },{
//         sequelize,
//         modelName: 'User',
//         tableName: 'user',
//         charset: 'utf8',
//         freezeTableName: true,
//         timestamps: true,
//         paranoid: true,
//         underscored: true,
//     });

//     return User;
// }


