System.register([], function (exports_1, context_1) {
    "use strict";
    var VideoPlayer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            VideoPlayer = class VideoPlayer {
                constructor(tagId) {
                    this.startTime = 0;
                    this.scrollTimer = -1;
                    this.videoPlayerID = tagId;
                    this.playerSettings = {
                        events: {
                            'onReady': (event) => this.onPlayerReady(),
                            'onStateChange': (event) => this.onPlayerStateChange(event)
                        }
                    };
                    this.videoPlayerIframe = $('#' + tagId).get(0);
                    this.videoPlayer = new YT.Player(tagId, this.playerSettings);
                }
                // TODO: move to service
                onScrollTimer() {
                    if (this.scrollTimer != -1)
                        clearTimeout(this.scrollTimer);
                    // console.log('YouTube API: "' + this.videoPlayerID + '"');
                    this.scrollTimer = window.setTimeout(() => this.checkPlayerVisibility(), 150);
                }
                // The API will call this function when the video player is ready.
                onPlayerReady() {
                    this.startTime = this.videoPlayer.getCurrentTime();
                    this.videoPlayerIframe = this.videoPlayer.getIframe();
                    this.videoPlayer.setPlaybackQuality('small');
                    // Mute non-reference videos
                    if (this.videoPlayerIframe.id.indexOf('References') != -1) {
                        this.videoPlayer.mute();
                        this.checkPlayerVisibility();
                    }
                    // Unmute/Mute on hover
                    $(this.videoPlayerIframe)
                        .on('mouseenter', (event) => this.onRefPlayerMouseOver())
                        .on('mouseleave', (event) => this.onRefPlayerMouseOut());
                    // TODO: move to service
                    $('.scroll-view').on('scroll', (event) => this.onScrollTimer());
                }
                // The API calls this function when the player's state changes.
                //    The function indicates that when playing a video (state=1),
                //    the player should play for six seconds and then stop.
                onPlayerStateChange(event) {
                    // Repeat playing
                    if (event.data == YT.PlayerState.ENDED) {
                        this.videoPlayer.seekTo(this.startTime, true);
                        this.videoPlayer.playVideo();
                    }
                }
                checkPlayerVisibility() {
                    // if (this.videoPlayer.getPlayerState() == YT.PlayerState.PAUSED) {
                    //	return;
                    // }
                    try {
                        if ($(this.videoPlayerIframe).visible(false, true, "both", $("#scroll-view"))) {
                            // && !done
                            this.videoPlayer.mute();
                            this.videoPlayer.playVideo();
                        }
                        else {
                            this.videoPlayer.pauseVideo();
                            this.videoPlayer.mute();
                        }
                    }
                    catch (e) {
                        console.error('YouTube API: failed to check visibility of "' + this.videoPlayerID + '": ' + e);
                    }
                }
                onPlayerMouseOver() {
                    this.videoPlayer.playVideo();
                }
                onPlayerMouseOut() {
                    this.videoPlayer.pauseVideo();
                }
                onRefPlayerMouseOver() {
                    this.videoPlayer.unMute();
                }
                onRefPlayerMouseOut() {
                    this.videoPlayer.mute();
                }
                stopVideo(event) {
                    this.videoPlayer.stopVideo();
                }
            };
            exports_1("VideoPlayer", VideoPlayer);
        }
    };
});
