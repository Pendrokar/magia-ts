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
    var scroll_js_1, video_player_js_1, YouTubeService;
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
            new scroll_js_1.Scroller();
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
