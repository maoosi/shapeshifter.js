/*!
* @maoosi/shapeshifter 1.0.2 - JS library to easily shift between different masking shapes.
*
* @author       maoosi <hello@sylvainsimao.fr>
* @homepage     https://github.com/maoosi/shapeshifter.js#readme
* @copyright    Copyright (c) 2017 maoosi <hello@sylvainsimao.fr>
* @license      MIT
* @version      1.0.2
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Shapeshifter=e()}(this,function(){"use strict";var t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},e=function(){function e(t,e){return h[t]=h[t]||[],h[t].push(e),this}function i(t,i){return i._once=!0,e(t,i),this}function s(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?h[t].splice(h[t].indexOf(e),1):delete h[t],this}function a(t){for(var e=this,i=arguments.length,a=Array(i>1?i-1:0),n=1;n<i;n++)a[n-1]=arguments[n];var o=h[t]&&h[t].slice();return o&&o.forEach(function(i){i._once&&s(t,i),i.apply(e,a)}),this}var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},h=Object.create(null);return t({},n,{on:e,once:i,off:s,emit:a})},i=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),a=function(){function t(){i(this,t),this.waitQueue=[],this.waitExecution=!1}return s(t,[{key:"handle",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return this.waitQueue.push({func:e,timeout:this._isAsyncFunc(e)?"async":i}),this.waitExecution||this._next(),t}},{key:"pause",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.handle(t,i,e)}},{key:"_isAsyncFunc",value:function(t){return t.toString().search("done()")>-1}},{key:"_exec",value:function(t){var e=this;t.call(this,function(){e._next()})}},{key:"_next",value:function(){var t=this;if(this.waitQueue.length>0){this.waitExecution=!0;var e=this.waitQueue.shift(),i=e.func,s=e.timeout;"async"===s?this._exec(i):s!==!1?(this._exec(i),setTimeout(function(){t._next()},s)):(this._exec(i),this._next())}else this.waitExecution=!1}}]),t}(),n=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];return new(Function.prototype.bind.apply(a,[null].concat(e)))},h=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},o=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(){function t(i){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return h(this,t),this.options={color:s.color||"#fff",image:s.image||!1,shadow:s.shadow||!1},this.selector="string"==typeof i?document.querySelector(i):i,this.loaded=!1,this.shape=!1,this.emitter=e(),this.waitter=n(),this}return o(t,[{key:"init",value:function(){var t=this;return this.waitter.handle(this,function(){t._createWrapper(),t._bindEvents(),t._preload()})}},{key:"shift",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"auto",s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.waitter.handle(this,function(){e.shape=t?t:[[0,0],[1,0],[1,1],[0,1]],e.mode=i,e.shadow=s,e._draw()})}},{key:"wait",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return this.waitter.handle(this,function(){t.emitter.emit("wait",e)},e)}},{key:"destroy",value:function(){var t=this;return this.waitter.handle(this,function(){t._unbindEvents(),t.wrapper.parentNode.removeChild(t.wrapper),t.loaded=!1,t.emitter.emit("destroy"),t.emitter.off("destroy"),t.emitter.off("ready"),t.emitter.off("wait")})}},{key:"on",value:function(){var t;return(t=this.emitter).on.apply(t,arguments)}},{key:"off",value:function(){var t;return(t=this.emitter).off.apply(t,arguments)}},{key:"_throttle",value:function(t,e){var i=this,s=arguments,a=void 0,n=void 0;return function(){var h=i,o=+new Date,r=s;a&&o<a+e?(clearTimeout(n),n=setTimeout(function(){a=o,t.apply(h,r)},e)):(a=o,t.apply(h,r))}}},{key:"_resize",value:function(){this.canvas.width=this.selector.clientWidth,this.canvas.height=this.selector.clientHeight,this.options.shadow&&(this.shadowCanvas.width=this.canvas.width,this.shadowCanvas.height=this.canvas.height),this._draw()}},{key:"_bindEvents",value:function(){var t=this;this.resize=this._throttle(function(){t._resize()},150),window.addEventListener("resize",this.resize,!1)}},{key:"_unbindEvents",value:function(){window.removeEventListener("resize",this.resize,!1)}},{key:"_createWrapper",value:function(){this.wrapper=document.createElement("div"),this.wrapper.setAttribute("style","width:100%;height:100%;position:relative;overflow:visible;"),this.selector.appendChild(this.wrapper),this._createMainCanvas(),this.options.shadow&&this._createShadowCanvas()}},{key:"_createMainCanvas",value:function(){this.canvas=document.createElement("canvas"),this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.selector.clientWidth,this.canvas.height=this.selector.clientHeight}},{key:"_createShadowCanvas",value:function(){var t=this.options.shadow.translateX||"0",e=this.options.shadow.translateY||"0",i=this.options.shadow.blur?this.options.shadow.blur:0;this.shadowCanvas=document.createElement("canvas"),this.shadowCanvas.setAttribute("style","top:0;left:0;position:absolute;z-index:-1;-webkit-transform:translateY("+e+") translateX("+t+");-ms-transform:translateY("+e+") translateX("+t+");transform:translateY("+e+") translateX("+t+");-webkit-filter:blur("+i+"px);filter:blur("+i+"px);"),this.wrapper.appendChild(this.shadowCanvas),this.shadowCtx=this.shadowCanvas.getContext("2d"),this.shadowCanvas.width=this.selector.clientWidth,this.shadowCanvas.height=this.selector.clientHeight}},{key:"_preload",value:function(){var t=this;this.options.image?(this.image=new Image,this.image.onload=function(){t.loaded||(t.loaded=!0,t.emitter.emit("ready",t.image))},this.image.src=this.options.image):this.loaded||(this.loaded=!0,this.emitter.emit("ready",this.image))}},{key:"_setDimensions",value:function(){var t=this.selector.clientWidth,e=this.selector.clientHeight,i=t/e;if(this.options.image){var s=this.image.naturalWidth,a=this.image.naturalHeight,n=s/a;n>=i?(this.displayHeight=e,this.displayWidth=s*e/a):(this.displayWidth=t,this.displayHeight=a*t/s)}else this.displayHeight=e,this.displayWidth=t}},{key:"_draw",value:function(){this._drawMain(),this.options.shadow&&this._drawShadow()}},{key:"_drawMain",value:function(){if(this._setDimensions(),this.ctx.clearRect(0,0,this.displayWidth,this.displayHeight),this.ctx=this._clipShape(this.canvas,this.ctx,this.shape),this.options.image&&"color"!==this.mode){var t=(this.displayWidth-this.canvas.width)/2*-1,e=(this.displayHeight-this.canvas.height)/2*-1;this.ctx.drawImage(this.image,0,0,this.image.naturalWidth,this.image.naturalHeight,t,e,this.displayWidth,this.displayHeight)}else this.ctx.fillStyle=this.options.color,this.ctx.fillRect(0,0,this.displayWidth,this.displayHeight);this.ctx.restore()}},{key:"_drawShadow",value:function(){this.shadowCtx.clearRect(0,0,this.displayWidth,this.displayHeight),this.shadow&&(this.shadowCtx=this._clipShape(this.shadowCanvas,this.shadowCtx,this.shape,this.shadowBlur),this.shadowCtx.fillStyle=this.options.shadow.color,this.shadowCtx.fillRect(0,0,this.displayWidth,this.displayHeight),this.shadowCtx.restore())}},{key:"_clipShape",value:function(t,e,i){var s=t.width,a=t.height,n=i;e.save(),e.beginPath(),e.moveTo(s*n[0][0],a*n[0][1]);for(var h=1;h<n.length;h++)e.lineTo(s*n[h][0],a*n[h][1]);return e.closePath(),e.clip(),e}}]),t}();return r});
//# sourceMappingURL=shapeshifter.js.map
