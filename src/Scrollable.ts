export class Scrollable {
    private e: Element;
    private top: number = 0;
    private left: number = 0;

    constructor(selector: string,private offset: number = 500) {
        const element = document.querySelector(selector);
        if (!element) throw new DOMException(`Invalid selector "${selector}"`);
        this.e = element;
    }
    infinite(onScrollUp: () => void,onScrollDown: () => void,onNearTop: () => void,onNearBottom: () => void): void {
        // Update the scroll state (this could be part of the class or here as an example)
        const isNearTop = this.isNearTop();
        const isNearBottom = this.isNearBottom();
        const isScrollingUp = this.getIsScrollingUp();
        const isScrollingDown = this.getIsScrollingDown();

        if (isScrollingDown)
        {
            onScrollDown();
        }
        if (isNearTop)
        {
            onNearTop();
        }
        if (isNearBottom)
        {
            onNearBottom();
        }
        if (isScrollingUp)
        {
            onScrollUp();
        }
    }
    scroll(top: number, left: number = 0): this {
        this.top = top;
        this.left = left;
        this.e.scrollTop = top;
        this.e.scrollLeft = left;
        this.e.dispatchEvent(new Event("scroll"));
        return this;
    }

    getCurrentPosition():{top:number,left:number} {
        return {top: this.top, left:this.left};
    }

    // Getters for near-edge and scrolling direction flags
    isNearTop(): boolean {
        return Math.abs(this.e.scrollTop - this.e.clientHeight) % this.offset == 0;
    }

    isNearBottom(): boolean {
        return Math.abs(this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop) % this.offset <= 1;
    }

    isNearRight(): boolean {
        return Math.abs(this.e.scrollLeft - this.e.clientWidth - this.e.scrollLeft) % this.offset <= 1;
    }

    isNearLeft(): boolean {
        return Math.abs(this.e.scrollLeft - this.e.clientWidth - this.e.scrollLeft) % this.offset == 0;
    }

    getIsScrollingDown(): boolean {
        return Math.abs(this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop)% this.offset == 0;
    }

    getIsScrollingUp(): boolean {
        return Math.abs(this.e.scrollHeight - this.e.clientHeight - this.e.scrollTop)% this.offset == 0;
    }

    getIsScrollingRight(): boolean {
        return Math.abs(this.e.clientWidth + this.e.scrollLeft) % this.offset == 0;
    }

    getIsScrollingLeft(): boolean {
        return Math.abs(this.e.scrollLeft - this.e.clientWidth ) - this.offset  >=0;
    }

    // Methods to add event listeners for scroll and scroll end
    onScroll(callback: EventListener): this {
        this.e.addEventListener('scroll', callback);
        return this;
    }

    onScrollEnd(callback: EventListener): this {
        this.e.addEventListener('scrollend', callback);
        return this;
    }
}
