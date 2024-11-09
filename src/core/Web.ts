/**
 * Represent an element in the dom
 */
export class Web {
    private e: HTMLElement | null

    /**
     *
     * @param id The DOM element to select
     */
    constructor(id: string) {
        this.e = document.getElementById(id)
    }

    /**
     *
     * Method to get the innerHTML of the selected element
     *
     * If the element exists return its innerHTML as a string or undefined on none
     *
     */
    val(): string | undefined {
        return this.e?.innerHTML.toString()
    }

    /**
     *
     * Add an event listener
     *
     * @param e The event
     * @param callback The callback to execute
     */
    on(e:string,callback:EventListener):Web {
        this.e?.addEventListener(e, callback);
        return this;
    }
}

/**
 *
 * @param id The DOM element to select
 *
 */
export const $ = (id: string): Web => {
    return new Web(id)
}
