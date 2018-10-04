import { Scroller } from './scroll.js';
import { VideoPlayer } from './video-player';

System.config({
	map: {
		youtubeIAPI: "https://www.youtube.com/iframe_api"
	},
	meta: {
		"https://www.youtube.com/iframe_api": {
			"format": "global",
			"exports": "youtubeIAPI",
			"scriptLoad": true,
			"build": false
		}
	}
});

new Scroller();

export default class YouTubeService {
	constructor() {
		this.loadAPI();
	}

	async loadAPI() {
		// console.log('loadAPI');

		// on YouTube API load
		window.onYouTubeIframeAPIReady = function () {
			console.log('onYouTubeIframeAPIReady()');

			// Merlin Frik's Incantation introduction
			new VideoPlayer('playerIncantation');

			// Incantation references
			new VideoPlayer('playerIncantationReferences');

			// Merlin Frik's Gestures introduction
			new VideoPlayer('playerGestures');

			// Gesture references
			new VideoPlayer('playerGesturesReferences');

			// Merlin Frik's Will introduction
			new VideoPlayer('playerWill');

			// Will references
			new VideoPlayer('playerWillReferences');
		};

		try {
			// var tag = document.createElement('script');
			// tag.src = "https://www.youtube.com/iframe_api";
			// var firstScriptTag = document.getElementsByTagName('script')[0];
			// if (firstScriptTag.parentNode != null) {
			//	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			// }

			await import('youtubeIAPI'); // automatically injects a script tag
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