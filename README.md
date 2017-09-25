# Shapeshifter.js

⚡ 🎭 🍆 JavaScript library to mask images and create custom shapes.

> Work in progress

```html
<div id="jim"></div>
```

```javascript
// create a shapeshifter
const shapeshifter = new Shapeshifter('#jim', {
    image: 'image.jpg',
    color: 'rgba(0, 0, 0, 0.2)', // if no image set OR color mode
    shadow: {
        color: 'rgba(0, 0, 0, 0.25)',
        translateX: '10px',
        translateY: '10px',
        blur: 8
    }
})

// on loaded
shapeshifter.on('load', () => {

    // create a shape (array of points based on percentage)
    let shape = [
        [0, 0],
        [1, 0.2],
        [1, 1],
        [0, 0.8]
    ]

    // set a mode (`auto` - default, `image`, `color`)
    let mode = 'auto'

    // shift shape
    shapeshifter.shift(shape, mode)

})

// initiate / load image
shapeshifter.init()
```
