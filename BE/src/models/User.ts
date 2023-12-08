import { DataTypes, Model, Sequelize } from "sequelize";

interface MotionsEmpl {
    user_id: number,
    email: string,
    password: string,
    username: string,
    // created_at:
    // modified_at: 
    // deleted_at:

}

export class User extends Model{}

User.init({
    user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING(150),
        allowNull:false,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },  
    modified_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at:{
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    freezeTableName: true
});