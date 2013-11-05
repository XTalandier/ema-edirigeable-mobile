var util   = require('util'),
    http   = require('http'),
    fs     = require('fs'),
    url    = require('url'),
    events = require('events');

var DEFAULT_PORT = 8000;

function HttpServer(handler) {
	this.handler = new handler();
	this.server = http.createServer(this.handleRequest.bind(this));
}
HttpServer.prototype.start = function(port) {
	this.port = port;
	this.server.listen(port);
	util.puts('Http Server running at http://localhost:' + port + '/');
};

HttpServer.prototype.handleRequest = function(req, res){
	var parsed = url.parse(req.url);
	parsed.pathname = url.resolve('/', parsed.pathname);
	var dataUrl = url.parse(url.format(parsed), true);
	var meth = dataUrl.pathname.replace('/' , '');
	util.puts(meth + ' => ' + JSON.stringify(dataUrl.query));
	var callback = this.handler[meth];
	if(typeof callback == 'function'){
		var that = this;
		this.handler[meth](function(data){
			that.sendData(res, 300, {message: 'ok', data: data});
		}, dataUrl.query);
	}else if((typeof callback == 'string') || (typeof callback == 'number') || (typeof callback == 'boolean') ){
		var data = {message: 'ok'};
		data[meth] = callback;
		this.sendData(res, 404, data);
	}else if((typeof callback == 'object')){
		var data = {message: 'ok'};
		data[meth] =  JSON.stringify(callback);
		this.sendData(res, 404, data);
	}else{
		this.sendData(res, 404, {message: 'Unknow method \'' + meth + '\''});
	}
};
HttpServer.prototype.sendData = function(res, code, data){
	res.writeHead(code, {
		'Content-Type': 'text/json'
	});
	res.write(JSON.stringify(data));
	res.end();
};
var server = new HttpServer(Mock);

server.start(DEFAULT_PORT);




function Mock(){
	
}

Mock.prototype.getInfos = function(f) {
	if(this.latitude === undefined){
		this.latitude = 1.093245;
		this.longitude = 1.093245;
		this.temperature = 12;
	}
	this.temperature += rnd(0, 3) * aSign();
	this.latitude    += (Math.random() / 10) * aSign();
	this.longitude   += (Math.random() / 10) * aSign();
	var data = {
		temperature: this.temperature,
		latitude: this.latitude,
		longitude: this.longitude
	};
	f(data);
};


function aSign(){
	return rnd(0, 1000) % 2 == 0 ? -1 : 1
}
function rnd(min, max){
	return Math.floor(Math.random() * max) + min;
}




