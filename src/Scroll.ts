/**
 * The Scroll class provides functionalities to handle scroll events and manage scroll
 * positions on a specified DOM element. It supports detecting scroll directions,
 * near-edge detection, and scroll event callbacks.
 */
export class Scroll {
    private e: Element;
    private lastScrollTop: number = 0;
    private lastScrollLeft: number = 0;

    /**
     * Creates an instance of Scroll.
     *
     * @param selector - The CSS selector of the target element to be scrollable.
     * @param offset - The offset margin to consider for edge detection. Default is 500.
     * @throws Error if the element is not found.
     */
    constructor(private selector: string, private offset: number = 500) {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Element with selector "${selector}" not found.`);
        this.e = element;
    }

    /**
     * Monitors scroll events and triggers callbacks based on the scroll position and direction.
     *
     * @param onScrollUp - Callback for scrolling up.
     * @param onScrollDown - Callback for scrolling down.
     * @param onNearTop - Callback when near the top edge.
     * @param onNearBottom - Callback when near the bottom edge.
     */
    infinite(
        onScrollUp: () => void,
        onScrollDown: () => void,
        onNearTop: () => void,
        onNearBottom: () => void
    ): void {
        this.onScroll(() => {
            if (this.isNearTop()) onNearTop();
            if (this.isNearBottom()) onNearBottom();
            if (this.isScrollingUp()) onScrollUp();
            if (this.isScrollingDown()) onScrollDown();
        });
    }

    /**
     * Scrolls the element to the specified position.
     *
     * @param top - The vertical scroll position.
     * @param left - The horizontal scroll position. Default is 0.
     * @returns The Scroll instance for method chaining.
     */
    scroll(top: number, left: number = 0): this {
        this.e.scrollTop = top;
        this.e.scrollLeft = left;
        this.lastScrollTop = top;
        this.lastScrollLeft = left;
        this.e.dispatchEvent(new Event('scroll'));
        return this;
    }

    /**
     * Gets the current scroll position of the element.
     *
     * @returns An object containing the top and left scroll positions.
     */
    getCurrentPosition(): { top: number; left: number } {
        return { top: this.e.scrollTop, left: this.e.scrollLeft };
    }

    /**
     * Checks if the scroll position is near the top edge.
     *
     * @returns True if near the top edge, otherwise false.
     */
    isNearTop(): boolean {
        return this.e.scrollTop <= this.offset;
    }

    /**
     * Checks if the scroll position is near the bottom edge.
     *
     * @returns True if near the bottom edge, otherwise false.
     */
    isNearBottom(): boolean {
        return this.e.scrollHeight - this.e.scrollTop - this.e.clientHeight <= this.offset;
    }

    /**
     * Checks if the element is scrolling up.
     *
     * @returns True if scrolling up, otherwise false.
     */
    isScrollingUp(): boolean {
        const scrollingUp = this.e.scrollTop < this.lastScrollTop;
        this.lastScrollTop = this.e.scrollTop;
        return scrollingUp;
    }

    /**
     * Checks if the element is scrolling down.
     *
     * @returns True if scrolling down, otherwise false.
     */
    isScrollingDown(): boolean {
        const scrollingDown = this.e.scrollTop > this.lastScrollTop;
        this.lastScrollTop = this.e.scrollTop;
        return scrollingDown;
    }

    /**
     * Checks if the scroll position is near the left edge.
     *
     * @returns True if near the left edge, otherwise false.
     */
    isNearLeft(): boolean {
        return this.e.scrollLeft <= this.offset;
    }

    /**
     * Checks if the scroll position is near the right edge.
     *
     * @returns True if near the right edge, otherwise false.
     */
    isNearRight(): boolean {
        return this.e.scrollWidth - this.e.scrollLeft - this.e.clientWidth <= this.offset;
    }

    /**
     * Checks if the element is scrolling right.
     *
     * @returns True if scrolling right, otherwise false.
     */
    isScrollingRight(): boolean {
        const scrollingRight = this.e.scrollLeft > this.lastScrollLeft;
        this.lastScrollLeft = this.e.scrollLeft;
        return scrollingRight;
    }

    /**
     * Checks if the element is scrolling left.
     *
     * @returns True if scrolling left, otherwise false.
     */
    isScrollingLeft(): boolean {
        const scrollingLeft = this.e.scrollLeft < this.lastScrollLeft;
        this.lastScrollLeft = this.e.scrollLeft;
        return scrollingLeft;
    }

    /**
     * Adds an event listener for the 'scroll' event.
     *
     * @param callback - The function to execute when a scroll event occurs.
     * @returns The Scroll instance for method chaining.
     */
    onScroll(callback: EventListener): this {
        this.e.addEventListener('scroll', callback);
        return this;
    }

    /**
     * Simulates a 'scrollend' event by detecting when scrolling stops.
     *
     * @param callback - The function to execute when scrolling ends.
     * @param timeout - The debounce delay to detect scroll end. Default is 200ms.
     * @returns The Scroll instance for method chaining.
     */
    onScrollEnd(callback: EventListener, timeout: number = 200): this {
        let scrollTimeout: number | null = null;

        this.e.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => callback(new Event('scrollend')), timeout);
        });

        return this;
    }
}
