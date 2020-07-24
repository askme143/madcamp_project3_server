const server = require('./app');
const hostname = '0.0.0.0'
const port = 80;

server.listen(port, hostname, ()=> {
    console.log('Server running');
})