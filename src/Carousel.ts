/**
 * Carousel: A simple class to create an interactive image or content carousel.
 */
/**
 * Carousel: A simple class to create an interactive image or content carousel.
 *
 * This class allows you to create a customizable and interactive carousel for images or other content.
 * It supports manual navigation through buttons and automatic scrolling of slides.
 *
 * @example
 * // Initialize a carousel with 5-second auto-scroll
 * const myCarousel = new Carousel("#carousel-container", 5000);
 *
 * // Manually navigate through slides
 * myCarousel.showNextSlide();
 * myCarousel.showPreviousSlide();
 *
 * // Automatically start and stop auto-scrolling
 * myCarousel.startAutoScroll();
 * myCarousel.stopAutoScroll();
 */
export class Carousel {
    private container: HTMLElement; // The main container element for the carousel.
    private slides: HTMLElement[]; // Array of all slides within the carousel.
    private currentIndex: number; // Index of the currently visible slide.
    private intervalId: number | null; // ID for the auto-scroll interval timer.
    private autoScrollInterval: number; // Interval time (in milliseconds) for auto-scrolling.

    /**
     * Creates an instance of the Carousel.
     *
     * @param containerSelector - CSS selector for the carousel container.
     * @param autoScrollInterval - Time in milliseconds between auto-scrolls (default: 3000ms).
     *
     * @example
     * // Initialize a carousel with 5-second auto-scroll
     * const myCarousel = new Carousel("#carousel-container", 5000);
     */
    constructor(containerSelector: string, autoScrollInterval = 3000) {
        this.container = document.querySelector(containerSelector) as HTMLElement;
        this.slides = Array.from(this.container.children) as HTMLElement[];
        this.currentIndex = 0;
        this.intervalId = null;
        this.autoScrollInterval = autoScrollInterval;

        this.initCarousel();
    }

    /**
     * Initializes the carousel by setting up styles, creating controls, and starting auto-scroll.
     */
    private initCarousel(): void {
        if (!this.container) {
            throw new Error("Carousel container not found.");
        }

        // Apply basic styles to the container for a functional carousel layout
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";
        this.container.style.display = "flex";

        // Set up styles for each slide
        this.slides.forEach((slide, index) => {
            slide.style.flex = "0 0 100%"; // Each slide takes up 100% width of the container
            slide.style.transition = "transform 0.5s ease-in-out"; // Smooth animation for slide transitions
            slide.style.transform = `translateX(${index * 100}%)`; // Position slides horizontally
        });

        // Create navigation controls (buttons for next and previous)
        this.createControls();

        // Start auto-scroll functionality
        this.startAutoScroll();
    }

    /**
     * Creates navigation controls (previous and next buttons) for the carousel.
     *
     * This method generates and styles previous and next buttons, adds event listeners for
     * navigation, and appends the buttons to the carousel container.
     *
     * @example
     * // Calls within the Carousel class during initialization:
     * this.createControls();
     */
    private createControls(): void {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");

        // Set button text (arrows)
        prevButton.innerText = "←";
        nextButton.innerText = "→";

        // Apply basic styles to the buttons
        [prevButton, nextButton].forEach((button) => {
            button.style.position = "absolute";
            button.style.top = "50%";
            button.style.transform = "translateY(-50%)";
            button.style.padding = "10px";
            button.style.zIndex = "1000";
            button.style.background = "#fff";
            button.style.border = "none";
            button.style.cursor = "pointer";
            button.style.userSelect = "none";
        });

        // Position buttons on the left and right of the container
        prevButton.style.left = "10px";
        nextButton.style.right = "10px";

        // Add event listeners for button clicks
        prevButton.addEventListener("click", () => this.showPreviousSlide());
        nextButton.addEventListener("click", () => this.showNextSlide());

        // Add buttons to the carousel container
        this.container.appendChild(prevButton);
        this.container.appendChild(nextButton);
    }

    /**
     * Updates the positions of the slides to show the current slide.
     *
     * This method calculates the new positions for all slides and applies the necessary
     * transformations to display the slide at the current index.
     *
     * @example
     * // Show a specific slide
     * myCarousel.goToSlide(2);
     * // The updateSlides method is called internally to update slide positions.
     */
    private updateSlides(): void {
        this.slides.forEach((slide, index) => {
            // Calculate the position of each slide relative to the current index
            const offset = (index - this.currentIndex) * 100;
            slide.style.transform = `translateX(${offset}%)`;
        });
    }

    /**
     * Shows the previous slide in the carousel.
     *
     * This method updates the `currentIndex` to the previous slide and calls `updateSlides`
     * to reflect the change. If the current slide is the first one, it wraps around to the last slide.
     *
     * @example
     * // Show the previous slide in the carousel
     * myCarousel.showPreviousSlide();
     */
    private showPreviousSlide(): void {
        // Decrement the current index, looping back to the last slide if needed
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    /**
     * Shows the next slide in the carousel.
     *
     * This method updates the `currentIndex` to the next slide and calls `updateSlides`
     * to reflect the change. If the current slide is the last one, it wraps around to the first slide.
     *
     * @example
     * // Show the next slide in the carousel
     * myCarousel.showNextSlide();
     */
    private showNextSlide(): void {
        // Increment the current index, looping back to the first slide if needed
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
    }

    /**
     * Starts the automatic scrolling of slides.
     *
     * This method sets an interval to automatically call `showNextSlide` at a specified
     * interval defined by `autoScrollInterval`. The auto-scrolling continues until `stopAutoScroll` is called.
     *
     * @example
     * // Start the automatic scrolling of slides
     * myCarousel.startAutoScroll();
     */
    private startAutoScroll(): void {
        if (this.autoScrollInterval > 0) {
            this.intervalId = window.setInterval(() => this.showNextSlide(), this.autoScrollInterval);
        }
    }

    /**
     * Stops the automatic scrolling of slides.
     *
     * This method clears the interval set by `startAutoScroll` and stops the automatic
     * scrolling of slides.
     *
     * @example
     * // Stop the automatic scrolling of slides
     * myCarousel.stopAutoScroll();
     */
    public stopAutoScroll(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Jumps to a specific slide based on its index.
     *
     * @param index - The index of the slide to show (0-based).
     *
     * This method sets the `currentIndex` to the given index and updates the slides' positions
     * accordingly. It ensures that the provided index is within the valid range of slide indices.
     *
     * @example
     * // Jump to the second slide
     * myCarousel.goToSlide(1);
     */
    public goToSlide(index: number): void {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateSlides();
        }
    }
}