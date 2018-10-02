System.register([], function (exports_1, context_1) {
    "use strict";
    var VideoPlayer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            VideoPlayer = class VideoPlayer {
                constructor(tagId) {
                    this.scrollTimer = -1;
                    this.playerSettings = {
                        events: {
                            'onReady': (event) => this.onPlayerReady()
                        }
                    };
                    this.videoPlayer = new YT.Player(tagId, this.playerSettings);
                    // Unmute/Mute on hover
                    $(this.videoPlayer.getIframe())
                        .on('mouseenter', (event) => this.onRefPlayerMouseOver())
                        .on('mouseleave', (event) => this.onRefPlayerMouseOut());
                    $('.scroll-view').on('scroll', (event) => this.onScrollTimer());
                }
                onScrollTimer() {
                    if (this.scrollTimer != -1)
                        clearTimeout(this.scrollTimer);
                    this.scrollTimer = window.setTimeout("checkPlayerVisibility()", 150);
                }
                // // YouTube API
                // onYouTubeIframeAPIReady() {
                //	// Merlin Frik's Incantation introduction
                //	playerIncantation = new YT.Player('playerIncantation', playerSettings);
                //	playerIncantationReferences = new YT.Player('playerIncantationReferences', playerSettings);
                //	// Merlin Frik's Gestures introduction
                //	playerGestures = new YT.Player('playerGestures', playerSettings);
                //	playerGesturesReferences = new YT.Player('playerGesturesReferences', playerSettings);
                //	// Merlin Frik's Will introduction
                //	playerWill = new YT.Player('playerWill', playerSettings);
                //	playerWillReferences = new YT.Player('playerWillReferences', playerSettings);
                //	// Play/Pause on hover
                //	$([playerIncantation, playerGestures, playerWill]).each(function(){
                //		$("#" + this.a.id)
                //			.on('mouseenter', { YTPlayer: this }, onPlayerMouseOver)
                //			.on('mouseleave', { YTPlayer: this }, onPlayerMouseOut);
                //	});
                //	// Unmute/Mute on hover
                //	$([playerIncantationReferences, playerGesturesReferences, playerWillReferences]).each(function(){
                //		$("#" + this.a.id)
                //			.on('mouseenter', { YTPlayer: this }, this.onRefPlayerMouseOver)
                //			.on('mouseleave', { YTPlayer: this }, this.onRefPlayerMouseOut);
                //	});
                //	$('.scroll-view').on('scroll', this.onScrollTimer);
                // }
                // The API will call this function when the video player is ready.
                onPlayerReady() {
                    this.videoPlayer.setPlaybackQuality('small');
                    if (this.videoPlayer.getIframe().id.indexOf('References') != -1) {
                        this.videoPlayer.mute();
                        this.checkPlayerVisibility();
                    }
                }
                checkPlayerVisibility() {
                    // if (this.videoPlayer.getPlayerState() == YT.PlayerState.PAUSED) {
                    //	return;
                    // }
                    if ($(this.videoPlayer.getIframe()).visible(false, true, "both", $("#scroll-view"))) {
                        // && !done
                        this.videoPlayer.mute();
                        this.videoPlayer.playVideo();
                    }
                    else if (typeof this.videoPlayer.pauseVideo !== 'undefined') {
                        this.videoPlayer.pauseVideo();
                        this.videoPlayer.mute();
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
