import { Dom } from "./Dom";

/**
 * Configuration interface for the keyboard manager.
 */
export interface KeyboardConfig {
    /**
     * Keyboard layout, e.g., QWERTY, AZERTY, DVORAK, COLEMAK.
     */
    layout?: "QWERTY" | "AZERTY" | "DVORAK" | "COLEMAK";

    /**
     * List of keys to ignore during event handling.
     */
    ignoredKeys?: string[];

    /**
     * Map to remap keys, e.g., { "a": "b" } remaps the "a" key to act as "b".
     */
    keyRemapping?: Record<string, string>;

    /**
     * Enable or disable key repeat (default: true).
     */
    enableKeyRepeat?: boolean;

    /**
     * Delay in milliseconds before key repeat starts.
     */
    repeatDelay?: number;

    /**
     * Interval in milliseconds between repeated key events.
     */
    repeatInterval?: number;

    /**
     * Strict mode: only handle predefined keys (default: false).
     */
    strictMode?: boolean;

    /**
     * Global callback for handling all keyboard events.
     * This is mandatory.
     */
    globalCallback: (event: KeyboardEvent) => void;

    /**
     * DOM-specific options for the event listener, e.g., { passive: true }.
     */
    domOptions?: AddEventListenerOptions;
}

/**
 * A class for managing keyboard events with support for layouts, remapping, ignored keys,
 * and global event handling.
 */
export class Keyboard<TConfig extends KeyboardConfig> extends Dom {
    private config: TConfig;

    constructor(selector: string, config: TConfig) {
        super(selector);
        this.config = config;

        // Add the global callback immediately
        this.addGlobalListener(config.globalCallback);
    }

    /**
     * Get the current configuration.
     * @returns The current configuration object.
     */
    getConfig(): TConfig {
        return this.config;
    }

    /**
     * Update the configuration and reapply the global listener.
     * @param newConfig The new configuration object.
     */
    setConfig(newConfig: TConfig): void {
        this.removeGlobalListener(this.config.globalCallback);
        this.config = newConfig;
        this.addGlobalListener(this.config.globalCallback);
    }

    /**
     * Add a global listener for all keyboard events.
     * @param callback The global callback function.
     */
    private addGlobalListener(callback: (event: KeyboardEvent) => void): void {
        const options = this.config.domOptions || {};
        this.e.addEventListener("keydown", callback, options);
        this.e.addEventListener("keyup", callback, options);
    }

    /**
     * Remove a global listener for all keyboard events.
     * @param callback The global callback function.
     */
    private removeGlobalListener(callback: (event: KeyboardEvent) => void): void {
        const options = this.config.domOptions || {};
        this.e.removeEventListener("keydown", callback, options);
        this.e.removeEventListener("keyup", callback, options);
    }

    /**
     * Add a listener for a specific key.
     * @param key The key to listen for.
     * @param callback The function to execute when the key is pressed.
     * @returns The current instance for chaining.
     */
    onKeyDown(key: keyof typeof Keyboard.Keys, callback: (event: KeyboardEvent) => void): this {
        const options = this.config.domOptions || {};
        this.e.addEventListener(
            "keydown",
            (event) => {
                if (this.shouldHandleEvent(event, key)) {
                    callback(event);
                }
            },
            options
        );
        return this;
    }

    /**
     * Determine if the keyboard event should be handled.
     * @param event The keyboard event.
     * @param key The target key.
     * @returns True if the event should be handled, otherwise false.
     */
    private shouldHandleEvent(event: KeyboardEvent, key: keyof typeof Keyboard.Keys): boolean {
        const { ignoredKeys = [], keyRemapping = {}, strictMode = false } = this.config;

        // Remap the key if necessary
        const remappedKey = keyRemapping[event.key] || event.key;

        // Ignore specified keys
        if (ignoredKeys.includes(event.key)) {
            return false;
        }

        // Strict mode: handle only predefined keys
        if (strictMode && !Keyboard.Keys[key]) {
            return false;
        }

        return remappedKey === Keyboard.Keys[key];
    }

    /**
     * Predefined key mappings for convenience.
     */
    public static Keys = Object.freeze({
        ENTER: "Enter",
        ESCAPE: "Escape",
        SPACE: " ",
        ARROW_UP: "ArrowUp",
        ARROW_DOWN: "ArrowDown",
        ARROW_LEFT: "ArrowLeft",
        ARROW_RIGHT: "ArrowRight",
        BACKSPACE: "Backspace",
        TAB: "Tab",
        SHIFT: "Shift",
        CONTROL: "Control",
        ALT: "Alt",
        META: "Meta",
        CAPS_LOCK: "CapsLock",
        DELETE: "Delete",
        END: "End",
        HOME: "Home",
        PAGE_UP: "PageUp",
        PAGE_DOWN: "PageDown",
        INSERT: "Insert",
        NUM_LOCK: "NumLock",
        SCROLL_LOCK: "ScrollLock",
        PAUSE: "Pause",
        PRINT_SCREEN: "PrintScreen",
        CONTEXT_MENU: "ContextMenu",
        APPLICATION: "Application",
        CLEAR: "Clear",
        HELP: "Help",
        SELECT: "Select",
        EXECUTE: "Execute",
        SLEEP: "Sleep",
        F1: "F1",
        F2: "F2",
        F3: "F3",
        F4: "F4",
        F5: "F5",
        F6: "F6",
        F7: "F7",
        F8: "F8",
        F9: "F9",
        F10: "F10",
        F11: "F11",
        F12: "F12",
        A: "a",
        B: "b",
        C: "c",
        D: "d",
        E: "e",
        F: "f",
        G: "g",
        H: "h",
        I: "i",
        J: "j",
        K: "k",
        L: "l",
        M: "m",
        N: "n",
        O: "o",
        P: "p",
        Q: "q",
        R: "r",
        S: "s",
        T: "t",
        U: "u",
        V: "v",
        W: "w",
        X: "x",
        Y: "y",
        Z: "z",
        ZERO: "0",
        ONE: "1",
        TWO: "2",
        THREE: "3",
        FOUR: "4",
        FIVE: "5",
        SIX: "6",
        SEVEN: "7",
        EIGHT: "8",
        NINE: "9",
        SEMICOLON: ";",
        EQUAL: "=",
        COMMA: ",",
        MINUS: "-",
        PERIOD: ".",
        SLASH: "/",
        BACKQUOTE: "`",
        BRACKET_LEFT: "[",
        BACKSLASH: "\\",
        BRACKET_RIGHT: "]",
        QUOTE: "'",
    });
}
