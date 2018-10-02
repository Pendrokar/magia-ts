export class VideoPlayer {
	private videoPlayer : YT.Player;
	private playerSettings : object;
	private scrollTimer : number = -1;

	constructor(tagId : string) {
		this.playerSettings = {
			events: {
				'onReady': (event : YT.OnStateChangeEvent) => this.onPlayerReady()
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
	onPlayerReady() : void {
		this.videoPlayer.setPlaybackQuality('small');
		if(this.videoPlayer.getIframe().id.indexOf('References') != -1)
		{
			this.videoPlayer.mute();
			this.checkPlayerVisibility();
		}
	}

	checkPlayerVisibility() : void {
		// if (this.videoPlayer.getPlayerState() == YT.PlayerState.PAUSED) {
		//	return;
		// }

		if($(this.videoPlayer.getIframe()).visible(false, true, "both", $("#scroll-view")))
		{
			// && !done
			this.videoPlayer.mute();
			this.videoPlayer.playVideo();
		}
		else if(typeof this.videoPlayer.pauseVideo !== 'undefined')
		{
			this.videoPlayer.pauseVideo();
			this.videoPlayer.mute();
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