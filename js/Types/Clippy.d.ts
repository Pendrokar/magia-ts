// Type definitions for Clippy.js
// Project: https://www.smore.com/clippy-js, https://github.com/smore-inc/clippy.js
// Definitions by: Lars Fernhomberg <https://github.com/lafe>
// Definitions: https://github.com/lafe/ClippyTsDemo

declare module clippy {
    /**
     * Stores the base location of the Agents (trailing slash is required)
     */
    var BASE_PATH: string;

    interface IAgent {
        /**
         * Shows the agent
         *
         * @param fast If set to true, the hide animation will be performed fast
         */
        show(fast?:boolean): void;

        /**
         * Hides the agent
         *
         * @param fast If set to true, the hide animation will be performed fast
         * @param hiddenCallback The callback that is executed when the agent is hidden
         */
        hide(fast?: boolean, hiddenCallback?: () => void): void;

        /**
         * Plays a given animation
         *
         * @param animationName The name of the animation to be played
         * @param timeout The duration of the animation in milliseconds. If not specified, 5000ms is used.
         * @param animationCompletedCallback The callback that is executed when the animation is complete
         * @returns Returns true if the animation could be played. If the animationName is unknown, false will be returned
         */
        play(animationName: string, timeout?: number, animationCompletedCallback?: () => void): boolean;

        /**
         * Checks if a given animation exists
         *
         * @param animationName The name of the animation to be checked
         * @returns Returns true if the animation exists; otherwise, false will be returned
         */
        hasAnimation(animationName:string): boolean;

        /**
         * Plays a random animation
         */
        animate(): void;

        /**
         * Get a list of all the animations
         */
        animations(): string[];

        /**
         * Shows a text ballon with the message
         *
         * @param message The message to be shown
         * @param hold Keeps the balloon open
         */
        speak(message: string, hold?:boolean): void;

        /**
         * Closes the current balloon
         */
        closeBalloon(): void;

        /**
         * Adds a delay to the current queue
         */
        delay(time:number): void;

        /**
         * Moves the agent to the given coordinates. An animation is used, if it is available
         *
         * @param x The x coordinates
         * @param y The y coordinates
         * @param duration The duration the gesture should take
         */
        moveTo(x: number, y: number, duration?: number): void;

        /**
         * Gestures at the given point if the gesture animation is available
         *
         * @param x The x coordinates
         * @param y The y coordinates
         */
        gestureAt(x: number, y: number): void;

        /**
         * Stops the current action in the queue
         */
        stopCurrent(): void;

        /**
         * Stops all actions in the queue and foes back to idle mode
         */
        stop(): void;
    }

    /**
     * Loads the Agent with the given agent name
     *
     * @param agentName The name of the Agent as definied in the correspondening agent.js (e.g. for the default Clippy, it would be "Clippy")
     * @param successCallback Returns the loaded agent if it could be loaded successfully
     * @param failureCallback Signals a failure while loading the agent
     */
    function load(agentName: string, successCallback: (agent: IAgent) => void, failureCallback?: () => void): void;
}