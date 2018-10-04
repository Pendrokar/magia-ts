import { Scroller } from './scroll.js';
import { VideoPlayer } from './video-player';

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

declare var youtube : string;

new Scroller();

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
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			if (firstScriptTag.parentNode != null) {
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}

			// await import(youtube); // automatically injects a script tag
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