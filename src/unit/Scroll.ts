export default class Scroll {
    protected element: HTMLElement

    /**
     * Initializes the Scroll class for a scrollable element based on a CSS selector.
     * @param selector - The CSS selector for the target element.
     * @throws Error if the element is not found.
     */
    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (!element) throw new Error('Element not found.')
        this.element = element as HTMLElement

        // Mock scroll properties for testing purposes
        Object.defineProperty(this.element, 'scrollTop', {
            writable: true,
            value: 0,
        })
        Object.defineProperty(this.element, 'scrollLeft', {
            writable: true,
            value: 0,
        })
        Object.defineProperty(this.element, 'scrollHeight', {
            writable: true,
            value: 2000,
        })
        Object.defineProperty(this.element, 'scrollWidth', {
            writable: true,
            value: 2000,
        })
        Object.defineProperty(this.element, 'clientHeight', {
            writable: true,
            value: 500,
        })
        Object.defineProperty(this.element, 'clientWidth', {
            writable: true,
            value: 500,
        })
    }

    /**
     * Simulates scrolling down by a specified vertical amount.
     * @param position - The amount to scroll down vertically (default is 100).
     */
    scrollDown(position: number = 100): void {
        this.element.scrollTop += position
        this.triggerScrollEvent()
    }

    /**
     * Simulates scrolling up by a specified vertical amount.
     * @param position - The amount to scroll up vertically (default is 100).
     */
    scrollUp(position: number = 100): void {
        this.element.scrollTop -= position
        if (this.element.scrollTop < 0) this.element.scrollTop = 0
        this.triggerScrollEvent()
    }

    /**
     * Simulates scrolling right by a specified horizontal amount.
     * @param position - The amount to scroll right horizontally (default is 100).
     */
    scrollRight(position: number = 100): void {
        this.element.scrollLeft += position
        this.triggerScrollEvent()
    }

    /**
     * Simulates scrolling left by a specified horizontal amount.
     * @param position - The amount to scroll left horizontally (default is 100).
     */
    scrollLeft(position: number = 100): void {
        this.element.scrollLeft -= position
        if (this.element.scrollLeft < 0) this.element.scrollLeft = 0
        this.triggerScrollEvent()
    }

    /**
     * Asserts that the current vertical scroll position matches the expected position.
     * @param expectedPosition - The expected vertical scroll position.
     */
    assertScrollTop(expectedPosition: number): void {
        expect(this.element.scrollTop).toBe(expectedPosition)
    }

    /**
     * Asserts that the current horizontal scroll position matches the expected position.
     * @param expectedPosition - The expected horizontal scroll position.
     */
    assertScrollLeft(expectedPosition: number): void {
        expect(this.element.scrollLeft).toBe(expectedPosition)
    }

    /**
     * Asserts that the element is scrolled to the bottom.
     */
    assertAtBottom(): void {
        expect(
            this.element.scrollTop + this.element.clientHeight,
        ).toBeGreaterThanOrEqual(this.element.scrollHeight)
    }

    /**
     * Asserts that the element is scrolled to the right edge.
     */
    assertAtRight(): void {
        expect(
            this.element.scrollLeft + this.element.clientWidth,
        ).toBeGreaterThanOrEqual(this.element.scrollWidth)
    }

    /**
     * Triggers a scroll event on the element to simulate user scrolling.
     */
    private triggerScrollEvent(): void {
        this.element.dispatchEvent(new Event('scroll'))
    }
}
