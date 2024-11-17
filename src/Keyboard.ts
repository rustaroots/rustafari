import {Dom} from './Dom'

/**
 * Provides an interface for handling keyboard events on a specified DOM element.
 */
export class Keyboard extends Dom {


    /**
     * Represents the 'Enter' key.
     */
    public ENTER = 'Enter'
    /**
     * Represents the 'Escape' key.
     */
    public ESCAPE = 'Escape'

    /**
     * Represents the 'Space' key.
     */
    public SPACE = ' '
    /**
     * Represents the 'ArrowUp' key.
     */
    public ARROW_UP = 'ArrowUp'

    /**
     * Represents the 'ArrowDown' key.
     */
    public ARROW_DOWN = 'ArrowDown'
    /**
     * Represents the 'ArrowLeft' key.
     */
    public ARROW_LEFT = 'ArrowLeft'

    /**
     * Represents the 'ArrowRight' key.
     */
    public ARROW_RIGHT = 'ArrowRight'
    /**
     * Represents the 'Backspace' key.
     */
    public BACKSPACE = 'Backspace'

    /**
     * Represents the 'Tab' key.
     */
    public TAB = 'Tab'
    /**
     * Represents the 'Shift' key.
     */
    public SHIFT = 'Shift'

    /**
     * Represents the 'Control' key.
     */
    public CONTROL = 'Control'
    /**
     * Represents the 'Alt' key.
     */
    public ALT = 'Alt'

    /**
     * Represents the 'Meta' key (e.g., Command key on Mac).
     */
    public META = 'Meta'
    /**
     * Represents the 'CapsLock' key.
     */
    public CAPS_LOCK = 'CapsLock'

    /**
     * Represents the 'Delete' key.
     */
    public DELETE = 'Delete'
    /**
     * Represents the 'End' key.
     */
    public END = 'End'

    /**
     * Represents the 'Home' key.
     */
    public HOME = 'Home'
    /**
     * Represents the 'PageUp' key.
     */
    public PAGE_UP = 'PageUp'

    /**
     * Represents the 'PageDown' key.
     */
    public PAGE_DOWN = 'PageDown'
    /**
     * Represents the 'Insert' key.
     */
    public INSERT = 'Insert'

    /**
     * Represents the 'NumLock' key.
     */
    public NUM_LOCK = 'NumLock'
    /**
     * Represents the 'ScrollLock' key.
     */
    public SCROLL_LOCK = 'ScrollLock'

    /**
     * Represents the 'Pause' key.
     */
    public PAUSE = 'Pause'
    /**
     * Represents the 'PrintScreen' key.
     */
    public PRINT_SCREEN = 'PrintScreen'

    /**
     * Represents the 'ContextMenu' key.
     */
    public CONTEXT_MENU = 'ContextMenu'
    /**
     * Represents the 'Application' key.
     */
    public APPLICATION = 'Application'

    /**
     * Represents the 'Clear' key.
     */
    public CLEAR = 'Clear'
    /**
     * Represents the 'Help' key.
     */
    public HELP = 'Help'

    /**
     * Represents the 'Select' key.
     */
    public SELECT = 'Select'
    /**
     * Represents the 'Execute' key.
     */
    public EXECUTE = 'Execute'

    /**
     * Represents the 'Sleep' key.
     */
    public SLEEP = 'Sleep'


    /**
     * Represents the 'F1' key.
     */
    public F1 = 'F1'
    /**
     * Represents the 'F2' key.
     */
    public F2 = 'F2'

    /**
     * Represents the 'F3' key.
     */
    public F3 = 'F3'
    /**
     * Represents the 'F4' key.
     */
    public F4 = 'F4'

    /**
     * Represents the 'F5' key.
     */
    public F5 = 'F5'
    /**
     * Represents the 'F6' key.
     */
    public F6 = 'F6'

    /**
     * Represents the 'F7' key.
     */
    public F7 = 'F7'
    /**
     * Represents the 'F8' key.
     */
    public F8 = 'F8'

    /**
     * Represents the 'F9' key.
     */
    public F9 = 'F9'
    /**
     * Represents the 'F10' key.
     */
    public F10 = 'F10'

    /**
     * Represents the 'F11' key.
     */
    public F11 = 'F11'
    /**
     * Represents the 'F12' key.
     */
    public F12 = 'F12'

    /**
     * Represents the 'F13' key.
     */
    public F13 = 'F13'
    /**
     * Represents the 'F14' key.
     */
    public F14 = 'F14'

    /**
     * Represents the 'F15' key.
     */
    public F15 = 'F15'
    /**
     * Represents the 'F16' key.
     */
    public F16 = 'F16'

    /**
     * Represents the 'F17' key.
     */
    public F17 = 'F17'
    /**
     * Represents the 'F18' key.
     */
    public F18 = 'F18'

    /**
     * Represents the 'F19' key.
     */
    public F19 = 'F19'
    /**
     * Represents the 'F20' key.
     */
    public F20 = 'F20'

