import { Web } from './Web'

describe('Web class', () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="test-element">Hello World</div>`
    })

    test('constructor throws an error if the element is not found', () => {
        expect(() => new Web('nonexistent-id')).toThrow('Element not found.')
    })

    test('html() returns the HTML content of the element', () => {
        const element = new Web('test-element')
        expect(element.html()).toBe('Hello World')
    })

    test('val() returns the text content of the element', () => {
        const element = new Web('test-element')

        expect(element.text()).toBe('Hello World')
    })

    test('on() adds an event listener to the element', () => {
        const element = new Web('test-element')
        const callback = jest.fn()
        element.on('click', callback)
        element.click()
        expect(callback).toHaveBeenCalled()
    })

    test('css() applies inline styles to the element', () => {
        const element = new Web('test-element')
        element.css('color: red;')
        expect(element.get('style')).toBe('color: red;')
    })

    test('hide() sets display to none', () => {
        const element = new Web('test-element')
        element.hide()
        expect(element.hidden()).toBe(true)
    })

    test('attr() sets an attribute on the element', () => {
        const element = new Web('test-element')
        element.attr('data-test', '123')
        expect(element.get('data-test')).toBe('123')
    })

    test('width() and height() set the width and height attributes', () => {
        const element = new Web('test-element')
        element.width('100px').height('200px')
        expect(element.get('width')).toBe('100px')
        expect(element.get('height')).toBe('200px')
    })

    test('set() changes the HTML content of the element', () => {
        const element = new Web('test-element')
        element.set('<p>New Content</p>')
        expect(element.html()).toBe('<p>New Content</p>')
    })

    test('remove() removes the element from the DOM', () => {
        const element = new Web('test-element')
        element.remove()
        expect(document.getElementById('test-element')).toBeNull()
    })

    test('append() adds HTML content to the end of the element', () => {
        const element = new Web('test-element')
        element.append('<span>Appended</span>')
        expect(element.html()).toBe('Hello World<span>Appended</span>')
    })

    test('prepend() adds HTML content to the beginning of the element', () => {
        const element = new Web('test-element')
        element.prepend('<span>Prepended</span>')
        expect(element.html()).toBe('<span>Prepended</span>Hello World')
    })

    test('show() sets display to block', () => {
        const element = new Web('test-element')
        element.show()
        expect(element.visible()).toBe(true)
    })
})
