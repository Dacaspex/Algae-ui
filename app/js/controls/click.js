var click = (function($, ipcRenderer) {

    var enabled = true;
    var image = null;

    var init = function() {

        this.image = $('#target-image');
        this.image.click(zoomInHandler);
        this.image.contextmenu(zoomOutHandler);

    }

    var zoomInHandler = function(event) {
        if (enabled) {

        }
    }

    var zoomOutHandler = function(event) {
        if (enabled) {

        }
    }

    return {
        init: init,
    };

})($, ipcRenderer);

module.exports = click;
