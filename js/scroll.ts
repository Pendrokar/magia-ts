export class Scroller {
	// Declare variables:
	private debug : boolean = false;
	private paperHeight : number = 1710;
	private viewHeight : number = 0;
	private scrollTopOffset : number = 240 - this.paperHeight;
	private scrollBottomOffset : number = this.scrollTopOffset - this.paperHeight;
	private scrollTimer : number = -1;
	// jQuery Objects:
	private container : JQuery;
	private footer : JQuery;
	private scrollView : JQuery;
	private scrollTop : JQuery;
	private scrollBottom : JQuery;

	constructor() {
		// Assign variables:

		// Find & assign jQuery Objects to variables:
		this.container = $('.container').eq(0);
		this.footer = $('.footer').eq(0);
		this.scrollView = $('.scroll-view').eq(0);
		this.scrollTop = $('.scroll-top').eq(0);
		this.scrollBottom = $('.scroll-bottom').eq(0);

		// On: Window resizing/Orientation change
		$(window)
			.on('resize', (event) => this.onResize())
			.trigger('resize');

		// $('.scroll-view')
		//	.on('scroll', (event) => this.onScroll())
		//	.trigger('scroll');

		if (this.debug) {
			console.log('Scroll manager ready');
		}
	}

	onScrollTimer() {
		this.scrollTimer = window.setTimeout(() => this.onScroll(), 30);
	}

	onResize() : void {
		this.viewHeight = <number>$(window).height() - <number>this.container.outerHeight() + this.viewHeight - <number>this.scrollBottom.outerHeight() - <number>this.footer.outerHeight();
		this.scrollView
			.height(this.viewHeight)

		if (this.debug) {
			console.log('Scroll manager: window resized');
		}
	}

	onScroll() : void {
		let scrollTopVal = <number>this.scrollView.scrollTop();

		this.scrollTop
			.css("background-position", "0 " + (this.paperHeight - this.scrollTopOffset + scrollTopVal) + "px");

		this.scrollBottom
			.css("background-position", "0 " + (this.viewHeight + 120 + scrollTopVal) + "px");

		this.onScrollTimer();
	}
}

// var test = new Scroller();
