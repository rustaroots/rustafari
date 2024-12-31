/**
 * A utility class for common DOM manipulations.
 * Provides an object-oriented approach to interacting with DOM elements.
 */
export class Dom {
    protected e: HTMLElement;

    /**
     * Creates an instance of the Dom class for a given selector.
     * @param selector - The CSS selector to find the element.
     * @throws DOMException - If the element is not found.
     */
    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new DOMException(`Element not found for selector: "${selector}".`);
        }
        this.e = element as HTMLElement;
    }

    /**
     * Adds an event listener to the element.
     * @param event - The event type to listen for (e.g., "click").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The current instance of the class for method chaining.
     */
    on(event: string, callback: EventListener): this {
        this.e.addEventListener(event, callback);
        return this;
    }

    /**
     * Triggers a click event on the element.
     * @returns The current instance of the class for method chaining.
     */
    click(): this {
        this.e.click();
        return this;
    }

    /**
     * Removes the element from the DOM.
     * @returns The current instance of the class for method chaining.
     */
    remove(): this {
        if (this.e.parentNode) {
            this.e.parentNode.removeChild(this.e);
        }
        return this;
    }

    /**
     * Appends a child element to the current element.
     * @param child - The child element to append.
     * @returns The current instance of the class for method chaining.
     */
    append(child: HTMLElement): this {
        this.e.appendChild(child);
        return this;
    }

    /**
     * Sets the text content of the element.
     * @param text - The text content to set.
     * @returns The current instance of the class for method chaining.
     */
    setText(text: string): this {
        this.e.textContent = text;
        return this;
    }

    /**
     * Gets the text content of the element.
     * @returns The text content of the element.
     */
    getText(): string {
        return this.e.textContent || "";
    }

    /**
     * Sets the inner HTML of the element.
     * @param html - The HTML string to set as the content.
     * @returns The current instance of the class for method chaining.
     */
    setHTML(html: string): this {
        this.e.innerHTML = html;
        return this;
    }

    /**
     * Gets the inner HTML of the element.
     * @returns The HTML content of the element.
     */
    getHTML(): string {
        return this.e.innerHTML;
    }

    /**
     * Appends a new element as a child to the current element.
     * @param tag - The tag name of the element to create and append.
     * @returns The current instance of the class for method chaining.
     */
    appendElement(tag: string): this {
        const newElement = document.createElement(tag);
        this.e.appendChild(newElement);
        return this;
    }

    /**
     * Inserts a new element before a reference child in the current element.
     * @param newNode - The new element to insert.
     * @param referenceNode - The reference child element before which the newNode will be inserted.
     * @returns The current instance of the class for method chaining.
     */
    insertBefore(newNode: HTMLElement, referenceNode: HTMLElement): this {
        this.e.insertBefore(newNode, referenceNode);
        return this;
    }

    /**
     * Removes a specified child element from the current element.
     * @param child - The child element to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeChild(child: HTMLElement): this {
        this.e.removeChild(child);
        return this;
    }

    /**
     * Replaces an existing child element with a new element.
     * @param newChild - The new element to insert.
     * @param oldChild - The existing child element to replace.
     * @returns The current instance of the class for method chaining.
     */
    replaceChild(newChild: HTMLElement, oldChild: HTMLElement): this {
        this.e.replaceChild(newChild, oldChild);
        return this;
    }

    /**
     * Clones the current element.
     * @param deep - If true, clones the element and all its children. Defaults to true.
     * @returns A clone of the current element.
     */
    clone(deep: boolean = true): HTMLElement {
        return this.e.cloneNode(deep) as HTMLElement;
    }

    /**
     * Gets the parent element of the current element.
     * @returns The parent element, or null if none exists.
     */
    parent(): HTMLElement | null {
        return this.e.parentElement;
    }

    /**
     * Sets an attribute on the element.
     * @param name - The attribute name.
     * @param value - The attribute value.
     * @returns The current instance of the class for method chaining.
     */
    setAttr(name: string, value: string): this {
        this.e.setAttribute(name, value);
        return this;
    }

    /**
     * Gets the value of an attribute on the element.
     * @param name - The attribute name.
     * @returns The value of the attribute, or null if it does not exist.
     */
    getAttr(name: string): string | null {
        return this.e.getAttribute(name);
    }

    /**
     * Adds a CSS class to the element.
     * @param className - The class name to add.
     * @returns The current instance of the class for method chaining.
     */
    addClass(className: string): this {
        this.e.classList.add(className);
        return this;
    }

    /**
     * Removes a CSS class from the element.
     * @param className - The class name to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeClass(className: string): this {
        this.e.classList.remove(className);
        return this;
    }

    /**
     * Toggles a CSS class on the element.
     * @param className - The class name to toggle.
     * @returns The current instance of the class for method chaining.
     */
    toggleClass(className: string): this {
        this.e.classList.toggle(className);
        return this;
    }

    /**
     * Checks if the element contains a specific CSS class.
     * @param className - The class name to check.
     * @returns True if the element contains the class, otherwise false.
     */
    hasClass(className: string): boolean {
        return this.e.classList.contains(className);
    }

    /**
     * Gets the next sibling element.
     * @returns The next sibling element, or null if none exists.
     */
    next(): HTMLElement | null {
        return this.e.nextElementSibling as HTMLElement;
    }

    /**
     * Gets the previous sibling element.
     * @returns The previous sibling element, or null if none exists.
     */
    previous(): HTMLElement | null {
        return this.e.previousElementSibling as HTMLElement;
    }

    /**
     * Sets a CSS property on the element.
     * @param property - The CSS property name.
     * @param value - The value to set for the property.
     * @returns The current instance of the class for method chaining.
     */
    setStyle(property: string, value: string): this {
        this.e.style.setProperty(property, value, "important");
        return this;
    }

    /**
     * Gets the value of a CSS property from the element.
     * @param property - The CSS property name.
     * @returns The value of the CSS property.
     */
    getStyle(property: string): string {
        return getComputedStyle(this.e).getPropertyValue(property);
    }

    /**
     * Empties the element of all its children.
     * @returns The current instance of the class for method chaining.
     */
    empty(): this {
        while (this.e.firstChild) {
            this.e.removeChild(this.e.firstChild);
        }
        return this;
    }

    /**
     * Gets all child elements of the current element.
     * @returns An array of child elements.
     */
    children(): HTMLElement[] {
        return Array.from(this.e.children) as HTMLElement[];
    }

    /**
     * Finds the first descendant that matches the given selector.
     * @param selector - The CSS selector to match.
     * @returns The first matching descendant, or null if none found.
     */
    find(selector: string): HTMLElement | null {
        return this.e.querySelector(selector);
    }

    /**
     * Finds all descendants that match the given selector.
     * @param selector - The CSS selector to match.
     * @returns An array of matching descendant elements.
     */
    findAll(selector: string): HTMLElement[] {
        return Array.from(this.e.querySelectorAll(selector));
    }

    /**
     * Sets multiple attributes on the element.
     * @param attributes - An object with key-value pairs representing attributes and their values.
     * @returns The current instance of the class for method chaining.
     */
    setAttrs(attributes: Record<string, string>): this {
        for (const [key, value] of Object.entries(attributes)) {
            this.e.setAttribute(key, value);
        }
        return this;
    }

    /**
     * Removes a specific attribute from the element.
     * @param name - The name of the attribute to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeAttr(name: string): this {
        this.e.removeAttribute(name);
        return this;
    }

    /**
     * Checks if the element has a specific attribute.
     * @param name - The name of the attribute to check.
     * @returns True if the attribute exists, otherwise false.
     */
    hasAttr(name: string): boolean {
        return this.e.hasAttribute(name);
    }

    /**
     * Hides the element by setting its display style to 'none'.
     * @returns The current instance of the class for method chaining.
     */
    hide(): this {
        this.e.style.display = 'none';
        return this;
    }

    /**
     * Shows the element by removing the 'display: none' style.
     * @param displayValue - Optional display style to apply (default: 'block').
     * @returns The current instance of the class for method chaining.
     */
    show(displayValue: string = 'block'): this {
        this.e.style.display = displayValue;
        return this;
    }

    /**
     * Toggles the visibility of the element based on its current display style.
     * @param displayValue - Optional display style to apply when showing (default: 'block').
     * @returns The current instance of the class for method chaining.
     */
    toggle(displayValue: string = 'block'): this {
        this.e.style.display = this.e.style.display === 'none' ? displayValue : 'none';
        return this;
    }

    /**
     * Gets the current value of an input, textarea, or select element.
     * @returns The value of the element, or an empty string if not applicable.
     */
    getValue(): string {
        if (this.e instanceof HTMLInputElement || this.e instanceof HTMLTextAreaElement || this.e instanceof HTMLSelectElement) {
            return this.e.value;
        }
        return '';
    }

    /**
     * Sets the value of an input, textarea, or select element.
     * @param value - The value to set on the element.
     * @returns The current instance of the class for method chaining.
     */
    setValue(value: string): this {
        if (this.e instanceof HTMLInputElement || this.e instanceof HTMLTextAreaElement || this.e instanceof HTMLSelectElement) {
            this.e.value = value;
        }
        return this;
    }

    /**
     * Gets the element's current dimensions.
     * @returns An object containing the element's width and height.
     */
    getDimensions(): { width: number; height: number } {
        const rect = this.e.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }

    /**
     * Scrolls the element into view.
     * @param options - Optional configuration for scrolling behavior.
     * @returns The current instance of the class for method chaining.
     */
    scrollTo(options?: ScrollIntoViewOptions): this {
        this.e.scrollIntoView(options);
        return this;
    }

    /**
     * Triggers a custom event on the element.
     * @param eventName - The name of the custom event.
     * @param detail - Optional data to include with the event.
     * @returns The current instance of the class for method chaining.
     */
    triggerEvent(eventName: string, detail?: any): this {
        const event = new CustomEvent(eventName, { detail });
        this.e.dispatchEvent(event);
        return this;
    }

    /**
     * Checks if the element is currently visible in the viewport.
     * @returns True if the element is visible, otherwise false.
     */
    isVisible(): boolean {
        const rect = this.e.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Adds multiple CSS classes to the element.
     * @param classes - An array of CSS class names to add.
     * @returns The current instance of the class for method chaining.
     */
    addClasses(classes: string[]): this {
        this.e.classList.add(...classes);
        return this;
    }

    /**
     * Removes multiple CSS classes from the element.
     * @param classes - An array of CSS class names to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeClasses(classes: string[]): this {
        this.e.classList.remove(...classes);
        return this;
    }
}

export const $ = Dom;