var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var http            = require('http');
var fs              = require('fs');
var Fabric_Client   = require('fabric-client');
var path            = require('path');
var util            = require('util');
var os              = require('os');
var cookieParser    = require('cookie-parser');
var mongoose        = require('mongoose');
var errorHandler    = require('errorhandler');
var expressErrorHandler = require('express-error-handler');
var expressSession  = require('express-session');
var static          = require('serve-static');
var crypto = require('crypto');

var user = require('./router/user');

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;

// MongoDB 연결 함수
function connectDB() {
	//데이터베이스 연결 정보
	var databaseUrl = 'mongodb://#';
	
	console.log("Connecting.....");
	
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
	database = mongoose.connection;
	
	database.on('err',console.error.bind(console, 'mongoose connection error'));
	database.on('open', function(){
		console.log('Connected : ' + databaseUrl);
		
		//user 스키마 및 모델 객체 생성
		createUserSchema();
	});
	
	//연결이 뜮어졌을 때 5초후 재연결
	database.on('disconnected', function(){
		console.log('연결이 끊어졌습니다. 5초 후 다시 연결합니다.');
		setInterval(connectDB, 5000);
	})
}

function createUserSchema() {
	UserSchema = require('./database/user_schema').createSchema(mongoose);
	console.log("UserSchema 정의함");
	UserModel = mongoose.model("users", UserSchema);
	console.log("UserModel 정의함");
	
	user.init(database,UserSchema,UserModel)
}
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./controller.js')(app);

app.use(express.static(path.join(__dirname, '../client')));

app.use(expressSession({
	secret: 'my key',
	resave: true,
	saveUnintialized: true
}));

var port = process.env.PORT || 8080;

app.listen(port,function() {
    console.log("Live on port : " + port);
    connectDB();
});
