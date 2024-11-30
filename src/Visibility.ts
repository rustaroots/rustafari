import { Web } from './Web';

/**
 * The Visibility class provides utilities for detecting and controlling the visibility of DOM elements.
 */
export class Visibility extends Web {
    /**
     * Checks if the element is currently visible within the viewport.
     *
     * @returns `true` if the element is in the viewport, otherwise `false`.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * console.log(element.isInViewport()); // Outputs true if the element is within the viewport.
     * ```
     */
    isInViewport(): boolean {
        const rect = this.e.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Sets up an observer to detect when the element enters the viewport, triggering the provided callback function.
     *
     * @param callback - A function to execute when the element becomes visible within the viewport.
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.onVisible(() => console.log("Element is now visible in the viewport"));
     * ```
     */
    onVisible(callback: (entry: IntersectionObserverEntry) => void): this {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback(entry);
                    observer.unobserve(this.e); // Stop observing after first visibility
                }
            });
        });
        observer.observe(this.e);
        return this;
    }

    /**
     * Displays the element by setting a specified display style.
     *
     * @param display - The CSS display value to apply when making the element visible (default is `'block'`).
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.show(); // Makes the element visible by setting display to 'block'
     * ```
     */
    show(display: string = 'block'): this {
        this.e.style.display = display;
        return this;
    }

    /**
     * Hides the element by setting `display: none`, effectively removing it from the document flow.
     *
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.hide(); // Hides the element
     * ```
     */
    hide(): this {
        this.e.style.display = 'none';
        return this;
    }

    /**
     * Toggles the visibility of the element. If the element is hidden (display is `none`), it will be shown.
     * If the element is visible, it will be hidden.
     *
     * @param display - The CSS display value to apply when making the element visible (default is `'block'`).
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.toggleVisibility(); // Toggles between showing and hiding the element
     * ```
     */
    toggleVisibility(display: string = 'block'): this {
        const currentDisplay = getComputedStyle(this.e).display;
        if (currentDisplay === 'none') {
            this.show(display);
        } else {
            this.hide();
        }
        return this;
    }

    /**
     * Checks if the element is fully visible within the viewport (entirely inside the viewport).
     *
     * @returns `true` if the element is fully visible, otherwise `false`.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * console.log(element.isFullyVisible()); // Outputs true if the element is fully within the viewport.
     * ```
     */
    isFullyVisible(): boolean {
        const rect = this.e.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Fades in the element by gradually changing its opacity.
     *
     * @param duration - The duration of the fade-in animation in milliseconds. Default is 500ms.
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.fadeIn(1000); // Fades in the element over 1 second
     * ```
     */
    fadeIn(duration: number = 500): this {
        this.e.style.opacity = '0';
        this.e.style.display = 'block';
        this.e.style.transition = `opacity ${duration}ms`;
        setTimeout(() => (this.e.style.opacity = '1'), 0);
        return this;
    }

    /**
     * Fades out the element by gradually changing its opacity.
     *
     * @param duration - The duration of the fade-out animation in milliseconds. Default is 500ms.
     * @returns The `Visibility` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Visibility("#myElement");
     * element.fadeOut(1000); // Fades out the element over 1 second
     * ```
     */
    fadeOut(duration: number = 500): this {
        this.e.style.opacity = '1';
        this.e.style.transition = `opacity ${duration}ms`;
        setTimeout(() => {
            this.e.style.opacity = '0';
            this.e.style.display = 'none';
        }, duration);
        return this;
    }
}
