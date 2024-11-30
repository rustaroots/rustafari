export type NavigationOptions = {
    containerSelector: string;
    focusableSelector: string;
    horizontal?: boolean;
    onEnter?: (focusedElement: HTMLElement) => void; // Callback for the Enter key
    onEscape?: () => void; // Callback for the Escape key
    wrapNavigation?: boolean; // Whether navigation should wrap around
};

export class KeyboardNavigation {
    private container: HTMLElement;
    private focusableElements: HTMLElement[];
    private horizontal: boolean;
    private isActive: boolean; // Navigation mode enabled or disabled
    private onEnterCallback?: (focusedElement: HTMLElement) => void;
    private onEscapeCallback?: () => void;
    private wrapNavigation: boolean;

    constructor(options: NavigationOptions) {
        const {
            containerSelector,
            focusableSelector,
            horizontal = false,
            onEnter,
            onEscape,
            wrapNavigation = true,
        } = options;

        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`Container "${containerSelector}" not found.`);
        }

        this.container = container as HTMLElement;
        this.focusableElements = Array.from(
            this.container.querySelectorAll(focusableSelector)
        ) as HTMLElement[];
        this.horizontal = horizontal;
        this.isActive = true; // Navigation mode is enabled by default
        this.onEnterCallback = onEnter;
        this.onEscapeCallback = onEscape;
        this.wrapNavigation = wrapNavigation;

        this.init();
    }

    /**
     * Initializes the navigation system.
     */
    private init() {
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));

        // Focus on the first element if the navigation is active
        if (this.isActive && this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
    }

    /**
     * Handles keydown events and performs navigation or executes callbacks.
     */
    private handleKeyDown(event: KeyboardEvent) {
        if (!this.isActive) return;

        const currentIndex = this.focusableElements.findIndex(
            (el) => el === document.activeElement
        );

        if (event.key === "Escape") {
            event.preventDefault();
            this.toggleMode();
            this.onEscapeCallback?.();
            return;
        }

        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        if (this.horizontal) {
            if (event.key === "ArrowRight") {
                nextIndex = this.getNextIndex(currentIndex, 1);
            } else if (event.key === "ArrowLeft") {
                nextIndex = this.getNextIndex(currentIndex, -1);
            }
        } else {
            if (event.key === "ArrowDown") {
                nextIndex = this.getNextIndex(currentIndex, 1);
            } else if (event.key === "ArrowUp") {
                nextIndex = this.getNextIndex(currentIndex, -1);
            }
        }

        if (event.key === "Enter") {
            event.preventDefault();
            this.onEnterCallback?.(this.focusableElements[currentIndex]);
            return;
        }

        if (nextIndex !== currentIndex) {
            event.preventDefault();
            this.focusableElements[nextIndex].focus();
        }
    }

    /**
     * Calculates the next index based on the current index and the direction.
     * Handles navigation wrapping if enabled.
     */
    private getNextIndex(currentIndex: number, direction: number): number {
        const total = this.focusableElements.length;
        const newIndex = currentIndex + direction;

        if (this.wrapNavigation) {
            return (newIndex + total) % total; // Wrap around
        }

        // Clamp to the valid range if wrapping is disabled
        return Math.max(0, Math.min(newIndex, total - 1));
    }

    /**
     * Toggles navigation mode (enabled/disabled).
     */
    private toggleMode() {
        this.isActive = !this.isActive;

        if (this.isActive) {
            // Focus on the first element when navigation is reactivated
            if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
        } else {
            // Blur the currently focused element
            (document.activeElement as HTMLElement)?.blur();
        }
    }

    /**
     * Enables the navigation system.
     */
    enable() {
        this.isActive = true;
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
    }

    /**
     * Disables the navigation system.
     */
    disable() {
        this.isActive = false;
        (document.activeElement as HTMLElement)?.blur();
    }

    /**
     * Refreshes the list of focusable elements.
     * Useful if elements are dynamically added or removed.
     */
    refreshFocusableElements() {
        const focusableSelector = this.focusableElements[0]?.tagName.toLowerCase() || '*';
        this.focusableElements = Array.from(
            this.container.querySelectorAll(focusableSelector)
        ) as HTMLElement[];
    }
}
