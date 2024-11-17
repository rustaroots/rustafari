import Dom from './Dom'

/**
 * Provides an interface for handling keyboard events on a specified DOM element.
 */
export default class Keyboard extends Dom {
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

/**
 * Represents the 'Enter' key.
 */
export const KEYBOARD_ENTER = 'Enter'
/**
 * Represents the 'Escape' key.
 */
export const KEYBOARD_ESCAPE = 'Escape'

/**
 * Represents the 'Space' key.
 */
export const KEYBOARD_SPACE = ' '
/**
 * Represents the 'ArrowUp' key.
 */
export const KEYBOARD_ARROW_UP = 'ArrowUp'

/**
 * Represents the 'ArrowDown' key.
 */
export const KEYBOARD_ARROW_DOWN = 'ArrowDown'
/**
 * Represents the 'ArrowLeft' key.
 */
export const KEYBOARD_ARROW_LEFT = 'ArrowLeft'

/**
 * Represents the 'ArrowRight' key.
 */
export const KEYBOARD_ARROW_RIGHT = 'ArrowRight'
/**
 * Represents the 'Backspace' key.
 */
export const KEYBOARD_BACKSPACE = 'Backspace'

/**
 * Represents the 'Tab' key.
 */
export const KEYBOARD_TAB = 'Tab'
/**
 * Represents the 'Shift' key.
 */
export const KEYBOARD_SHIFT = 'Shift'

/**
 * Represents the 'Control' key.
 */
export const KEYBOARD_CONTROL = 'Control'
/**
 * Represents the 'Alt' key.
 */
export const KEYBOARD_ALT = 'Alt'

/**
 * Represents the 'Meta' key (e.g., Command key on Mac).
 */
export const KEYBOARD_META = 'Meta'
/**
 * Represents the 'CapsLock' key.
 */
export const KEYBOARD_CAPS_LOCK = 'CapsLock'

/**
 * Represents the 'Delete' key.
 */
export const KEYBOARD_DELETE = 'Delete'
/**
 * Represents the 'End' key.
 */
export const KEYBOARD_END = 'End'

/**
 * Represents the 'Home' key.
 */
export const KEYBOARD_HOME = 'Home'
/**
 * Represents the 'PageUp' key.
 */
export const KEYBOARD_PAGE_UP = 'PageUp'

/**
 * Represents the 'PageDown' key.
 */
export const KEYBOARD_PAGE_DOWN = 'PageDown'
/**
 * Represents the 'Insert' key.
 */
export const KEYBOARD_INSERT = 'Insert'

/**
 * Represents the 'NumLock' key.
 */
export const KEYBOARD_NUM_LOCK = 'NumLock'
/**
 * Represents the 'ScrollLock' key.
 */
export const KEYBOARD_SCROLL_LOCK = 'ScrollLock'

/**
 * Represents the 'Pause' key.
 */
export const KEYBOARD_PAUSE = 'Pause'
/**
 * Represents the 'PrintScreen' key.
 */
export const KEYBOARD_PRINT_SCREEN = 'PrintScreen'

/**
 * Represents the 'ContextMenu' key.
 */
export const KEYBOARD_CONTEXT_MENU = 'ContextMenu'
/**
 * Represents the 'Application' key.
 */
export const KEYBOARD_APPLICATION = 'Application'

/**
 * Represents the 'Clear' key.
 */
export const KEYBOARD_CLEAR = 'Clear'
/**
 * Represents the 'Help' key.
 */
export const KEYBOARD_HELP = 'Help'

/**
 * Represents the 'Select' key.
 */
export const KEYBOARD_SELECT = 'Select'
/**
 * Represents the 'Execute' key.
 */
export const KEYBOARD_EXECUTE = 'Execute'

/**
 * Represents the 'Sleep' key.
 */
export const KEYBOARD_SLEEP = 'Sleep'


/**
 * Represents the 'F1' key.
 */
export const KEYBOARD_F1 = 'F1'
/**
 * Represents the 'F2' key.
 */
export const KEYBOARD_F2 = 'F2'

/**
 * Represents the 'F3' key.
 */
export const KEYBOARD_F3 = 'F3'
/**
 * Represents the 'F4' key.
 */
export const KEYBOARD_F4 = 'F4'

/**
 * Represents the 'F5' key.
 */
export const KEYBOARD_F5 = 'F5'
/**
 * Represents the 'F6' key.
 */
export const KEYBOARD_F6 = 'F6'

/**
 * Represents the 'F7' key.
 */
export const KEYBOARD_F7 = 'F7'
/**
 * Represents the 'F8' key.
 */
export const KEYBOARD_F8 = 'F8'

/**
 * Represents the 'F9' key.
 */
export const KEYBOARD_F9 = 'F9'
/**
 * Represents the 'F10' key.
 */
export const KEYBOARD_F10 = 'F10'

/**
 * Represents the 'F11' key.
 */
export const KEYBOARD_F11 = 'F11'
/**
 * Represents the 'F12' key.
 */
export const KEYBOARD_F12 = 'F12'

/**
 * Represents the 'F13' key.
 */
export const KEYBOARD_F13 = 'F13'
/**
 * Represents the 'F14' key.
 */
export const KEYBOARD_F14 = 'F14'

/**
 * Represents the 'F15' key.
 */
export const KEYBOARD_F15 = 'F15'
/**
 * Represents the 'F16' key.
 */
export const KEYBOARD_F16 = 'F16'

/**
 * Represents the 'F17' key.
 */
export const KEYBOARD_F17 = 'F17'
/**
 * Represents the 'F18' key.
 */
export const KEYBOARD_F18 = 'F18'

/**
 * Represents the 'F19' key.
 */
export const KEYBOARD_F19 = 'F19'
/**
 * Represents the 'F20' key.
 */
export const KEYBOARD_F20 = 'F20'

/**
 * Represents the 'F21' key.
 */
export const KEYBOARD_F21 = 'F21'
/**
 * Represents the 'F22' key.
 */
export const KEYBOARD_F22 = 'F22'

/**
 * Represents the 'F23' key.
 */
export const KEYBOARD_F23 = 'F23'
/**
 * Represents the 'F24' key.
 */
export const KEYBOARD_F24 = 'F24'

/**
 * Represents the 'a' key.
 */
export const KEYBOARD_A = 'a'
/**
 * Represents the 'b' key.
 */
export const KEYBOARD_B = 'b'

/**
 * Represents the 'c' key.
 */
export const KEYBOARD_C = 'c'
/**
 * Represents the 'd' key.
 */
export const KEYBOARD_D = 'd'

/**
 * Represents the 'e' key.
 */
export const KEYBOARD_E = 'e'
/**
 * Represents the 'f' key.
 */
export const KEYBOARD_F = 'f'

/**
 * Represents the 'g' key.
 */
export const KEYBOARD_G = 'g'
/**
 * Represents the 'h' key.
 */
export const KEYBOARD_H = 'h'

/**
 * Represents the 'i' key.
 */
export const KEYBOARD_I = 'i'
/**
 * Represents the 'j' key.
 */
export const KEYBOARD_J = 'j'

/**
 * Represents the 'k' key.
 */
export const KEYBOARD_K = 'k'
/**
 * Represents the 'l' key.
 */
export const KEYBOARD_L = 'l'

/**
 * Represents the 'm' key.
 */
export const KEYBOARD_M = 'm'
/**
 * Represents the 'n' key.
 */
export const KEYBOARD_N = 'n'

/**
 * Represents the 'o' key.
 */
export const KEYBOARD_O = 'o'
/**
 * Represents the 'p' key.
 */
export const KEYBOARD_P = 'p'

/**
 * Represents the 'q' key.
 */
export const KEYBOARD_Q = 'q'
/**
 * Represents the 'r' key.
 */
export const KEYBOARD_R = 'r'

/**
 * Represents the 's' key.
 */
export const KEYBOARD_S = 's'
/**
 * Represents the 't' key.
 */
export const KEYBOARD_T = 't'

/**
 * Represents the 'u' key.
 */
export const KEYBOARD_U = 'u'
/**
 * Represents the 'v' key.
 */
export const KEYBOARD_V = 'v'

/**
 * Represents the 'w' key.
 */
export const KEYBOARD_W = 'w'
/**
 * Represents the 'x' key.
 */
export const KEYBOARD_X = 'x'

/**
 * Represents the 'y' key.
 */
export const KEYBOARD_Y = 'y'
/**
 * Represents the 'z' key.
 */
export const KEYBOARD_Z = 'z'

/**
 * Represents the '0' key.
 */
export const KEYBOARD_ZERO = '0'
/**
 * Represents the '1' key.
 */
export const KEYBOARD_ONE = '1'

/**
 * Represents the '2' key.
 */
export const KEYBOARD_TWO = '2'
/**
 * Represents the '3' key.
 */
export const KEYBOARD_THREE = '3'
export const KEYBOARD_FOUR = '4'
export const KEYBOARD_FIVE = '5'
export const KEYBOARD_SIX = '6'
export const KEYBOARD_SEVEN = '7'
export const KEYBOARD_EIGHT = '8'
export const KEYBOARD_NINE = '9'

export const KEYBOARD_SEMICOLON = ';'
export const KEYBOARD_EQUAL = '='
export const KEYBOARD_COMMA = ','
export const KEYBOARD_MINUS = '-'
export const KEYBOARD_PERIOD = '.'
export const KEYBOARD_SLASH = '/'
export const KEYBOARD_BACKQUOTE = '`'
export const KEYBOARD_BRACKET_LEFT = '['
export const KEYBOARD_BACKSLASH = '\\'
export const KEYBOARD_BRACKET_RIGHT = ']'
export const KEYBOARD_QUOTE = '\''
