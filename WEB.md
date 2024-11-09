# Rustafari Web Library

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.4-green)](https://github.com/rustaroots/rustafari/releases)

Rustafari Web Library provides a powerful, simple-to-use API for modern DOM manipulation and user interaction. Inspired by the ease of popular libraries, `Web` is designed to streamline everyday tasks in web development, making it intuitive to manipulate elements, handle events, and dynamically update content with minimal code.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
  - [Selecting Elements](#selecting-elements)
  - [Manipulating Attributes and Content](#manipulating-attributes-and-content)
  - [Event Handling](#event-handling)
  - [Styling](#styling)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Effortless DOM Manipulation**: Select, manipulate, and remove elements with a minimal API.
- **Attribute and Content Management**: Easily update attributes, set HTML content, and retrieve values.
- **Event Handling**: Attach event listeners for responsive user interaction.
- **CSS Styling**: Apply inline styles and toggle element visibility.
- **Chaining**: Perform multiple operations on elements using method chaining for concise, readable code.

## Installation

To install Rustafari Web Library, add it as a dependency to your project:

```bash
npm install rustafari
```

Or, if you’re using it in the browser directly, include it as a module script:

```html
<script type="module" src="/dist/index.js"></script>
```

## Quick Start

Here’s a quick example to get you started with Rustafari’s `Web` class for interacting with the DOM.

```typescript
import { $ } from 'rustafari';

// Select an element, set HTML content, and add a click event
$('#my-element')
    .set('<p>Hello, World!</p>')
    .on('click', () => console.log('Element clicked!'))
    .css('color: blue; font-size: 18px;');
```

## Documentation

### Selecting Elements

To select an element, use the `$` function with the element’s `id`:

```typescript
const element = $('#element-id');
```

### Manipulating Attributes and Content

- **Get/Set HTML Content**: `html()` and `set(content: string)`
  ```typescript
  element.html(); // Get inner HTML
  element.set('<p>Updated Content</p>'); // Set inner HTML
  ```

- **Get/Set Attributes**: `attr(key: string, value?: string)`
  ```typescript
  element.attr('data-role'); // Get the value of 'data-role'
  element.attr('data-role', 'button'); // Set 'data-role' attribute
  ```

### Event Handling

Use `.on(event: string, callback: EventListener)` to attach event listeners:

```typescript
element.on('click', () => alert('Element clicked!'));
```

### Styling

Apply CSS styles or control element visibility with the following methods:

- **Inline Styles**: `css(styles: string)`
  ```typescript
  element.css('color: red; font-weight: bold;');
  ```

- **Hide/Show**: `hide()` and `show()`
  ```typescript
  element.hide(); // Sets display: none
  element.show(); // Sets display: block
  ```

### Examples

#### Toggle Visibility on Click

```typescript
$('#toggle-btn').on('click', () => {
    const content = $('#content');
    content.visible() ? content.hide() : content.show();
});
```

#### Update an Element’s Text and Style

```typescript
$('#status')
    .set('Online')
    .css('color: green; font-size: 16px;');
```

#### Append Content Dynamically

```typescript
$('#comments').append('<p>New comment added!</p>');
```

## Contributing

We welcome contributions to enhance the Rustafari Web Library. To contribute:

1. Fork the repository and create a new branch.
2. Commit and push your changes.
3. Create a pull request with a detailed description.

For issues, please [submit a report](https://github.com/rustaroots/rustafari/issues).

## License

This library is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for more information.
