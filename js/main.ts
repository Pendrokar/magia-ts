import { Scroller } from './scroll.js';
import { VideoPlayer } from './video-player.js';

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

var scroller = new Scroller();

$(function() {
	scroller.onScrollTimer();
});

export default class YouTubeService {
	constructor() {
		this.loadAPI();
	}

	async loadAPI() {
		// console.log('loadAPI');

		// on YouTube API load
		window.onYouTubeIframeAPIReady = function () {
			let videoPlayers = [
				'playerIncantation', // Merlin Frik's Incantation introduction
				'playerIncantationReferences', // Incantation references
				'playerGestures', // Merlin Frik's Gestures introduction
				'playerGesturesReferences', // Gesture references
				'playerWill', // Merlin Frik's Will introduction
				'playerWillReferences' // Will references
			]

			for (var i in videoPlayers) {
				new VideoPlayer(videoPlayers[i]);
			}
		};

		try {
			await import('youtubeIframeAPI'); // automatically injects a script tag
			// console.log('API loaded');
		}
		catch (e) {
			console.error('The YouTube API failed to load: ' + e);
		}
	}
}

declare global {
	interface Window {
		onYouTubeIframeAPIReady?: () => void;
	}
}

new YouTubeService();