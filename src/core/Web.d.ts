declare module 'rustafari' {
    export class Web {
        constructor(id: string);
        val(): string | undefined;
        on(e:string,callback:EventListener): Web;
    }
    export const $: (id: string) => Web
}
