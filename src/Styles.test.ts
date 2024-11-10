import { Styles } from './Styles';

describe('Styles Class', () => {
    let element: HTMLElement;
    let styles: Styles;

    beforeEach(() => {
        // Set up a mock DOM element
        element = document.createElement('div');
        element.setAttribute("id", "test-element");
        document.body.appendChild(element);

        // Initialize Styles instance
        styles = new Styles('#test-element');
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    test('should apply inline CSS styles with css()', () => {
        styles.css("color: red; font-size: 20px;");
        expect(element.style.color).toBe("red");
        expect(element.style.fontSize).toBe("20px");
    });

    test('should display the element with show()', () => {
        styles.show();
        expect(element.style.display).toBe("block");
    });

    test('should hide the element with hide()', () => {
        styles.hide();
        expect(element.style.display).toBe("none");
    });

    test('should center the element with center()', () => {
        styles.center();
        expect(element.style.display).toBe("flex");
        expect(element.style.justifyContent).toBe("center");
        expect(element.style.alignItems).toBe("center");
    });

    test('should configure flex container with flex()', () => {
        styles.flex("column", "center", "center");
        expect(element.style.display).toBe("flex");
        expect(element.style.flexDirection).toBe("column");
        expect(element.style.justifyContent).toBe("center");
        expect(element.style.alignItems).toBe("center");
    });

    test('should configure grid container with grid()', () => {
        styles.grid("1fr 1fr", "auto auto", "10px");
        expect(element.style.display).toBe("grid");
        expect(element.style.gridTemplateColumns).toBe("1fr 1fr");
        expect(element.style.gridTemplateRows).toBe("auto auto");
        expect(element.style.gap).toBe("10px");
    });

    test('should add a border to the element with border()', () => {
        styles.border("2px", "solid", "blue");
        expect(element.style.border).toBe("2px solid blue");
    });

    test('should set margin around the element with margin()', () => {
        styles.margin("15px");
        expect(element.style.margin).toBe("15px");
    });

    test('should set padding inside the element with padding()', () => {
        styles.padding("20px");
        expect(element.style.padding).toBe("20px");
    });

    test('should set background color of the element with background()', () => {
        styles.background("lightblue");
        expect(element.style.backgroundColor).toBe("lightblue");
    });
});
