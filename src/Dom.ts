/**
 * A utility class for common DOM manipulations.
 */
export class Dom {
    protected e: HTMLElement

    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (element === null) {
            throw new DOMException('Element not found.')
        }
        this.e = element as HTMLElement
    }

    /**
     * Adds an event listener to the element.
     * @param event - The event type to listen for.
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The current instance of the class for method chaining.
     */
    on(event: string, callback: EventListener): this {
        this.e.addEventListener(event, callback)
        return this
    }

    /**
     * Programmatically triggers a click event on the element.
     * @returns The current instance of the class for method chaining.
     */
    click(): this {
        this.e.click()
        return this
    }

    /**
     * Removes the element from the DOM.
     * @returns The current instance of the class for method chaining.
     */
    remove(): this {
        this.e.parentNode?.removeChild(this.e)
        return this
    }

    /**
     * Appends a child element to the current element.
     * @param child - The child element to append.
     * @returns The current instance of the class for method chaining.
     */
    append(child: HTMLElement): this {
        this.e.appendChild(child)
        return this
    }

    /**
     * Sets the inner text of the element.
     * @param text - The text content to set on the element.
     * @returns The current instance of the class for method chaining.
     */
    setText(text: string): this {
        this.e.innerText = text
        return this
    }

    /**
     * Gets the inner text of the element.
     * @returns The text content of the element.
     */
    getText(): string {
        return this.e.innerText
    }

    /**
     * Sets the inner HTML of the element.
     * @param html - The HTML content to set on the element.
     * @returns The current instance of the class for method chaining.
     */
    setHTML(html: string): this {
        this.e.innerHTML = html
        return this
    }

    /**
     * Gets the inner HTML of the element.
     * @returns The HTML content of the element.
     */
    getHTML(): string {
        return this.e.innerHTML
    }

    /**
     * Creates a new child element and appends it to the current element.
     * @param tag - The tag name of the new element to create.
     * @returns The current instance of the class for method chaining.
     */
    appendElement(tag: string): this {
        const newElement = document.createElement(tag)
        this.e.appendChild(newElement)
        return this
    }

    /**
     * Inserts a new element before a reference element.
     * @param newNode - The new element to insert.
     * @param referenceNode - The reference element before which the newNode will be inserted.
     * @returns The current instance of the class for method chaining.
     */
    insertBefore(newNode: HTMLElement, referenceNode: HTMLElement): this {
        this.e.insertBefore(newNode, referenceNode)
        return this
    }

    /**
     * Removes a child element from the current element.
     * @param child - The child element to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeChild(child: HTMLElement): this {
        this.e.removeChild(child)
        return this
    }

    /**
     * Replaces a child element with a new element.
     * @param newChild - The new child element to insert.
     * @param oldChild - The old child element to replace.
     * @returns The current instance of the class for method chaining.
     */
    replaceChild(newChild: HTMLElement, oldChild: HTMLElement): this {
        this.e.replaceChild(newChild, oldChild)
        return this
    }

    /**
     * Clones the current element.
     * @param deep - If true, the children of the element will also be cloned.
     * @returns The cloned element.
     */
    clone(deep: boolean = true): HTMLElement {
        return this.e.cloneNode(deep) as HTMLElement
    }

    /**
     * Gets the parent element of the current element.
     * @returns The parent element, or null if there is no parent.
     */
    parent(): HTMLElement | null {
        return this.e.parentElement
    }

    /**
     * Sets an attribute on the element.
     * @param name - The name of the attribute.
     * @param value - The value of the attribute.
     * @returns The current instance of the class for method chaining.
     */
    setAttr(name: string, value: string): this {
        this.e.setAttribute(name, value)
        return this
    }

    /**
     * Gets the value of an attribute from the element.
     * @param name - The name of the attribute.
     * @returns The value of the attribute, or null if the attribute does not exist.
     */
    getAttr(name: string): string | null {
        return this.e.getAttribute(name)
    }

    /**
     * Adds a CSS class to the element.
     * @param className - The CSS class name to add.
     * @returns The current instance of the class for method chaining.
     */
    addClass(className: string): this {
        this.e.classList.add(className)
        return this
    }

    /**
     * Removes a CSS class from the element.
     * @param className - The CSS class name to remove.
     * @returns The current instance of the class for method chaining.
     */
    removeClass(className: string): this {
        this.e.classList.remove(className)
        return this
    }

    /**
     * Toggles a CSS class on the element.
     * @param className - The CSS class name to toggle.
     * @returns The current instance of the class for method chaining.
     */
    toggleClass(className: string): this {
        this.e.classList.toggle(className)
        return this
    }

    /**
     * Checks if the element has a specific CSS class.
     * @param className - The CSS class name to check for.
     * @returns True if the element has the specified class, false otherwise.
     */
    hasClass(className: string): boolean {
        return this.e.classList.contains(className)
    }

    /**
     * Gets the next sibling of the current element.
     * @returns The next sibling element, or null if there is no next sibling.
     */
    next(): HTMLElement | null {
        return this.e.nextElementSibling as HTMLElement
    }

    /**
     * Gets the previous sibling of the current element.
     * @returns The previous sibling element, or null if there is no previous sibling.
     */
    previous(): HTMLElement | null {
        return this.e.previousElementSibling as HTMLElement
    }

    /**
     * Sets a CSS property on the element.
     * @param property - The CSS property name.
     * @param value - The value to set for the CSS property.
     * @returns The current instance of the class for method chaining.
     */
    setStyle(property: string, value: string): this {
        (this.e.style as any)[property] = value
        return this
    }

    /**
     * Gets the value of a CSS property from the element.
     * @param property - The CSS property name.
     * @returns The value of the specified CSS property.
     */
    getStyle(property: string): string {
        return getComputedStyle(this.e).getPropertyValue(property)
    }

    /**
     * Empties the current element of all its children.
     * @returns The current instance of the class for method chaining.
     */
    empty(): this {
        while (this.e.firstChild) {
            this.e.removeChild(this.e.firstChild)
        }
        return this
    }

    /**
     * Gets a list of child elements of the current element.
     * @returns An array of the child elements.
     */
    children(): HTMLElement[] {
        return Array.from(this.e.children) as HTMLElement[]
    }

    /**
     * Finds the first descendant that matches the selector.
     * @param selector - The CSS selector to match against the descendants.
     * @returns The first matching descendant element, or null if no match is found.
     */
    find(selector: string): HTMLElement | null {
        return this.e.querySelector(selector)
    }

    /**
     * Finds all descendants that match the selector.
     * @param selector - The CSS selector to match against the descendants.
     * @returns An array of all matching descendant elements.
     */
    findAll(selector: string): HTMLElement[] {
        return Array.from(this.e.querySelectorAll(selector))
    }
}
