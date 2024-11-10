import { Scrollable } from './Scrollable';

describe('Scrollable Class Tests', () => {
    let scrollable: Scrollable;
    let element: HTMLElement;

    beforeEach(() => {
        // Set up a mock DOM element with sufficient height and width for scrolling
        element = document.createElement('div');
        element.style.height = '2000px';
        element.style.width = '2000px';
        element.style.overflow = 'auto';
        element.setAttribute("id", "content");

        document.body.appendChild(element);

        // Mock scroll properties
        Object.defineProperty(element, 'clientHeight', { value: 500, writable: true });
        Object.defineProperty(element, 'scrollHeight', { value: 2000, writable: true });
        Object.defineProperty(element, 'clientWidth', { value: 500, writable: true });
        Object.defineProperty(element, 'scrollWidth', { value: 2000, writable: true });

        // Initialize Scrollable instance
        scrollable = new Scrollable('#content');
    });

    afterEach(() => {
        document.body.removeChild(element);
        jest.clearAllMocks();
    });

    test('should scroll to a specific position', () => {
        scrollable.scroll(500, 0);
        expect(scrollable.getCurrentPosition()).toEqual({ top: 500, left: 0});
        scrollable.scroll(250, 250);
        expect(scrollable.getCurrentPosition()).toEqual({ top: 250, left: 250});
    });

    test('should detect near bottom', () => {
        scrollable.scroll(1500, 0); // Scroll close to the bottom
        expect(scrollable.isNearBottom()).toBe(true);
    });

    test('should detect near top', () => {
        scrollable.scroll(500, 0); // Scroll close to the top
        expect(scrollable.isNearTop()).toBe(true);
    });

    test('should detect near right', () => {
        scrollable.scroll(0, 1900); // Scroll close to the right
        expect(scrollable.isNearRight()).toBe(true);
    });

    test('should detect near left', () => {
        scrollable.scroll(0, 50); // Scroll close to the left
        expect(scrollable.isNearLeft()).toBe(true);
    });

    test('should detect scrolling direction down', () => {
        scrollable.scroll(500, 0);
        expect(scrollable.getIsScrollingDown()).toBe(true);
    });

    test("should handle infinite scroll events correctly", () => {
        
        const onScrollUp = jest.fn();
        const onScrollDown =  jest.fn();
        const onNearTop  =  jest.fn();
        const onNearBottom =jest.fn();
        scrollable.infinite(onScrollUp,onScrollDown,onNearTop,onNearBottom);
        scrollable.scroll(1000);
        expect(onScrollDown).toBeCalled();
        scrollable.scroll(800);
        expect(onScrollUp).toBeCalled();
        scrollable.scroll(500);
        expect(onNearTop).toBeCalled();
        scrollable.scroll(1500);
        expect(onNearBottom).toBeCalled();

    });

    test('should detect scrolling direction up', () => {
        scrollable.scroll(500, 0); // Scroll down first
        expect(scrollable.getIsScrollingDown()).toBe(true);
        scrollable.scroll(0 , 0); // Scroll up
        expect(scrollable.getIsScrollingUp()).toBe(true);
    });

    test('should detect scrolling direction right', () => {
        scrollable.scroll(0, 500);
        expect(scrollable.getIsScrollingRight()).toBe(true);
        expect(scrollable.getIsScrollingLeft()).toBe(false);
    });

    test('should detect scrolling direction left', () => {
        scrollable.scroll(0, 500); // Scroll right first
        expect(scrollable.getIsScrollingLeft()).toBe(false);
        expect(scrollable.getIsScrollingRight()).toBe(true);
    });

    test('should trigger scroll event callback', () => {
        const onScrollCallback = jest.fn();
        scrollable.onScroll(onScrollCallback);

        element.scrollTop = 100;
        element.dispatchEvent(new Event('scroll'));

        expect(onScrollCallback).toHaveBeenCalled();
    });

    test('should trigger scroll end event callback', () => {
        const onScrollEndCallback = jest.fn();
        scrollable.onScrollEnd(onScrollEndCallback);

        // Simulate scroll end event (manual since "scrollend" is not natively supported in all browsers)
        element.dispatchEvent(new Event('scrollend'));

        expect(onScrollEndCallback).toHaveBeenCalled();
    });

    test('should return current position', () => {
        scrollable.scroll(300, 400);
        expect(scrollable.getCurrentPosition()).toEqual({ top: 300, left: 400 });
    });
});
