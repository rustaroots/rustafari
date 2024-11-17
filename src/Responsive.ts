/**
 * A utility class that enhances the responsiveness of web applications.
 * It provides callbacks for different breakpoints and allows dynamic adjustment of styles based on screen size.
 *
 * Usage example:
 * ```typescript
 * const responsive = new Responsive();
 * responsive.on(
 *   () => console.log("Extra-small screen"),
 *   () => console.log("Large screen"),
 *   () => console.log("Extra-large screen"),
 *   () => console.log("Extra-extra-large screen")
 * );
 * ```
 */
export class Responsive {

    /**
     * Timeout ID for debouncing the window resize event.
     */
    private resizeTimeout: number | null = null

    /**
     * Delay in milliseconds for debounce timing.
     */
    private debounceDelay: number = 200

    /**
     * Breakpoints defining the screen sizes for responsiveness.
     */
    private breakpoints = { xs: 0, lg: 500, xl: 800, xxl: 1200 }

    /**
     * Callback function for handling the window resize event.
     */
    private handleResizeCallback: (() => void) | null = null

    /**
     * Callback for the extra-small breakpoint.
     */
    private xsCallback: (() => void) | null = null

    /**
     * Callback for the large breakpoint.
     */
    private lgCallback: (() => void) | null = null

    /**
     * Callback for the extra-large breakpoint.
     */
    private xlCallback: (() => void) | null = null

    /**
     * Callback for the extra-extra-large breakpoint.
     */
    private xxlCallback: (() => void) | null = null

    /**
     * Initializes responsive behavior based on the provided breakpoints.
     * Sets up callbacks for each breakpoint and attaches a resize event listener.
     *
     * @param xs - Function called when the screen width is extra-small.
     * @param lg - Function called when the screen width is large.
     * @param xl - Function called when the screen width is extra-large.
     * @param xxl - Function called when the screen width is extra-extra-large.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * responsive.on(
     *   () => console.log("Extra-small screen"),
     *   () => console.log("Large screen"),
     *   () => console.log("Extra-large screen"),
     *   () => console.log("Extra-extra-large screen")
     * );
     * ```
     */
    on(xs: () => void, lg: () => void, xl: () => void, xxl: () => void): void {
        this.xsCallback = xs
        this.lgCallback = lg
        this.xlCallback = xl
        this.xxlCallback = xxl

        const handleResize = () => this.applyCallbacks()
        handleResize()

        this.handleResizeCallback = () => {
            clearTimeout(this.resizeTimeout as number)
            this.resizeTimeout = window.setTimeout(
                handleResize,
                this.debounceDelay,
            )
        }
        window.addEventListener('resize', this.handleResizeCallback)
    }

    /**
     * Invokes the registered callbacks based on the current screen width.
     * Determines the appropriate breakpoint and calls the corresponding function.
     */
    private applyCallbacks(): void {
        const width = window.innerWidth
        if (width >= this.breakpoints.xxl) {
            this.xxlCallback?.()
        } else if (width >= this.breakpoints.xl) {
            this.xlCallback?.()
        } else if (width >= this.breakpoints.lg) {
            this.lgCallback?.()
        } else {
            this.xsCallback?.()
        }
    }
    /**
    /**
     * Customizes the breakpoint values for responsive behavior.
     * Merges the provided breakpoints with existing values.
     *
     * @param breakpoints - Object specifying new values for each breakpoint.
     * @param breakpoints.xs - New value for the extra-small breakpoint.
     * @param breakpoints.lg - New value for the large breakpoint.
     * @param breakpoints.xl - New value for the extra-large breakpoint.
     * @param breakpoints.xxl - New value for the extra-extra-large breakpoint.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * responsive.setBreakpoints({ xs: 0, lg: 600, xl: 900, xxl: 1200 });
     * ```
     */
    setBreakpoints(breakpoints: {
        xs?: number
        lg?: number
        xl?: number
        xxl?: number
    }): this {
        this.breakpoints = { ...this.breakpoints, ...breakpoints }
        return this
    }

    /**
     * Sets the debounce delay for resize events.
     * Defines how long the application should wait before executing the resize callback.
     *
     * @param delay - Delay in milliseconds for debounce timing.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * responsive.setDebounceDelay(300);
     * ```
     */
    setDebounceDelay(delay: number): this {
        this.debounceDelay = delay
        return this
    }

    /**
     * Removes the resize event listener to stop responsive behavior.
     * Disables the current responsive settings and removes all callbacks.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * responsive.off();
     * ```
     */
    off(): void {
        if (this.handleResizeCallback) {
            window.removeEventListener('resize', this.handleResizeCallback)
            this.handleResizeCallback = null
        }
    }

