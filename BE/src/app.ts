import express, { Request, Response, json, urlencoded } from 'express';
import { createServer } from "http";
import morgan from 'morgan';
import cors from 'cors';
import * as DB from "./models";
import auth from './routes/authRouter';
import user from './routes/userRouter';
import friend from './routes/friendRouter';
import room from './routes/roomRouter';
import { Websocket } from './socket/index';

const app: express.Application = express();

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api/friend',friend);
app.use('/api/room',room);

const sequelize = DB.init();

app.get("/",(req: Request,res: Response)=>{
    res.send("Web chatting BE Server");
});


const httpServer = createServer(app);

const server = httpServer.listen((app.get('port')), async()=>{
	// db.sequelize를 불러와 sync 메서드를 사용해 서버 실행 시 MySQL과 연동되도록 설정
	// force:false -> 서버 실행 시 테이블을 재생성하지 않겠다.
	// force:true -> 서버 실행 시 테이블을 재생성
	await sequelize
		.sync({force:false})
		.then(async()=>{
			console.log("DB connection Success");
		})
		.catch((e:Error) => {
			console.log(e);
		});
	
	console.log("server start");
});

Websocket(server, app);