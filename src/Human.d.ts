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

    /**
     * Detects if the user is frequently switching between tabs or windows.
     *
     * @param callback - Function to call when frequent tab switching is detected.
     * @param switchThreshold - Optional number of switches within a time frame to trigger the callback (default is 3).
     * @param interval - Optional time frame in milliseconds to track switches (default is 10000ms).
     */
    onFrequentTabSwitching(
        callback: EventListener,
        switchThreshold?: number,
        interval?: number,
    ): this

    /**
     * Detects if the user is frequently resizing the browser window.
     *
     * @param callback - Function to call when frequent resizing is detected.
     * @param resizeThreshold - Optional number of resizes within a time frame to trigger the callback (default is 3).
     * @param interval - Optional time frame in milliseconds to track resizes (default is 5000ms).
     */
    onFrequentResizing(
        callback: EventListener,
        resizeThreshold?: number,
        interval?: number,
    ): this

    /**
     * Detects if the user is frequently copying text from the page.
     *
     * @param callback - Function to call when frequent copying is detected.
     * @param copyThreshold - Optional number of copy actions within a time frame to trigger the callback (default is 3).
     * @param interval - Optional time frame in milliseconds to track copy actions (default is 5000ms).
     */
    onFrequentCopying(
        callback: EventListener,
        copyThreshold?: number,
        interval?: number,
    ): this

    /**
     * Detects if the user is frequently pasting text into input fields.
     *
     * @param callback - Function to call when frequent pasting is detected.
     * @param pasteThreshold - Optional number of paste actions within a time frame to trigger the callback (default is 3).
     * @param interval - Optional time frame in milliseconds to track paste actions (default is 5000ms).
     */
    onFrequentPasting(
        callback: EventListener,
        pasteThreshold?: number,
        interval?: number,
    ): this

    /**
     * Detects if the user is frequently refreshing the page.
     *
     * @param callback - Function to call when frequent refreshing is detected.
     * @param refreshThreshold - Optional number of refreshes within a time frame to trigger the callback (default is 3).
     * @param interval - Optional time frame in milliseconds to track refreshes (default is 10000ms).
     */
    onFrequentRefreshing(
        callback: EventListener,
        refreshThreshold?: number,
        interval?: number,
    ): this
}
