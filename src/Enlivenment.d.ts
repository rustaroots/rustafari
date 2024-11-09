import { Web } from './Web'

export declare class Enlivenment extends Web {
    /**
     * Animates a CSS property on the element.
     *
     * @param property - The CSS property to animate (e.g., "opacity", "transform").
     * @param toValue - The target value for the property (e.g., "1" for opacity, "translateX(100px)" for transform).
     * @param duration - Duration of the animation in milliseconds (default is 500ms).
     * @param easing - CSS easing function for the animation (default is "ease").
     * @param callback - Optional callback to execute upon animation completion.
     * @returns The `Enlivenment` instance for chaining.
     */
    animate(
        property: string,
        toValue: string,
        duration?: number,
        easing?: string,
        callback?: () => void,
    ): this

    /**
     * Slides the element in from a specified direction.
     *
     * @param direction - Direction to slide from ("left", "right", "top", "bottom").
     * @param distance - Distance to slide (e.g., "100px").
     * @param duration - Duration of the animation in milliseconds.
     * @param callback - Optional callback function to execute after the slide completes.
     * @returns The `Enlivenment` instance for chaining.
     */
    slideIn(
        direction: 'left' | 'right' | 'top' | 'bottom',
        distance: string,
        duration?: number,
        callback?: () => void,
    ): this

    /**
     * Fades the element in by gradually changing opacity from 0 to 1.
     *
     * @param duration - Duration of the fade-in effect in milliseconds.
     * @param callback - Optional callback function to execute after fade-in completes.
     * @returns The `Enlivenment` instance for chaining.
     */
    fadeIn(duration?: number, callback?: () => void): this

    /**
     * Fades the element out by gradually changing opacity from 1 to 0.
     *
     * @param duration - Duration of the fade-out effect in milliseconds.
     * @param callback - Optional callback function to execute after fade-out completes.
     * @returns The `Enlivenment` instance for chaining.
     */
    fadeOut(duration?: number, callback?: () => void): this

    /**
     * Rotates the element by a specified angle.
     *
     * @param angle - Angle to rotate to (e.g., "180deg").
     * @param duration - Duration of the rotation in milliseconds.
     * @param callback - Optional callback function to execute after rotation completes.
     * @returns The `Enlivenment` instance for chaining.
     */
    rotate(angle: string, duration?: number, callback?: () => void): this

    /**
     * Scales the element by a specified factor.
     *
     * @param factor - Scaling factor (e.g., "1.5" for 150%).
     * @param duration - Duration of the scaling animation in milliseconds.
     * @param callback - Optional callback function to execute after scaling completes.
     * @returns The `Enlivenment` instance for chaining.
     */
    scale(factor: string, duration?: number, callback?: () => void): this
}
