var database;
var UserSchema;
var UserModel;
var id;

var init = function(db, schema, model) {
	console.log('init 호출됨');
	
	database = db;
	UserSchema = schema;
	UserModel = model;
}

var login = function(req,res) {
	console.log('user 모듈안에 있는 login 호출됨');
	
	var paramId = req.params.username || req.body.username || req.query.username;
	var paramPassword = req.params.password || req.body.password || req.query.password;

	if(database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if(err) {throw err;}
			
			if(docs) {
				if (paramId == 'jinsol') {
					res.redirect('/js_index.html');
					id = paramId;
					console.log(id);
				}
				if (paramId == 'yulhee') {
					res.redirect('/yh_index.html');
					id = paramId;
					console.log(id);
				}
			} else {
				res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h1>로그인 실패</h1>');
				res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {
		res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
		res.write('<h1>데이터 베이스 연결 실패</h1>');
		res.write('<div><p>데이터 베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}

}

var userid = function() {
	if (id=='jinsol') { return 'jinsol';}
	if (id=='yulhee') { return 'yulhee';}
}

var adduser = function(req, res) {
	console.log('user 모듈안에 있는 adduser 호출됨');
	
	var paramId = req.body.username || req.query.username;
	var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
	
	// 데이터 베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if(database) {
		addUser(database, paramId, paramPassword, function(err, result) {
			if(err) {throw err;}
			if(result && result.insertedCount > 0) {
				console.dir(result);
				
				res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.redirect('/signin');
			} else {
				res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
				res.write('<h2>사용자 추가 실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}

// 사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교
var authUser = function(database, username, password, callback) {
	console.log('authUser 호출됨 : ' + username + ', ' + password);
	
	//1. 아이디를 사용해 검색
	UserModel.findById(username, function(err, results) {
		if(err) {
			callback(err,null);
			return;
		}
		console.log('아이디 [%s]로 사용자 검색 결과', username);
		console.dir(results);
		
		if(results.length > 0) {
			console.log('아이디와 일치하는 사용자 찾음');
			
			//2. 비밀번호 확인 : 모델 인스턴스 객체를 만들고 authenticate() 메소드 호출
			var user= new UserModel({username : username});
			var authenticated = user.authenticate(password,results[0]._doc.salt,
												 results[0]._doc.hashed_password);
			
			if(authenticated) {
				console.log('비밀번호 일치함');
				callback(null,results);
			}
			else {
				console.log('비밀번호 일치하지 않음')
				callback(null,null);
			}		
		}		
	});
}

var addUser = function(database, username, password, callback) {
	console.log('addUser 호출됨 : ' + username + ', ' + password);
	
	//UserModel 인스턴스 생성
	var user = new UserModel({"username" : username, "password" : password});
	
	//save()로 저장
	user.save(function(err) {
		if(err) {
			callback(err,null);
			return;
		}
		console.log("사용자 데이터 추가함.");
		callback(null,user);
	});
	//users 컬렉션 참조
	var users = database.collection('userinfo');
	//id, password을 사용해 사용자 추가
	users.insertMany([{"username":username, "password":password}], function(err, result) {
		if(err) {
			callback(err,null);
			return;
		}
		// 오류가 아닌 경우, 콜백함수를 호출하면서 결과 객체 전달
		if(result.insertedCount > 0) {
			console.log("사용자 레코드 추가됨 : " + result.insertedCount);
		} else {
			console.log("추가된 레코드가 없음.")
		}
		
		callback(null, result);
	})
}

// module.exports.init = init;
// module.exports.login = login;
// module.exports.adduser = adduser;


module.exports = {
	init:init,
	login:login,
	adduser:adduser,
	userid: userid,
	// userid: 'jinsol',
	// userid: 'yulhee',
}

