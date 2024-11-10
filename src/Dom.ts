export class Dom {
    protected e: HTMLElement

    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (element === null) {
            throw new DOMException('Element not found.')
        }
        this.e = element as HTMLElement
    }

    on(event: string, callback: EventListener): this {
        this.e.addEventListener(event, callback)
        return this
    }

    click(): void {
        this.e.click()
    }

    remove(): void {
        document.body.removeChild(this.e)
    }

    /**
     * Sets the inner text of the element.
     */
    setText(text: string): this {
        this.e.innerText = text;
        return this;
    }

    /**
     * Gets the inner text of the element.
     */
    getText(): string {
        return this.e.innerText;
    }


    /**
     * Sets the inner HTML of the element.
     */
    setHTML(html: string): this {
        this.e.innerHTML = html;
        return this;
    }

    /**
     * Gets the inner HTML of the element.
     */
    getHTML(): string {
        return this.e.innerHTML;
    }

    /**
     * Sets an attribute on the element.
     */
    setAttr(name: string, value: string): this {
        this.e.setAttribute(name, value);
        return this;
    }

    /**
     * Gets the value of an attribute from the element.
     */
    getAttr(name: string): string | null {
        return this.e.getAttribute(name);
    }

    /**
     * Adds a CSS class to the element.
     */
    addClass(className: string): this {
        this.e.classList.add(className);
        return this;
    }

    /**
     * Removes a CSS class from the element.
     */
    removeClass(className: string): this {
        this.e.classList.remove(className);
        return this;
    }

    /**
     * Toggles a CSS class on the element.
     */
    toggleClass(className: string): this {
        this.e.classList.toggle(className);
        return this;
    }

    /**
     * Checks if the element has a specific CSS class.
     */
    hasClass(className: string): boolean {
        return this.e.classList.contains(className);
    }
}
