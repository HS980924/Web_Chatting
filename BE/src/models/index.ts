import { Sequelize, DataTypes } from "sequelize";
import { Config } from "../types/types";
import bcrypt from 'bcrypt';
import ConfigData from "../config/config";
import User from "./User";
import Room from "./Room";
import Chatting from "./Chatting";
import Participant from "./Participant";
import Friends from "./Friend";

const env = process.env.NODE_ENV || "development";
const configs: Config = ConfigData;
const config = configs[env];

interface DB {
    [key: string]: any;
    sequelize?: Sequelize;
}
  
const db: DB = {};

export function init(): Sequelize{

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password === null ? undefined : config.password,
    {
      host: config.host,
      dialect: "mysql",
      timezone: "+09:00",
    });

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
          type: DataTypes.STRING(40),
          allowNull:false,
          unique: true,
      },
      password:{
          type: DataTypes.STRING(150),
          allowNull:false,
          set(value:string) {
            this.setDataValue('password',bcrypt.hashSync(value, Number(process.env.SALT_ROUNDS)));
          }
      },
      profileImgUrl:{
          type: DataTypes.STRING(150),
          allowNull:true,
      },
      backgroundImgUrl:{
        type: DataTypes.STRING(150),
        allowNull:true,
      },
      introduce:{
          type: DataTypes.STRING(20),
          allowNull:true,
      }
  },{
      sequelize,
      modelName: 'User',
      tableName: 'user',
      charset: 'utf8',
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      underscored: true,
    });

    Room.init({
      room_id:{
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      title:{
          type: DataTypes.STRING(100),
          allowNull: false,
      },
      identifier: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      last_message: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },{ 
        sequelize,
        modelName: 'Room',
        tableName: 'room',
        charset: 'utf8',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        underscored: true,
    });

    Chatting.init({
      chat_id:{
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      message:{
          type: DataTypes.TEXT,
          allowNull: false,
      },
      not_read_userCnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },{
      sequelize,
      modelName: "Chatting",
      tableName: "chatting",
      charset: 'utf8',
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      underscored: true,
    });

    Participant.init({
      id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      room_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      room_title:{
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      not_read_messageCnt:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_read_messageId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      },{
        sequelize,
        modelName:"Participant",
        tableName:"participant",
        charset: 'utf8',
        freezeTableName: true,
    });

    Friends.init({
      id:{
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      friend_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      friend_name: {
        type: DataTypes.STRING(15),
        allowNull: true,
      }
      },{
        sequelize,
        modelName: "Friends",
        tableName: "friends",
        charset: 'utf8',
        freezeTableName: true,
    });

    User.hasMany(Participant, { foreignKey: 'user_id' });
    User.hasMany(Chatting,{ foreignKey: 'user_id' });
    User.hasMany(Friends, { foreignKey: "user_id" });
    User.hasMany(Friends, { foreignKey: 'friend_id' });

    Room.hasMany(Chatting,{ foreignKey: "room_id" });
    Room.hasMany(Participant,{ foreignKey: "room_id" });

    Chatting.belongsTo(User, { foreignKey: "user_id" });
    Chatting.belongsTo(Room, { foreignKey: "room_id" });

    Participant.belongsTo(User,{ foreignKey: "user_id"});
    Participant.belongsTo(Room,{ foreignKey: "room_id"});

    Friends.belongsTo(User,{ foreignKey: "user_id" });

  return sequelize;
};

// db.sequelize = sequelize;

// db.User = User;
// db.Room = Room;
// db.Chatting = Chatting;
// db.Friends = Friends;
// db.Participant = Participant;

// User.init(sequelize);
// Room.init(sequelize);
// Chatting.init(sequelize);
// Friends.init(sequelize);
// Participant.init(sequelize);

// User.associate(db);
// Room.associate(db);
// Chatting.associate(db);
// Friends.associate(db);
// Participant.associate(db);

// export default db;