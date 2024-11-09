declare module 'rustafari' {
    export class Web {
        constructor(id: string)
        val(): string | undefined
    }
    export const $: (id: string) => Web
}
