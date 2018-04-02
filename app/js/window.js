const fs = require('fs');

// Mapper : ui settings -> request object
// e.g. julia_fractal_mapper(ui_settings): request
// Each fractal/color scheme has it's own file with html
// Mapper file where all mappers are defined

const $ = require('jQuery');

loadFractalSettings('julia_fractal_settings');

function loadFractalSettings(identifier) {

    fs.readFile(
        __dirname + '/settings_templates/' + identifier + '.html',
        function (error, data) {

        if (error) {
            console.log('Error while reading file: ' + identifier);
            return;
        }

        $('.fractal-settings').html(data.toString());

    });

}
