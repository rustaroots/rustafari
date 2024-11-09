# Rustafari Web Library

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.4-green)](https://github.com/rustaroots/rustafari/releases)

Rustafari Web Library is a powerful, lightweight library for modern DOM manipulation and user interaction. With an intuitive API, `Web` simplifies the process of selecting elements, handling events, and dynamically updating content, enabling you to build responsive, interactive components with ease.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
  - [Element Selection](#element-selection)
  - [Content Manipulation](#content-manipulation)
  - [Event Handling](#event-handling)
  - [Styling and Visibility](#styling-and-visibility)
- [Advanced Features](#advanced-features)
  - [Infinite Scroll](#infinite-scroll)
  - [Debounced and Throttled Scroll](#debounced-and-throttled-scroll)
  - [Click Outside Detection](#click-outside-detection)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Effortless DOM Manipulation**: Select, update, append, and remove elements with a single API.
- **Flexible Event Handling**: Attach event listeners for common user interactions with minimal setup.
- **Responsive Styling**: Apply styles, toggle classes, and manage visibility based on user actions.
- **Performance Optimizations**: Includes throttling and debouncing helpers for scroll and resize events.
- **Chaining Support**: Use chainable methods for cleaner and more readable code.

## Installation

Install the Rustafari Web Library via npm:

```bash
npm install rustafari
```

Or, include it directly in the browser as a module script:

```html
<script type="module" src="/dist/index.js"></script>
```

## Quick Start

Here’s a basic example to get you started with `Web`:

```typescript
import { $ } from 'rustafari';

// Select an element, set its HTML content, and add a click event listener
$('#my-element')
    .set('<p>Hello, World!</p>')
    .on_click(() => console.log('Element clicked!'))
    .css('color: blue; font-size: 18px;');
```

## Documentation

### Element Selection

To select an element by its ID, use the `$` function:

```typescript
const element = $('#element-id');
```

### Content Manipulation

- **Get/Set HTML Content**: Use `html()` to get the HTML or `set(content: string)` to update it.
  ```typescript
  element.html(); // Retrieve HTML content
  element.set('<p>New Content</p>'); // Update HTML content
  ```

- **Get Text Content**: Use `text()` to get the text content of the element.
  ```typescript
  element.text(); // Retrieve inner text content
  ```

### Event Handling

Attach event listeners with `on(event, callback)` or specialized helpers for common events:

```typescript
element.on_click(() => console.log("Clicked!"));  // Adds click event
element.on_input(() => console.log("Input changed"));  // Adds input event
element.on_keydown((event) => console.log(event.key));  // Adds keydown event
```

### Styling and Visibility

- **Inline CSS**: Apply inline styles using `css(styles: string)`.
  ```typescript
  element.css('color: red; font-weight: bold;');
  ```

- **Hide/Show**: Control element visibility with `hide()` and `show()`.
  ```typescript
  element.hide(); // Sets display: none
  element.show(); // Sets display: block
  ```

- **Toggle Class**: Toggle a CSS class on or off.
  ```typescript
  element.toggle('active');
  ```

## Advanced Features

### Infinite Scroll

The `infinite_scroll` method adds a scroll event listener, typically used to load more content when reaching the bottom of a page or container.

```typescript
$('#content').infinite_scroll(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreContent();  // Define custom function to load content
    }
});
```

### Debounced and Throttled Scroll

- **Debounce Scroll**: Execute a scroll callback after a delay, once scrolling has stopped.
  ```typescript
  $('#content').debounce_scroll(() => {
      console.log("Scroll event with debouncing!");
  }, 300);
  ```

- **Throttle Scroll**: Execute a scroll callback at a controlled frequency to optimize performance.
  ```typescript
  $('#content').throttle_scroll(() => {
      console.log("Scroll event with throttling!");
  }, 300);
  ```

### Click Outside Detection

The `on_click_outside` method detects clicks outside the element, which is useful for closing modals or dropdowns.

```typescript
$('#modal').on_click_outside(() => {
    $('#modal').hide(); // Hide modal if clicked outside
});
```

## Examples

Here are some examples to demonstrate common use cases:

- **Toggle Visibility on Click**:
  ```typescript
  $('#toggle-btn').on_click(() => {
      const content = $('#content');
      content.visible() ? content.hide() : content.show();
  });
  ```

- **Append Content Dynamically**:
  ```typescript
  $('#comments').append('<p>New comment added!</p>');
  ```

- **Track Resize Events**:
  ```typescript
  $('#container').on_resize(() => {
      console.log("Window resized!");
  });
  ```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository and create a new branch.
2. Commit your changes and push to your fork.
3. Open a pull request with a detailed description of your changes.

For issues or feature requests, please visit the [issues page](https://github.com/rustaroots/rustafari/issues).

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.

---

This README should provide clear guidance on using the `Web` library, with examples and detailed descriptions of the methods, making it easy to get started and maximize its capabilities for building interactive web components. Let me know if you'd like further customization!