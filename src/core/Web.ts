/**
 * Represents an HTML element in the DOM, providing methods to manipulate its attributes, content, events, and styling.
 */
export class Web {
    private e: HTMLElement

    /**
     * Selects an element from the DOM by its ID.
     *
     * @param id - The ID of the element to select.
     * @throws DOMException if the element is not found.
     */
    constructor(id: string) {
        let x = document.getElementById(id)
        if (x === null) {
            throw new DOMException('Element not found.')
        }
        this.e = x as HTMLElement
    }

    /**
     * Simulates a click on the element.
     */
    click(): void {
        this.e.click()
    }

    /**
     * Retrieves the value of an attribute.
     *
     * @param key - The name of the attribute to retrieve.
     * @returns The attribute value as a string, or `null` if the attribute is not present.
     */
    get(key: string): string | null {
        return this.e.getAttribute(key)
    }

    /**
     * Checks if the element is visible (`display: block`).
     *
     * @returns `true` if the element is visible, otherwise `false`.
     */
    visible(): boolean {
        return this.get('display') === 'block'
    }

    /**
     * Checks if the element is hidden (`display: none`).
     *
     * @returns `true` if the element is hidden, otherwise `false`.
     */
    hidden(): boolean {
        return this.get('display') === 'none'
    }

    /**
     * Gets the HTML content of the element.
     *
     * @returns The inner HTML of the element as a string.
     */
    html(): string {
        return this.e.innerHTML.toString()
    }

    /**
     * Gets the text content of the element.
     *
     * @returns The inner text of the element as a string.
     */
    text(): string {
        return this.e.textContent ?? ''
    }

    /**
     * Adds an event listener to the element.
     *
     * @param event - The event type (e.g., "click", "mouseover").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The `Web` instance for chaining.
     */
    on(event: string, callback: EventListener): Web {
        this.e.addEventListener(event, callback)
        return this
    }

    /**
     * Applies inline CSS styles to the element.
     *
     * @param styles - The CSS rules to apply as a single string (e.g., "color: red; font-size: 20px;").
     * @returns The `Web` instance for chaining.
     */
    css(styles: string): Web {
        return this.attr('style', styles)
    }

    /**
     * Hides the element by setting `display: none`.
     *
     * @returns The `Web` instance for chaining.
     */
    hide(): Web {
        return this.attr('display', 'none')
    }

    /**
     * Sets an attribute on the element.
     *
     * @param key - The attribute name.
     * @param value - The value to assign to the attribute.
     * @returns The `Web` instance for chaining.
     */
    attr(key: string, value: any): Web {
        this.e.setAttribute(key, value)
        return this
    }

    /**
     * Sets the width of the element.
     *
     * @param width - The width value (e.g., "100px", "50%").
     * @returns The `Web` instance for chaining.
     */
    width(width: string): Web {
        return this.attr('width', width)
    }

    /**
     * Sets the height of the element.
     *
     * @param height - The height value (e.g., "100px", "50%").
     * @returns The `Web` instance for chaining.
     */
    height(height: string): Web {
        return this.attr('height', height)
    }

    /**
     * Sets the HTML content of the element.
     *
     * @param content - The HTML code to set as the element's inner content.
     * @returns The `Web` instance for chaining.
     */
    set(content: string): Web {
        this.e.innerHTML = content
        return this
    }

    /**
     * Removes the element from the DOM.
     */
    remove(): void {
        this.e.remove()
    }

    /**
     * Appends HTML content or another element as a child of the current element.
     *
     * @param html - The HTML string to append.
     * @returns The `Web` instance for chaining.
     */
    append(html: string): Web {
        this.e.insertAdjacentHTML('beforeend', html)
        return this
    }

    /**
     * Prepends HTML content or another element as the first child of the current element.
     *
     * @param html - The HTML string to prepend.
     * @returns The `Web` instance for chaining.
     */
    prepend(html: string): Web {
        this.e.insertAdjacentHTML('afterbegin', html)
        return this
    }

    /**
     * Shows the element by setting `display: block`.
     *
     * @returns The `Web` instance for chaining.
     */
    show(): Web {
        return this.attr('display', 'block')
    }

    /**
     * Adds a scroll event listener to the element, typically used to implement infinite scrolling.
     * The provided callback function will execute whenever the element is scrolled.
     *
     * @param callback - The callback function to execute on scroll events. This function should include logic to handle loading more content when scrolling.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#content").infinite_scroll(() => {
     *     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
     *         loadMoreContent(); // Custom function to load more content
     *     }
     * });
     * ```
     */
    infinite_scroll(callback: EventListener): Web {
        return this.on('scroll', callback)
    }

