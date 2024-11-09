export declare class Listener {
    protected e: HTMLElement

    /**
     * Creates an instance of the Listener class.
     * @param selector - A CSS selector to identify the HTML element.
     * @throws DOMException if the element is not found.
     */
    constructor(selector: string)

    /**
     * Adds an event listener to the element.
     * @param type - The event type (e.g., "click").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The `Listener` instance for chaining.
     */
    on(type: string, callback: EventListener): this

    /**
     * Removes an event listener from the element.
     * @param type - The event type.
     * @param callback - The callback function to remove.
     * @returns The `Listener` instance for chaining.
     */
    off(type: string, callback: EventListener): this

    /**
     * Delegates an event to a specific child element matching the selector.
     * @param type - The event type.
     * @param selector - The child selector to match.
     * @param callback - The callback function to execute for matching children.
     * @returns The `Listener` instance for chaining.
     */
    delegate(type: string, selector: string, callback: EventListener): this

    /**
     * Adds a throttled event listener to the element, limiting the rate at which the callback is invoked.
     * @param type - The event type.
     * @param callback - The callback function to execute at the limited rate.
     * @param limit - The minimum time in milliseconds between invocations (default is 200ms).
     * @returns The `Listener` instance for chaining.
     */
    throttle(type: string, callback: EventListener, limit?: number): this

    /**
     * Adds a debounced event listener to the element, triggering the callback only after the delay period has passed without additional events.
     * @param type - The event type.
     * @param callback - The callback function to execute after the delay.
     * @param delay - The delay period in milliseconds (default is 300ms).
     * @returns The `Listener` instance for chaining.
     */
    debounce(type: string, callback: EventListener, delay?: number): this

    /**
     * Adds a one-time event listener to the element, which removes itself after the first invocation.
     * @param type - The event type.
     * @param callback - The callback function to execute once.
     * @returns The `Listener` instance for chaining.
     */
    once(type: string, callback: EventListener): this

    /**
     * Binds multiple event types to a single callback function.
     * @param types - A space-separated string of event types (e.g., "click keydown").
     * @param callback - The callback function to execute on each event type.
     * @returns The `Listener` instance for chaining.
     */
    onMultiple(types: string, callback: EventListener): this

    /**
     * Triggers a custom event on the element.
     * @param type - The custom event type.
     * @param detail - Optional data to pass with the event.
     * @returns The `Listener` instance for chaining.
     */
    trigger(type: string, detail?: any): this
}
