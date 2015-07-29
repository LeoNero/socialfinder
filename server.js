var forever = require('forever-monitor');
var Monitor = forever.Monitor;

var child = new Monitor('app.js', {
    max: 10,
    silent: true,
    killTree: true,
    logFile: 'forever.log',
    outFile: 'app.log',
    errFile: 'error.log'
});

child.on('exit', function() {
    console.log("Servidor finalizado.");
});
