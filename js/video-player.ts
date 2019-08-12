export class VideoPlayer {
	private videoPlayerID : string;
	private videoPlayer : YT.Player;
	private videoPlayerIframe : HTMLIFrameElement;
	private startTime : number = 0;
	private userHovers : boolean = false; // User is hovering over the video
	private userInteracted : boolean = false; // User has to interact beforehand in order to unmute videos
	private userPaused : boolean = false; // User has to paused the video
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
	onPlayerStateChange(event : YT.OnStateChangeEvent) : void {
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
			if (
				this.userInteracted == false
				&& this.userHovers
			) {
				this.userInteracted = true;

				this.videoPlayer.playVideo();
				this.videoPlayer.unMute();

				$(this.videoPlayerIframe).removeAttr('title');
			}

			// Take the occurance of second pause as deliberate and remain paused thereafter
			if (
				this.userInteracted
				&& this.userPaused == false
				&& this.userHovers
			) {
				this.userPaused = true;
			}
		}

		if (
			this.userPaused
			&& this.userHovers
			&& event.data == YT.PlayerState.PLAYING
		) {
			this.userPaused = false;
		}
	}

	checkPlayerVisibility() : void {
		try {
			if (this.userPaused) {
				return;
			}

			if($(this.videoPlayerIframe).visible(false, true, "both"))
			{
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
		this.userHovers = true;
		// check, so not to pause due to lacking permission to unmute
		if (this.userInteracted) {
			this.videoPlayer.unMute();
		}
	}

	onPlayerMouseOut() : void {
		this.userHovers = false;
		if (this.userInteracted) {
			this.videoPlayer.mute();
		}
	}
}