var http = require('http');
var fs = require('fs');
var url = require('url');
const { Resolver } = require('dns/promises');

console.log("[Server Start Running]\n\n")

var app = http.createServer(function(request,response){
    var _url = request.url;

    var queryData = url.parse(_url, true).query;
    var ID = queryData.id;

    timestamp = new Date().getTime();
    date = new Date(timestamp); //타임스탬프를 인자로 받아 Date 객체 생성
    /* 생성한 Date 객체에서 년, 월, 일, 시, 분을 각각 문자열 곧바로 추출 */
    var year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
    var returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;

    if(ID!=null){
      //console.log("null")
      console.log("[ID] = " + ID + "\n[TIME] = " + returnDate + "\n");
      //console.log(_url);

      response.writeHead(302, {
        Location: `http://175.126.152.39:3000/index.html`
      }).end();
    }
    
    if(request.url == '/'){
      _url = '/index.html';
      //response.writeHead(200);
      //response.end(fs.readFileSync(__dirname + _url));
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);

    if(fs.existsSync(__dirname + _url)){
      response.end(fs.readFileSync(__dirname + _url));
    }
    else{
      response.writeHead(302, {
        Location: `http://175.126.152.39:3000`
      }).end();
    }
    

    /*response.writeHead(302, {
      Location: `http://175.126.152.39:3000/index.html`
    }).end();*/


    /*
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
    */
});
app.listen(3000);