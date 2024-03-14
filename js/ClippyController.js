/// <reference path="types/clippy.d.ts" />
class ClippyController {
    constructor() {
        this.idleAnimations = [
            'Acknowledge',
            'Blink',
            'Confused',
            'Explain',
            'Idle1_1',
            'Idle1_2',
            'Idle1_3',
            'Idle1_4',
            'Idle2_1',
            'Idle2_2',
            'Idle3_1',
            'Idle3_2',
            'LookDown',
            'LookLeft',
            'LookRight',
            'LookUp',
            'Pleased',
            'Process',
            'RestPose',
            'Search',
            'Suggest',
            'Surprised',
            'Think',
            'Uncertain',
            'Wave',
            'Write'
        ];
        clippy.load("Merlin", agent => {
            this.agent = agent;
            this.agentLoaded();
            this.agentHeight = $('.clippy').outerHeight();
        }, (error) => {}, '/clippyjs/assets/agents/');
    }
    get lastAnimation() {
        return this._lastAnimation;
    }
    set lastAnimation(value) {
        console.log(value);
        this._lastAnimation = value;
    }
    /**
     * Handler that performs the necessary operations after the agent has been loaded
     */
    agentLoaded() {
        this.agent.show();
        this.play('Greet');
        $(window)
            .on('resize', (event) => this.onResize());
        // Enable scroll event handler after a delay
        window.setTimeout(() => {
            $(window)
                .on('scroll', (event) => this.onScroll());
        }, 3000);
        // Reset idle on a click on the agent
        $('.clippy')
            .on('click', () => this.play('Surprised'));
    }
    onResize() {
        window.clearTimeout(this.timerIntervalId);
        this.agent.closeBalloon(true);
        this.agent.stop();
        this.agent.moveTo(document.documentElement.clientWidth - 1.2 * this.agentHeight, document.documentElement.clientHeight - 1.2 * this.agentHeight);
        // Go to idle status in # seconds
        this.createIdleTimer(3);
    }
    onScroll() {
        // wait a bit after for first scroll to explain how to unmute videos
        if (!this.firstScroll) {
            window.clearTimeout(this.timerIntervalId);
            window.clearTimeout(this.firstScrollTimerId);
            // wait for end of scroll and explain unmute
            this.firstScrollTimerId = window.setTimeout(() => this.moveToMutedVideo(), 500);
        }
    }
    // move to visible video player and explain how to unmute videos
    moveToMutedVideo() {
        let player;
        // find visible player
        $('.player').each(function () {
            player = (!player && $(this).visible(true, true, "vertical") ? $(this).eq(0) : player);
        });
        let offset = player.offset();
        this.firstScroll = true;
        this.agent.stop();
        this.agent.closeBalloon(true);
        this.agent.moveTo(offset.left + player.width(), 
        // using min to ensure agent does not travel outside the window confines
        Math.min($(window).height() - 1.5 * this.agentHeight, offset.top + player.height() / 2 - this.agentHeight / 2 - $(window).scrollTop()), 1000, () => this.explainUnmute());
        $('.clippy-balloon')
            .on('click', () => {
            this.agent.closeBalloon(true);
            this.createIdleTimer();
        });
    }
    /**
     * Creates a timer that plays random animations after the timeout without action has been elapsed
     */
    explainUnmute() {
        this.play('GestureRight');
        this.agent.speak("Click and hover over video to unmute!", true);
        this.createIdleTimer();
    }
    /**
     * Creates a timer that plays random animations after the timeout without action has been elapsed
     */
    createIdleTimer(delay = 0) {
        window.clearTimeout(this.timerIntervalId);
        this.timerIntervalId = window.setTimeout(() => {
            let randomAnim = this.getRandomIdleAnimation();
            if (this.agent.play(randomAnim, 10000, () => this.createIdleTimer())) {
                this.lastAnimation = randomAnim;
            }
        }, (delay + this.getRandomNumber(3, 10)) * 1000);
    }
    /**
     * Force play animation and then idle
     */
    play(animation) {
        // skip playing the same animation
        if (animation == this.lastAnimation) {
            return false;
        }
        this.agent.stop();
        if (this.agent.play(animation, 10000, () => this.createIdleTimer(1000))) {
            this.lastAnimation = animation;
            return true;
        }
        return false;
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    getRandomIdleAnimation() {
        let rndAnimation = this.getRandomNumber(0, this.idleAnimations.length - 1);
        return this.idleAnimations[rndAnimation];
    }
}
//Invoke controller
(() => {
    var clippyController = new ClippyController();
})();
