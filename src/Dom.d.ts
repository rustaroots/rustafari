export declare class Dom {
    protected e: HTMLElement
    constructor(selector: string)
    on(event: string, callback: EventListener): this
    click(): void
    getAttr(key: string): string | null
    setAttr(key: string, value: string): this
    remove(): void
}
