/*!
   ################################
   ImagesStatus.js
   ################################
   + A fork of https://github.com/raphamorim/imgstatus Rewritten and enhanced with a simple way to detect images loading
   + version 0.1.2
   + Made with love by medBouzid
   + Credit to Raphael Amorim
   + Licensed under the MIT license
   #################################
   
*/

;(function(global, factory){

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if (typeof exports === 'object') {

        // CommonJS / nodejs module
        module.exports = factory();

    } else {

        // Browser globals
        global.imagesStatus = factory();

    }

})(this, function(){

    var defaultOptions = {

        imgLoaded: function(img){},

        imgFailed: function(img){},

        allImgFinished: function(imgs){}

    }

    var ImagesStatus = function(selector, options){

        var imgContainers = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;

        if (!imgContainers.length)

            return; // no images

        var instances = [];

        for (var i = 0; i < imgContainers.length; i++) {

            instances.push( new ImagesStatus.init(imgContainers[i], options) );

        }

        return instances;

    }

    ImagesStatus.prototype = {

        isCached: function(src) {

            var image = new Image();

            image.src = src;

            return image.complete;

        },

        setFailed: function(options, img) {

            this.status.failed++;

            if (typeof options.imgFailed === "function"){

                options.imgFailed.call(this, img);

            }

            if(this.isDone()){

                options.allImgFinished.call(this, this.container);

            }


        },

        setLoaded: function(options, img) {

            this.status.loaded++;

            if (typeof options.imgLoaded === "function"){

                options.imgLoaded.call(this, img);

            }

            if(this.isDone()){

                options.allImgFinished.call(this, this.container);

            }

        },

        isDone: function() {

            return ( (this.status.loaded + this.status.failed) === this.status.total ) ? true : false;

        }

    };

    ImagesStatus.init = function(imgContainer, options){

        var self = this;

        self.container = imgContainer;

        self.status = {
            loaded: 0,
            failed: 0,
            total: 0
        };

        self.images = images = imgContainer.getElementsByTagName('img');

        if (!self.images.length) { return;  }

        self.status.total = self.images.length;

        for (var i = 0; i < self.status.total; i++) {

            if (self.isCached(images[i].src)){

                self.setLoaded(options, images[i]);

            }else if (images[i].addEventListener) {

                images[i].addEventListener('load', self.setLoaded.bind(self, options, images[i]));

                images[i].addEventListener('error', self.setFailed.bind(self, options, images[i]));

            }else {

                images[i].attachEvent('onload', self.setLoaded.bind(self, options, images[i]));

                images[i].attachEvent('onerror', self.setFailed.bind(self, options, images[i]));

            }
        }
    };

    // set the prototype of our "constructor" to ImagesStatus prototype, so object created will share properties and methods of the prototype
    ImagesStatus.init.prototype = ImagesStatus.prototype

    // ###################### make jquery plugin if jquery exists ####################

    if(this.jQuery){

        // set $ variable to jQuery
        $ = jQuery;

        $.fn.imagesStatus = function(options){

            return ImagesStatus( this, options );

        }
    }

    // ###############################################################################

    return ImagesStatus;

});
