import { Dom } from './Dom'

export declare class Styles extends Dom {
    /**
     * Applies inline CSS styles to the element.
     * @param styles - CSS styles to apply as a single string.
     * @returns The `Styles` instance for chaining.
     */
    css(styles: string): this

    /**
     * Displays the element by setting `display: block`.
     * @returns The `Styles` instance for chaining.
     */
    show(): this

    /**
     * Hides the element by setting `display: none`.
     * @returns The `Styles` instance for chaining.
     */
    hide(): this

    /**
     * Centers the element both horizontally and vertically.
     * @returns The `Styles` instance for chaining.
     */
    center(): this

    /**
     * Configures the element as a flex container with customizable alignment.
     * @param direction - Flex direction (e.g., "row", "column").
     * @param justifyContent - Alignment along the main axis.
     * @param alignItems - Alignment along the cross axis.
     * @returns The `Styles` instance for chaining.
     */
    flex(direction?: string, justifyContent?: string, alignItems?: string): this

    /**
     * Configures the element as a grid container with specified columns, rows, and gap.
     * @param columns - The grid template for columns.
     * @param rows - The grid template for rows (optional).
     * @param gap - The gap between grid items.
     * @returns The `Styles` instance for chaining.
     */
    grid(columns: string, rows?: string, gap?: string): this

    /**
     * Adds a border to the element.
     * @param width - The width of the border.
     * @param style - The border style.
     * @param color - The color of the border.
     * @returns The `Styles` instance for chaining.
     */
    border(width: string, style: string, color: string): this

    /**
     * Sets a margin around the element.
     * @param margin - The margin size.
     * @returns The `Styles` instance for chaining.
     */
    margin(margin: string): this

    /**
     * Sets padding inside the element.
     * @param padding - The padding size.
     * @returns The `Styles` instance for chaining.
     */
    padding(padding: string): this

    /**
     * Sets the background color of the element.
     * @param color - The background color.
     * @returns The `Styles` instance for chaining.
     */
    background(color: string): this
}
