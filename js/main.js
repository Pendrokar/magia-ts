System.register(["./scroll.js"], function (exports_1, context_1) {
    "use strict";
    var scroll_js_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (scroll_js_1_1) {
                scroll_js_1 = scroll_js_1_1;
            }
        ],
        execute: function () {
            // import { VideoPlayer } from './video-player';
            // import 'systemjs';
            // import 'youtube';
            // SystemJS.config({
            //   map: {
            //	youtube: "https://www.youtube.com/iframe_api"
            //   },
            //   meta: {
            //	"https://www.youtube.com/iframe_api": {
            //	  "format": "global",
            //	  "exports": "youtube",
            //	  "scriptLoad": true,
            //	  "build": false
            //	}
            //   }
            // });
            new scroll_js_1.Scroller();
        }
    };
});
