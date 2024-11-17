import {Enlivenment}  from './Enlivenment'

describe('Enlivenment Class - Animation Tests', () => {
    let element: HTMLElement
    let enlivenment: Enlivenment

    beforeEach(() => {
        // Set up a mock DOM element
        element = document.createElement('div')
        element.style.opacity = '1'
        element.setAttribute('id', 'test-element')
        document.body.appendChild(element)

        // Initialize Enlivenment instance
        enlivenment = new Enlivenment('#test-element')
    })

    afterEach(() => {
        document.body.removeChild(element)
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    test('should animate a CSS property', () => {
        const callback = jest.fn()

        enlivenment.animate('opacity', '0', 500, 'ease-in-out', callback)

        // Check if the property was set directly
        expect(element.style.transition).toBe('opacity 500ms ease-in-out')
        expect((element.style as any).opacity).toBe('0')

        // Manually trigger transition end
        element.dispatchEvent(new Event('transitionend'))

        expect(callback).toHaveBeenCalled()
    })

    test('should slide in from the left', () => {
        const callback = jest.fn()

        enlivenment.slideIn('left', '100px', 500, callback)

        // Check initial state right after calling slideIn
        expect(element.style.transform).toBe('translateX(-100px)')
        expect(element.style.opacity).toBe('0')

        // Simulate requestAnimationFrame to trigger final state
        requestAnimationFrame(() => {
            expect(element.style.transform).toBe('translate(0, 0)')
            expect(element.style.opacity).toBe('1')
        })

        // Manually trigger transition end to invoke callback
        element.dispatchEvent(new Event('transitionend'))

        expect(callback).toHaveBeenCalled()
    })

    test('should fade in the element', () => {
        const callback = jest.fn()

        enlivenment.fadeIn(500, callback)

        // Check if opacity and display were set
        expect(element.style.opacity).toBe('1')
        expect(element.style.transition).toContain('opacity 500ms ease')

        // Manually trigger transition end
        element.dispatchEvent(new Event('transitionend'))

        expect(callback).toHaveBeenCalled()
    })

    test('should fade out the element', () => {
        const callback = jest.fn()

        enlivenment.fadeOut(500, callback)

        // Check if opacity was set to 0
        expect(element.style.opacity).toBe('0')

        // Manually trigger transition end
        element.dispatchEvent(new Event('transitionend'))

        // Check if display was set to 'none' after transition
        expect(element.style.display).toBe('none')
        expect(callback).toHaveBeenCalled()
    })

    test('should rotate the element', () => {
        const callback = jest.fn()

        enlivenment.rotate('180deg', 500, callback)

        // Check if the rotation transform was applied
        expect(element.style.transform).toBe('rotate(180deg)')
        expect(element.style.transition).toContain('transform 500ms ease')

        // Manually trigger transition end
        element.dispatchEvent(new Event('transitionend'))

        expect(callback).toHaveBeenCalled()
    })

    test('should scale the element', () => {
        const callback = jest.fn()

        enlivenment.scale('1.5', 500, callback)

        // Check if the scaling transform was applied
        expect(element.style.transform).toBe('scale(1.5)')
        expect(element.style.transition).toContain('transform 500ms ease')

        // Manually trigger transition end
        element.dispatchEvent(new Event('transitionend'))

        expect(callback).toHaveBeenCalled()
    })
})