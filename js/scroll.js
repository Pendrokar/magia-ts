System.register([], function (exports_1, context_1) {
    "use strict";
    var Scroller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Scroller = class Scroller {
                constructor() {
                    // Declare variables:
                    this.debug = false;
                    this.paperHeight = 1610;
                    this.viewHeight = 0;
                    this.scrollTopOffset = 240 - this.paperHeight;
                    this.scrollBottomOffset = this.scrollTopOffset - this.paperHeight;
                    this.scrollTimer = -1;
                    // Assign variables:
                    window.scroll({
                        behavior: 'smooth'
                    });
                    // Find & assign jQuery Objects to variables:
                    this.container = $('.container').eq(0);
                    this.footer = $('.footer').eq(0);
                    this.scrollView = $('.scroll-view').eq(0);
                    this.scrollTop = $('.scroll-top').eq(0);
                    this.scrollBottom = $('.scroll-bottom').eq(0);
                    // On: Window resizing/Orientation change
                    $(window)
                        .on('resize', (event) => this.onResize())
                        .trigger('resize')
                        .on('scroll', (event) => this.onScroll())
                        .trigger('scroll');
                    if (this.debug) {
                        console.log('Scroll manager ready');
                    }
                }
                onScrollTimer() {
                    this.scrollTimer = window.setTimeout(() => this.onScroll(), 30);
                }
                onResize() {
                    this.viewHeight = $(window).height();
                    if (this.debug) {
                        console.log('Scroll manager: window resized');
                    }
                }
                onScroll() {
                    let scrollTopVal = $(window).scrollTop();
                    this.scrollTop
                        .css("background-position", "0 " + (this.paperHeight - this.scrollTopOffset + scrollTopVal) + "px");
                    this.scrollBottom
                        .css("background-position", "0 " + (this.viewHeight + 120 + scrollTopVal) + "px");
                }
            };
            exports_1("Scroller", Scroller);
        }
    };
});