    /**
     * Shows or hides an element based on the current breakpoint.
     * Adjusts the display property of the specified element depending on the screen size.
     *
     * @param element - The target HTML element.
     * @param showOnBreakpoints - Array of breakpoints ('xs', 'lg', 'xl', 'xxl') where the element should be shown.
     *
     * @param element - The target HTML element to show or hide.
     * @param showOnBreakpoints - Array of breakpoint identifiers ('xs', 'lg', 'xl', 'xxl') at which the element should be visible.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * const element = document.getElementById("myElement");
     * responsive.setVisibility(element!, ['xs', 'lg']);
     * ```
     */
    setVisibility(
        element: HTMLElement,
        showOnBreakpoints: ('xs' | 'lg' | 'xl' | 'xxl')[],
    ): void {
        const applyVisibility = () => {
            const currentBreakpoint = this.getCurrentBreakpoint()
            element.style.display = showOnBreakpoints.includes(
                currentBreakpoint,
            )
                ? 'block'
                : 'none'
        }

        applyVisibility()
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout as number)
            this.resizeTimeout = window.setTimeout(
                applyVisibility,
                this.debounceDelay,
            )
        })
    }

    /**
     * Adds responsive classes to an element based on the current breakpoint.
     * Changes the class names of an element dynamically as the screen size changes.
     *
     * @param element - The target HTML element.
     * @param classes - An object containing class names for each breakpoint.
     * @param classes.xs - Class name for the extra-small breakpoint.
     * @param classes.lg - Class name for the large breakpoint.
     * @param classes.xl - Class name for the extra-large breakpoint.
     * @param classes.xxl - Class name for the extra-extra-large breakpoint.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * const element = document.getElementById("myElement");
     * responsive.applyResponsiveClasses(element!, {
     *   xs: "mobile-class",
     *   lg: "tablet-class",
     *   xl: "desktop-class",
     *   xxl: "large-desktop-class"
     * });
     * ```
     */
    applyResponsiveClasses(
        element: HTMLElement,
        classes: { xs?: string; lg?: string; xl?: string; xxl?: string },
    ): void {
        const applyClasses = () => {
            element.className = ''
            const currentBreakpoint = this.getCurrentBreakpoint()
            if (classes[currentBreakpoint]) {
                element.classList.add(classes[currentBreakpoint]!)
            }
        }

        applyClasses()
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout as number)
            this.resizeTimeout = window.setTimeout(
                applyClasses,
                this.debounceDelay,
            )
        })
    }

    /**
     * Sets responsive padding for an element based on the current breakpoint.
     * Adjusts the padding property of the specified element depending on the screen size.
     *
     * @param element - The target HTML element.
     * @param padding - Padding values for each breakpoint.
     * @param padding.xs - Padding value for the extra-small breakpoint.
     * @param padding.lg - Padding value for the large breakpoint.
     * @param padding.xl - Padding value for the extra-large breakpoint.
     * @param padding.xxl - Padding value for the extra-extra-large breakpoint.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * const element = document.getElementById("myElement");
     * responsive.applyResponsivePadding(element!, {
     *   xs: "5px",
     *   lg: "10px",
     *   xl: "15px",
     *   xxl: "20px"
     * });
     * ```
     */
    applyResponsivePadding(
        element: HTMLElement,
        padding: { xs?: string; lg?: string; xl?: string; xxl?: string },
    ): void {
        const applyPadding = () => {
            const currentBreakpoint = this.getCurrentBreakpoint()
            element.style.padding = padding[currentBreakpoint] || '0'
        }

        applyPadding()
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout as number)
            this.resizeTimeout = window.setTimeout(
                applyPadding,
                this.debounceDelay,
            )
        })
    }

    /**
     * Sets responsive margin for an element based on the current breakpoint.
     * Adjusts the margin property of the specified element depending on the screen size.
     *
     * @param element - The target HTML element.
     * @param margin - Margin values for each breakpoint.
     * @param margin.xs - Margin value for the extra-small breakpoint.
     * @param margin.lg - Margin value for the large breakpoint.
     * @param margin.xl - Margin value for the extra-large breakpoint.
     * @param margin.xxl - Margin value for the extra-extra-large breakpoint.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * const element = document.getElementById("myElement");
     * responsive.applyResponsiveMargin(element!, {
     *   xs: "5px",
     *   lg: "10px",
     *   xl: "15px",
     *   xxl: "20px"
     * });
     * ```
     */
    applyResponsiveMargin(
        element: HTMLElement,
        margin: { xs?: string; lg?: string; xl?: string; xxl?: string },
    ): void {
        const applyMargin = () => {
            const currentBreakpoint = this.getCurrentBreakpoint()
            element.style.margin = margin[currentBreakpoint] || '0'
        }

        applyMargin()
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout as number)
            this.resizeTimeout = window.setTimeout(
                applyMargin,
                this.debounceDelay,
            )
        })
    }

    /**
     * Returns the current breakpoint category.
     *
     * @returns The current breakpoint as 'xs', 'lg', 'xl', or 'xxl'.
     *
     * @example
     * ```typescript
     * const responsive = new Responsive();
     * console.log("Current breakpoint:", responsive.getCurrentBreakpoint());
     * ```
     */
    getCurrentBreakpoint(): 'xs' | 'lg' | 'xl' | 'xxl' {
        const width = window.innerWidth
        if (width >= this.breakpoints.xxl) return 'xxl'
        if (width >= this.breakpoints.xl) return 'xl'
        if (width >= this.breakpoints.lg) return 'lg'
        return 'xs'
    }
}
