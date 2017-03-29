# imagesStatus

A javascript plugin (with jQuery support) to detect the status of images loading

Based on **imgStatus** https://github.com/raphamorim/imgStatus written originally by Raphael Amorim, Rewritten 
almost totally to provide a simple way to deal with images loading, made in a nice way with callbacks for the image status
with the support of jQuery for people who want to use it in the jQuery plugin way.

Vanilla Javascript :

```javascript
imagesStatus('.imageContainerDiv', {

    imgLoaded: function(img){
        console.log(this.status.loaded);
        console.log(img);
    },

    imgFailed: function(img){
        console.log(this.status.failed);
        console.log("-------failed---------------");
        console.log(img);
        console.log("-----------------------------");
    },

    allImgFinished: function(container){
        console.log("all images loaded");
        console.log(this.status.loaded + " images loaded, " + this.status.failed + " images failed!");
    }

 });
 
```

jQuery :

```javascript
$(".imageContainerDiv").imagesStatus({

    imgLoaded: function(img){
        console.log(this.status.loaded);
        console.log(img);
    },

    imgFailed: function(img){
        console.log(this.status.failed);
        console.log("-------failed---------------");
        console.log(img);
        console.log("-----------------------------");
    },

    allImgFinished: function(container){
        console.log("all images loaded");
        console.log(this.status.loaded + " images loaded, " + this.status.failed + " images failed!");
    }

 });

```

## Feedback

Please use the [Issues](https://github.com/medBouzid/imagesStatus/issues) for any bugs, feature requests, etc.

## License

MIT License
