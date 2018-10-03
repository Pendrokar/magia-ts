System.register(["./scroll.js", "./video-player"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var scroll_js_1, video_player_1, YouTubeService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (scroll_js_1_1) {
                scroll_js_1 = scroll_js_1_1;
            },
            function (video_player_1_1) {
                video_player_1 = video_player_1_1;
            }
        ],
        execute: function () {
            // import 'systemjs';
            // import 'youtube';
            SystemJS.config({
                map: {
                    youtube: "https://www.youtube.com/iframe_api"
                },
                meta: {
                    "https://www.youtube.com/iframe_api": {
                        "format": "global",
                        "exports": "youtube",
                        "scriptLoad": true,
                        "build": false
                    }
                }
            });
            new scroll_js_1.Scroller();
            YouTubeService = class YouTubeService {
                loadAPI() {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('loadAPI');
                        // on YouTube API load
                        window.onYouTubeIframeAPIReady = function () {
                            console.log('onYouTubeIframeAPIReady()');
                            // Merlin Frik's Incantation introduction
                            new video_player_1.VideoPlayer('playerIncantation');
                            // Incantation references
                            new video_player_1.VideoPlayer('playerIncantationReferences');
                            // Merlin Frik's Gestures introduction
                            new video_player_1.VideoPlayer('playerGestures');
                            // Gesture references
                            new video_player_1.VideoPlayer('playerGesturesReferences');
                            // Merlin Frik's Will introduction
                            new video_player_1.VideoPlayer('playerWill');
                            // Will references
                            new video_player_1.VideoPlayer('playerWillReferences');
                        };
                        try {
                            // var tag = document.createElement('script');
                            // tag.src = "https://www.youtube.com/iframe_api";
                            // var firstScriptTag = document.getElementsByTagName('script')[0];
                            // if (firstScriptTag.parentNode != null) {
                            //	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                            // }
                            // console.log('API loaded'); // this is shown on the console.
                            // await import('youtube'); // automatically injects a script tag
                        }
                        catch (e) {
                            console.error('The YouTube API failed to load');
                        }
                    });
                }
            };
            exports_1("default", YouTubeService);
        }
    };
});
