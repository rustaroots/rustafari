export type NavigationOptions = {
    containerSelector: string;
    focusableSelector: string;
    horizontal?: boolean;
    onEnter?: (focusedElement: HTMLElement) => void; // Callback pour Enter
};

export class KeyboardNavigation {
    private container: HTMLElement;
    private focusableElements: HTMLElement[];
    private horizontal: boolean;
    private isActive: boolean; // Mode activé ou désactivé
    private onEnterCallback?: (focusedElement: HTMLElement) => void;

    constructor(options: NavigationOptions) {
        const { containerSelector, focusableSelector, horizontal = false, onEnter } = options;

        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`Container "${containerSelector}" not found.`);
        }

        this.container = container as HTMLElement;
        this.focusableElements = Array.from(
            this.container.querySelectorAll(focusableSelector)
        ) as HTMLElement[];
        this.horizontal = horizontal;
        this.isActive = true; // Mode activé par défaut
        this.onEnterCallback = onEnter;

        this.init();
    }

    private init() {
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));

        // Focus initial si le mode est activé
        if (this.isActive && this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            this.toggleMode();
            return;
        }
        if (!this.isActive) return;

        const currentIndex = this.focusableElements.findIndex(
            (el) => el === document.activeElement
        );

        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        if (!this.horizontal) {
            if (event.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % this.focusableElements.length;
            } else if (event.key === "ArrowUp") {
                nextIndex =
                    (currentIndex - 1 + this.focusableElements.length) %
                    this.focusableElements.length;
            }
        } else {
            if (event.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % this.focusableElements.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex =
                    (currentIndex - 1 + this.focusableElements.length) %
                    this.focusableElements.length;
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

    private toggleMode() {
        this.isActive = !this.isActive;

        if (this.isActive) {
            // Focus sur le premier élément lorsque le mode est activé
            if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
        } else {
            // Retirer le focus des éléments
            (document.activeElement as HTMLElement)?.blur();
        }
    }
}
