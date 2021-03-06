const $ = require('jQuery');
const { ipcRenderer } = require('electron');
const click = require('./js/controls/click');

click.init();

$(document).ready(function() {

    // ipcRenderer.send('startup-render-request', {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

});

ipcRenderer.on('render-completed', function(event, arg) {
    $('#target-image').attr('src', '../renders/' + arg);
});

function buildSettings(settings, settingsType) {

    var form = $('<form class="uk-form-horizontal settings"></form>');

    Object.keys(settings).forEach(function (key) {

        var element = settings[key];
        var input = getInputElem(element);

        form.append(
            $('<div class="uk-margin"></div>').append(
                $('<label class="uk-form-label" for="' + element.identifier + '"></label').text(element.description)
            ).append(
                $('<div class="uk-form-controls"></div>').append(input)
            )
        );
    });

    if (settingsType == 'fractal') {
        $('.fractal-settings').html(form);
    } else if (settingsType == 'colour') {
        $('.colour-scheme-settings').html(form);
    }
}

function getInputElem(element) {

    var input = null;

    switch (element.type) {
        case 'integer':
            input = $('<input type="number" step="1" pattern="\d+" />');
            break;

        case 'float':
            input = $('<input />');
        default:
    }

    input.attr('id', element.identifier);
    input.attr('class', 'uk-input user-input');
    input.attr('oninput', 'update()');

    return input;
}

function update() {

}

// TODO Move these somewhere else
var mandelbrotSettings = {
    "max_iterations": {
        "description": "Maximum number of iterations",
        "value": 512,
        "type": "integer"
    },
    "escape_value": {
        "description": "Escape value",
        "value": 2.0,
        "type": "float"
    }
}

buildSettings(mandelbrotSettings, 'fractal');
