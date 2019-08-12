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
                    this.userHovers = false; // User is hovering over the video
                    this.userInteracted = false; // User has to interact beforehand in order to unmute videos
                    this.userPaused = false; // User has to paused the video
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
                    this.videoPlayerIframe = this.videoPlayer.getIframe();
                    this.videoPlayer.setPlaybackQuality('small');
                    this.videoPlayer.setLoop(false);
                    this.videoPlayer.mute();
                    // Unmute/Mute on hover
                    $(this.videoPlayerIframe)
                        .on('mouseenter', (event) => this.onPlayerMouseOver())
                        .on('mouseleave', (event) => this.onPlayerMouseOut())
                        .attr('title', 'Click/Tap to unmute!');
                    // TODO: move to service
                    $(window).on('scroll', (event) => this.onScrollTimer());
                    this.checkPlayerVisibility();
                }
                // The API calls this function when the player's state changes.
                //    The function indicates that when playing a video (state=1),
                //    the player should play for six seconds and then stop.
                onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING && this.startTime == 0) {
                        this.startTime = this.videoPlayer.getCurrentTime();
                    }
                    // Repeat playing intro videos
                    if (event.data == YT.PlayerState.ENDED) {
                        if (this.videoPlayerID.indexOf('References') == -1) {
                            this.videoPlayer.seekTo(this.startTime, true);
                        }
                        return;
                    }
                    if (event.data == YT.PlayerState.PAUSED) {
                        if (this.userInteracted == false
                            && this.userHovers) {
                            this.userInteracted = true;
                            this.videoPlayer.playVideo();
                            this.videoPlayer.unMute();
                            $(this.videoPlayerIframe).removeAttr('title');
                        }
                        // Take the occurance of second pause as deliberate and remain paused thereafter
                        if (this.userInteracted
                            && this.userPaused == false
                            && this.userHovers) {
                            this.userPaused = true;
                        }
                    }
                    if (this.userPaused
                        && this.userHovers
                        && event.data == YT.PlayerState.PLAYING) {
                        this.userPaused = false;
                    }
                }
                checkPlayerVisibility() {
                    try {
                        if (this.userPaused) {
                            return;
                        }
                        if ($(this.videoPlayerIframe).visible(true, true, "vertical")) {
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
                    this.userHovers = true;
                    // check, so not to pause due to lacking permission to unmute
                    if (this.userInteracted) {
                        this.videoPlayer.unMute();
                    }
                }
                onPlayerMouseOut() {
                    this.userHovers = false;
                    if (this.userInteracted) {
                        this.videoPlayer.mute();
                    }
                }
            };
            exports_1("VideoPlayer", VideoPlayer);
        }
    };
});
