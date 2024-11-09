import { Web } from './Web'

export declare class Human extends Web {
    constructor(selector: string)

    /**
     * Detects slow typing in an input field, which might indicate hesitation.
     *
     * @param callback - Function to call when slow typing is detected.
     * @param delay - Optional time in milliseconds between key presses to detect slow typing (default is 1000ms).
     */
    onSlowTyping(callback: EventListener, delay?: number): this

    /**
     * Detects prolonged hovering over an element, often indicating user interest.
     *
     * @param callback - Function to call when prolonged hovering is detected.
     * @param duration - Optional time in milliseconds to consider hover as "prolonged" (default is 2000ms).
     */
    onProlongedHover(callback: EventListener, duration?: number): this

    /**
     * Detects when the user is idle (no interaction) for a specified duration.
     *
     * @param callback - Function to call when the user becomes idle.
     * @param idleTime - Optional time in milliseconds of inactivity to consider the user as "idle" (default is 5000ms).
     */
    onIdle(callback: EventListener, idleTime?: number): this

    /**
     * Detects rapid, repetitive clicks, which may indicate user frustration.
     *
     * @param callback - Function to call when rapid clicks are detected.
     * @param clickThreshold - Optional number of clicks within an interval to trigger the callback (default is 3).
     * @param interval - Optional time in milliseconds to track the click sequence (default is 500ms).
     */
    onRapidClicks(
        callback: EventListener,
        clickThreshold?: number,
        interval?: number,
    ): this

    /**
     * Detects when the user leaves and then returns to the page.
     *
     * @param callback - Function to call when the user returns to the page.
     */
    onUserReturn(callback: EventListener): this

    /**
     * Detects rapid scrolling, potentially indicating user disengagement.
     *
     * @param callback - Function to call when fast scrolling is detected.
     * @param speedThreshold - Optional minimum scroll speed in pixels per second to trigger the callback (default is 1000).
     */
    onFastScroll(callback: EventListener, speedThreshold?: number): this

    /**
     * Detects repeated form submissions within a short period, suggesting impatience.
     *
     * @param callback - Function to call when repeated submissions are detected.
     * @param threshold - Optional number of submissions within an interval to trigger the callback (default is 2).
     * @param interval - Optional time frame in milliseconds to track submissions (default is 1000ms).
     */
    onRepeatedSubmissions(
        callback: EventListener,
        threshold?: number,
        interval?: number,
    ): this

    /**
     * Detects hesitation in filling out form fields by tracking idle time between focus and input.
     *
     * @param callback - Function to call when hesitation is detected.
     * @param idleThreshold - Optional time in milliseconds to consider as hesitation (default is 2000ms).
     */
    onFormFieldHesitation(callback: EventListener, idleThreshold?: number): this

    /**
     * Detects if the user is moving their mouse in a circular motion, which might indicate distraction.
     *
     * @param callback - Function to call when idle mouse looping is detected.
     * @param radius - Optional radius to consider for circular motion (default is 50px).
     * @param threshold - Optional number of movements within the radius to trigger detection (default is 5).
     */
    onIdleMouseLoop(
        callback: EventListener,
        radius?: number,
        threshold?: number,
    ): this

    /**
     * Detects multiple user returns to the page, indicating frequent distractions.
     *
     * @param callback - Function to call when multiple returns are detected.
     * @param returnThreshold - Optional number of returns to trigger the callback (default is 3).
     */
    onFrequentReturns(callback: EventListener, returnThreshold?: number): this
}
