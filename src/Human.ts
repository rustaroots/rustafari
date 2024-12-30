import { Web } from './Web';

/**
 * Human class for advanced user interaction tracking and behavior detection.
 */
export class Human extends Web {
    constructor(selector: string) {
        super(selector);
    }

    /**
     * Helper to create and dispatch custom events.
     * @param eventName - Name of the custom event.
     * @param detail - Optional additional data to include with the event.
     * @returns A new Event object.
     */
    private createEvent(eventName: string, detail: any = {}): Event {
        return new CustomEvent(eventName, { detail });
    }

    /**
     * Helper to debounce functions.
     * @param func - The function to debounce.
     * @param delay - The delay in milliseconds.
     * @returns A debounced version of the function.
     */
    private debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
        let timeout: number | null = null;
        return (...args: any[]) => {
            if (timeout) clearTimeout(timeout);
            timeout = window.setTimeout(() => func(...args), delay);
        };
    }

    /**
     * Detects slow typing in an input field, which might indicate hesitation or uncertainty.
     */
    onSlowTyping(callback: EventListener, delay: number = 1000): this {
        let lastKeyTime = Date.now();
        this.on('keyup', () => {
            const currentTime = Date.now();
            if (currentTime - lastKeyTime > delay) {
                callback(this.createEvent('slowtyping'));
            }
            lastKeyTime = currentTime;
        });
        return this;
    }

    /**
     * Detects prolonged hovering over an element.
     */
    onProlongedHover(callback: EventListener, duration: number = 2000): this {
        let hoverTimeout: number | null = null;
        this.on('mouseover', () => {
            hoverTimeout = window.setTimeout(() => {
                callback(this.createEvent('prolongedhover'));
            }, duration);
        });
        this.on('mouseout', () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        });
        return this;
    }

    /**
     * Detects when a user becomes idle due to inactivity.
     */
    onIdle(callback: EventListener, idleTime: number = 5000): this {
        let idleTimeout: number | null = null;

        const resetIdleTimer = () => {
            if (idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = window.setTimeout(() => {
                callback(this.createEvent('idle'));
            }, idleTime);
        };

        const events = ['mousemove', 'keypress', 'scroll', 'click'];
        events.forEach((event) => document.addEventListener(event, resetIdleTimer));
        resetIdleTimer();

        return this;
    }

    /**
     * Detects rapid, repetitive clicks.
     */
    onRapidClicks(callback: EventListener, clickThreshold: number = 3, interval: number = 500): this {
        let clickCount = 0;
        const resetClickCount = this.debounce(() => (clickCount = 0), interval);

        this.on('click', () => {
            clickCount++;
            if (clickCount === clickThreshold) {
                callback(this.createEvent('rapidclicks'));
                clickCount = 0;
            }
            resetClickCount();
        });
        return this;
    }

    /**
     * Detects when a user returns to the page after leaving.
     */
    onUserReturn(callback: EventListener): this {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                callback(this.createEvent('userreturn'));
            }
        });
        return this;
    }

    /**
     * Detects rapid scrolling.
     */
    onFastScroll(callback: EventListener, speedThreshold: number = 1000): this {
        let lastScrollY = window.scrollY;
        let lastTime = Date.now();

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const distance = Math.abs(currentScrollY - lastScrollY);
            const timeElapsed = currentTime - lastTime;
            const speed = distance / (timeElapsed / 1000); // pixels/second

            if (speed > speedThreshold) {
                callback(this.createEvent('fastscroll', { speed }));
            }

            lastScrollY = currentScrollY;
            lastTime = currentTime;
        });

        return this;
    }

    /**
     * Detects repeated form submissions within a short interval.
     */
    onRepeatedSubmissions(callback: EventListener, threshold: number = 2, interval: number = 1000): this {
        let submissionCount = 0;
        const resetCount = this.debounce(() => (submissionCount = 0), interval);

        this.on('submit', (event) => {
            submissionCount++;
            if (submissionCount >= threshold) {
                callback(event);
                submissionCount = 0;
            }
            resetCount();
        });
        return this;
    }

    /**
     * Detects hesitation while filling out form fields.
     */
    onFormFieldHesitation(callback: EventListener, idleThreshold: number = 2000): this {
        let idleTimeout: number | null = null;

        this.on('focusin', () => {
            idleTimeout = window.setTimeout(() => {
                callback(this.createEvent('formfieldhesitation'));
            }, idleThreshold);
        });

        this.on('input', () => {
            if (idleTimeout) clearTimeout(idleTimeout);
            idleTimeout = window.setTimeout(() => {
                callback(this.createEvent('formfieldhesitation'));
            }, idleThreshold);
        });

        this.on('focusout', () => {
            if (idleTimeout) clearTimeout(idleTimeout);
        });

        return this;
    }

    /**
     * Detects circular mouse movement patterns.
     */
    onIdleMouseLoop(callback: EventListener, radius: number = 50, threshold: number = 5): this {
        let positions: { x: number; y: number }[] = [];
        let loopCount = 0;

        const isInCircle = (newPos: { x: number; y: number }, lastPos: { x: number; y: number }) =>
            Math.hypot(newPos.x - lastPos.x, newPos.y - lastPos.y) <= radius;

        this.on('mousemove', (event) => {
            const { clientX, clientY } = event as MouseEvent;
            const newPos = { x: clientX, y: clientY };

            if (positions.length > 0 && isInCircle(newPos, positions[positions.length - 1])) {
                loopCount++;
                if (loopCount >= threshold) {
                    callback(this.createEvent('idlemouseloop'));
                    loopCount = 0;
                }
            } else {
                loopCount = 0;
            }

            positions.push(newPos);
            if (positions.length > threshold) positions.shift(); // Keep history limited
        });

        return this;
    }

    /**
     * Detects multiple user returns to the page.
     */
    onFrequentReturns(callback: EventListener, returnThreshold: number = 3): this {
        let returnCount = 0;

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                returnCount++;
                if (returnCount >= returnThreshold) {
                    callback(this.createEvent('frequentreturns'));
                    returnCount = 0;
                }
            }
        });

        return this;
    }

    /**
     * Detects double-click events.
     */
    onDoubleClick(callback: EventListener): this {
        this.on('dblclick', (event) => {
            callback(event);
        });
        return this;
    }

    /**
     * Detects long press on an element.
     */
    onLongPress(callback: EventListener, duration: number = 1000): this {
        let pressTimeout: number | null = null;

        this.on('mousedown', () => {
            pressTimeout = window.setTimeout(() => {
                callback(this.createEvent('longpress'));
            }, duration);
        });

        this.on('mouseup', () => {
            if (pressTimeout) clearTimeout(pressTimeout);
        });

        this.on('mouseleave', () => {
            if (pressTimeout) clearTimeout(pressTimeout);
        });

        return this;
    }

    /**
     * Detects when an element is resized.
     */
    onElementResize(callback: EventListener): this {
        const resizeObserver = new ResizeObserver(() => {
            callback(this.createEvent('elementresize'));
        });
        resizeObserver.observe(this.e);
        return this;
    }
}
