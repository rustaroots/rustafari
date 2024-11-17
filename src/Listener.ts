export class Listener {
    protected e: HTMLElement

    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (!element) {
            throw new DOMException('Element not found.')
        }
        this.e = element as HTMLElement
    }

    /**
     * Adds an event listener to the element.
     *
     * @param type - The event type (e.g., "click").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.on('click', (event) => {
     *     console.log('Element clicked!', event);
     * });
     */
    on(type: string, callback: EventListener): this {
        this.e.addEventListener(type, callback)
        return this
    }

    /**
     * Removes an event listener from the element.
     *
     * @param type - The event type.
     * @param callback - The callback function to remove.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * const handleClick = (event) => {
     *     console.log('Element clicked!', event);
     * };
     * listener.on('click', handleClick);
     * // Later, remove the event listener
     * listener.off('click', handleClick);
     */
    off(type: string, callback: EventListener): this {
        this.e.removeEventListener(type, callback)
        return this
    }

    /**
     * Delegates an event to a specific child element matching the selector.
     *
     * @param type - The event type.
     * @param selector - The child selector to match.
     * @param callback - The callback function to execute for matching children.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#parentElement');
     * listener.delegate('click', '.child', (event) => {
     *     console.log('Child element clicked!', event);
     * });
     */
    delegate(type: string, selector: string, callback: EventListener): this {
        this.e.addEventListener(type, (event) => {
            const target = event.target as HTMLElement
            if (target && target.matches(selector)) {
                callback.call(target, event)
            }
        })
        return this
    }

    /**
     * Adds a throttled event listener to the element, limiting the rate at which the callback is invoked.
     *
     * @param type - The event type.
     * @param callback - The callback function to execute at the limited rate.
     * @param limit - The minimum time in milliseconds between invocations (default is 200ms).
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.throttle('scroll', (event) => {
     *     console.log('Scrolled!', event);
     * }, 500);
     */
    throttle(type: string, callback: EventListener, limit = 200): this {
        let lastCall = 0
        this.e.addEventListener(type, (event) => {
            const now = Date.now()
            if (now - lastCall >= limit) {
                lastCall = now
                callback(event)
            }
        })
        return this
    }

    /**
     * Adds a debounced event listener to the element, triggering the callback only after the delay period has passed without additional events.
     *
     * @param type - The event type.
     * @param callback - The callback function to execute after the delay.
     * @param delay - The delay period in milliseconds (default is 300ms).
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.debounce('input', (event) => {
     *     console.log('Input event after delay!', event);
     * }, 300);
     */
    debounce(type: string, callback: EventListener, delay = 300): this {
        let timeout: number | null = null
        this.e.addEventListener(type, (event) => {
            if (timeout) clearTimeout(timeout)
            timeout = window.setTimeout(() => callback(event), delay)
        })
        return this
    }

    /**
     * Adds a one-time event listener to the element, which removes itself after the first invocation.
     *
     * @param type - The event type.
     * @param callback - The callback function to execute once.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.once('click', (event) => {
    *     console.log('Element clicked once!', event);
    * });
    */
    once(type: string, callback: EventListener): this {
        const handler = (event: Event) => {
            callback(event)
            this.off(type, handler)
        }
        this.on(type, handler)
        return this
    }

    /**
     * Binds multiple event types to a single callback function.
     *
     * @param types - A space-separated string of event types (e.g., "click keydown").
     * @param callback - The callback function to execute on each event type.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.onMultiple('click keydown', (event) => {
     *     console.log('Event triggered!', event);
     * });
     */
    onMultiple(types: string, callback: EventListener): this {
        types.split(' ').forEach((type) => this.on(type, callback))
        return this
    }

    /**
     * Triggers a custom event on the element.
     *
     * @param type - The custom event type.
     * @param detail - Optional data to pass with the event.
     * @returns The `Listener` instance for chaining.
     *
     * @example
     * const listener = new Listener('#myElement');
     * listener.trigger('customEvent', { key: 'value' });
     */
    trigger(type: string, detail?: any): this {
        const event = new CustomEvent(type, { detail })
        this.e.dispatchEvent(event)
        return this
    }
}
