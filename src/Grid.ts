export class Grid {
    private container: HTMLElement;

    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found.`);
        }
        this.container = element as HTMLElement;
    }

    generateGrid(options: {
        columns: number;
        gap?: string;
        breakpoints?: { [key: string]: number };
    }): this {
        const { columns, gap = '1rem', breakpoints = {} } = options;

        // Apply base grid styles
        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        this.container.style.gap = gap;

        // Generate responsive styles for breakpoints
        const style = document.createElement('style');

        let cssRules = '';

        for (const [breakpoint, cols] of Object.entries(breakpoints)) {
            cssRules += `
                @media (max-width: ${breakpoint}) {
                    ${this.getGridSelector()} {
                        grid-template-columns: repeat(${cols}, 1fr);
                    }
                }
            `;
        }
        style.innerHTML = cssRules;
        document.head.appendChild(style);
        return this;
    }

    private getGridSelector(): string {
        return `.${this.container.className.split(' ').join('.')}`;
    }

    addItem(content: string | HTMLElement): this {
        const item = document.createElement('div');
        item.className = 'grid-item';
        if (typeof content === 'string') {
            item.innerHTML = content;
        } else {
            item.appendChild(content);
        }
        this.container.appendChild(item);
        return this;
    }
}
