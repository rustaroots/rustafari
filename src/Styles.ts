import { Dom } from './Dom';

/**
 * The Styles class provides utility methods to dynamically style DOM elements.
 * It extends the Dom class to enhance elements with CSS manipulation capabilities.
 */
export class Styles extends Dom {
    /**
     * Applies inline CSS styles to the element.
     *
     * @param styles - CSS styles as a string (e.g., "color: red; font-size: 20px;").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.css("color: blue; font-weight: bold;");
     */
    css(styles: string): this {
        this.e.style.cssText += styles;
        return this;
    }

    /**
     * Displays the element by setting `display: block`.
     *
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.show();
     */
    show(): this {
        return this.css('display: block;');
    }

    /**
     * Hides the element by setting `display: none`.
     *
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.hide();
     */
    hide(): this {
        return this.css('display: none;');
    }

    /**
     * Toggles visibility of the element based on its current display value.
     *
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.toggle();
     */
    toggle(): this {
        const currentDisplay = this.e.style.display || getComputedStyle(this.e).display;
        return this.css(`display: ${currentDisplay === 'none' ? 'block' : 'none'};`);
    }

    /**
     * Centers the element both horizontally and vertically using flexbox.
     *
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.center();
     */
    center(): this {
        return this.css(`
            display: flex;
            justify-content: center;
            align-items: center;
        `);
    }

    /**
     * Configures the element as a flex container with customizable alignment.
     *
     * @param direction - Flex direction (e.g., "row", "column").
     * @param justifyContent - Alignment along the main axis (e.g., "center").
     * @param alignItems - Alignment along the cross axis (e.g., "flex-start").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const container = new Styles("#container");
     * container.flex("column", "center", "center");
     */
    flex(direction = 'row', justifyContent = 'flex-start', alignItems = 'stretch'): this {
        return this.css(`
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justifyContent};
            align-items: ${alignItems};
        `);
    }

    /**
     * Configures the element as a grid container with customizable columns, rows, and gap.
     *
     * @param columns - The grid template for columns (e.g., "1fr 1fr").
     * @param rows - The grid template for rows (optional, e.g., "auto auto").
     * @param gap - The gap between grid items (e.g., "10px").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const gridContainer = new Styles("#gridContainer");
     * gridContainer.grid("1fr 1fr", "auto auto", "10px");
     */
    grid(columns: string, rows?: string, gap = '0px'): this {
        return this.css(`
            display: grid;
            grid-template-columns: ${columns};
            ${rows ? `grid-template-rows: ${rows};` : ''}
            gap: ${gap};
        `.trim());
    }

    /**
     * Adds a border to the element.
     *
     * @param width - The width of the border (e.g., "1px").
     * @param style - The border style (e.g., "solid").
     * @param color - The color of the border (e.g., "black").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const box = new Styles("#box");
     * box.border("2px", "solid", "blue");
     */
    border(width: string, style: string, color: string): this {
        return this.css(`border: ${width} ${style} ${color};`);
    }

    /**
     * Sets a margin around the element.
     *
     * @param margin - The margin value (e.g., "10px" or "5px 10px").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const box = new Styles("#box");
     * box.margin("15px");
     */
    margin(margin: string): this {
        return this.css(`margin: ${margin};`);
    }

    /**
     * Sets padding inside the element.
     *
     * @param padding - The padding value (e.g., "10px" or "5px 10px").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const box = new Styles("#box");
     * box.padding("20px");
     */
    padding(padding: string): this {
        return this.css(`padding: ${padding};`);
    }

    /**
     * Sets the background color of the element.
     *
     * @param color - The background color (e.g., "red" or "#FF0000").
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.background("lightblue");
     */
    background(color: string): this {
        return this.css(`background-color: ${color};`);
    }

    /**
     * Dynamically sets multiple CSS properties.
     *
     * @param styles - An object where keys are CSS property names and values are the corresponding values.
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.setStyles({
     *   color: "white",
     *   backgroundColor: "black",
     *   padding: "10px"
     * });
     */
    setStyles(styles: Record<string, string>): this {
        for (const [property, value] of Object.entries(styles)) {
            this.e.style.setProperty(property, value);
        }
        return this;
    }

    /**
     * Clears all inline styles from the element.
     *
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.clearStyles();
     */
    clearStyles(): this {
        this.e.style.cssText = '';
        return this;
    }

    /**
     * Sets the width of the element.
     *
     * @param width - The width value (e.g., "100px", "50%", etc.).
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.width("100px");
     */
    width(width: string): this {
        return this.css(`width: ${width};`);
    }

    /**
     * Sets the height of the element.
     *
     * @param height - The height value (e.g., "100px", "50%", etc.).
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.height("100px");
     */
    height(height: string): this {
        return this.css(`height: ${height};`);
    }

    /**
     * Sets the background color of the element.
     *
     * @param color - The background color value (e.g., "red", "#ff0000", "rgb(255, 0, 0)", etc.).
     * @returns The `Styles` instance for chaining.
     *
     * @example
     * const element = new Styles("#myElement");
     * element.backgroundColor("red");
     */
    backgroundColor(color: string): this {
        return this.css(`background-color: ${color};`);
    }
}
