import { Web } from './Web'

export declare class Visibility extends Web {
    /**
     * Checks if the element is currently visible within the viewport.
     *
     * @returns `true` if the element is in the viewport, otherwise `false`.
     */
    isInViewport(): boolean

    /**
     * Observes when an element enters the viewport and triggers the callback.
     *
     * @param callback - Function to call when the element becomes visible in the viewport.
     * @returns The `Visibility` instance for chaining.
     */
    onVisible(callback: EventListener): this

    /**
     * Shows the element by setting `display: block` or the specified display value.
     *
     * @param display - CSS display value to apply when showing the element (default is `block`).
     * @returns The `Visibility` instance for chaining.
     */
    show(display?: string): this

    /**
     * Hides the element by setting `display: none`.
     *
     * @returns The `Visibility` instance for chaining.
     */
    hide(): this

    /**
     * Toggles the visibility of the element, showing it if hidden, or hiding it if visible.
     *
     * @param display - CSS display value to apply when showing the element (default is `block`).
     * @returns The `Visibility` instance for chaining.
     */
    toggleVisibility(display?: string): this
}
