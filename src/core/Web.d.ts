declare module 'rustafari' {
    export class Web {
        constructor(id: string)
        click(): void
        get(key: string): string | null
        visible(): boolean
        hidden(): boolean
        html(): string
        text(): string
        on(event: string, callback: EventListener): Web
        css(styles: string): Web
        hide(): Web
        attr(key: string, value: any): Web
        width(width: string): Web
        height(height: string): Web
        set(content: string): Web
        remove(): void
        append(html: string): Web
        prepend(html: string): Web
        show(): Web
    }
    export const $: (id: string) => Web
}
