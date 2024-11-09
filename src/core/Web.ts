/**
 * Represents an HTML element in the DOM, providing methods to manipulate its attributes, content, events, and styling.
 */
export class Web {
    private e: HTMLElement

    /**
     * Selects an element from the DOM by ID, class, or any CSS selector.
     *
     * @param selector - The CSS selector to match the element. This can be an ID, class, or any valid CSS selector.
     * @throws DOMException if the element is not found.
     */
    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (!element) {
            throw new DOMException('Element not found.')
        }
        this.e = element as HTMLElement
    }

    /**
     * Static method to select all elements matching a CSS selector.
     *
     * @param selector - The CSS selector to match elements.
     * @returns An array of `Web` instances for each matching element.
     *
     * @example
     * ```typescript
     * const items = Web.selectAll('.item');
     * items.forEach(item => item.css('color: red'));
     * ```
     */
    static selectAll(selector: string): Web[] {
        const elements = document.querySelectorAll(selector)
        return Array.from(elements).map(
            (el) => new Web(el.id || `.${el.className.split(' ').join('.')}`),
        )
    }

    submit(withValidation = false): Web {
        if (this.e instanceof HTMLFormElement) {
            if (!withValidation || this.e.checkValidity()) {
                this.e.submit()
            } else {
                console.warn('Form validation failed.')
            }
        } else {
            throw new Error('Element is not a form and cannot be submitted.')
        }
        return this
    }

    /**
     * Detects when the user appears to intend to leave the page by moving the mouse to the top of the screen.
     *
     * @param callback - The callback function to execute when intent to leave is detected.
     * @returns The `Web` instance for chaining.
     */
    on_intent_to_leave(callback: EventListener): Web {
        document.addEventListener('mousemove', (event) => {
            if (event.clientY < 10) {
                // Checks if the mouse is near the top of the viewport
                callback(new Event('intenttoleave'))
            }
        })
        return this
    }

    /**
     * Detects slow typing in an input element, suggesting hesitancy or confusion.
     *
     * @param callback - The callback function to execute when slow typing is detected.
     * @param delay - The maximum time in milliseconds between key presses to detect slow typing (default is 1000ms).
     * @returns The `Web` instance for chaining.
     * @throws Error if the element is not an input field.
     */
    on_slow_typing(callback: EventListener, delay = 1000): Web {
        if (
            !(
                this.e instanceof HTMLInputElement ||
                this.e instanceof HTMLTextAreaElement
            )
        ) {
            throw new Error(
                'Element is not an input field and cannot detect typing behavior.',
            )
        }

        let lastKeyPress = Date.now()
        this.on('keyup', () => {
            const now = Date.now()
            if (now - lastKeyPress > delay) {
                callback(new Event('slowtyping'))
            }
            lastKeyPress = now
        })
        return this
    }

    /**
     * Detects repeated inputs in a text field, suggesting possible frustration or confusion.
     *
     * @param callback - The callback function to execute on repeated inputs.
     * @param repeatThreshold - The number of repeated entries required to trigger the callback (default is 3).
     * @returns The `Web` instance for chaining.
     * @throws Error if the element is not an input field.
     */
    on_repeated_inputs(callback: EventListener, repeatThreshold = 3): Web {
        if (
            !(
                this.e instanceof HTMLInputElement ||
                this.e instanceof HTMLTextAreaElement
            )
        ) {
            throw new Error(
                'Element is not an input field and cannot detect repeated inputs.',
            )
        }

        let lastValue = ''
        let repeatCount = 0

        this.on('input', () => {
            if (this.e.innerText === lastValue) {
                repeatCount++
                if (repeatCount >= repeatThreshold) {
                    callback(new Event('repeatedinputs'))
                    repeatCount = 0 // Reset counter after triggering callback
                }
            } else {
                repeatCount = 0 // Reset if input changes
            }
            lastValue = this.e.innerText
        })
        return this
    }

    /**
     * Detects when a user repeatedly focuses on an element, which may indicate indecision or difficulty.
     *
     * @param callback - The callback function to execute on repeated focus.
     * @param threshold - The number of focus events to trigger the callback (default is 3).
     * @returns The `Web` instance for chaining.
     */
    on_element_focus_repeat(callback: EventListener, threshold = 3): Web {
        let focusCount = 0

        this.on('focus', () => {
            focusCount++
            if (focusCount >= threshold) {
                callback(new Event('focusrepeat'))
                focusCount = 0 // Reset counter after triggering
            }
        })
        return this
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

    /**
     * Adds a double-click event listener to the element.
     *
     * @param callback - The callback function to execute on double-click.
     * @returns The `Web` instance for chaining.
     */
    on_double_click(callback: EventListener): Web {
        return this.on('dblclick', callback)
    }

    /**
     * Adds a listener for scrolling to the bottom of the element or window.
     * Typically used to trigger loading more content when reaching the bottom.
     *
     * @param callback - The callback function to execute when scrolled to the bottom.
     * @returns The `Web` instance for chaining.
     */
    on_scroll_bottom(callback: EventListener): Web {
        const handler = () => {
            const atBottom =
                this.e === document.documentElement
                    ? window.innerHeight + window.scrollY >=
                      document.body.offsetHeight
                    : this.e.scrollHeight - this.e.scrollTop <=
                      this.e.clientHeight
            if (atBottom) callback(new Event('scroll'))
        }
        return this.on('scroll', handler)
    }

    /**
     * Adds a listener for pressing the "Escape" key while the element is focused.
     *
     * @param callback - The callback function to execute on Escape key press.
     * @returns The `Web` instance for chaining.
     */
    on_escape_key(callback: EventListener): Web {
        this.on_keydown((event) => {
            if ((event as KeyboardEvent).key === 'Escape') callback(event)
        })
        return this
    }
    /**
     * Adds a listener for pressing the "Enter" key while the element is focused.
     *
     * @param callback - The callback function to execute on Enter key press.
     * @returns The `Web` instance for chaining.
     */
    on_enter_key(callback: EventListener): Web {
        this.on_keydown((event) => {
            if ((event as KeyboardEvent).key === 'Enter') callback(event)
        })
        return this
    }

    /**
     * Adds a listener for pressing the "Tab" key while the element is focused.
     *
     * @param callback - The callback function to execute on Tab key press.
     * @returns The `Web` instance for chaining.
     */
    on_tab_key(callback: EventListener): Web {
        this.on_keydown((event) => {
            if ((event as KeyboardEvent).key === 'Tab') callback(event)
        })
        return this
    }

    /**
     * Adds a long press event listener to the element, triggered when the user holds down a click for a specified duration.
     *
     * @param callback - The callback function to execute on long press.
     * @param duration - The duration in milliseconds to trigger a long press (default is 500ms).
     * @returns The `Web` instance for chaining.
     */
    on_long_press(callback: EventListener, duration = 500): Web {
        let timeout: number | null = null

        this.on('mousedown', () => {
            timeout = window.setTimeout(
                () => callback(new Event('longpress')),
                duration,
            )
        })

        this.on('mouseup', () => {
            if (timeout) clearTimeout(timeout)
        })

        this.on('mouseleave', () => {
            if (timeout) clearTimeout(timeout)
        })

        return this
    }

    /**
     * Detects rapid, repetitive clicks, often associated with frustration or impatience.
     *
     * @param callback - The callback function to execute when rapid clicks are detected.
     * @param threshold - The number of clicks within a period (default is 3 clicks within 500ms).
     * @returns The `Web` instance for chaining.
     */
    on_rapid_click(
        callback: EventListener,
        threshold = 3,
        interval = 500,
    ): Web {
        let clickCount = 0
        const resetClickCount = () => {
            clickCount = 0
        }

        this.on('click', () => {
            clickCount++
            if (clickCount === threshold) {
                callback(new Event('rapidclick'))
                resetClickCount()
            }
            setTimeout(resetClickCount, interval)
        })

        return this
    }

    /**
     * Detects fast scrolling, often indicating disengagement or rushing through content.
     *
     * @param callback - The callback function to execute on fast scrolling.
     * @param speedThreshold - The minimum scroll speed in pixels per second to trigger detection (default is 1000).
     * @returns The `Web` instance for chaining.
     */
    on_fast_scroll(callback: EventListener, speedThreshold = 1000): Web {
        let lastPosition = 0
        let lastTime = Date.now()

        this.on('scroll', () => {
            const currentPosition =
                this.e === document.documentElement
                    ? window.scrollY
                    : this.e.scrollTop
            const currentTime = Date.now()
            const distance = Math.abs(currentPosition - lastPosition)
            const timeDelta = currentTime - lastTime

            const speed = distance / (timeDelta / 1000) // Pixels per second

            if (speed > speedThreshold) {
                callback(new Event('fastscroll'))
            }

            lastPosition = currentPosition
            lastTime = currentTime
        })

        return this
    }

    /**
     * Detects when a user hovers over an element for a prolonged duration, often indicating confusion or interest.
     *
     * @param callback - The callback function to execute after prolonged hover.
     * @param duration - The duration in milliseconds to trigger detection (default is 2000ms).
     * @returns The `Web` instance for chaining.
     */
    on_hover_duration(callback: EventListener, duration = 2000): Web {
        let hoverTimeout: number | null = null

        this.on('mouseover', () => {
            hoverTimeout = window.setTimeout(() => {
                callback(new Event('hoverduration'))
            }, duration)
        })

        this.on('mouseout', () => {
            if (hoverTimeout) clearTimeout(hoverTimeout)
        })

        return this
    }

    /**
     * Detects when the user has been idle (no interaction) for a specified duration, often indicating disengagement.
     *
     * @param callback - The callback function to execute after idle duration.
     * @param idleDuration - The duration in milliseconds of inactivity to trigger detection (default is 5000ms).
     * @returns The `Web` instance for chaining.
     */
    on_idle(callback: EventListener, idleDuration = 5000): Web {
        let idleTimeout: number | null = null

        const resetIdleTimeout = () => {
            if (idleTimeout) clearTimeout(idleTimeout)
            idleTimeout = window.setTimeout(() => {
                callback(new Event('idle'))
            }, idleDuration)
        }

        ;['mousemove', 'keypress', 'scroll', 'click'].forEach((event) => {
            document.addEventListener(event, resetIdleTimeout)
        })

        resetIdleTimeout() // Start idle detection on load

        return this
    }

    /**
     * Executes a callback when the document or the specified element is fully loaded.
     *
     * @param callback - The callback function to execute once loading is complete.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $("#my-element").ready(() => {
     *     console.log("Element or document fully loaded!");
     * });
     * ```
     */
    ready(callback: EventListener): Web {
        if (this.e === document.documentElement || this.e === document.body) {
            // If the target is the document, wait for the window to load
            window.addEventListener('load', () => callback(new Event('load')))
        } else {
            // If the target is a specific element, use the 'load' event if applicable
            if (this.e.tagName === 'IMG' || this.e.tagName === 'IFRAME') {
                // Use 'load' for image or iframe elements
                this.e.addEventListener('load', callback)
            } else {
                // For non-image/iframe elements, simulate load when DOM is ready
                document.addEventListener('DOMContentLoaded', () =>
                    callback(new Event('DOMContentLoaded')),
                )
            }
        }
        return this
    }

    /**
     * Detects when a user hovers over an element for an extended period.
     *
     * @param callback - The callback function to execute after prolonged hover.
     * @param duration - The duration in milliseconds to trigger detection (default is 3000ms).
     * @returns The `Web` instance for chaining.
     */
    on_long_hover(callback: EventListener, duration = 3000): Web {
        let hoverTimeout: number | null = null

        this.on('mouseover', () => {
            hoverTimeout = window.setTimeout(() => {
                callback(new Event('longhover'))
            }, duration)
        })

        this.on('mouseout', () => {
            if (hoverTimeout) clearTimeout(hoverTimeout)
        })

        return this
    }

    /**
     * Detects when a user quickly moves their mouse away from an element, possibly indicating disengagement.
     *
     * @param callback - The callback function to execute on quick leave.
     * @param threshold - The duration in milliseconds to detect quick leave (default is 500ms).
     * @returns The `Web` instance for chaining.
     */
    on_quick_leave(callback: EventListener, threshold = 500): Web {
        let hoverStart: number | null = null

        this.on('mouseover', () => {
            hoverStart = Date.now()
        })

        this.on('mouseout', () => {
            const hoverDuration = Date.now() - (hoverStart || 0)
            if (hoverDuration < threshold) callback(new Event('quickleave'))
        })

        return this
    }

    /**
     * Detects when the user navigates away from the page (e.g., switching to another tab or minimizing the window).
     *
     * @param callback - The callback function to execute when the page loses focus.
     * @returns The `Web` instance for chaining.
     */
    on_focus_lost(callback: EventListener): Web {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) callback(new Event('focuslost'))
        })
        return this
    }

    /**
     * Detects when a user spends less time than expected on an element, indicating possible lack of interest.
     *
     * @param callback - The callback function to execute on short attention.
     * @param minDuration - The minimum time in milliseconds the user should spend to avoid triggering (default is 2000ms).
     * @returns The `Web` instance for chaining.
     */
    on_short_attention(callback: EventListener, minDuration = 2000): Web {
        let startTime: number | null = null

        this.on('mouseover', () => {
            startTime = Date.now()
        })

        this.on('mouseout', () => {
            const timeSpent = Date.now() - (startTime || 0)
            if (timeSpent < minDuration) callback(new Event('shortattention'))
        })

        return this
    }

    /**
     * Detects when a user returns to the page after navigating away, indicating renewed engagement.
     *
     * @param callback - The callback function to execute when the user returns to the page.
     * @returns The `Web` instance for chaining.
     */
    on_user_return(callback: EventListener): Web {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) callback(new Event('userreturn'))
        })
        return this
    }

    /**
     * Detects when a user returns to the page multiple times, potentially indicating frequent distraction or renewed interest.
     *
     * @param callback - The callback function to execute after multiple returns.
     * @param threshold - The minimum number of returns to trigger detection (default is 3).
     * @returns The `Web` instance for chaining.
     */
    on_multiple_returns(callback: EventListener, threshold = 3): Web {
        let returnCount = 0

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                returnCount++
                if (returnCount >= threshold)
                    callback(new Event('multiplereturns'))
            }
        })

        return this
    }

    /**
     * Detects when a user scrolls up after previously scrolling down, often indicating interest in revisiting content.
     *
     * @param callback - The callback function to execute when scrolling up is detected.
     * @returns The `Web` instance for chaining.
     */
    on_scroll_up(callback: EventListener): Web {
        let lastScrollPosition = window.scrollY

        this.on('scroll', () => {
            const currentScrollPosition = window.scrollY
            if (currentScrollPosition < lastScrollPosition) {
                callback(new Event('scrollup'))
            }
            lastScrollPosition = currentScrollPosition
        })

        return this
    }

    /**
     * Detects prolonged inactivity from the user, potentially indicating disengagement.
     *
     * @param callback - The callback function to execute after prolonged inactivity.
     * @param idleDuration - The time in milliseconds of inactivity to trigger detection (default is 10000ms).
     * @returns The `Web` instance for chaining.
     */
    on_prolonged_inactivity(
        callback: EventListener,
        idleDuration = 10000,
    ): Web {
        let idleTimeout: number | null = null

        const resetInactivity = () => {
            if (idleTimeout) clearTimeout(idleTimeout)
            idleTimeout = window.setTimeout(() => {
                callback(new Event('prolongedinactivity'))
            }, idleDuration)
        }

        ;['mousemove', 'keypress', 'scroll', 'click'].forEach((event) => {
            document.addEventListener(event, resetInactivity)
        })

        resetInactivity() // Start inactivity detection immediately
        return this
    }

    /**
     * Detects rapid navigation between elements, potentially indicating confusion or frustration.
     *
     * @param callback - The callback function to execute on rapid navigation.
     * @param threshold - The time in milliseconds for rapid navigation between elements (default is 300ms).
     * @returns The `Web` instance for chaining.
     */
    on_rapid_navigation(callback: EventListener, threshold = 300): Web {
        let lastNavigationTime = Date.now()

        this.on('focusin', () => {
            const currentTime = Date.now()
            if (currentTime - lastNavigationTime <= threshold) {
                callback(new Event('rapidnavigation'))
            }
            lastNavigationTime = currentTime
        })

        return this
    }

    /**
     * Detects a left-click event on the element.
     *
     * @param callback - The callback function to execute on left-click.
     * @returns The `Web` instance for chaining.
     */
    on_left_click(callback: EventListener): Web {
        this.on('click', (event) => {
            if ((event as MouseEvent).button === 0) {
                // Left button is typically represented by 0
                callback(event)
            }
        })
        return this
    }

    /**
     * Detects a right-click event on the element.
     *
     * @param callback - The callback function to execute on right-click.
     * @returns The `Web` instance for chaining.
     *
     * @example
     * ```typescript
     * $('#my-element').on_right_click(() => {
     *     console.log("Right-click detected, showing custom context menu.");
     * });
     * ```
     */
    on_right_click(callback: EventListener): Web {
        this.on('contextmenu', (event) => {
            event.preventDefault() // Prevents the default context menu from appearing
            callback(event)
        })
        return this
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
