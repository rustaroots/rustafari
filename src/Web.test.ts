import { Web, $ } from './Web';

describe('Web Class and $ Function', () => {
    let element: HTMLElement;

    beforeEach(() => {
        // Set up a mock DOM element
        element = document.createElement('div');
        element.setAttribute('id', 'test-element');
        document.body.appendChild(element);
    });

    afterEach(() => {
        // Clean up the DOM
        document.body.removeChild(element);
    });

    test('should create an instance of Web using the class constructor', () => {
        const webInstance = new Web('#test-element');
        expect(webInstance).toBeInstanceOf(Web);
    });

    test('should create an instance of Web using the $ function', () => {
        const webInstance = $('#test-element');
        expect(webInstance).toBeInstanceOf(Web);
    });
});
