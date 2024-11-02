declare module "otechdo" {
    class Otechdo {
        constructor(element: HTMLElement);
        addClass(className: string): void;
        removeClass(className: string): void;
        setStyle(property: string, value: string): void;
        on(event: string, handler: (event: Event) => void): void;
    }
}
