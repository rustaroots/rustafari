export interface ModalOptions {
    closeOnOverlayClick?: boolean; // Permet la fermeture via clic sur l'overlay.
    autoCloseAfter?: number;      // Temps avant fermeture automatique (ms).
    animationDuration?: number;   // Durée de l'animation d'ouverture/fermeture (ms).
}

export class Modal {
    protected modalElement: HTMLElement;
    private overlayElement: HTMLElement;
    private options: ModalOptions;

    constructor(modalId: string, options?: ModalOptions) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            throw new Error(`Modal with id "${modalId}" not found.`);
        }
        this.modalElement = modal;
        this.options = options || {};

        // Create and style the overlay
        this.overlayElement = document.createElement('div');
        this.overlayElement.classList.add('modal-overlay');
        if (this.options.closeOnOverlayClick !== false) {
            this.overlayElement.addEventListener('click', () => this.close());
        }

        // Attach overlay to DOM
        document.body.appendChild(this.overlayElement);

        // Initial state
        this.close();
    }

    open() {
        this.modalElement.classList.add('open');
        this.overlayElement.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Apply animation duration if specified
        if (this.options.animationDuration) {
            this.modalElement.style.transition = `opacity ${this.options.animationDuration}ms`;
            this.overlayElement.style.transition = `opacity ${this.options.animationDuration}ms`;
        }

        // Auto close after a specific time if configured
        if (this.options.autoCloseAfter) {
            setTimeout(() => this.close(), this.options.autoCloseAfter);
        }
    }

    close() {
        this.modalElement.classList.remove('open');
        this.overlayElement.classList.remove('open');
        document.body.style.overflow = '';

        // Remove inline styles for animation after closing
        if (this.options.animationDuration) {
            setTimeout(() => {
                this.modalElement.style.transition = '';
                this.overlayElement.style.transition = '';
            }, this.options.animationDuration);
        }
    }

    toggle() {
        if (this.modalElement.classList.contains('open')) {
            this.close();
        } else {
            this.open();
        }
    }
}
