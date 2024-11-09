declare module 'rustafari' {
    export class Web {
        constructor(selector: string)

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
        on_double_click(callback: EventListener): Web
        on_scroll_bottom(callback: EventListener): Web
        on_escape_key(callback: EventListener): Web
        on_enter_key(callback: EventListener): Web
        on_tab_key(callback: EventListener): Web
        on_long_press(callback: EventListener, duration?: number): Web
        on_rapid_click(
            callback: EventListener,
            threshold?: number,
            interval?: number,
        ): Web
        on_fast_scroll(callback: EventListener, speedThreshold?: number): Web
        on_hover_duration(callback: EventListener, duration?: number): Web
        on_idle(callback: EventListener, idleDuration?: number): Web
        ready(callback: EventListener): Web
    }

    export const $: (id: string) => Web
}
