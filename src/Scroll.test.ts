import { Scroll } from './Scroll';

describe('Scroll Class', () => {
    let container: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="scroll-container" style="overflow: auto; width: 200px; height: 200px;">
                <div style="height: 1000px; width: 1000px;"></div>
            </div>
        `;
        container = document.querySelector('.scroll-container')!;
    });

    test('should initialize with a valid selector', () => {
        const scrollable = new Scroll('.scroll-container');
        expect(scrollable).toBeInstanceOf(Scroll);
    });

    test('should throw an error for an invalid selector', () => {
        expect(() => new Scroll('.invalid-container')).toThrow(
            'Element with selector ".invalid-container" not found.'
        );
    });

    test('should scroll to a specific position', () => {
        const scrollable = new Scroll('.scroll-container');
        scrollable.scroll(100, 50);

        expect(container.scrollTop).toBe(100);
        expect(container.scrollLeft).toBe(50);
    });

    test('should detect near top edge', () => {
        const scrollable = new Scroll('.scroll-container', 50);
        scrollable.scroll(30);

        expect(scrollable.isNearTop()).toBe(true);
    });

    test('should detect near bottom edge', () => {
        const scrollable = new Scroll('.scroll-container', 50);
        container.scrollTop = container.scrollHeight - container.clientHeight - 30;

        expect(scrollable.isNearBottom()).toBe(true);
    });

    test('should detect scrolling direction', () => {
        const scrollable = new Scroll('.scroll-container');
        container.scrollTop = 50;
        scrollable.scroll(100);

        expect(scrollable.isScrollingDown()).toBe(true);
        expect(scrollable.isScrollingUp()).toBe(false);

        scrollable.scroll(50);
        expect(scrollable.isScrollingUp()).toBe(true);
        expect(scrollable.isScrollingDown()).toBe(false);
    });

    test('should detect near left edge', () => {
        const scrollable = new Scroll('.scroll-container', 50);
        scrollable.scroll(0, 30);

        expect(scrollable.isNearLeft()).toBe(true);
    });

    test('should detect near right edge', () => {
        const scrollable = new Scroll('.scroll-container', 50);
        container.scrollLeft = container.scrollWidth - container.clientWidth - 30;

        expect(scrollable.isNearRight()).toBe(true);
    });

    test('should detect scrolling horizontally', () => {
        const scrollable = new Scroll('.scroll-container');
        container.scrollLeft = 50;
        scrollable.scroll(0, 100);

        expect(scrollable.isScrollingRight()).toBe(true);
        expect(scrollable.isScrollingLeft()).toBe(false);

        scrollable.scroll(0, 50);
        expect(scrollable.isScrollingLeft()).toBe(true);
        expect(scrollable.isScrollingRight()).toBe(false);
    });

    test('should trigger onScroll callback', () => {
        const scrollable = new Scroll('.scroll-container');
        const callback = jest.fn();

        scrollable.onScroll(callback);
        container.scrollTop = 100;
        container.dispatchEvent(new Event('scroll'));

        expect(callback).toHaveBeenCalled();
    });

    test('should trigger onScrollEnd callback after scrolling stops', (done) => {
        const scrollable = new Scroll('.scroll-container');
        const callback = jest.fn();

        scrollable.onScrollEnd(callback, 100);

        container.scrollTop = 100;
        container.dispatchEvent(new Event('scroll'));

        setTimeout(() => {
            expect(callback).toHaveBeenCalled();
            done();
        }, 150);
    });

    test('should provide current scroll position', () => {
        const scrollable = new Scroll('.scroll-container');
        scrollable.scroll(120, 80);

        const position = scrollable.getCurrentPosition();
        expect(position).toEqual({ top: 120, left: 80 });
    });
});
