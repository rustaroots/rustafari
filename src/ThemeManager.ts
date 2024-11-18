export class ThemeManager {
    constructor() {
        this.applySystemTheme();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.applySystemTheme();
        });
    }

    private applySystemTheme(): void {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }
}
