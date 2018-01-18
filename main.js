const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const net = require('net');
var exec = require('child_process').exec;

var core_host = '127.0.0.1';
var core_port = 8181;
var core;
var client;

let win;

function init() {

    // Start core
    core = exec('java -jar algae-core.jar', function (error, stdout, stderr) {

            // TODO Function on std callbacks

            if (error) {
                // TODO Create better error logging
                console.log(error);
            }
    });

    // Create socket client
    client = new net.connect(core_port, core_host);
    client.setEncoding('utf8');

    // Add handlers
    client.on('error', function(error) {

        // TODO Create better handler
        console.log(error);

    });

    client.on('data', function(data) {

        data = data.replace(/\n$/, "");
        data = data.trim();

        if (data == '' || data == null) {
            // TODO Create better flow when no data is received
            return;
        }

        win.webContents.send('render-completed', data);
    });

    // Create window
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // Load ui
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

}

app.on('ready', init);
