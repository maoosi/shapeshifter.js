import knot from 'knot.js'
import Wait from 'wait.js'

export default class Shapeshifter {

    /**
        --- CONSTRUCTOR ---
    **/

    constructor (selector, options = {}) {
        this.options = {
            color: options.color || '#fff',
            image: options.image || false,
            shadow: options.shadow || false
        }

        this.selector = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector

        this.loaded = false
        this.shape = false

        this.emitter = knot()
        this.waitter = Wait()

        return this
    }

    /**
        --- API ---
    **/

    init () {
        return this.waitter.handle(this, () => {
            this._createWrapper()
            this._bindEvents()
            this._preload()
        })
    }

    shift (shape = false, mode = 'auto', shadow = true) {
        return this.waitter.handle(this, () => {
            this.shape = shape ? shape : [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1]
            ]
            this.mode = mode
            this.shadow = shadow

            this._draw()
        })
    }

    wait (milliseconds = 0) {
        return this.waitter.handle(this, () => {
            this.emitter.emit('wait', milliseconds)
        }, milliseconds)
    }

    destroy () {
        return this.waitter.handle(this, () => {
            this._unbindEvents()

            this.wrapper.parentNode.removeChild(this.wrapper)
            this.loaded = false

            this.emitter.emit('destroy')
            this.emitter.off('destroy')
            this.emitter.off('ready')
            this.emitter.off('wait')
        })
    }

    on (...args) { return this.emitter.on(...args) }
    off (...args) { return this.emitter.off(...args) }

    /**
        --- CORE FUNCTIONS ---
    **/

    _throttle (callback, delay) {
        let last
        let timer

        return () => {
            let context = this
            let now = +new Date()
            let args = arguments

            if (last && now < last + delay) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    last = now
                    callback.apply(context, args)
                }, delay)
            } else {
                last = now
                callback.apply(context, args)
            }
        }
    }

    _resize () {
        this.canvas.width = this.selector.clientWidth
        this.canvas.height = this.selector.clientHeight

        if (this.options.shadow) {
            this.shadowCanvas.width = this.canvas.width
            this.shadowCanvas.height = this.canvas.height
        }

        this._draw()
    }

    _bindEvents () {
        this.resize = this._throttle(() => {
            this._resize()
        }, 150)

        window.addEventListener('resize', this.resize, false)
    }

    _unbindEvents () {
        window.removeEventListener('resize', this.resize, false)
    }

    _createWrapper () {
        this.wrapper = document.createElement('div')
        this.wrapper.setAttribute('style', 'width:100%;height:100%;position:relative;overflow:visible;')
        this.selector.appendChild(this.wrapper)

        this._createMainCanvas()
        if (this.options.shadow) {
            this._createShadowCanvas()
        }
    }

    _createMainCanvas () {
        this.canvas = document.createElement('canvas')
        this.wrapper.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.selector.clientWidth
        this.canvas.height = this.selector.clientHeight
    }

    _createShadowCanvas () {
        let translateX = this.options.shadow.translateX || '0'
        let translateY = this.options.shadow.translateY || '0'
        let shadowBlur = (this.options.shadow.blur) ? this.options.shadow.blur : 0

        this.shadowCanvas = document.createElement('canvas')
        this.shadowCanvas.setAttribute('style', 'top:0;left:0;position:absolute;z-index:-1;-webkit-transform:translateY(' + translateY + ') translateX(' + translateX + ');-ms-transform:translateY(' + translateY + ') translateX(' + translateX + ');transform:translateY(' + translateY + ') translateX(' + translateX + ');-webkit-filter:blur(' + shadowBlur + 'px);filter:blur(' + shadowBlur + 'px);')

        this.wrapper.appendChild(this.shadowCanvas)
        this.shadowCtx = this.shadowCanvas.getContext('2d')
        this.shadowCanvas.width = this.selector.clientWidth
        this.shadowCanvas.height = this.selector.clientHeight
    }

    _preload () {
        if (this.options.image) {
            this.image = new Image()
            this.image.onload = () => {
                if (!this.loaded) {
                    this.loaded = true
                    this.emitter.emit('ready', this.image)
                }
            }
            this.image.src = this.options.image
        } else {
            if (!this.loaded) {
                this.loaded = true
                this.emitter.emit('ready', this.image)
            }
        }
    }

    _setDimensions () {
        let parentWidth = this.selector.clientWidth
        let parentHeight = this.selector.clientHeight
        let parentRatio = parentWidth / parentHeight

        if (this.options.image) {
            let originalWidth = this.image.naturalWidth
            let originalHeight = this.image.naturalHeight
            let originalRatio = originalWidth / originalHeight

            if (originalRatio >= parentRatio) {
                this.displayHeight = parentHeight
                this.displayWidth = (originalWidth * parentHeight) / originalHeight
            } else {
                this.displayWidth = parentWidth
                this.displayHeight = (originalHeight * parentWidth) / originalWidth
            }
        } else {
            this.displayHeight = parentHeight
            this.displayWidth = parentWidth
        }
    }

    _draw () {
        this._drawMain()

        if (this.options.shadow) {
            this._drawShadow()
        }
    }

    _drawMain () {
        this._setDimensions()
        this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight)

        this.ctx = this._clipShape(this.canvas, this.ctx, this.shape)

        if (this.options.image && this.mode !== 'color') {
            let posX = ((this.displayWidth - this.canvas.width) / 2) * -1
            let posY = ((this.displayHeight - this.canvas.height) / 2) * -1

            this.ctx.drawImage(
                this.image,
                0, 0,
                this.image.naturalWidth,
                this.image.naturalHeight,
                posX, posY,
                this.displayWidth,
                this.displayHeight
            )
        } else {
            this.ctx.fillStyle = this.options.color
            this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight)
        }

        this.ctx.restore()
    }

    _drawShadow () {
        this.shadowCtx.clearRect(0, 0, this.displayWidth, this.displayHeight)

        if (this.shadow) {
            this.shadowCtx = this._clipShape(this.shadowCanvas, this.shadowCtx, this.shape, this.shadowBlur)

            this.shadowCtx.fillStyle = this.options.shadow.color
            this.shadowCtx.fillRect(0, 0, this.displayWidth, this.displayHeight)

            this.shadowCtx.restore()
        }
    }

    _clipShape (canvas, ctx, shape) {
        let w = canvas.width
        let h = canvas.height
        let s = shape

        ctx.save()
        ctx.beginPath()

        ctx.moveTo(w * s[0][0], h * s[0][1])
        for (let n = 1; n < s.length; n++) {
            ctx.lineTo(w * s[n][0], h * s[n][1])
        }

        ctx.closePath()
        ctx.clip()

        return ctx
    }
}
