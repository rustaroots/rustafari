export class Dom {
    protected e: HTMLElement

    constructor(selector: string) {
        const element = document.querySelector(selector)
        if (!element) {
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

    getAttr(key: string): string | null {
        return this.e.getAttribute(key)
    }

    setAttr(key: string, value: string): this {
        this.e.setAttribute(key, value)
        return this
    }

    remove(): void {
        this.e.remove()
    }
}
