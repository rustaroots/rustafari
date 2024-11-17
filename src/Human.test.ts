import  Human  from './Human'

describe('Human Class - User Interaction Tests', () => {
    let human: Human
    let element: HTMLElement

    beforeEach(() => {
        // Create a mock DOM element
        element = document.createElement('div')
        element.setAttribute('id', 'test-element')
        document.body.appendChild(element)

        // Initialize Human instance with the mock element
        human = new Human('#test-element')
    })

    afterEach(() => {
        document.body.removeChild(element)
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    test('should detect slow typing', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onSlowTyping(callback, 1000)

        // Simulate typing with a delay
        element.dispatchEvent(new KeyboardEvent('keyup'))
        jest.advanceTimersByTime(1100) // Wait 1100ms
        element.dispatchEvent(new KeyboardEvent('keyup'))

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect prolonged hover', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onProlongedHover(callback, 2000)

        element.dispatchEvent(new MouseEvent('mouseover'))
        jest.advanceTimersByTime(2100) // Wait 2100ms
        expect(callback).toHaveBeenCalledWith(expect.any(Event))

        element.dispatchEvent(new MouseEvent('mouseout')) // Clear timeout
    })

    test('should detect user idle', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onIdle(callback, 5000)

        // Simulate user activity to reset idle timer
        document.dispatchEvent(new Event('mousemove'))
        jest.advanceTimersByTime(4000)
        document.dispatchEvent(new Event('keypress'))

        jest.advanceTimersByTime(5100) // Wait 5100ms to trigger idle callback
        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect rapid clicks', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onRapidClicks(callback, 3, 500)

        // Simulate rapid clicks within 500ms interval
        element.dispatchEvent(new MouseEvent('click'))
        element.dispatchEvent(new MouseEvent('click'))
        element.dispatchEvent(new MouseEvent('click'))

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect user return', () => {
        const callback = jest.fn()

        human.onUserReturn(callback)

        // Simulate user leaving and returning to the page
        document.dispatchEvent(new Event('visibilitychange'))
        Object.defineProperty(document, 'hidden', {
            value: false,
            writable: true,
        })
        document.dispatchEvent(new Event('visibilitychange'))

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect fast scrolling', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onFastScroll(callback, 1000)

        // Simulate fast scrolling
        Object.defineProperty(window, 'scrollY', { value: 100 })
        element.dispatchEvent(new Event('scroll'))

        jest.advanceTimersByTime(100) // Short delay to simulate fast scrolling
        Object.defineProperty(window, 'scrollY', { value: 1500 })
        element.dispatchEvent(new Event('scroll'))

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect repeated form submissions', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onRepeatedSubmissions(callback, 2, 1000)

        // Simulate repeated submissions within 1000ms interval
        element.dispatchEvent(new Event('submit'))
        element.dispatchEvent(new Event('submit'))

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect form field hesitation', () => {
        jest.useFakeTimers()
        const callback = jest.fn()

        human.onFormFieldHesitation(callback, 2000)

        // Simulate focus in and hesitation without input
        element.dispatchEvent(new Event('focusin'))
        jest.advanceTimersByTime(2100)

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect idle mouse looping', () => {
        const callback = jest.fn()

        human.onIdleMouseLoop(callback, 50, 5)

        // Simulate circular mouse movement within radius
        for (let i = 0; i < 5; i++) {
            element.dispatchEvent(
                new MouseEvent('mousemove', { clientX: 10, clientY: 10 }),
            )
            element.dispatchEvent(
                new MouseEvent('mousemove', { clientX: 20, clientY: 20 }),
            )
        }

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })

    test('should detect frequent returns to page', () => {
        const callback = jest.fn()

        human.onFrequentReturns(callback, 3)

        // Simulate frequent returns to the page
        for (let i = 0; i < 3; i++) {
            Object.defineProperty(document, 'hidden', {
                value: true,
                writable: true,
            })
            document.dispatchEvent(new Event('visibilitychange'))
            Object.defineProperty(document, 'hidden', {
                value: false,
                writable: true,
            })
            document.dispatchEvent(new Event('visibilitychange'))
        }

        expect(callback).toHaveBeenCalledWith(expect.any(Event))
    })
})