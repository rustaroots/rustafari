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

        infinite_scroll(callback: EventListener): Web
        debounce_scroll(callback: EventListener, delay?: number): Web
        throttle_scroll(callback: EventListener, limit?: number): Web
        on_click_outside(callback: EventListener): Web
        toggle(className: string): Web
        on_resize(callback: EventListener): Web

        on_click(callback: EventListener): Web
        on_input(callback: EventListener): Web
        on_mouseover(callback: EventListener): Web
        on_mouseout(callback: EventListener): Web
        on_keydown(callback: EventListener): Web
        on_keyup(callback: EventListener): Web
    }

    export const $: (id: string) => Web
}
