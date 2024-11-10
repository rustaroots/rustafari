export class Responsive {
    private resizeTimeout: number | null = null
    private debounceDelay: number = 200
    private breakpoints = { xs: 0, lg: 500, xl: 800, xxl: 1200 }
    private handleResizeCallback: (() => void) | null = null

    private xsCallback: (() => void) | null = null
    private lgCallback: (() => void) | null = null
    private xlCallback: (() => void) | null = null
    private xxlCallback: (() => void) | null = null

    /**
     * Initializes responsive behavior based on the provided breakpoints.
     *
     * @param xs - Callback for the extra-small breakpoint.
     * @param lg - Callback for the large breakpoint.
     * @param xl - Callback for the extra-large breakpoint.
     * @param xxl - Callback for the extra-extra-large breakpoint.
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
     * Customizes the breakpoint values for responsive behavior.
     *
     * @param breakpoints - Object specifying new values for each breakpoint.
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
     *
     * @example
     * ```typescript
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
     *
     * @param element - The target HTML element.
     * @param showOnBreakpoints - Array of breakpoints ('xs', 'lg', 'xl', 'xxl') where the element should be shown.
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
     *
     * @param element - The target HTML element.
     * @param classes - An object containing class names for each breakpoint.
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
     *
     * @param element - The target HTML element.
     * @param padding - Padding values for each breakpoint.
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
     *
     * @param element - The target HTML element.
     * @param margin - Margin values for each breakpoint.
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
