/**
 * The Scroll class provides functionalities to handle scroll events and manage scroll
 * positions on a specified DOM element. It supports methods to detect when the element
 * is scrolled to the near edges (top, bottom, left, right) and determine the scrolling direction.
 *
 * Example usage:
 * ```
 * const scrollable = new Scroll('.scroll-container', 100);
 * scrollable.infinite(() => console.log('Scrolled Up'), () => console.log('Scrolled Down'),
 *  () => console.log('Near Top'), () => console.log('Near Bottom'));
 * ```
 */
export class Scroll {

    /**
     *
     * The DOM element that is being controlled.
     */
    private e: Element

    /**
     * The current top scroll position.
     */
    private top: number = 0

    /**
     * The current left scroll position.
     */
    private left: number = 0

    /**
     * Creates an instance of Scroll.
     *
     * @param selector - The CSS selector of the target element to be scrollable.
     * @param offset - The offset margin to consider for edge detection.
     */
    constructor(
        selector: string,
        private offset: number = 500,
    ) {
        const element = document.querySelector(selector)
        if (!element) throw new DOMException(`Invalid selector "${selector}"`)
        this.e = element
    }
    /**
     * Monitors scroll events and triggers callbacks based on the scroll position and direction.
     *
     * @param onScrollUp - Callback function to execute when scrolling up.
     * @param onScrollDown - Callback function to execute when scrolling down.
     * @param onNearTop - Callback function to execute when near the top edge.
     * @param onNearBottom - Callback function to execute when near the bottom edge.
     */
    infinite(
        onScrollUp: () => void,
        onScrollDown: () => void,
        onNearTop: () => void,
        onNearBottom: () => void,
    ): void {
        // Update the scroll state (this could be part of the class or here as an example)
        const isNearTop = this.isNearTop()
        const isNearBottom = this.isNearBottom()
        const isScrollingUp = this.getIsScrollingUp()
        const isScrollingDown = this.getIsScrollingDown()

        if (isScrollingDown) {
            onScrollDown()
        }
        if (isNearTop) {
            onNearTop()
        }
        if (isNearBottom) {
            onNearBottom()
        }
        if (isScrollingUp) {
            onScrollUp()
        }
    }
    /**
     * Scrolls the element to the given top and left positions.
     *
     * @param top - The top scroll position.
     * @param left - The left scroll position (default 0).
     * @returns The Scroll instance for method chaining.
     */
    scroll(top: number, left: number = 0): this {
        this.top = top
        this.left = left
        this.e.scrollTop = top
        this.e.scrollLeft = left
        this.e.dispatchEvent(new Event('scroll'))
        return this
    }

    /**
     * Gets the current scroll position.
     *
     * @returns An object containing the top and left scroll positions.
     */
    getCurrentPosition(): { top: number; left: number } {
        return { top: this.top, left: this.left }
    }

    // Getters for near-edge and scrolling direction flags
    /**
     * Checks if the scroll position is near the top edge.
     *
     * @returns True if near the top edge, otherwise false.
     */
    isNearTop(): boolean {
        return (
            Math.abs(this.e.scrollTop - this.e.clientHeight) % this.offset == 0
        )
    }

    /**
     * Checks if the scroll position is near the bottom edge.
     *
     * @returns True if near the bottom edge, otherwise false.
     */
    isNearBottom(): boolean {
        return (
            Math.abs(
                this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop,
            ) %
                this.offset <=
            1
        )
    }

    /**
     * Checks if the scroll position is near the right edge.
     *
     * @returns True if near the right edge, otherwise false.
     */
    isNearRight(): boolean {
        return (
            Math.abs(
                this.e.scrollLeft - this.e.clientWidth - this.e.scrollLeft,
            ) %
                this.offset <=
            1
        )
    }

    /**
     * Checks if the scroll position is near the left edge.
     *
     * @returns True if near the left edge, otherwise false.
     */
    isNearLeft(): boolean {
        return (
            Math.abs(
                this.e.scrollLeft - this.e.clientWidth - this.e.scrollLeft,
            ) %
                this.offset ==
            0
        )
    }

    /**
     * Checks if the element is currently scrolling down.
     *
     * @returns True if scrolling down, otherwise false.
     */
    getIsScrollingDown(): boolean {
        return (
            Math.abs(
                this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop,
            ) %
                this.offset ==
            0
        )
    }

    /**
     * Checks if the element is currently scrolling up.
     *
     * @returns True if scrolling up, otherwise false.
     */
    getIsScrollingUp(): boolean {
        return (
            Math.abs(
                this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop,
            ) %
                this.offset ==
            0
        )
    }

    /**
     * Checks if the element is currently scrolling right.
     *
     * @returns True if scrolling right, otherwise false.
     */
    getIsScrollingRight(): boolean {
        return (
            Math.abs(this.e.clientWidth + this.e.scrollLeft) % this.offset == 0
        )
    }

    /**
     * Checks if the element is currently scrolling left.
     *
     * @returns True if scrolling left, otherwise false.
     */
    getIsScrollingLeft(): boolean {
        return (
            Math.abs(this.e.scrollLeft - this.e.clientWidth) - this.offset >= 0
        )
    }

    /**
     * Adds an event listener for the 'scroll' event.
     *
     * @param callback - The function to execute when a scroll event occurs.
     * @returns The Scroll instance for method chaining.
     */
    onScroll(callback: EventListener): this {
        this.e.addEventListener('scroll', callback)
        return this
    }

    /**
     * Adds an event listener for the 'scrollend' event.
     *
     * @param callback - The function to execute when the scroll end event occurs.
     * @returns The Scroll instance for method chaining.
     */
    onScrollEnd(callback: EventListener): this {
        this.e.addEventListener('scrollend', callback)
        return this
    }
}
