(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
System.register(["./scroll.js", "./video-player.js"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var scroll_js_1, video_player_js_1, scroller, YouTubeService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (scroll_js_1_1) {
                scroll_js_1 = scroll_js_1_1;
            },
            function (video_player_js_1_1) {
                video_player_js_1 = video_player_js_1_1;
            }
        ],
        execute: function () {
            SystemJS.config({
                map: {
                    youtubeIframeAPI: "https://www.youtube.com/iframe_api"
                },
                meta: {
                    "https://www.youtube.com/iframe_api": {
                        "format": "global",
                        "exports": "YT",
                        "scriptLoad": true,
                        "build": false
                    }
                }
            });
            scroller = new scroll_js_1.Scroller();
            $(function () {
                scroller.onScrollTimer();
            });
            YouTubeService = class YouTubeService {
                constructor() {
                    this.loadAPI();
                }
                loadAPI() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // console.log('loadAPI');
                        // on YouTube API load
                        window.onYouTubeIframeAPIReady = function () {
                            let videoPlayers = [
                                'playerIncantation',
                                'playerIncantationReferences',
                                'playerGestures',
                                'playerGesturesReferences',
                                'playerWill',
                                'playerWillReferences' // Will references
                            ];
                            for (var i in videoPlayers) {
                                new video_player_js_1.VideoPlayer(videoPlayers[i]);
                            }
                        };
                        try {
                            yield context_1.import('youtubeIframeAPI'); // automatically injects a script tag
                            // console.log('API loaded');
                        }
                        catch (e) {
                            console.error('The YouTube API failed to load: ' + e);
                        }
                    });
                }
            };
            exports_1("default", YouTubeService);
            new YouTubeService();
        }
    };
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ0dBLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ2YsR0FBRyxFQUFFO29CQUNKLGdCQUFnQixFQUFFLG9DQUFvQztpQkFDdEQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNMLG9DQUFvQyxFQUFFO3dCQUNyQyxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsU0FBUyxFQUFFLElBQUk7d0JBQ2YsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLE9BQU8sRUFBRSxLQUFLO3FCQUNkO2lCQUNEO2FBQ0QsQ0FBQyxDQUFDO1lBRUMsUUFBUSxHQUFHLElBQUksb0JBQVEsRUFBRSxDQUFDO1lBRTlCLENBQUMsQ0FBQztnQkFDRCxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQkFBQTtnQkFDQztvQkFDQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUssT0FBTzs7d0JBQ1osMEJBQTBCO3dCQUUxQixzQkFBc0I7d0JBQ3RCLE1BQU0sQ0FBQyx1QkFBdUIsR0FBRzs0QkFDaEMsSUFBSSxZQUFZLEdBQUc7Z0NBQ2xCLG1CQUFtQjtnQ0FDbkIsNkJBQTZCO2dDQUM3QixnQkFBZ0I7Z0NBQ2hCLDBCQUEwQjtnQ0FDMUIsWUFBWTtnQ0FDWixzQkFBc0IsQ0FBQyxrQkFBa0I7NkJBQ3pDLENBQUE7NEJBRUQsS0FBSyxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUU7Z0NBQzNCLElBQUksNkJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDakM7d0JBQ0YsQ0FBQyxDQUFDO3dCQUVGLElBQUk7NEJBQ0gsdUJBQWEsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLHFDQUFxQzs0QkFDdkUsNkJBQTZCO3lCQUM3Qjt3QkFDRCxPQUFPLENBQUMsRUFBRTs0QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUN0RDtvQkFDRixDQUFDO2lCQUFBO2FBQ0QsQ0FBQTs7WUFRRCxJQUFJLGNBQWMsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU2Nyb2xsZXIgfSBmcm9tICcuL3Njcm9sbC5qcyc7XG5pbXBvcnQgeyBWaWRlb1BsYXllciB9IGZyb20gJy4vdmlkZW8tcGxheWVyLmpzJztcblxuU3lzdGVtSlMuY29uZmlnKHtcblx0bWFwOiB7XG5cdFx0eW91dHViZUlmcmFtZUFQSTogXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCJcblx0fSxcblx0bWV0YToge1xuXHRcdFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiOiB7XG5cdFx0XHRcImZvcm1hdFwiOiBcImdsb2JhbFwiLFxuXHRcdFx0XCJleHBvcnRzXCI6IFwiWVRcIixcblx0XHRcdFwic2NyaXB0TG9hZFwiOiB0cnVlLFxuXHRcdFx0XCJidWlsZFwiOiBmYWxzZVxuXHRcdH1cblx0fVxufSk7XG5cbnZhciBzY3JvbGxlciA9IG5ldyBTY3JvbGxlcigpO1xuXG4kKGZ1bmN0aW9uKCkge1xuXHRzY3JvbGxlci5vblNjcm9sbFRpbWVyKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW91VHViZVNlcnZpY2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmxvYWRBUEkoKTtcblx0fVxuXG5cdGFzeW5jIGxvYWRBUEkoKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2xvYWRBUEknKTtcblxuXHRcdC8vIG9uIFlvdVR1YmUgQVBJIGxvYWRcblx0XHR3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgdmlkZW9QbGF5ZXJzID0gW1xuXHRcdFx0XHQncGxheWVySW5jYW50YXRpb24nLCAvLyBNZXJsaW4gRnJpaydzIEluY2FudGF0aW9uIGludHJvZHVjdGlvblxuXHRcdFx0XHQncGxheWVySW5jYW50YXRpb25SZWZlcmVuY2VzJywgLy8gSW5jYW50YXRpb24gcmVmZXJlbmNlc1xuXHRcdFx0XHQncGxheWVyR2VzdHVyZXMnLCAvLyBNZXJsaW4gRnJpaydzIEdlc3R1cmVzIGludHJvZHVjdGlvblxuXHRcdFx0XHQncGxheWVyR2VzdHVyZXNSZWZlcmVuY2VzJywgLy8gR2VzdHVyZSByZWZlcmVuY2VzXG5cdFx0XHRcdCdwbGF5ZXJXaWxsJywgLy8gTWVybGluIEZyaWsncyBXaWxsIGludHJvZHVjdGlvblxuXHRcdFx0XHQncGxheWVyV2lsbFJlZmVyZW5jZXMnIC8vIFdpbGwgcmVmZXJlbmNlc1xuXHRcdFx0XVxuXG5cdFx0XHRmb3IgKHZhciBpIGluIHZpZGVvUGxheWVycykge1xuXHRcdFx0XHRuZXcgVmlkZW9QbGF5ZXIodmlkZW9QbGF5ZXJzW2ldKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IGltcG9ydCgneW91dHViZUlmcmFtZUFQSScpOyAvLyBhdXRvbWF0aWNhbGx5IGluamVjdHMgYSBzY3JpcHQgdGFnXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnQVBJIGxvYWRlZCcpO1xuXHRcdH1cblx0XHRjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignVGhlIFlvdVR1YmUgQVBJIGZhaWxlZCB0byBsb2FkOiAnICsgZSk7XG5cdFx0fVxuXHR9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcblx0aW50ZXJmYWNlIFdpbmRvdyB7XG5cdFx0b25Zb3VUdWJlSWZyYW1lQVBJUmVhZHk/OiAoKSA9PiB2b2lkO1xuXHR9XG59XG5cbm5ldyBZb3VUdWJlU2VydmljZSgpOyJdfQ==
