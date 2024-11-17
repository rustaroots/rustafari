import Web from './Web'

export default class Human extends Web {
    constructor(selector: string) {
        super(selector)
    }

    /**
     * Detects slow typing in an input field, which might indicate hesitation or uncertainty.

     * @param callback - A function to be called when slow typing is detected. The function will receive an 'slowtyping' event.

     * @param delay - Time in milliseconds between key presses to detect slow typing. Default is 1000ms.
     * @example
     * ```typescript
     * const inputField = new Human("#inputField");
     * inputField.onSlowTyping(() => console.log("User is typing slowly"), 1500);
     * ```
     */
    onSlowTyping(callback: EventListener, delay: number = 1000): this {
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
     * Detects if a user hovers over an element for an extended period.
     *
     * @param callback - A function to be called when prolonged hovering is detected. The function will receive a 'prolongedhover' event.

     * @param duration - Time in milliseconds to consider a hover as "prolonged". Default is 2000ms.
     * @example
     * ```typescript
     * const element = new Human("#hoverElement");
     * element.onProlongedHover(() => console.log("User is hovering over element"), 3000);
     * ```
     */
    onProlongedHover(callback: EventListener, duration: number = 2000): this {
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
     * Detects when a user is inactive for a specified duration.
     *
     * @param callback - A function to be called when the user becomes idle. The function will receive an 'idle' event.

     * @param idleTime - Time in milliseconds of inactivity to consider the user as "idle". Default is 5000ms.
     * @example
     * ```typescript
     * const userActivity = new Human("#element");
     * userActivity.onIdle(() => console.log("User is idle"), 6000);
     * ```
     */
    onIdle(callback: EventListener, idleTime: number = 5000): this {
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
     * Detects rapid, repetitive clicks, which might indicate user frustration or urgency.
     *
     * @param callback - A function to be called when rapid clicks are detected. The function will receive a 'rapidclicks' event.

     * @param clickThreshold - Number of clicks within the interval to trigger the callback. Default is 3.
     * @param interval - Time in milliseconds to track the click sequence. Default is 500ms.
     * @example
     * ```typescript
     * const button = new Human("#button");
     * button.onRapidClicks(() => console.log("User clicked rapidly"), 3, 500);
     * ```
     */
    onRapidClicks(callback: EventListener, clickThreshold: number = 3, interval: number = 500): this {
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
     * Detects when a user returns to the page after leaving.
     *
     * @param callback - A function to be called when the user returns to the page. The function will receive an 'userreturn' event.
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
     * Detects rapid scrolling, potentially indicating user disengagement or impatience.
     *
     * @param callback - A function to be called when fast scrolling is detected. The function will receive a 'fastscroll' event.
     * @param speedThreshold - Minimum scroll speed in pixels per second to trigger the callback. Default is 1000.
     */
    onFastScroll(callback: EventListener, speedThreshold: number = 1000): this {
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
     * Detects repeated form submissions within a short period, potentially indicating impatience.

     * @param callback - A function to be called when repeated submissions are detected. The function will receive the 'submit' event.

     * @param threshold - Number of submissions within the interval to trigger the callback. Default is 2.
     * @param interval - Time frame in milliseconds to track submissions. Default is 1000ms.
     * @example
     * ```typescript
     * const form = new Human("#form");
     * form.onRepeatedSubmissions(() => console.log("Form submitted multiple times"), 2, 1500);
     * ```
     */
    onRepeatedSubmissions(callback: EventListener, threshold: number = 2, interval: number = 1000): this {
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
     * Detects hesitation while filling out form fields by tracking idle time between focus and input.
     *
     * @param callback - A function to be called when hesitation is detected. The function will receive a 'formfieldhesitation' event.
     * @param idleThreshold - Time in milliseconds to consider as hesitation. Default is 2000ms.
     * @example
     * ```typescript
     * const formField = new Human("#formField");
     * formField.onFormFieldHesitation(() => console.log("User hesitated in filling out the form"), 2000);
     * ```
     */
    onFormFieldHesitation(callback: EventListener, idleThreshold: number = 2000): this {
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
     * @param callback - A function to be called when idle mouse looping is detected. The function will receive an 'idlemouseloop' event.
     * @param radius - Radius to consider for circular motion. Default is 50px.
     * @param threshold - Number of movements within the radius to trigger detection. Default is 5.
     * @example
     * ```typescript
     * const mouseTracker = new Human("#element");
     * mouseTracker.onIdleMouseLoop(() => console.log("User is idly looping the mouse"), 50, 5);
     * ```
     */
    onIdleMouseLoop(callback: EventListener, radius: number = 50, threshold: number = 5): this {
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
     * @param callback - A function to be called when multiple returns are detected. The function will receive a 'frequentreturns' event.
     * @param returnThreshold - Number of returns to trigger the callback. Default is 3.
     * @example
     * ```typescript
     * const userReturnTracker = new Human("#element");
     * userReturnTracker.onFrequentReturns(() => console.log("User returned multiple times"), 3);
     * ```
     */
    onFrequentReturns(callback: EventListener, returnThreshold: number = 3): this {
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
