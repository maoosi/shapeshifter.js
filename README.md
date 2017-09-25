# Shapeshifter.js

⚡ 🎭 🍆 JS library to easily shift between different masking shapes.

> Work in progress


## Installation

### Using NPM

```bash
npm i @maoosi/shapeshifter --save
```

### Using Yarn

```bash
yarn add @maoosi/shapeshifter
```

## Basic usage

```html
<div id="el"></div>
```

```javascript
import Shapeshifter from '@maoosi/shapeshifter'

// create new shapeshifter
const shapeshifter = new Shapeshifter('#el', { /* options */ })

// on ready
shapeshifter.on('ready', () => {

    // shift into the a squared shape
    shapeshifter.shift([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
    ])

})

// initiate
shapeshifter.init()
```


## Advanced usage

### Masking an image

```javascript
new Shapeshifter('#el', {
    image: 'my-image.jpg'
})
```

### Masking a colored shape

```javascript
new Shapeshifter('#el', {
    color: 'rgba(102, 117, 255, 0.5)'
})
```

### Using shadows

> The blur option for shadows is only working on browsers that support CSS filters.
>
> http://caniuse.com/#feat=css-filters

```javascript
new Shapeshifter('#el', {
    shadow: {
        color: 'rgba(0, 0, 0, 0.25)',
        translateX: '10px',
        translateY: '10px',
        blur: 8
    }
})
```

### Force display mode AND / OR shadow

```javascript
let mode = 'auto' // `auto`, `color`, `image`
let shadow = true // `true`, `false`

shapeshifter.shift([
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
], mode, shadow)
```

### Destroy / Reset

```javascript
shapeshifter.destroy()
```

### Chainable API with Wait.js

https://github.com/maoosi/wait.js

```javascript
shapeshifter
    .shift(shape1)
    .wait(1000)
    .shift(shape2)
    .wait(500)
    .destroy()
```


## Browser Support

Fully supported by Evergreen Browsers (Edge, Opera, Safari, Firefox & Chrome) and IE 10+ browsers.

> The blur option for shadows is only working on browsers that support CSS filters.
>
> http://caniuse.com/#feat=css-filters


## License

[MIT](https://github.com/maoosi/shapeshifter.js/blob/master/LICENSE.md) © 2017 Sylvain Simao
