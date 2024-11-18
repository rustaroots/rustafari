export declare class Scrollable {
    protected e: HTMLElement | Window

    /**
     * Creates an instance of Scrollable for an element or the window.
     * @param selectorOrWindow - A CSS selector for an element, or the Window object to apply scrolling functionality to.
     * @throws DOMException if the element is not found.
     */
    constructor(selectorOrWindow?: string | Window)

    /**
     * Scrolls smoothly to the top of the element or window.
     */
    scrollToTop(): void

    /**
     * Scrolls smoothly to the bottom of the element or window.
     */
    scrollToBottom(): void

    /**
     * Scrolls smoothly to a specified vertical position within the element or window.
     * @param position - The vertical scroll position to scroll to.
     */
    scrollTo(position: number): void

    /**
     * Checks if the element is fully visible in the viewport.
     * @returns `true` if the element is fully visible in the viewport; otherwise, `false`.
     */
    isInViewport(): boolean

    /**
     * Adds an event listener for when the user scrolls to the bottom of the element or window.
     * @param callback - The function to call when the bottom is reached.
     */
    onScrollToBottom(callback: () => void): void

    /**
     * Adds an event listener to detect when the user scrolls up.
     * @param callback - The function to call when scrolling up is detected.
     */
    onScrollUp(callback: () => void): void

    /**
     * Adds an event listener to detect when the user scrolls down.
     * @param callback - The function to call when scrolling down is detected.
     */
    onScrollDown(callback: () => void): void
}