    /**
     * Adds a debounced scroll event listener, which executes the callback only after a delay.
     *
     * @param callback - The callback function to execute after scrolling stops for the delay period.
     * @param delay - The delay in milliseconds before executing the callback (default is 200ms).
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#content").debounce_scroll(() => {
     *     console.log("Scrolled, with debouncing!");
     * }, 300);
     * ```
     */
    debounce_scroll(callback: EventListener, delay = 200): Web {
        let timeout: number | null = null
        this.on('scroll', () => {
            if (timeout) clearTimeout(timeout)
            timeout = window.setTimeout(callback, delay)
        })
        return this
    }

    /**
     * Adds a throttled scroll event listener, which limits how often the callback is executed.
     *
     * @param callback - The callback function to execute on scroll.
     * @param limit - The minimum time in milliseconds between callback executions (default is 200ms).
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#content").throttle_scroll(() => {
     *     console.log("Scrolled, with throttling!");
     * }, 300);
     * ```
     */
    throttle_scroll(callback: EventListener, limit = 200): Web {
        let lastCall = 0
        this.on('scroll', (event) => {
            const now = Date.now()
            if (now - lastCall >= limit) {
                lastCall = now
                callback(event) // Pass the event directly to the callback
            }
        })
        return this
    }

    /**
     * Executes a callback if the user clicks outside the element.
     *
     * @param callback - The callback function to execute when clicking outside the element.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#modal").on_click_outside(() => {
     *     $("#modal").hide(); // Hide the modal if clicked outside
     * });
     * ```
     */
    on_click_outside(callback: EventListener): Web {
        document.addEventListener('click', (event) => {
            if (!this.e.contains(event.target as Node)) {
                callback.call(this.e, event)
            }
        })
        return this
    }

    /**
     * Toggles a CSS class on the element.
     *
     * @param className - The class name to toggle.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#button").toggle("active");
     * ```
     */
    toggle(className: string): Web {
        this.e.classList.toggle(className)
        return this
    }

    /**
     * Adds a resize event listener to the window, useful for responsive adjustments.
     *
     * @param callback - The callback function to execute on resize.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#container").on_resize(() => {
     *     console.log("Window resized!");
     * });
     * ```
     */
    on_resize(callback: EventListener): Web {
        window.addEventListener('resize', callback)
        return this
    }

    /**
     * Adds a click event listener to the element.
     *
     * @param callback - The callback function to execute when the element is clicked.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $('#button').on_click(() => {
     *     console.log("Button clicked!");
     * });
     * ```
     */
    on_click(callback: EventListener): Web {
        return this.on('click', callback)
    }

    /**
     * Adds an input event listener to the element (useful for text inputs).
     *
     * @param callback - The callback function to execute on input events.
     * @returns The `Web` instance for chaining.
     */
    on_input(callback: EventListener): Web {
        return this.on('input', callback)
    }

    /**
     * Adds a mouseover event listener to the element.
     *
     * @param callback - The callback function to execute when the mouse is over the element.
     * @returns The `Web` instance for chaining.
     */
    on_mouseover(callback: EventListener): Web {
        return this.on('mouseover', callback)
    }

    /**
     * Adds a mouseout event listener to the element.
     *
     * @param callback - The callback function to execute when the mouse leaves the element.
     * @returns The `Web` instance for chaining.
     */
    on_mouseout(callback: EventListener): Web {
        return this.on('mouseout', callback)
    }
    /**
     * Adds a keydown event listener to the element (useful for keyboard interaction).
     *
     * @param callback - The callback function to execute on keydown events.
     * @returns The `Web` instance for chaining.
     */
    on_keydown(callback: EventListener): Web {
        return this.on('keydown', callback)
    }

    /**
     * Adds a keyup event listener to the element.
     *
     * @param callback - The callback function to execute on keyup events.
     * @returns The `Web` instance for chaining.
     */
    on_keyup(callback: EventListener): Web {
        return this.on('keyup', callback)
    }
}

/**
 * Utility function to select an element by ID and return a `Web` instance for DOM manipulation.
 *
 * @param id - The ID of the DOM element to select.
 * @returns A `Web` instance wrapping the selected element.
 * @throws DOMException if the element with the specified ID is not found.
 */
export const $ = (id: string): Web => {
    return new Web(id)
}
