import { Web } from './Web'

export class Human extends Web {
    constructor(selector: string) {
        super(selector)
    }

    /**
     * Detects slow typing in an input field, which might indicate hesitation.
     *
     * @param callback - Function to call when slow typing is detected.
     * @param delay - Optional time in milliseconds between key presses to detect slow typing (default is 1000ms).
     * @example
     * ```typescript
     * const inputField = new Human("#inputField");
     * inputField.onSlowTyping(() => console.log("User is typing slowly"), 1500);
     * ```
     */
    onSlowTyping(callback: EventListener, delay = 1000): this {
        let lastKeyTime = Date.now()
        this.on('keyup', () => {
            const currentTime = Date.now()
            if (currentTime - lastKeyTime > delay) {
                callback(new Event('slowtyping'))
            }
            lastKeyTime = currentTime
        })
        return this
    }

    /**
     * Detects prolonged hovering over an element.
     *
     * @param callback - Function to call when prolonged hovering is detected.
     * @param duration - Optional time in milliseconds to consider hover as "prolonged" (default is 2000ms).
     * @example
     * ```typescript
     * const element = new Human("#hoverElement");
     * element.onProlongedHover(() => console.log("User is hovering over element"), 3000);
     * ```
     */
    onProlongedHover(callback: EventListener, duration = 2000): this {
        let hoverTimeout: number | null = null
        this.on('mouseover', () => {
            hoverTimeout = window.setTimeout(() => {
                callback(new Event('prolongedhover'))
            }, duration)
        })
        this.on('mouseout', () => {
            if (hoverTimeout) clearTimeout(hoverTimeout)
        })
        return this
    }

    /**
     * Detects user inactivity for a specified duration.
     *
     * @param callback - Function to call when the user becomes idle.
     * @param idleTime - Optional time in milliseconds of inactivity to consider the user as "idle" (default is 5000ms).
     * @example
     * ```typescript
     * const userActivity = new Human("#element");
     * userActivity.onIdle(() => console.log("User is idle"), 6000);
     * ```
     */
    onIdle(callback: EventListener, idleTime = 5000): this {
        let idleTimeout: number | null = null

        const resetIdleTimer = () => {
            if (idleTimeout) clearTimeout(idleTimeout)
            idleTimeout = window.setTimeout(
                () => callback(new Event('idle')),
                idleTime,
            )
        }

        ;['mousemove', 'keypress', 'scroll', 'click'].forEach((event) =>
            document.addEventListener(event, resetIdleTimer),
        )

        resetIdleTimer() // Start the timer on load
        return this
    }

    /**
     * Detects rapid, repetitive clicks, which may indicate user frustration.
     *
     * @param callback - Function to call when rapid clicks are detected.
     * @param clickThreshold - Optional number of clicks within an interval to trigger the callback (default is 3).
     * @param interval - Optional time in milliseconds to track the click sequence (default is 500ms).
     * @example
     * ```typescript
     * const button = new Human("#button");
     * button.onRapidClicks(() => console.log("User clicked rapidly"), 3, 500);
     * ```
     */
    onRapidClicks(
        callback: EventListener,
        clickThreshold = 3,
        interval = 500,
    ): this {
        let clickCount = 0
        const resetClickCount = () => {
            clickCount = 0
        }

        this.on('click', () => {
            clickCount++
            if (clickCount === clickThreshold) {
                callback(new Event('rapidclicks'))
                resetClickCount()
            }
            setTimeout(resetClickCount, interval)
        })
        return this
    }

