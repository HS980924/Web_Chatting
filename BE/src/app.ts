import express, { Request, Response, json, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as DB from "./models";

const app: express.Application = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('dev'));

app.set("port", process.env.PORT || 8080);


// db.sequelize를 불러와 sync 메서드를 사용해 서버 실행 시 MySQL과 연동되도록 설정
// force:false -> 서버 실행 시 테이블을 재생성하지 않겠다.
// force:true -> 서버 실행 시 테이블을 재생성
// sequelize.sync({force:false})
// 	.then(()=>{
// 		console.log('데이터베이스 연결 성공');
// 	})
// 	.catch((err)=>{
// 		console.error(err);
// 	});


const sequelize = DB.init();

app.get("/",(req: Request,res: Response)=>{
    res.send("Web chatting BE Server");
});

app.listen((app.get('port')), async()=>{
    console.log("server start");

	await sequelize
		.sync({force:false})
		.then(async()=>{
			console.log("DB connection Success");
		})
		.catch((e:Error) => {
			console.log(e);
		});
});