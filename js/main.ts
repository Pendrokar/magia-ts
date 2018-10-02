import { Scroller } from './scroll.js';
// import { VideoPlayer } from './video-player';
// import 'systemjs';
// import 'youtube';

// SystemJS.config({
//   map: {
//	youtube: "https://www.youtube.com/iframe_api"
//   },
//   meta: {
//	"https://www.youtube.com/iframe_api": {
//	  "format": "global",
//	  "exports": "youtube",
//	  "scriptLoad": true,
//	  "build": false
//	}
//   }
// });

new Scroller();

// export default class YouTubeService {
//	async loadAPI() {
//		// on YouTube API load
//		window.onYouTubeIframeAPIReady = function () {
//			console.log('onYouTubeIframeAPIReady()');

//			// Merlin Frik's Incantation introduction (blocked)
//			// new VideoPlayer('playerIncantation');

//			// Incantation references
//			new VideoPlayer('playerIncantationReferences');

//			// Merlin Frik's Gestures introduction (blocked)
//			// new VideoPlayer('playerGestures');

//			// Gesture references
//			new VideoPlayer('playerGesturesReferences');

//			// Merlin Frik's Will introduction (blocked)
//			// new VideoPlayer('playerWill');

//			// Will references
//			new VideoPlayer('playerWillReferences');
//		};

//		try {
//		  await import('youtube'); // automatically injects a script tag
//		}
//		catch (e) {
//		  console.error('The YouTube API failed to load');
//		}
//	}
// }

// declare global {
//   interface Window {
//	onYouTubeIframeAPIReady?: () => void;
//   }
// }