    /**
     * Represents the 'F21' key.
     */
    public F21 = 'F21'
    /**
     * Represents the 'F22' key.
     */
    public F22 = 'F22'

    /**
     * Represents the 'F23' key.
     */
    public F23 = 'F23'
    /**
     * Represents the 'F24' key.
     */
    public F24 = 'F24'

    /**
     * Represents the 'a' key.
     */
    public A = 'a'
    /**
     * Represents the 'b' key.
     */
    public B = 'b'

    /**
     * Represents the 'c' key.
     */
    public C = 'c'
    /**
     * Represents the 'd' key.
     */
    public D = 'd'

    /**
     * Represents the 'e' key.
     */
    public E = 'e'
    /**
     * Represents the 'f' key.
     */
    public F = 'f'

    /**
     * Represents the 'g' key.
     */
    public G = 'g'
    /**
     * Represents the 'h' key.
     */
    public H = 'h'

    /**
     * Represents the 'i' key.
     */
    public I = 'i'
    /**
     * Represents the 'j' key.
     */
    public J = 'j'

    /**
     * Represents the 'k' key.
     */
    public K = 'k'
    /**
     * Represents the 'l' key.
     */
    public L = 'l'

    /**
     * Represents the 'm' key.
     */
    public M = 'm'
    /**
     * Represents the 'n' key.
     */
    public N = 'n'

    /**
     * Represents the 'o' key.
     */
    public O = 'o'
    /**
     * Represents the 'p' key.
     */
    public P = 'p'

    /**
     * Represents the 'q' key.
     */
    public Q = 'q'
    /**
     * Represents the 'r' key.
     */
    public R = 'r'

    /**
     * Represents the 's' key.
     */
    public S = 's'
    /**
     * Represents the 't' key.
     */
    public T = 't'

    /**
     * Represents the 'u' key.
     */
    public U = 'u'
    /**
     * Represents the 'v' key.
     */
    public V = 'v'

    /**
     * Represents the 'w' key.
     */
    public W = 'w'
    /**
     * Represents the 'x' key.
     */
    public X = 'x'

    /**
     * Represents the 'y' key.
     */
    public Y = 'y'
    /**
     * Represents the 'z' key.
     */
    public Z = 'z'

    /**
     * Represents the '0' key.
     */
    public ZERO = '0'
    /**
     * Represents the '1' key.
     */
    public ONE = '1'

    /**
     * Represents the '2' key.
     */
    public TWO = '2'
    /**
     * Represents the '3' key.
     */
    public THREE = '3'
    public FOUR = '4'
    public FIVE = '5'
    public SIX = '6'
    public SEVEN = '7'
    public EIGHT = '8'
    public NINE = '9'

    public SEMICOLON = ';'
    public EQUAL = '='
    public COMMA = ','
    public MINUS = '-'
    public PERIOD = '.'
    public SLASH = '/'
    public BACKQUOTE = '`'
    public BRACKET_LEFT = '['
    public BACKSLASH = '\\'
    public BRACKET_RIGHT = ']'
    public QUOTE = '\''

    
    constructor(selector: string) {
        super(selector)
    }

    /**
     * Attaches a keydown event listener to the element.
     * @param key - The key to listen for (e.g., 'Enter', 'ArrowUp').
     * @param callback - The callback function to execute when the key is pressed.
     * @returns The current instance of the class for method chaining.
     */
    onKeyDown(key: string, callback: EventListener): this {
        this.e.addEventListener('keydown', (event) => {
            if ((event as KeyboardEvent).key === key) {
                callback(event)
            }
        })
        return this
    }

    /**
     * Attaches a keyup event listener to the element.
     * @param key - The key to listen for (e.g., 'Enter', 'ArrowUp').
     * @param callback - The callback function to execute when the key is released.
     * @returns The current instance of the class for method chaining.
     */
    onKeyUp(key: string, callback: EventListener): this {
        this.e.addEventListener('keyup', (event) => {
            if ((event as KeyboardEvent).key === key) {
                callback(event)
            }
        })
        return this
    }

    /**
     * Attaches a keypress event listener to the element.
     * @param key - The key to listen for (deprecated, prefer `onKeyDown` or `onKeyUp`).
     * @param callback - The callback function to execute when the key is pressed.
     * @returns The current instance of the class for method chaining.
     */
    onKeyPress(key: string, callback: EventListener): this {
        this.e.addEventListener('keypress', (event) => {
            if ((event as KeyboardEvent).key === key) {
                callback(event)
            }
        })
        return this
    }

    /**
     * Attaches a listener for any keyboard event (keydown, keyup, keypress).
     * @param callback - The callback function to execute on any keyboard event.
     * @returns The current instance of the class for method chaining.
     */
    onAnyKey(callback: EventListener): this {
        this.e.addEventListener('keydown', callback)
        this.e.addEventListener('keyup', callback)
        return this
    }
}
