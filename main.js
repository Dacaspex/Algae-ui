const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const net = require('net');
const exec = require('child_process').exec;

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

        data = JSON.parse(data);

        if (data.response_type == 'error') {
            console.log(data.error);
        }

        win.webContents.send('render-completed', 'image-0.png');
    });

    // Create window
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        useContentSize: true,
    });

    // Load UI
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

}

ipcMain.on('render-request', (event, arg) => {

    win.webContents.send('render-completed', 'image-0.png');

});

ipcMain.on('debug', (event, arg) => {
    console.log('[debug] ' + arg);
});

ipcMain.on('startup-render-request', (event, arg) => {

    client.write(JSON.stringify({
        "request_type": "image",
        "fractal": {
            "identifier": "julia_fractal",
            "settings": {
                "constant": {
                    "real": -0.4,
                    "imaginary": 0.6
                },
                "max_iterations": 500,
                "escape_value": 2.0,
                "scale": {
                    "center": {
                        "x": 0.0,
                        "y": 0.0
                    },
                    "zoom_level": 1.0
                }
            }
        },
        "color_scheme": {
            "identifier": "grey_scale_color_scheme"
        },
        "render_settings": {
            "width": arg.width,
            "height": arg.height
        }
    }) + "\n");
});

app.on('ready', init);
