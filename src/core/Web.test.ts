// web.test.ts
import { Web, $ } from './Web'

describe('Web Class', () => {
    // Set up a mock DOM element before each test
    beforeEach(() => {
        document.body.innerHTML = `<div id="test-element">Hello, World!</div>`
    })

    test('should select the element by ID and return its innerHTML', () => {
        const element = new Web('test-element')
        expect(element.val()).toBe('Hello, World!')
    })

    test('should return undefined if the element does not exist', () => {
        const element = new Web('non-existent')
        expect(element.val()).toBe(undefined)
    })
})

describe('$ function', () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="test-element">Hello, World!</div>`
    })

    test('should create a Web instance and return innerHTML', () => {
        const element = $('test-element')
        expect(element.val()).toBe('Hello, World!')
    })

    test('should return undefined if the element does not exist', () => {
        const element = $('non-existent')
        expect(element.val()).toBe(undefined)
    })
})
