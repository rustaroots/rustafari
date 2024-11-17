import Web  from './Web'

export default class Enlivenment extends Web {
    /**
     * Animates a CSS property on the element.
     *
     * @param property - The CSS property to animate (e.g., "opacity", "transform").
     * @param toValue - The target value for the property (e.g., "1" for opacity, "translateX(100px)" for transform).
     * @param duration - Duration of the animation in milliseconds (default is 500ms).
     * @param easing - CSS easing function for the animation (default is "ease").
     * @param callback - Optional callback to execute upon animation completion.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.animate("opacity", "0", 300, "ease-in-out", () => console.log("Fade out completed"));
     * ```
     */
    animate(
        property: string,
        toValue: string,
        duration = 500,
        easing = 'ease',
        callback?: () => void,
    ): this {
        this.e.style.transition = `${property} ${duration}ms ${easing}`
        ;(this.e.style as any)[property] = toValue

        const handleTransitionEnd = () => {
            this.e.style.transition = '' // Reset transition
            this.e.removeEventListener('transitionend', handleTransitionEnd)
            if (callback) callback()
        }

        this.e.addEventListener('transitionend', handleTransitionEnd)
        return this
    }

    /**
     * Slides the element in from a specified direction.
     *
     * @param direction - Direction to slide from ("left", "right", "top", "bottom").
     * @param distance - Distance to slide (e.g., "100px").
     * @param duration - Duration of the animation in milliseconds.
     * @param callback - Optional callback function to execute after the slide completes.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.slideIn("left", "100px", 500, () => console.log("Slide-in complete"));
     * ```
     */
    slideIn(
        direction: 'left' | 'right' | 'top' | 'bottom',
        distance: string,
        duration = 500,
        callback?: () => void,
    ): this {
        const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y'
        const sign = direction === 'left' || direction === 'top' ? '-' : ''
        this.e.style.transform = `translate${axis}(${sign}${distance})`
        this.e.style.opacity = '0'
        this.e.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`

        // Use requestAnimationFrame to set final state after initial state
        requestAnimationFrame(() => {
            this.e.style.transform = 'translate(0, 0)'
            this.e.style.opacity = '1'
        })

        const handleTransitionEnd = () => {
            this.e.style.transition = ''
            this.e.removeEventListener('transitionend', handleTransitionEnd)
            if (callback) callback()
        }

        this.e.addEventListener('transitionend', handleTransitionEnd)
        return this
    }

    /**
     * Fades the element in by gradually changing opacity from 0 to 1.
     *
     * @param duration - Duration of the fade-in effect in milliseconds.
     * @param callback - Optional callback function to execute after fade-in completes.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.fadeIn(500, () => console.log("Fade-in complete"));
     * ```
     */
    fadeIn(duration = 500, callback?: () => void): this {
        this.e.style.opacity = '0'
        this.e.style.display = 'block'
        return this.animate('opacity', '1', duration, 'ease', callback)
    }

    /**
     * Fades the element out by gradually changing opacity from 1 to 0.
     *
     * @param duration - Duration of the fade-out effect in milliseconds.
     * @param callback - Optional callback function to execute after fade-out completes.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.fadeOut(500, () => console.log("Fade-out complete"));
     * ```
     */
    fadeOut(duration = 500, callback?: () => void): this {
        return this.animate('opacity', '0', duration, 'ease', () => {
            this.e.style.display = 'none'
            if (callback) callback()
        })
    }

    /**
     * Rotates the element by a specified angle.
     *
     * @param angle - Angle to rotate to (e.g., "180deg").
     * @param duration - Duration of the rotation in milliseconds.
     * @param callback - Optional callback function to execute after rotation completes.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.rotate("180deg", 500, () => console.log("Rotation complete"));
     * ```
     */
    rotate(angle: string, duration = 500, callback?: () => void): this {
        return this.animate(
            'transform',
            `rotate(${angle})`,
            duration,
            'ease',
            callback,
        )
    }

    /**
     * Scales the element by a specified factor.
     *
     * @param factor - Scaling factor (e.g., "1.5" for 150%).
     * @param duration - Duration of the scaling animation in milliseconds.
     * @param callback - Optional callback function to execute after scaling completes.
     * @returns The `Enlivenment` instance for chaining.
     *
     * @example
     * ```typescript
     * const element = new Enlivenment("#myElement");
     * element.scale("1.5", 400, () => console.log("Scaling complete"));
     * ```
     */
    scale(factor: string, duration = 500, callback?: () => void): this {
        return this.animate(
            'transform',
            `scale(${factor})`,
            duration,
            'ease',
            callback,
        )
    }
}
