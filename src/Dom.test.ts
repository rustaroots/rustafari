import { Dom } from './Dom'

describe('Dom Class', () => {
    let element: HTMLElement
    let domInstance: Dom

    beforeEach(() => {
        // Set up a mock DOM element
        element = document.createElement('div')
        element.setAttribute('id', 'test-element')
        document.body.appendChild(element)

        // Initialize Dom instance
        domInstance = new Dom('#test-element')
    })

    afterEach(() => {
        // Clean up the DOM
        if (document.body.contains(element)) {
            document.body.removeChild(element)
        }
    })

    test('should set and get inner text', () => {
        domInstance.setText('Hello, world!')
        expect(domInstance.getText()).toBe('Hello, world!')
    })

    test('should set and get inner HTML', () => {
        domInstance.setHTML('<strong>Bold text</strong>')
        expect(domInstance.getHTML()).toBe('<strong>Bold text</strong>')
    })

    test('should set and get an attribute', () => {
        domInstance.setAttr('data-id', '123')
        expect(domInstance.getAttr('data-id')).toBe('123')
    })

    test('should add a CSS class', () => {
        domInstance.addClass('highlight')
        expect(element.classList.contains('highlight')).toBe(true)
    })

    test('should remove a CSS class', () => {
        element.classList.add('highlight')
        domInstance.removeClass('highlight')
        expect(element.classList.contains('highlight')).toBe(false)
    })

    test('should toggle a CSS class', () => {
        domInstance.toggleClass('active')
        expect(element.classList.contains('active')).toBe(true)
        domInstance.toggleClass('active')
        expect(element.classList.contains('active')).toBe(false)
    })

    test('should check if element has a specific CSS class', () => {
        element.classList.add('highlight')
        expect(domInstance.hasClass('highlight')).toBe(true)
        expect(domInstance.hasClass('nonexistent')).toBe(false)
    })

    test('should trigger a click event', () => {
        const clickHandler = jest.fn()
        domInstance.on('click', clickHandler)
        domInstance.click()
        expect(clickHandler).toHaveBeenCalled()
    })

    test('should remove the element from the DOM', () => {
        // Confirm the element is in the DOM
        expect(document.body.contains(element)).toBe(true)

        // Remove the element using Dom instance
        domInstance.remove()

        // Confirm the element is no longer in the DOM
        expect(document.body.contains(element)).toBe(false)
    })
})
