export class Scrollable {
    protected e: HTMLElement | Window

    /**
     * Creates an instance of Scrollable for an element or the window.
     * @param selectorOrWindow - A CSS selector for an element, or the Window object to apply scrolling functionality to.
     * @throws DOMException if the element is not found.
     */
    constructor(selectorOrWindow: string | Window = window) {
        if (typeof selectorOrWindow === 'string') {
            const element = document.querySelector(selectorOrWindow)
            if (!element) {
                throw new DOMException('Element not found.')
            }
            this.e = element as HTMLElement
        } else {
            this.e = selectorOrWindow
        }
    }

    /**
     * Scrolls smoothly to the top of the element or window.
     * @example
     * ```typescript
     * const scrollable = new Scrollable('#myElement');
     * scrollable.scrollToTop();
     * ```
     */
    scrollToTop(): void {
        if (this.e instanceof Window) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            this.e.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    /**
     * Scrolls smoothly to the bottom of the element or window.
     * @example
     * ```typescript
     * const scrollable = new Scrollable('#myElement');
     * scrollable.scrollToBottom();
     * ```
     */
    scrollToBottom(): void {
        if (this.e instanceof Window) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            })
        } else {
            this.e.scrollTo({ top: this.e.scrollHeight, behavior: 'smooth' })
        }
    }

    /**
     * Scrolls smoothly to a specified vertical position within the element or window.
     * @param position - The vertical scroll position to scroll to.
     * @example
     * ```typescript
     * const scrollable = new Scrollable('#myElement');
     * scrollable.scrollTo(200);
     * ```
     */
    scrollTo(position: number): void {
        if (this.e instanceof Window) {
            window.scrollTo({ top: position, behavior: 'smooth' })
        } else {
            this.e.scrollTo({ top: position, behavior: 'smooth' })
        }
    }

    /**
     * Checks if the element is fully visible in the viewport.
     * @returns `true` if the element is fully visible in the viewport; otherwise, `false`.
     * @example
     * ```typescript
     * const scrollable = new Scrollable('#myElement');
     * console.log(scrollable.isInViewport()); // true or false
     * ```
     */
    isInViewport(): boolean {
        if (this.e instanceof Window) return false

        const rect = this.e.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    /**
     * Adds an event listener for when the user scrolls to the bottom of the element or window.
     * @param callback - The function to call when the bottom is reached.
     * @example
     * ```typescript
     * const scrollable = new Scrollable('#myElement');
     * scrollable.onScrollToBottom(() => console.log('Scrolled to the bottom'));
     * ```
     */
    onScrollToBottom(callback: () => void): void {
        const handleScroll = () => {
            const atBottom =
                this.e instanceof Window
                    ? window.innerHeight + window.scrollY >=
                      document.body.offsetHeight
                    : this.e.scrollHeight -
                          (this.e.scrollTop + this.e.clientHeight) <=
                      0

            if (atBottom) callback()
        }

        this.e.addEventListener('scroll', handleScroll)
    }

    /**
     * Adds an event listener to detect when the user scrolls up.
     * @param callback - The function to call when scrolling up is detected.
     * @example
     * ```typescript
     * const scrollable = new Scrollable(window);
     * scrollable.onScrollUp(() => console.log('Scrolling up'));
     * ```
     */
    onScrollUp(callback: () => void): void {
        let lastScrollPosition = window.scrollY

        const handleScroll = () => {
            const currentScrollPosition = window.scrollY
            if (currentScrollPosition < lastScrollPosition) {
                callback()
            }
            lastScrollPosition = currentScrollPosition
        }

        window.addEventListener('scroll', handleScroll)
    }

    /**
     * Adds an event listener to detect when the user scrolls down.
     * @param callback - The function to call when scrolling down is detected.
     * @example
     * ```typescript
     * const scrollable = new Scrollable(window);
     * scrollable.onScrollDown(() => console.log('Scrolling down'));
     * ```
     */
    onScrollDown(callback: () => void): void {
        let lastScrollPosition = window.scrollY

        const handleScroll = () => {
            const currentScrollPosition = window.scrollY
            if (currentScrollPosition > lastScrollPosition) {
                callback()
            }
            lastScrollPosition = currentScrollPosition
        }

        window.addEventListener('scroll', handleScroll)
    }
}
