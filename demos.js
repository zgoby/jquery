const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	if (req.url===('/'||'')) {
		res.end(fs.readFileSync('./index.html'));
	}else if((/^(\/dist\/).+(\.[a-zA-Z]+)$/).test(req.url)) {
		res.end(fs.readFileSync(__dirname+req.url))
	}else{
		res.end('<H1>404</H1><p>url is not found!</p>')
	}
})

server.listen(3000)
