import { Dom } from './Dom'

export declare class Web extends Dom {
    /**
     * Creates an instance of Web, initializing the selected HTML element.
     *
     * @param selector - A CSS selector string used to target the HTML element.
     * @throws DOMException if the element is not found.
     */
    constructor(selector: string)
}

/**
 * Utility function to create a new Web instance.
 *
 * @param selector - A CSS selector string used to target the HTML element.
 * @returns A new instance of Web.
 * @example
 * ```typescript
 * const element = $("#myElement");
 * ```
 */
export declare const $: (selector: string) => Web
