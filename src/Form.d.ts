import { Dom } from './Dom'

export class Forms extends DOMElement {
    constructor(selector: string) {
        super(selector)
        if (!(this.e instanceof HTMLFormElement)) {
            throw new Error('The selected element is not a form.')
        }
    }

    /**
     * Gets the value of a form field by name.
     *
     * @param name - The name attribute of the form field.
     * @returns The value of the field, or null if not found.
     */
    getValue(name: string): string | null {
        const field = (this.e as HTMLFormElement).elements.namedItem(name)
        return field ? (field as HTMLInputElement).value : null
    }

    /**
     * Sets the value of a form field by name.
     *
     * @param name - The name attribute of the form field.
     * @param value - The value to set.
     * @returns The `Forms` instance for chaining.
     */
    setValue(name: string, value: string): this {
        const field = (this.e as HTMLFormElement).elements.namedItem(name)
        if (field) {
            ;(field as HTMLInputElement).value = value
        }
        return this
    }

    /**
     * Retrieves all form data as an object.
     *
     * @returns An object with form field names as keys and field values as values.
     */
    getFormData(): Record<string, string> {
        const data: Record<string, string> = {}
        const elements = (this.e as HTMLFormElement).elements
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as
                | HTMLInputElement
                | HTMLSelectElement
                | HTMLTextAreaElement
            if (element.name) {
                data[element.name] = element.value
            }
        }
        return data
    }

    /**
     * Populates form fields with values from an object.
     *
     * @param data - An object with field names as keys and values as values.
     * @returns The `Forms` instance for chaining.
     */
    setFormData(data: Record<string, string>): this {
        Object.keys(data).forEach((name) => this.setValue(name, data[name]))
        return this
    }

    /**
     * Resets the form fields to their default values.
     *
     * @returns The `Forms` instance for chaining.
     */
    reset(): this {
        ;(this.e as HTMLFormElement).reset()
        return this
    }

    /**
     * Validates the form and returns whether it is valid.
     *
     * @returns `true` if the form is valid, otherwise `false`.
     */
    validate(): boolean {
        return (this.e as HTMLFormElement).checkValidity()
    }

    /**
     * Submits the form programmatically if valid.
     *
     * @param withValidation - Whether to validate before submitting.
     * @returns The `Forms` instance for chaining.
     */
    submit(withValidation = true): this {
        if (withValidation && !this.validate()) {
            console.warn('Form validation failed.')
            return this
        }
        ;(this.e as HTMLFormElement).submit()
        return this
    }

    /**
     * Adds a custom validation function to the form, preventing submission if it returns false.
     *
     * @param validateFn - Custom function returning `true` if the form is valid.
     * @returns The `Forms` instance for chaining.
     */
    customValidation(validateFn: () => boolean): this {
        this.e.addEventListener('submit', (event) => {
            if (!validateFn()) {
                event.preventDefault()
                console.warn('Custom validation failed.')
            }
        })
        return this
    }
}
