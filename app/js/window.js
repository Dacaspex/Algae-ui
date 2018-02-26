const $ = require('jQuery');
const { ipcRenderer } = require('electron');
const click = require('./js/controls/click');

const test = $('.settings');

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

function buildSettings(settings) {

    var html = $('<form class="uk-form-horizontal"></form>');

    settings.forEach((element) => {

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
        input.attr('class', 'uk-input');

        html.append(
            $('<div class="uk-margin"></div>').append(
                $('<label class="uk-form-label" for="' + element.identifier + '"></label').text(element.description)
            ).append(
                $('<div class="uk-form-controls"></div>').append(input)
            )
        );

    });

    test.html(html);

}

// TODO Move these somewhere else
var mandelbrotSettings = [
    {
        "identifier": "max_iterations",
        "description": "Maximum number of iterations",
        "value": 512,
        "type": "integer"
    },
    {
        "identifier": "escape_value",
        "description": "Escape value",
        "value": 2.0,
        "type": "float"
    }
]

buildSettings(mandelbrotSettings);