    /**
     * Detects when the user returns to the page after leaving.
     *
     * @param callback - Function to call when the user returns to the page.
     * @example
     * ```typescript
     * const page = new Human("#element");
     * page.onUserReturn(() => console.log("User returned to the page"));
     * ```
     */
    onUserReturn(callback: EventListener): this {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) callback(new Event('userreturn'))
        })
        return this
    }

    /**
     * Detects rapid scrolling, potentially indicating user disengagement.
     *
     * @param callback - Function to call when fast scrolling is detected.
     * @param speedThreshold - Optional minimum scroll speed in pixels per second to trigger the callback (default is 1000).
     * @example
     * ```typescript
     * const pageScroll = new Human("#element");
     * pageScroll.onFastScroll(() => console.log("User is scrolling fast"), 1200);
     * ```
     */
    onFastScroll(callback: EventListener, speedThreshold = 1000): this {
        let lastScrollPosition = window.scrollY
        let lastScrollTime = Date.now()

        this.on('scroll', () => {
            const currentPosition = window.scrollY
            const currentTime = Date.now()
            const distance = Math.abs(currentPosition - lastScrollPosition)
            const timeDelta = currentTime - lastScrollTime

            const scrollSpeed = distance / (timeDelta / 1000) // pixels per second
            if (scrollSpeed > speedThreshold) {
                callback(new Event('fastscroll'))
            }

            lastScrollPosition = currentPosition
            lastScrollTime = currentTime
        })

        return this
    }

    /**
     * Detects repeated form submissions within a short period, suggesting impatience.
     *
     * @param callback - Function to call when repeated submissions are detected.
     * @param threshold - Optional number of submissions within an interval to trigger the callback (default is 2).
     * @param interval - Optional time frame in milliseconds to track submissions (default is 1000ms).
     * @example
     * ```typescript
     * const form = new Human("#form");
     * form.onRepeatedSubmissions(() => console.log("Form submitted multiple times"), 2, 1500);
     * ```
     */
    onRepeatedSubmissions(
        callback: EventListener,
        threshold = 2,
        interval = 1000,
    ): this {
        let submissionCount = 0

        this.on('submit', (event) => {
            submissionCount++
            if (submissionCount >= threshold) {
                callback(event)
                submissionCount = 0 // Reset count after triggering
            }

            setTimeout(() => (submissionCount = 0), interval)
        })
        return this
    }

    /**
     * Detects hesitation in filling out form fields by tracking idle time between focus and input.
     *
     * @param callback - Function to call when hesitation is detected.
     * @param idleThreshold - Optional time in milliseconds to consider as hesitation (default is 2000ms).
     * @example
     * ```typescript
     * const formField = new Human("#formField");
     * formField.onFormFieldHesitation(() => console.log("User hesitated in filling out the form"), 2000);
     * ```
     */
    onFormFieldHesitation(callback: EventListener, idleThreshold = 2000): this {
        let idleTimeout: number | null = null

        this.on('focusin', () => {
            idleTimeout = window.setTimeout(() => {
                callback(new Event('formfieldhesitation'))
            }, idleThreshold)
        })

        this.on('input', () => {
            if (idleTimeout) clearTimeout(idleTimeout)
            idleTimeout = window.setTimeout(() => {
                callback(new Event('formfieldhesitation'))
            }, idleThreshold)
        })

        this.on('focusout', () => {
            if (idleTimeout) clearTimeout(idleTimeout)
        })

        return this
    }

    /**
     * Detects if the user is moving their mouse in a circular motion.
     *
     * @param callback - Function to call when idle mouse looping is detected.
     * @param radius - Optional radius to consider for circular motion (default is 50px).
     * @param threshold - Optional number of movements within the radius to trigger detection (default is 5).
     * @example
     * ```typescript
     * const mouseTracker = new Human("#element");
     * mouseTracker.onIdleMouseLoop(() => console.log("User is idly looping the mouse"), 50, 5);
     * ```
     */
    onIdleMouseLoop(callback: EventListener, radius = 50, threshold = 5): this {
        let positions: { x: number; y: number }[] = []
        let loopCount = 0

        const isInCircle = (
            newPos: { x: number; y: number },
            lastPos: { x: number; y: number },
        ) => Math.hypot(newPos.x - lastPos.x, newPos.y - lastPos.y) <= radius

        this.on('mousemove', (event) => {
            const { clientX, clientY } = event as MouseEvent
            const newPos = { x: clientX, y: clientY }

            if (
                positions.length > 0 &&
                isInCircle(newPos, positions[positions.length - 1])
            ) {
                loopCount++
                if (loopCount >= threshold) {
                    callback(new Event('idlemouseloop'))
                    loopCount = 0 // Reset after triggering
                }
            } else {
                loopCount = 0 // Reset if movement is outside the radius
            }

            positions.push(newPos)
            if (positions.length > threshold) positions.shift() // Keep position history limited
        })

        return this
    }

    /**
     * Detects multiple user returns to the page, indicating frequent distractions.
     *
     * @param callback - Function to call when multiple returns are detected.
     * @param returnThreshold - Optional number of returns to trigger the callback (default is 3).
     * @example
     * ```typescript
     * const userReturnTracker = new Human("#element");
     * userReturnTracker.onFrequentReturns(() => console.log("User returned multiple times"), 3);
     * ```
     */
    onFrequentReturns(callback: EventListener, returnThreshold = 3): this {
        let returnCount = 0

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                returnCount++
                if (returnCount >= returnThreshold) {
                    callback(new Event('frequentreturns'))
                    returnCount = 0 // Reset after triggering
                }
            }
        })

        return this
    }
}
