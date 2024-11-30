/**
 * A utility class for creating and managing CSS grids.
 */
export class Grid {
    private container: HTMLElement;

    /**
     * Initializes the grid on the specified container.
     * @param selector - The CSS selector for the grid container.
     * @throws Error if the container element is not found.
     */
    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found.`);
        }
        this.container = element as HTMLElement;
    }

    /**
     * Configures the grid layout with specified options.
     * @param options - Configuration options for the grid.
     * @property columns - Number of columns in the grid.
     * @property gap - Gap between grid items (default: "1rem").
     * @property breakpoints - Responsive grid settings (optional).
     * @returns The current instance for method chaining.
     */
    generateGrid(options: {
        columns: number;
        gap?: string;
        breakpoints?: { [key: string]: number };
    }): this {
        const { columns, gap = '1rem', breakpoints = {} } = options;

        // Apply base grid styles
        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        this.container.style.gap = gap;

        // Generate responsive styles for breakpoints
        if (Object.keys(breakpoints).length > 0) {
            const style = document.createElement('style');
            const uniqueClass = this.ensureUniqueClass();

            let cssRules = '';
            for (const [breakpoint, cols] of Object.entries(breakpoints)) {
                cssRules += `
                    @media (max-width: ${breakpoint}) {
                        .${uniqueClass} {
                            grid-template-columns: repeat(${cols}, 1fr);
                        }
                    }
                `;
            }

            style.innerHTML = cssRules;
            document.head.appendChild(style);
        }
        return this;
    }

    /**
     * Adds an item to the grid.
     * @param content - The content of the grid item (string or HTMLElement).
     * @param className - Optional class name for the grid item.
     * @returns The current instance for method chaining.
     */
    addItem(content: string | HTMLElement, className: string = 'grid-item'): this {
        const item = document.createElement('div');
        item.className = className;

        if (typeof content === 'string') {
            item.innerHTML = content;
        } else {
            item.appendChild(content);
        }

        this.container.appendChild(item);
        return this;
    }

    /**
     * Removes all grid items from the grid container.
     * @returns The current instance for method chaining.
     */
    clearItems(): this {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        return this;
    }

    /**
     * Ensures the container has a unique class for applying styles.
     * Adds a generated class if none exists.
     * @returns The unique class name.
     */
    private ensureUniqueClass(): string {
        let className = this.container.className.trim();

        if (!className) {
            className = `grid-${Math.random().toString(36).substring(2, 8)}`;
            this.container.classList.add(className);
        }

        return className.split(' ').join('.');
    }

    /**
     * Sets a specific style on the grid container.
     * @param property - The CSS property to set.
     * @param value - The value for the CSS property.
     * @returns The current instance for method chaining.
     */
    setStyle(property: string, value: string): this {
        this.container.style.setProperty(property, value);
        return this;
    }

    /**
     * Dynamically updates the number of columns in the grid.
     * @param columns - The number of columns to set.
     * @returns The current instance for method chaining.
     */
    setColumns(columns: number): this {
        this.container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        return this;
    }

    /**
     * Sets the gap between grid items.
     * @param gap - The gap value to set (e.g., "10px").
     * @returns The current instance for method chaining.
     */
    setGap(gap: string): this {
        this.container.style.gap = gap;
        return this;
    }
}
