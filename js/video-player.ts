export class VideoPlayer {
	private videoPlayerID : string;
	private videoPlayer : YT.Player;
	private videoPlayerIframe : HTMLIFrameElement;
	private startTime : number = 0;
	private playerSettings : object;
	private scrollTimer : number = -1;

	constructor(tagId : string) {
		this.videoPlayerID = tagId;
		this.playerSettings = {
			events: {
				'onReady': (event : YT.OnStateChangeEvent) => this.onPlayerReady(),
				'onStateChange': (event : YT.OnStateChangeEvent) => this.onPlayerStateChange(event)
			}
		};

		this.videoPlayerIframe = $('#' + tagId).get(0) as HTMLIFrameElement;
		this.videoPlayer = new YT.Player(tagId, this.playerSettings);

	}

	// TODO: move to service
	onScrollTimer() : void {
		if (this.scrollTimer != -1)
			clearTimeout(this.scrollTimer);

		// console.log('YouTube API: "' + this.videoPlayerID + '"');
		this.scrollTimer = window.setTimeout(() => this.checkPlayerVisibility(), 150);
	}

	// The API will call this function when the video player is ready.
	onPlayerReady() : void {
		this.startTime = this.videoPlayer.getCurrentTime();
		this.videoPlayerIframe = this.videoPlayer.getIframe();

		this.videoPlayer.setPlaybackQuality('small');

		// Unmute/Mute on hover
		$(this.videoPlayerIframe)
			.on('mouseenter', (event) => this.onRefPlayerMouseOver())
			.on('mouseleave', (event) => this.onRefPlayerMouseOut());

		// TODO: move to service
		$('.scroll-view').on('scroll', (event) => this.onScrollTimer());

		this.checkPlayerVisibility();
	}

	// The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	onPlayerStateChange(event : YT.OnStateChangeEvent) : void {
		// Repeat playing intro videos
		if (event.data == YT.PlayerState.ENDED) {
			if (this.videoPlayerID.indexOf('References') == -1) {
				this.videoPlayer.seekTo(this.startTime, true);
			}

			this.videoPlayer.playVideo();
		}
	}

	checkPlayerVisibility() : void {
		// if (this.videoPlayer.getPlayerState() == YT.PlayerState.PAUSED) {
		//	return;
		// }

		try {
			if($(this.videoPlayerIframe).visible(false, true, "both", $("#scroll-view")))
			{
				// && !done
				this.videoPlayer.mute();
				this.videoPlayer.playVideo();
			}
			else
			{
				this.videoPlayer.pauseVideo();
				this.videoPlayer.mute();
			}
		}
		catch (e) {
			console.error('YouTube API: failed to check visibility of "' + this.videoPlayerID + '": ' + e);
		}
	}

	onPlayerMouseOver() : void {
		this.videoPlayer.playVideo();
	}

	onPlayerMouseOut() : void {
		this.videoPlayer.pauseVideo();
	}

	onRefPlayerMouseOver() : void {
		this.videoPlayer.unMute();
	}

	onRefPlayerMouseOut() : void {
		this.videoPlayer.mute();
	}

	stopVideo(event : YT.OnStateChangeEvent) : void {
		this.videoPlayer.stopVideo();
	}

}