"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otechdo = void 0;
// src/otechdo.ts
class Otechdo {
    element;
    constructor(element) {
        this.element = element;
    }
    addClass(className) {
        this.element.classList.add(className);
    }
    removeClass(className) {
        this.element.classList.remove(className);
    }
    setStyle(property, value) {
        this.element.style[property] = value;
    }
    on(event, handler) {
        this.element.addEventListener(event, handler);
    }
}
exports.Otechdo = Otechdo;
