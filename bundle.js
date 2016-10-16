(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const bel = require('bel')
const configFn = window.require('electron').remote.getGlobal('configFn')
const debounce = require('../utils/debounce')
const colorTile = require('./colortile')
const plus = require('./plus')

const nameChange = debounce((e) => {
  configFn.insertColorGroup(e.target.innerText)
}, 1000)

const colorGroup = (item, editable) => {
  editable = editable || false

  return bel`
    <div class="flex  items-center">
      <h1
        class="f4 mb1 w-90"
        contenteditable=${editable}
        oninput=${(e) => {nameChange(e)}}>
        ${item}
      </h1>
      ${plus('tr f4 w-10 mb1 mt2', () => {
        console.log("clicked")
      })}
    </div>
`
}

module.exports = colorGroup

},{"../utils/debounce":8,"./colortile":2,"./plus":4,"bel":13}],2:[function(require,module,exports){
const bel = require('bel')
const copy = require('../utils/copy')

const colorTile = (item) => {
  return bel`
    <div
      class="h2 w2 dim"
      id="colortile"
      style="background-color:${item}"
      onclick=${(e) => { copy(item, () => {
        new Notification('Copied!', {
          body: `\'${item}\' copied to clipboard`,
          silent: true
        })
      }) }}>
    </div>
  `
}

module.exports = colorTile

},{"../utils/copy":7,"bel":13}],3:[function(require,module,exports){
const bel = require('bel')
const sf = 0
const plus = require('./plus')
const colorGroup = require('./colorgroup')

const navStyle = ((require('insert-css')("._54efbcfd {\n    -webkit-app-region: drag;\n    -webkit-user-select: none;\n    height: 2.3rem;\n  }\n  ._54efbcfd .plus {\n    -webkit-app-region: no-drag;\n  }") || true) && "_54efbcfd")

const addColorGroup = () => {
  const element = colorGroup("New color group", true)
  const node = document.getElementById('main')
  node.insertBefore(element, node.childNodes[0])
}

const navbar = (config) => bel`
  <nav
    class="${navStyle} top-0 tc flex items-center justify-center w-100 fixed z-9999"
    style="background-color:${config.backgroundColor}">
    <span class="f6">Colors</span>
    ${plus('f5 absolute right-1', addColorGroup)}
  </nav>
`

module.exports = navbar

},{"./colorgroup":1,"./plus":4,"bel":13,"insert-css":24}],4:[function(require,module,exports){
const bel = require('bel')

const plus = (classes, fn) => {
  return bel`
    <span
      class="plus pointer ${classes}"
      onclick=${() => {fn()}}>
      +
    </span>
  `
}

module.exports = plus

},{"bel":13}],5:[function(require,module,exports){
const bel = require('bel')
const sf = 0
const config = window.require('electron').remote.getGlobal('config')
const navbar = require('../elements/navbar')
const colorGroup = require('../elements/colorgroup')
const colorTile = require('../elements/colortile')

const globalStyle = ((require('insert-css')("._b29fd851 .plus {\n    opacity: .5;\n    transition:opacity .15s ease-in;\n  }\n  ._b29fd851 .plus:hover,\n  ._b29fd851 .plus:focus {\n    opacity: .8;\n    transition:opacity .15s ease-in;\n  }\n  ._b29fd851 .plus:active {\n    opacity: 1;\n    transition:opacity .15s ease-out;\n  }") || true) && "_b29fd851")

const main = (state, prev, send) => bel`
  <div class="${globalStyle}" style="color: ${config.textColor}">
    ${navbar(config)}
    <main id="main" class="ph3 mt4 fixed absolute--fill overflow-scroll">
      ${config.colors.map((item) => {
        return bel`
          <div class="mb3">
            ${colorGroup(item.name)}
            <div class="flex flex-wrap">
              ${item.colors.map((item) => {
                return colorTile(item)
              })}
            </div>
          </div>
        `
      })}
    </main>
  </div>
`

module.exports = main

},{"../elements/colorgroup":1,"../elements/colortile":2,"../elements/navbar":3,"bel":13,"insert-css":24}],6:[function(require,module,exports){
const choo = require('choo')
const html = require('choo/html')
const sf = 0
const app = choo()

;((require('insert-css')("/*! TACHYONS v4.5.3 | http://tachyons.io */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:gold;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.border-box,article,body,code,dd,div,dl,dt,fieldset,footer,form,header,html,input[type=email],input[type=number],input[type=password],input[type=tel],input[type=text],input[type=url],li,main,ol,p,pre,section,textarea,ul{box-sizing:border-box}img{max-width:100%}.cover{background-size:cover!important}.contain{background-size:contain!important}.bg-center{background-position:50%}.bg-center,.bg-top{background-repeat:no-repeat}.bg-top{background-position:top}.bg-right{background-position:100%}.bg-bottom,.bg-right{background-repeat:no-repeat}.bg-bottom{background-position:bottom}.bg-left{background-repeat:no-repeat;background-position:0}.outline{outline:1px solid}.outline-transparent{outline:1px solid transparent}.outline-0{outline:0}.ba{border-style:solid;border-width:1px}.bt{border-top-style:solid;border-top-width:1px}.br{border-right-style:solid;border-right-width:1px}.bb{border-bottom-style:solid;border-bottom-width:1px}.bl{border-left-style:solid;border-left-width:1px}.bn{border-style:none;border-width:0}.b--black{border-color:#000}.b--near-black{border-color:#111}.b--dark-gray{border-color:#333}.b--mid-gray{border-color:#555}.b--gray{border-color:#777}.b--silver{border-color:#999}.b--light-silver{border-color:#aaa}.b--light-gray{border-color:#eee}.b--near-white{border-color:#f4f4f4}.b--white{border-color:#fff}.b--white-90{border-color:hsla(0,0%,100%,.9)}.b--white-80{border-color:hsla(0,0%,100%,.8)}.b--white-70{border-color:hsla(0,0%,100%,.7)}.b--white-60{border-color:hsla(0,0%,100%,.6)}.b--white-50{border-color:hsla(0,0%,100%,.5)}.b--white-40{border-color:hsla(0,0%,100%,.4)}.b--white-30{border-color:hsla(0,0%,100%,.3)}.b--white-20{border-color:hsla(0,0%,100%,.2)}.b--white-10{border-color:hsla(0,0%,100%,.1)}.b--white-05{border-color:hsla(0,0%,100%,.05)}.b--white-025{border-color:hsla(0,0%,100%,.025)}.b--white-0125{border-color:hsla(0,0%,100%,.0125)}.b--black-90{border-color:rgba(0,0,0,.9)}.b--black-80{border-color:rgba(0,0,0,.8)}.b--black-70{border-color:rgba(0,0,0,.7)}.b--black-60{border-color:rgba(0,0,0,.6)}.b--black-50{border-color:rgba(0,0,0,.5)}.b--black-40{border-color:rgba(0,0,0,.4)}.b--black-30{border-color:rgba(0,0,0,.3)}.b--black-20{border-color:rgba(0,0,0,.2)}.b--black-10{border-color:rgba(0,0,0,.1)}.b--black-05{border-color:rgba(0,0,0,.05)}.b--black-025{border-color:rgba(0,0,0,.025)}.b--black-0125{border-color:rgba(0,0,0,.0125)}.b--dark-red{border-color:#e7040f}.b--red{border-color:#ff4136}.b--light-red{border-color:#ff725c}.b--orange{border-color:#ff6300}.b--gold{border-color:#ffb700}.b--yellow{border-color:gold}.b--light-yellow{border-color:#fbf1a9}.b--purple{border-color:#5e2ca5}.b--light-purple{border-color:#a463f2}.b--dark-pink{border-color:#d5008f}.b--hot-pink{border-color:#ff41b4}.b--pink{border-color:#ff80cc}.b--light-pink{border-color:#ffa3d7}.b--dark-green{border-color:#137752}.b--green{border-color:#19a974}.b--light-green{border-color:#9eebcf}.b--navy{border-color:#001b44}.b--dark-blue{border-color:#00449e}.b--blue{border-color:#357edd}.b--light-blue{border-color:#96ccff}.b--lightest-blue{border-color:#cdecff}.b--washed-blue{border-color:#f6fffe}.b--washed-green{border-color:#e8fdf5}.b--washed-yellow{border-color:#fffceb}.b--washed-red{border-color:#ffdfdf}.b--transparent{border-color:transparent}.br0{border-radius:0}.br1{border-radius:.125rem}.br2{border-radius:.25rem}.br3{border-radius:.5rem}.br4{border-radius:1rem}.br-100{border-radius:100%}.br-pill{border-radius:9999px}.br--bottom{border-top-left-radius:0;border-top-right-radius:0}.br--top{border-bottom-right-radius:0}.br--right,.br--top{border-bottom-left-radius:0}.br--right{border-top-left-radius:0}.br--left{border-top-right-radius:0;border-bottom-right-radius:0}.b--dotted{border-style:dotted}.b--dashed{border-style:dashed}.b--solid{border-style:solid}.b--none{border-style:none}.bw0{border-width:0}.bw1{border-width:.125rem}.bw2{border-width:.25rem}.bw3{border-width:.5rem}.bw4{border-width:1rem}.bw5{border-width:2rem}.bt-0{border-top-width:0}.br-0{border-right-width:0}.bb-0{border-bottom-width:0}.bl-0{border-left-width:0}.shadow-1{box-shadow:0 0 4px 2px rgba(0,0,0,.2)}.shadow-2{box-shadow:0 0 8px 2px rgba(0,0,0,.2)}.shadow-3{box-shadow:2px 2px 4px 2px rgba(0,0,0,.2)}.shadow-4{box-shadow:2px 2px 8px 0 rgba(0,0,0,.2)}.shadow-5{box-shadow:4px 4px 8px 0 rgba(0,0,0,.2)}.pre{overflow-x:auto;overflow-y:hidden;overflow:scroll}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-0{left:0}.top-1{top:1rem}.right-1{right:1rem}.bottom-1{bottom:1rem}.left-1{left:1rem}.top-2{top:2rem}.right-2{right:2rem}.bottom-2{bottom:2rem}.left-2{left:2rem}.top--1{top:-1rem}.right--1{right:-1rem}.bottom--1{bottom:-1rem}.left--1{left:-1rem}.top--2{top:-2rem}.right--2{right:-2rem}.bottom--2{bottom:-2rem}.left--2{left:-2rem}.absolute--fill{top:0;right:0;bottom:0;left:0}.cf:after,.cf:before{content:\" \";display:table}.cf:after{clear:both}.cf{*zoom:1}.cl{clear:left}.cr{clear:right}.cb{clear:both}.cn{clear:none}.dn{display:none}.di{display:inline}.db{display:block}.dib{display:inline-block}.dit{display:inline-table}.dt{display:table}.dtc{display:table-cell}.dt-row{display:table-row}.dt-row-group{display:table-row-group}.dt-column{display:table-column}.dt-column-group{display:table-column-group}.dt--fixed{table-layout:fixed;width:100%}.flex{display:-webkit-box;display:-ms-flexbox;display:flex}.inline-flex{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.flex-auto{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;min-height:0}.flex-none{-webkit-box-flex:0;-ms-flex:none;flex:none}.flex-column{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.flex-column,.flex-row{-webkit-box-direction:normal}.flex-row{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}.flex-wrap{-ms-flex-wrap:wrap;flex-wrap:wrap}.items-start{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.items-end{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.items-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.items-baseline{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.items-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.self-start{-ms-flex-item-align:start;align-self:flex-start}.self-end{-ms-flex-item-align:end;align-self:flex-end}.self-center{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.self-baseline{-ms-flex-item-align:baseline;align-self:baseline}.self-stretch{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.justify-start{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.justify-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.justify-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.justify-around{-ms-flex-pack:distribute;justify-content:space-around}.content-start{-ms-flex-line-pack:start;align-content:flex-start}.content-end{-ms-flex-line-pack:end;align-content:flex-end}.content-center{-ms-flex-line-pack:center;align-content:center}.content-between{-ms-flex-line-pack:justify;align-content:space-between}.content-around{-ms-flex-line-pack:distribute;align-content:space-around}.content-stretch{-ms-flex-line-pack:stretch;align-content:stretch}.order-0{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.order-1{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.order-2{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.order-3{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.order-4{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.order-5{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.order-6{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.order-7{-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7}.order-8{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8}.order-last{-webkit-box-ordinal-group:100000;-ms-flex-order:99999;order:99999}.fl{float:left}.fl,.fr{_display:inline}.fr{float:right}.fn{float:none}.sans-serif{font-family:-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe ui,arial,sans-serif}.serif{font-family:georgia,times,serif}.system-sans-serif{font-family:sans-serif}.system-serif{font-family:serif}.code,code{font-family:Consolas,monaco,monospace}.courier{font-family:Courier Next,courier,monospace}.helvetica{font-family:helvetica neue,helvetica,sans-serif}.avenir{font-family:avenir next,avenir,sans-serif}.athelas{font-family:athelas,georgia,serif}.georgia{font-family:georgia,serif}.times{font-family:times,serif}.bodoni{font-family:Bodoni MT,serif}.calisto{font-family:Calisto MT,serif}.garamond{font-family:garamond,serif}.baskerville{font-family:baskerville,serif}.i{font-style:italic}.fs-normal{font-style:normal}.normal{font-weight:400}.b{font-weight:700}.fw1{font-weight:100}.fw2{font-weight:200}.fw3{font-weight:300}.fw4{font-weight:400}.fw5{font-weight:500}.fw6{font-weight:600}.fw7{font-weight:700}.fw8{font-weight:800}.fw9{font-weight:900}.input-reset{-webkit-appearance:none;-moz-appearance:none}.button-reset::-moz-focus-inner,.input-reset::-moz-focus-inner{border:0;padding:0}.h1{height:1rem}.h2{height:2rem}.h3{height:4rem}.h4{height:8rem}.h5{height:16rem}.h-25{height:25%}.h-50{height:50%}.h-75{height:75%}.h-100{height:100%}.min-h-100{min-height:100%}.vh-25{height:25vh}.vh-50{height:50vh}.vh-75{height:75vh}.vh-100{height:100vh}.min-vh-100{min-height:100vh}.h-auto{height:auto}.h-inherit{height:inherit}.tracked{letter-spacing:.1em}.tracked-tight{letter-spacing:-.05em}.tracked-mega{letter-spacing:.25em}.lh-solid{line-height:1}.lh-title{line-height:1.25}.lh-copy{line-height:1.5}.link{text-decoration:none}.link,.link:active,.link:focus,.link:hover,.link:link,.link:visited{-webkit-transition:color .15s ease-in;transition:color .15s ease-in}.link:focus{outline:1px dotted currentColor}.list{list-style-type:none}.mw-100{max-width:100%}.mw1{max-width:1rem}.mw2{max-width:2rem}.mw3{max-width:4rem}.mw4{max-width:8rem}.mw5{max-width:16rem}.mw6{max-width:32rem}.mw7{max-width:48rem}.mw8{max-width:64rem}.mw9{max-width:96rem}.mw-none{max-width:none}.w1{width:1rem}.w2{width:2rem}.w3{width:4rem}.w4{width:8rem}.w5{width:16rem}.w-10{width:10%}.w-20{width:20%}.w-25{width:25%}.w-30{width:30%}.w-33{width:33%}.w-34{width:34%}.w-40{width:40%}.w-50{width:50%}.w-60{width:60%}.w-70{width:70%}.w-75{width:75%}.w-80{width:80%}.w-90{width:90%}.w-100{width:100%}.w-third{width:33.33333%}.w-two-thirds{width:66.66667%}.w-auto{width:auto}.overflow-visible{overflow:visible}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-auto{overflow:auto}.overflow-x-visible{overflow-x:visible}.overflow-x-hidden{overflow-x:hidden}.overflow-x-scroll{overflow-x:scroll}.overflow-x-auto{overflow-x:auto}.overflow-y-visible{overflow-y:visible}.overflow-y-hidden{overflow-y:hidden}.overflow-y-scroll{overflow-y:scroll}.overflow-y-auto{overflow-y:auto}.static{position:static}.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.o-100{opacity:1}.o-90{opacity:.9}.o-80{opacity:.8}.o-70{opacity:.7}.o-60{opacity:.6}.o-50{opacity:.5}.o-40{opacity:.4}.o-30{opacity:.3}.o-20{opacity:.2}.o-10{opacity:.1}.o-05{opacity:.05}.o-025{opacity:.025}.o-0{opacity:0}.black-90{color:rgba(0,0,0,.9)}.black-80{color:rgba(0,0,0,.8)}.black-70{color:rgba(0,0,0,.7)}.black-60{color:rgba(0,0,0,.6)}.black-50{color:rgba(0,0,0,.5)}.black-40{color:rgba(0,0,0,.4)}.black-30{color:rgba(0,0,0,.3)}.black-20{color:rgba(0,0,0,.2)}.black-10{color:rgba(0,0,0,.1)}.black-05{color:rgba(0,0,0,.05)}.white-90{color:hsla(0,0%,100%,.9)}.white-80{color:hsla(0,0%,100%,.8)}.white-70{color:hsla(0,0%,100%,.7)}.white-60{color:hsla(0,0%,100%,.6)}.white-50{color:hsla(0,0%,100%,.5)}.white-40{color:hsla(0,0%,100%,.4)}.white-30{color:hsla(0,0%,100%,.3)}.white-20{color:hsla(0,0%,100%,.2)}.white-10{color:hsla(0,0%,100%,.1)}.black{color:#000}.near-black{color:#111}.dark-gray{color:#333}.mid-gray{color:#555}.gray{color:#777}.silver{color:#999}.light-silver{color:#aaa}.moon-gray{color:#ccc}.light-gray{color:#eee}.near-white{color:#f4f4f4}.white{color:#fff}.dark-red{color:#e7040f}.red{color:#ff4136}.light-red{color:#ff725c}.orange{color:#ff6300}.gold{color:#ffb700}.yellow{color:gold}.light-yellow{color:#fbf1a9}.purple{color:#5e2ca5}.light-purple{color:#a463f2}.dark-pink{color:#d5008f}.hot-pink{color:#ff41b4}.pink{color:#ff80cc}.light-pink{color:#ffa3d7}.dark-green{color:#137752}.green{color:#19a974}.light-green{color:#9eebcf}.navy{color:#001b44}.dark-blue{color:#00449e}.blue{color:#357edd}.light-blue{color:#96ccff}.lightest-blue{color:#cdecff}.washed-blue{color:#f6fffe}.washed-green{color:#e8fdf5}.washed-yellow{color:#fffceb}.washed-red{color:#ffdfdf}.bg-black-90{background-color:rgba(0,0,0,.9)}.bg-black-80{background-color:rgba(0,0,0,.8)}.bg-black-70{background-color:rgba(0,0,0,.7)}.bg-black-60{background-color:rgba(0,0,0,.6)}.bg-black-50{background-color:rgba(0,0,0,.5)}.bg-black-40{background-color:rgba(0,0,0,.4)}.bg-black-30{background-color:rgba(0,0,0,.3)}.bg-black-20{background-color:rgba(0,0,0,.2)}.bg-black-10{background-color:rgba(0,0,0,.1)}.bg-black-05{background-color:rgba(0,0,0,.05)}.bg-white-90{background-color:hsla(0,0%,100%,.9)}.bg-white-80{background-color:hsla(0,0%,100%,.8)}.bg-white-70{background-color:hsla(0,0%,100%,.7)}.bg-white-60{background-color:hsla(0,0%,100%,.6)}.bg-white-50{background-color:hsla(0,0%,100%,.5)}.bg-white-40{background-color:hsla(0,0%,100%,.4)}.bg-white-30{background-color:hsla(0,0%,100%,.3)}.bg-white-20{background-color:hsla(0,0%,100%,.2)}.bg-white-10{background-color:hsla(0,0%,100%,.1)}.bg-black{background-color:#000}.bg-near-black{background-color:#111}.bg-dark-gray{background-color:#333}.bg-mid-gray{background-color:#555}.bg-gray{background-color:#777}.bg-silver{background-color:#999}.bg-light-silver{background-color:#aaa}.bg-moon-gray{background-color:#ccc}.bg-light-gray{background-color:#eee}.bg-near-white{background-color:#f4f4f4}.bg-white{background-color:#fff}.bg-transparent{background-color:transparent}.bg-dark-red{background-color:#e7040f}.bg-red{background-color:#ff4136}.bg-light-red{background-color:#ff725c}.bg-orange{background-color:#ff6300}.bg-gold{background-color:#ffb700}.bg-yellow{background-color:gold}.bg-light-yellow{background-color:#fbf1a9}.bg-purple{background-color:#5e2ca5}.bg-light-purple{background-color:#a463f2}.bg-dark-pink{background-color:#d5008f}.bg-hot-pink{background-color:#ff41b4}.bg-pink{background-color:#ff80cc}.bg-light-pink{background-color:#ffa3d7}.bg-dark-green{background-color:#137752}.bg-green{background-color:#19a974}.bg-light-green{background-color:#9eebcf}.bg-navy{background-color:#001b44}.bg-dark-blue{background-color:#00449e}.bg-blue{background-color:#357edd}.bg-light-blue{background-color:#96ccff}.bg-lightest-blue{background-color:#cdecff}.bg-washed-blue{background-color:#f6fffe}.bg-washed-green{background-color:#e8fdf5}.bg-washed-yellow{background-color:#fffceb}.bg-washed-red{background-color:#ffdfdf}.hover-black:focus,.hover-black:hover{color:#000}.hover-near-black:focus,.hover-near-black:hover{color:#111}.hover-dark-gray:focus,.hover-dark-gray:hover{color:#333}.hover-mid-gray:focus,.hover-mid-gray:hover{color:#555}.hover-gray:focus,.hover-gray:hover{color:#777}.hover-silver:focus,.hover-silver:hover{color:#999}.hover-light-silver:focus,.hover-light-silver:hover{color:#aaa}.hover-moon-gray:focus,.hover-moon-gray:hover{color:#ccc}.hover-light-gray:focus,.hover-light-gray:hover{color:#eee}.hover-near-white:focus,.hover-near-white:hover{color:#f4f4f4}.hover-white:focus,.hover-white:hover{color:#fff}.hover-bg-black:focus,.hover-bg-black:hover{background-color:#000}.hover-bg-near-black:focus,.hover-bg-near-black:hover{background-color:#111}.hover-bg-dark-gray:focus,.hover-bg-dark-gray:hover{background-color:#333}.hover-bg-dark-gray:focus,.hover-bg-mid-gray:hover{background-color:#555}.hover-bg-gray:focus,.hover-bg-gray:hover{background-color:#777}.hover-bg-silver:focus,.hover-bg-silver:hover{background-color:#999}.hover-bg-light-silver:focus,.hover-bg-light-silver:hover{background-color:#aaa}.hover-bg-moon-gray:focus,.hover-bg-moon-gray:hover{background-color:#ccc}.hover-bg-light-gray:focus,.hover-bg-light-gray:hover{background-color:#eee}.hover-bg-near-white:focus,.hover-bg-near-white:hover{background-color:#f4f4f4}.hover-bg-white:focus,.hover-bg-white:hover{background-color:#fff}.hover-bg-transparent:focus,.hover-bg-transparent:hover{background-color:transparent}.hover-dark-red:focus,.hover-dark-red:hover{color:#e7040f}.hover-red:focus,.hover-red:hover{color:#ff4136}.hover-light-red:focus,.hover-light-red:hover{color:#ff725c}.hover-orange:focus,.hover-orange:hover{color:#ff6300}.hover-gold:focus,.hover-gold:hover{color:#ffb700}.hover-yellow:focus,.hover-yellow:hover{color:gold}.hover-light-yellow:focus,.hover-light-yellow:hover{color:#fbf1a9}.hover-purple:focus,.hover-purple:hover{color:#5e2ca5}.hover-light-purple:focus,.hover-light-purple:hover{color:#a463f2}.hover-dark-pink:focus,.hover-dark-pink:hover{color:#d5008f}.hover-hot-pink:focus,.hover-hot-pink:hover{color:#ff41b4}.hover-pink:focus,.hover-pink:hover{color:#ff80cc}.hover-light-pink:focus,.hover-light-pink:hover{color:#ffa3d7}.hover-dark-green:focus,.hover-dark-green:hover{color:#137752}.hover-green:focus,.hover-green:hover{color:#19a974}.hover-light-green:focus,.hover-light-green:hover{color:#9eebcf}.hover-navy:focus,.hover-navy:hover{color:#001b44}.hover-dark-blue:focus,.hover-dark-blue:hover{color:#00449e}.hover-blue:focus,.hover-blue:hover{color:#357edd}.hover-light-blue:focus,.hover-light-blue:hover{color:#96ccff}.hover-lightest-blue:focus,.hover-lightest-blue:hover{color:#cdecff}.hover-washed-blue:focus,.hover-washed-blue:hover{color:#f6fffe}.hover-washed-green:focus,.hover-washed-green:hover{color:#e8fdf5}.hover-washed-yellow:focus,.hover-washed-yellow:hover{color:#fffceb}.hover-washed-red:focus,.hover-washed-red:hover{color:#ffdfdf}.hover-bg-dark-red:focus,.hover-bg-dark-red:hover{background-color:#e7040f}.hover-bg-red:focus,.hover-bg-red:hover{background-color:#ff4136}.hover-bg-light-red:focus,.hover-bg-light-red:hover{background-color:#ff725c}.hover-bg-orange:focus,.hover-bg-orange:hover{background-color:#ff6300}.hover-bg-gold:focus,.hover-bg-gold:hover{background-color:#ffb700}.hover-bg-yellow:focus,.hover-bg-yellow:hover{background-color:gold}.hover-bg-light-yellow:focus,.hover-bg-light-yellow:hover{background-color:#fbf1a9}.hover-bg-purple:focus,.hover-bg-purple:hover{background-color:#5e2ca5}.hover-bg-light-purple:focus,.hover-bg-light-purple:hover{background-color:#a463f2}.hover-bg-dark-pink:focus,.hover-bg-dark-pink:hover{background-color:#d5008f}.hover-bg-hot-pink:focus,.hover-bg-hot-pink:hover{background-color:#ff41b4}.hover-bg-pink:focus,.hover-bg-pink:hover{background-color:#ff80cc}.hover-bg-light-pink:focus,.hover-bg-light-pink:hover{background-color:#ffa3d7}.hover-bg-dark-green:focus,.hover-bg-dark-green:hover{background-color:#137752}.hover-bg-green:focus,.hover-bg-green:hover{background-color:#19a974}.hover-bg-light-green:focus,.hover-bg-light-green:hover{background-color:#9eebcf}.hover-bg-navy:focus,.hover-bg-navy:hover{background-color:#001b44}.hover-bg-dark-blue:focus,.hover-bg-dark-blue:hover{background-color:#00449e}.hover-bg-blue:focus,.hover-bg-blue:hover{background-color:#357edd}.hover-bg-light-blue:focus,.hover-bg-light-blue:hover{background-color:#96ccff}.hover-bg-lightest-blue:focus,.hover-bg-lightest-blue:hover{background-color:#cdecff}.hover-bg-washed-blue:focus,.hover-bg-washed-blue:hover{background-color:#f6fffe}.hover-bg-washed-green:focus,.hover-bg-washed-green:hover{background-color:#e8fdf5}.hover-bg-washed-yellow:focus,.hover-bg-washed-yellow:hover{background-color:#fffceb}.hover-bg-washed-red:focus,.hover-bg-washed-red:hover{background-color:#ffdfdf}.pa0{padding:0}.pa1{padding:.25rem}.pa2{padding:.5rem}.pa3{padding:1rem}.pa4{padding:2rem}.pa5{padding:4rem}.pa6{padding:8rem}.pa7{padding:16rem}.pl0{padding-left:0}.pl1{padding-left:.25rem}.pl2{padding-left:.5rem}.pl3{padding-left:1rem}.pl4{padding-left:2rem}.pl5{padding-left:4rem}.pl6{padding-left:8rem}.pl7{padding-left:16rem}.pr0{padding-right:0}.pr1{padding-right:.25rem}.pr2{padding-right:.5rem}.pr3{padding-right:1rem}.pr4{padding-right:2rem}.pr5{padding-right:4rem}.pr6{padding-right:8rem}.pr7{padding-right:16rem}.pb0{padding-bottom:0}.pb1{padding-bottom:.25rem}.pb2{padding-bottom:.5rem}.pb3{padding-bottom:1rem}.pb4{padding-bottom:2rem}.pb5{padding-bottom:4rem}.pb6{padding-bottom:8rem}.pb7{padding-bottom:16rem}.pt0{padding-top:0}.pt1{padding-top:.25rem}.pt2{padding-top:.5rem}.pt3{padding-top:1rem}.pt4{padding-top:2rem}.pt5{padding-top:4rem}.pt6{padding-top:8rem}.pt7{padding-top:16rem}.pv0{padding-top:0;padding-bottom:0}.pv1{padding-top:.25rem;padding-bottom:.25rem}.pv2{padding-top:.5rem;padding-bottom:.5rem}.pv3{padding-top:1rem;padding-bottom:1rem}.pv4{padding-top:2rem;padding-bottom:2rem}.pv5{padding-top:4rem;padding-bottom:4rem}.pv6{padding-top:8rem;padding-bottom:8rem}.pv7{padding-top:16rem;padding-bottom:16rem}.ph0{padding-left:0;padding-right:0}.ph1{padding-left:.25rem;padding-right:.25rem}.ph2{padding-left:.5rem;padding-right:.5rem}.ph3{padding-left:1rem;padding-right:1rem}.ph4{padding-left:2rem;padding-right:2rem}.ph5{padding-left:4rem;padding-right:4rem}.ph6{padding-left:8rem;padding-right:8rem}.ph7{padding-left:16rem;padding-right:16rem}.ma0{margin:0}.ma1{margin:.25rem}.ma2{margin:.5rem}.ma3{margin:1rem}.ma4{margin:2rem}.ma5{margin:4rem}.ma6{margin:8rem}.ma7{margin:16rem}.ml0{margin-left:0}.ml1{margin-left:.25rem}.ml2{margin-left:.5rem}.ml3{margin-left:1rem}.ml4{margin-left:2rem}.ml5{margin-left:4rem}.ml6{margin-left:8rem}.ml7{margin-left:16rem}.mr0{margin-right:0}.mr1{margin-right:.25rem}.mr2{margin-right:.5rem}.mr3{margin-right:1rem}.mr4{margin-right:2rem}.mr5{margin-right:4rem}.mr6{margin-right:8rem}.mr7{margin-right:16rem}.mb0{margin-bottom:0}.mb1{margin-bottom:.25rem}.mb2{margin-bottom:.5rem}.mb3{margin-bottom:1rem}.mb4{margin-bottom:2rem}.mb5{margin-bottom:4rem}.mb6{margin-bottom:8rem}.mb7{margin-bottom:16rem}.mt0{margin-top:0}.mt1{margin-top:.25rem}.mt2{margin-top:.5rem}.mt3{margin-top:1rem}.mt4{margin-top:2rem}.mt5{margin-top:4rem}.mt6{margin-top:8rem}.mt7{margin-top:16rem}.mv0{margin-top:0;margin-bottom:0}.mv1{margin-top:.25rem;margin-bottom:.25rem}.mv2{margin-top:.5rem;margin-bottom:.5rem}.mv3{margin-top:1rem;margin-bottom:1rem}.mv4{margin-top:2rem;margin-bottom:2rem}.mv5{margin-top:4rem;margin-bottom:4rem}.mv6{margin-top:8rem;margin-bottom:8rem}.mv7{margin-top:16rem;margin-bottom:16rem}.mh0{margin-left:0;margin-right:0}.mh1{margin-left:.25rem;margin-right:.25rem}.mh2{margin-left:.5rem;margin-right:.5rem}.mh3{margin-left:1rem;margin-right:1rem}.mh4{margin-left:2rem;margin-right:2rem}.mh5{margin-left:4rem;margin-right:4rem}.mh6{margin-left:8rem;margin-right:8rem}.mh7{margin-left:16rem;margin-right:16rem}.collapse{border-collapse:collapse;border-spacing:0}.striped--light-silver:nth-child(odd){background-color:#aaa}.striped--moon-gray:nth-child(odd){background-color:#ccc}.striped--light-gray:nth-child(odd){background-color:#eee}.striped--near-white:nth-child(odd){background-color:#f4f4f4}.stripe-light:nth-child(odd){background-color:hsla(0,0%,100%,.1)}.stripe-dark:nth-child(odd){background-color:rgba(0,0,0,.1)}.strike{text-decoration:line-through}.underline{text-decoration:underline}.no-underline{text-decoration:none}.tl{text-align:left}.tr{text-align:right}.tc{text-align:center}.ttc{text-transform:capitalize}.ttl{text-transform:lowercase}.ttu{text-transform:uppercase}.ttn{text-transform:none}.f-6,.f-headline{font-size:6rem}.f-5,.f-subheadline{font-size:5rem}.f1{font-size:3rem}.f2{font-size:2.25rem}.f3{font-size:1.5rem}.f4{font-size:1.25rem}.f5{font-size:1rem}.f6{font-size:.875rem}.measure{max-width:30em}.measure-wide{max-width:34em}.measure-narrow{max-width:20em}.indent{text-indent:1em;margin-top:0;margin-bottom:0}.small-caps{font-variant:small-caps}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.aspect-ratio{height:0;position:relative}.aspect-ratio--16x9{padding-bottom:56.25%}.aspect-ratio--9x16{padding-bottom:177.77%}.aspect-ratio--4x3{padding-bottom:75%}.aspect-ratio--3x4{padding-bottom:133.33%}.aspect-ratio--6x4{padding-bottom:66.6%}.aspect-ratio--4x6{padding-bottom:150%}.aspect-ratio--8x5{padding-bottom:62.5%}.aspect-ratio--5x8{padding-bottom:160%}.aspect-ratio--7x5{padding-bottom:71.42%}.aspect-ratio--5x7{padding-bottom:140%}.aspect-ratio--1x1{padding-bottom:100%}.aspect-ratio--object{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;z-index:6}.overflow-container{overflow-y:scroll}.center{margin-right:auto;margin-left:auto}.clip{position:fixed!important;_position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.ws-normal{white-space:normal}.nowrap{white-space:nowrap}.pre{white-space:pre}.v-base{vertical-align:baseline}.v-mid{vertical-align:middle}.v-top{vertical-align:top}.v-btm{vertical-align:bottom}.dim{opacity:1}.dim,.dim:focus,.dim:hover{-webkit-transition:opacity .15s ease-in;transition:opacity .15s ease-in}.dim:focus,.dim:hover{opacity:.5}.dim:active{opacity:.8;-webkit-transition:opacity .15s ease-out;transition:opacity .15s ease-out}.hide-child .child{opacity:0;-webkit-transition:opacity .15s ease-in;transition:opacity .15s ease-in}.hide-child:active .child,.hide-child:focus .child,.hide-child:hover .child{opacity:1;-webkit-transition:opacity .15s ease-in;transition:opacity .15s ease-in}.underline-hover:focus,.underline-hover:hover{text-decoration:underline}.grow{-moz-osx-font-smoothing:grayscale;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .25s ease-out;transition:-webkit-transform .25s ease-out;transition:transform .25s ease-out;transition:transform .25s ease-out,-webkit-transform .25s ease-out}.grow:focus,.grow:hover{-webkit-transform:scale(1.05);transform:scale(1.05)}.grow:active{-webkit-transform:scale(.9);transform:scale(.9)}.grow-large{-moz-osx-font-smoothing:grayscale;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:-webkit-transform .25s ease-in-out;transition:-webkit-transform .25s ease-in-out;transition:transform .25s ease-in-out;transition:transform .25s ease-in-out,-webkit-transform .25s ease-in-out}.grow-large:focus,.grow-large:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.grow-large:active{-webkit-transform:scale(.95);transform:scale(.95)}.pointer:hover{cursor:pointer}.shadow-hover:after{box-shadow:0 0 8px 2px rgba(0,0,0,.2);opacity:0;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}.shadow-hover:focus:after,.shadow-hover:hover:after{opacity:1}.bg-animate,.bg-animate:focus,.bg-animate:hover{-webkit-transition:background-color .15s ease-in-out;transition:background-color .15s ease-in-out}.z-0{z-index:0}.z-1{z-index:1}.z-2{z-index:2}.z-3{z-index:3}.z-4{z-index:4}.z-5{z-index:5}.z-999{z-index:7}.z-9999{z-index:8}.z-max{z-index:9}.z-inherit{z-index:inherit}.z-initial{z-index:auto}.z-unset{z-index:unset}.debug *{outline:1px solid gold}.debug-white *{outline:1px solid #fff}.debug-black *{outline:1px solid #000}.debug-grid{background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTRDOTY4N0U2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTRDOTY4N0Q2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3NjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3NzY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsBS+GMAAAAjSURBVHjaYvz//z8DLsD4gcGXiYEAGBIKGBne//fFpwAgwAB98AaF2pjlUQAAAABJRU5ErkJggg==) repeat 0 0}.debug-grid-16{background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODYyRjhERDU2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODYyRjhERDQ2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3QTY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3QjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvCS01IAAABMSURBVHjaYmR4/5+BFPBfAMFm/MBgx8RAGWCn1AAmSg34Q6kBDKMGMDCwICeMIemF/5QawEipAWwUhwEjMDvbAWlWkvVBwu8vQIABAEwBCph8U6c0AAAAAElFTkSuQmCC) repeat 0 0}.debug-grid-8-solid{background:#fff url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxMjI0OTczNjdCMzExRTZCMkJDRTI0MDgxMDAyMTcxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxMjI0OTc0NjdCMzExRTZCMkJDRTI0MDgxMDAyMTcxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjEyMjQ5NzE2N0IzMTFFNkIyQkNFMjQwODEwMDIxNzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjEyMjQ5NzI2N0IzMTFFNkIyQkNFMjQwODEwMDIxNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAgDASIAAhEBAxEB/8QAWQABAQAAAAAAAAAAAAAAAAAAAAYBAQEAAAAAAAAAAAAAAAAAAAIEEAEBAAMBAAAAAAAAAAAAAAABADECA0ERAAEDBQAAAAAAAAAAAAAAAAARITFBUWESIv/aAAwDAQACEQMRAD8AoOnTV1QTD7JJshP3vSM3P//Z) repeat 0 0}.debug-grid-16-solid{background:#fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzY3MkJEN0U2N0M1MTFFNkIyQkNFMjQwODEwMDIxNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzY3MkJEN0Y2N0M1MTFFNkIyQkNFMjQwODEwMDIxNzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3QzY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3RDY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pve6J3kAAAAzSURBVHjaYvz//z8D0UDsMwMjSRoYP5Gq4SPNbRjVMEQ1fCRDg+in/6+J1AJUxsgAEGAA31BAJMS0GYEAAAAASUVORK5CYII=) repeat 0 0}@media screen and (min-width:30em){.cover-ns{background-size:cover!important}.contain-ns{background-size:contain!important}.bg-center-ns{background-position:50%}.bg-center-ns,.bg-top-ns{background-repeat:no-repeat}.bg-top-ns{background-position:top}.bg-right-ns{background-position:100%}.bg-bottom-ns,.bg-right-ns{background-repeat:no-repeat}.bg-bottom-ns{background-position:bottom}.bg-left-ns{background-repeat:no-repeat;background-position:0}.outline-ns{outline:1px solid}.outline-transparent-ns{outline:1px solid transparent}.outline-0-ns{outline:0}.ba-ns{border-style:solid;border-width:1px}.bt-ns{border-top-style:solid;border-top-width:1px}.br-ns{border-right-style:solid;border-right-width:1px}.bb-ns{border-bottom-style:solid;border-bottom-width:1px}.bl-ns{border-left-style:solid;border-left-width:1px}.bn-ns{border-style:none;border-width:0}.br0-ns{border-radius:0}.br1-ns{border-radius:.125rem}.br2-ns{border-radius:.25rem}.br3-ns{border-radius:.5rem}.br4-ns{border-radius:1rem}.br-100-ns{border-radius:100%}.br-pill-ns{border-radius:9999px}.br--bottom-ns{border-top-left-radius:0;border-top-right-radius:0}.br--top-ns{border-bottom-right-radius:0}.br--right-ns,.br--top-ns{border-bottom-left-radius:0}.br--right-ns{border-top-left-radius:0}.br--left-ns{border-top-right-radius:0;border-bottom-right-radius:0}.b--dotted-ns{border-style:dotted}.b--dashed-ns{border-style:dashed}.b--solid-ns{border-style:solid}.b--none-ns{border-style:none}.bw0-ns{border-width:0}.bw1-ns{border-width:.125rem}.bw2-ns{border-width:.25rem}.bw3-ns{border-width:.5rem}.bw4-ns{border-width:1rem}.bw5-ns{border-width:2rem}.bt-0-ns{border-top-width:0}.br-0-ns{border-right-width:0}.bb-0-ns{border-bottom-width:0}.bl-0-ns{border-left-width:0}.shadow-1-ns{box-shadow:0 0 4px 2px rgba(0,0,0,.2)}.shadow-2-ns{box-shadow:0 0 8px 2px rgba(0,0,0,.2)}.shadow-3-ns{box-shadow:2px 2px 4px 2px rgba(0,0,0,.2)}.shadow-4-ns{box-shadow:2px 2px 8px 0 rgba(0,0,0,.2)}.shadow-5-ns{box-shadow:4px 4px 8px 0 rgba(0,0,0,.2)}.top-0-ns{top:0}.left-0-ns{left:0}.right-0-ns{right:0}.bottom-0-ns{bottom:0}.top-1-ns{top:1rem}.left-1-ns{left:1rem}.right-1-ns{right:1rem}.bottom-1-ns{bottom:1rem}.top-2-ns{top:2rem}.left-2-ns{left:2rem}.right-2-ns{right:2rem}.bottom-2-ns{bottom:2rem}.top--1-ns{top:-1rem}.right--1-ns{right:-1rem}.bottom--1-ns{bottom:-1rem}.left--1-ns{left:-1rem}.top--2-ns{top:-2rem}.right--2-ns{right:-2rem}.bottom--2-ns{bottom:-2rem}.left--2-ns{left:-2rem}.absolute--fill-ns{top:0;right:0;bottom:0;left:0}.cl-ns{clear:left}.cr-ns{clear:right}.cb-ns{clear:both}.cn-ns{clear:none}.dn-ns{display:none}.di-ns{display:inline}.db-ns{display:block}.dib-ns{display:inline-block}.dit-ns{display:inline-table}.dt-ns{display:table}.dtc-ns{display:table-cell}.dt-row-ns{display:table-row}.dt-row-group-ns{display:table-row-group}.dt-column-ns{display:table-column}.dt-column-group-ns{display:table-column-group}.dt--fixed-ns{table-layout:fixed;width:100%}.flex-ns{display:-webkit-box;display:-ms-flexbox;display:flex}.inline-flex-ns{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.flex-auto-ns{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;min-height:0}.flex-none-ns{-webkit-box-flex:0;-ms-flex:none;flex:none}.flex-column-ns{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flex-row-ns{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.flex-wrap-ns{-ms-flex-wrap:wrap;flex-wrap:wrap}.items-start-ns{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.items-end-ns{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.items-center-ns{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.items-baseline-ns{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.items-stretch-ns{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.self-start-ns{-ms-flex-item-align:start;align-self:flex-start}.self-end-ns{-ms-flex-item-align:end;align-self:flex-end}.self-center-ns{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.self-baseline-ns{-ms-flex-item-align:baseline;align-self:baseline}.self-stretch-ns{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.justify-start-ns{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.justify-end-ns{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.justify-center-ns{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.justify-between-ns{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.justify-around-ns{-ms-flex-pack:distribute;justify-content:space-around}.content-start-ns{-ms-flex-line-pack:start;align-content:flex-start}.content-end-ns{-ms-flex-line-pack:end;align-content:flex-end}.content-center-ns{-ms-flex-line-pack:center;align-content:center}.content-between-ns{-ms-flex-line-pack:justify;align-content:space-between}.content-around-ns{-ms-flex-line-pack:distribute;align-content:space-around}.content-stretch-ns{-ms-flex-line-pack:stretch;align-content:stretch}.order-0-ns{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.order-1-ns{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.order-2-ns{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.order-3-ns{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.order-4-ns{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.order-5-ns{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.order-6-ns{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.order-7-ns{-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7}.order-8-ns{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8}.order-last-ns{-webkit-box-ordinal-group:100000;-ms-flex-order:99999;order:99999}.fl-ns{float:left}.fl-ns,.fr-ns{display:inline}.fr-ns{float:right}.fn-ns{float:none}.i-ns{font-style:italic}.fs-normal-ns{font-style:normal}.normal-ns{font-weight:400}.b-ns{font-weight:700}.fw1-ns{font-weight:100}.fw2-ns{font-weight:200}.fw3-ns{font-weight:300}.fw4-ns{font-weight:400}.fw5-ns{font-weight:500}.fw6-ns{font-weight:600}.fw7-ns{font-weight:700}.fw8-ns{font-weight:800}.fw9-ns{font-weight:900}.h1-ns{height:1rem}.h2-ns{height:2rem}.h3-ns{height:4rem}.h4-ns{height:8rem}.h5-ns{height:16rem}.h-25-ns{height:25%}.h-50-ns{height:50%}.h-75-ns{height:75%}.h-100-ns{height:100%}.min-h-100-ns{min-height:100%}.vh-25-ns{height:25vh}.vh-50-ns{height:50vh}.vh-75-ns{height:75vh}.vh-100-ns{height:100vh}.min-vh-100-ns{min-height:100vh}.h-auto-ns{height:auto}.h-inherit-ns{height:inherit}.tracked-ns{letter-spacing:.1em}.tracked-tight-ns{letter-spacing:-.05em}.tracked-mega-ns{letter-spacing:.25em}.lh-solid-ns{line-height:1}.lh-title-ns{line-height:1.25}.lh-copy-ns{line-height:1.5}.mw-100-ns{max-width:100%}.mw1-ns{max-width:1rem}.mw2-ns{max-width:2rem}.mw3-ns{max-width:4rem}.mw4-ns{max-width:8rem}.mw5-ns{max-width:16rem}.mw6-ns{max-width:32rem}.mw7-ns{max-width:48rem}.mw8-ns{max-width:64rem}.mw9-ns{max-width:96rem}.mw-none-ns{max-width:none}.w1-ns{width:1rem}.w2-ns{width:2rem}.w3-ns{width:4rem}.w4-ns{width:8rem}.w5-ns{width:16rem}.w-10-ns{width:10%}.w-20-ns{width:20%}.w-25-ns{width:25%}.w-30-ns{width:30%}.w-33-ns{width:33%}.w-34-ns{width:34%}.w-40-ns{width:40%}.w-50-ns{width:50%}.w-60-ns{width:60%}.w-70-ns{width:70%}.w-75-ns{width:75%}.w-80-ns{width:80%}.w-90-ns{width:90%}.w-100-ns{width:100%}.w-third-ns{width:33.33333%}.w-two-thirds-ns{width:66.66667%}.w-auto-ns{width:auto}.overflow-visible-ns{overflow:visible}.overflow-hidden-ns{overflow:hidden}.overflow-scroll-ns{overflow:scroll}.overflow-auto-ns{overflow:auto}.overflow-x-visible-ns{overflow-x:visible}.overflow-x-hidden-ns{overflow-x:hidden}.overflow-x-scroll-ns{overflow-x:scroll}.overflow-x-auto-ns{overflow-x:auto}.overflow-y-visible-ns{overflow-y:visible}.overflow-y-hidden-ns{overflow-y:hidden}.overflow-y-scroll-ns{overflow-y:scroll}.overflow-y-auto-ns{overflow-y:auto}.static-ns{position:static}.relative-ns{position:relative}.absolute-ns{position:absolute}.fixed-ns{position:fixed}.pa0-ns{padding:0}.pa1-ns{padding:.25rem}.pa2-ns{padding:.5rem}.pa3-ns{padding:1rem}.pa4-ns{padding:2rem}.pa5-ns{padding:4rem}.pa6-ns{padding:8rem}.pa7-ns{padding:16rem}.pl0-ns{padding-left:0}.pl1-ns{padding-left:.25rem}.pl2-ns{padding-left:.5rem}.pl3-ns{padding-left:1rem}.pl4-ns{padding-left:2rem}.pl5-ns{padding-left:4rem}.pl6-ns{padding-left:8rem}.pl7-ns{padding-left:16rem}.pr0-ns{padding-right:0}.pr1-ns{padding-right:.25rem}.pr2-ns{padding-right:.5rem}.pr3-ns{padding-right:1rem}.pr4-ns{padding-right:2rem}.pr5-ns{padding-right:4rem}.pr6-ns{padding-right:8rem}.pr7-ns{padding-right:16rem}.pb0-ns{padding-bottom:0}.pb1-ns{padding-bottom:.25rem}.pb2-ns{padding-bottom:.5rem}.pb3-ns{padding-bottom:1rem}.pb4-ns{padding-bottom:2rem}.pb5-ns{padding-bottom:4rem}.pb6-ns{padding-bottom:8rem}.pb7-ns{padding-bottom:16rem}.pt0-ns{padding-top:0}.pt1-ns{padding-top:.25rem}.pt2-ns{padding-top:.5rem}.pt3-ns{padding-top:1rem}.pt4-ns{padding-top:2rem}.pt5-ns{padding-top:4rem}.pt6-ns{padding-top:8rem}.pt7-ns{padding-top:16rem}.pv0-ns{padding-top:0;padding-bottom:0}.pv1-ns{padding-top:.25rem;padding-bottom:.25rem}.pv2-ns{padding-top:.5rem;padding-bottom:.5rem}.pv3-ns{padding-top:1rem;padding-bottom:1rem}.pv4-ns{padding-top:2rem;padding-bottom:2rem}.pv5-ns{padding-top:4rem;padding-bottom:4rem}.pv6-ns{padding-top:8rem;padding-bottom:8rem}.pv7-ns{padding-top:16rem;padding-bottom:16rem}.ph0-ns{padding-left:0;padding-right:0}.ph1-ns{padding-left:.25rem;padding-right:.25rem}.ph2-ns{padding-left:.5rem;padding-right:.5rem}.ph3-ns{padding-left:1rem;padding-right:1rem}.ph4-ns{padding-left:2rem;padding-right:2rem}.ph5-ns{padding-left:4rem;padding-right:4rem}.ph6-ns{padding-left:8rem;padding-right:8rem}.ph7-ns{padding-left:16rem;padding-right:16rem}.ma0-ns{margin:0}.ma1-ns{margin:.25rem}.ma2-ns{margin:.5rem}.ma3-ns{margin:1rem}.ma4-ns{margin:2rem}.ma5-ns{margin:4rem}.ma6-ns{margin:8rem}.ma7-ns{margin:16rem}.ml0-ns{margin-left:0}.ml1-ns{margin-left:.25rem}.ml2-ns{margin-left:.5rem}.ml3-ns{margin-left:1rem}.ml4-ns{margin-left:2rem}.ml5-ns{margin-left:4rem}.ml6-ns{margin-left:8rem}.ml7-ns{margin-left:16rem}.mr0-ns{margin-right:0}.mr1-ns{margin-right:.25rem}.mr2-ns{margin-right:.5rem}.mr3-ns{margin-right:1rem}.mr4-ns{margin-right:2rem}.mr5-ns{margin-right:4rem}.mr6-ns{margin-right:8rem}.mr7-ns{margin-right:16rem}.mb0-ns{margin-bottom:0}.mb1-ns{margin-bottom:.25rem}.mb2-ns{margin-bottom:.5rem}.mb3-ns{margin-bottom:1rem}.mb4-ns{margin-bottom:2rem}.mb5-ns{margin-bottom:4rem}.mb6-ns{margin-bottom:8rem}.mb7-ns{margin-bottom:16rem}.mt0-ns{margin-top:0}.mt1-ns{margin-top:.25rem}.mt2-ns{margin-top:.5rem}.mt3-ns{margin-top:1rem}.mt4-ns{margin-top:2rem}.mt5-ns{margin-top:4rem}.mt6-ns{margin-top:8rem}.mt7-ns{margin-top:16rem}.mv0-ns{margin-top:0;margin-bottom:0}.mv1-ns{margin-top:.25rem;margin-bottom:.25rem}.mv2-ns{margin-top:.5rem;margin-bottom:.5rem}.mv3-ns{margin-top:1rem;margin-bottom:1rem}.mv4-ns{margin-top:2rem;margin-bottom:2rem}.mv5-ns{margin-top:4rem;margin-bottom:4rem}.mv6-ns{margin-top:8rem;margin-bottom:8rem}.mv7-ns{margin-top:16rem;margin-bottom:16rem}.mh0-ns{margin-left:0;margin-right:0}.mh1-ns{margin-left:.25rem;margin-right:.25rem}.mh2-ns{margin-left:.5rem;margin-right:.5rem}.mh3-ns{margin-left:1rem;margin-right:1rem}.mh4-ns{margin-left:2rem;margin-right:2rem}.mh5-ns{margin-left:4rem;margin-right:4rem}.mh6-ns{margin-left:8rem;margin-right:8rem}.mh7-ns{margin-left:16rem;margin-right:16rem}.strike-ns{text-decoration:line-through}.underline-ns{text-decoration:underline}.no-underline-ns{text-decoration:none}.tl-ns{text-align:left}.tr-ns{text-align:right}.tc-ns{text-align:center}.ttc-ns{text-transform:capitalize}.ttl-ns{text-transform:lowercase}.ttu-ns{text-transform:uppercase}.ttn-ns{text-transform:none}.f-6-ns,.f-headline-ns{font-size:6rem}.f-5-ns,.f-subheadline-ns{font-size:5rem}.f1-ns{font-size:3rem}.f2-ns{font-size:2.25rem}.f3-ns{font-size:1.5rem}.f4-ns{font-size:1.25rem}.f5-ns{font-size:1rem}.f6-ns{font-size:.875rem}.measure-ns{max-width:30em}.measure-wide-ns{max-width:34em}.measure-narrow-ns{max-width:20em}.indent-ns{text-indent:1em;margin-top:0;margin-bottom:0}.small-caps-ns{font-variant:small-caps}.truncate-ns{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.clip-ns{position:fixed!important;position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.ws-normal-ns{white-space:normal}.nowrap-ns{white-space:nowrap}.pre-ns{white-space:pre}.v-base-ns{vertical-align:baseline}.v-mid-ns{vertical-align:middle}.v-top-ns{vertical-align:top}.v-btm-ns{vertical-align:bottom}}@media screen and (min-width:30em) and (max-width:60em){.cover-m{background-size:cover!important}.contain-m{background-size:contain!important}.bg-center-m{background-position:50%}.bg-center-m,.bg-top-m{background-repeat:no-repeat}.bg-top-m{background-position:top}.bg-right-m{background-position:100%}.bg-bottom-m,.bg-right-m{background-repeat:no-repeat}.bg-bottom-m{background-position:bottom}.bg-left-m{background-repeat:no-repeat;background-position:0}.outline-m{outline:1px solid}.outline-transparent-m{outline:1px solid transparent}.outline-0-m{outline:0}.outline-l{outline:1px solid}.outline-transparent-l{outline:1px solid transparent}.outline-0-l{outline:0}.ba-m{border-style:solid;border-width:1px}.bt-m{border-top-style:solid;border-top-width:1px}.br-m{border-right-style:solid;border-right-width:1px}.bb-m{border-bottom-style:solid;border-bottom-width:1px}.bl-m{border-left-style:solid;border-left-width:1px}.bn-m{border-style:none;border-width:0}.br0-m{border-radius:0}.br1-m{border-radius:.125rem}.br2-m{border-radius:.25rem}.br3-m{border-radius:.5rem}.br4-m{border-radius:1rem}.br-100-m{border-radius:100%}.br-pill-m{border-radius:9999px}.br--bottom-m{border-top-left-radius:0;border-top-right-radius:0}.br--top-m{border-bottom-right-radius:0}.br--right-m,.br--top-m{border-bottom-left-radius:0}.br--right-m{border-top-left-radius:0}.br--left-m{border-top-right-radius:0;border-bottom-right-radius:0}.b--dotted-m{border-style:dotted}.b--dashed-m{border-style:dashed}.b--solid-m{border-style:solid}.b--none-m{border-style:none}.bw0-m{border-width:0}.bw1-m{border-width:.125rem}.bw2-m{border-width:.25rem}.bw3-m{border-width:.5rem}.bw4-m{border-width:1rem}.bw5-m{border-width:2rem}.bt-0-m{border-top-width:0}.br-0-m{border-right-width:0}.bb-0-m{border-bottom-width:0}.bl-0-m{border-left-width:0}.shadow-1-m{box-shadow:0 0 4px 2px rgba(0,0,0,.2)}.shadow-2-m{box-shadow:0 0 8px 2px rgba(0,0,0,.2)}.shadow-3-m{box-shadow:2px 2px 4px 2px rgba(0,0,0,.2)}.shadow-4-m{box-shadow:2px 2px 8px 0 rgba(0,0,0,.2)}.shadow-5-m{box-shadow:4px 4px 8px 0 rgba(0,0,0,.2)}.top-0-m{top:0}.left-0-m{left:0}.right-0-m{right:0}.bottom-0-m{bottom:0}.top-1-m{top:1rem}.left-1-m{left:1rem}.right-1-m{right:1rem}.bottom-1-m{bottom:1rem}.top-2-m{top:2rem}.left-2-m{left:2rem}.right-2-m{right:2rem}.bottom-2-m{bottom:2rem}.top--1-m{top:-1rem}.right--1-m{right:-1rem}.bottom--1-m{bottom:-1rem}.left--1-m{left:-1rem}.top--2-m{top:-2rem}.right--2-m{right:-2rem}.bottom--2-m{bottom:-2rem}.left--2-m{left:-2rem}.absolute--fill-m{top:0;right:0;bottom:0;left:0}.cl-m{clear:left}.cr-m{clear:right}.cb-m{clear:both}.cn-m{clear:none}.dn-m{display:none}.di-m{display:inline}.db-m{display:block}.dib-m{display:inline-block}.dit-m{display:inline-table}.dt-m{display:table}.dtc-m{display:table-cell}.dt-row-m{display:table-row}.dt-row-group-m{display:table-row-group}.dt-column-m{display:table-column}.dt-column-group-m{display:table-column-group}.dt--fixed-m{table-layout:fixed;width:100%}.flex-m{display:-webkit-box;display:-ms-flexbox;display:flex}.inline-flex-m{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.flex-auto-m{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;min-height:0}.flex-none-m{-webkit-box-flex:0;-ms-flex:none;flex:none}.flex-column-m{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.flex-column-m,.flex-row-m{-webkit-box-direction:normal}.flex-row-m{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}.flex-wrap-m{-ms-flex-wrap:wrap;flex-wrap:wrap}.items-start-m{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.items-end-m{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.items-center-m{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.items-baseline-m{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.items-stretch-m{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.self-start-m{-ms-flex-item-align:start;align-self:flex-start}.self-end-m{-ms-flex-item-align:end;align-self:flex-end}.self-center-m{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.self-baseline-m{-ms-flex-item-align:baseline;align-self:baseline}.self-stretch-m{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.justify-start-m{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.justify-end-m{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.justify-center-m{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.justify-between-m{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.justify-around-m{-ms-flex-pack:distribute;justify-content:space-around}.content-start-m{-ms-flex-line-pack:start;align-content:flex-start}.content-end-m{-ms-flex-line-pack:end;align-content:flex-end}.content-center-m{-ms-flex-line-pack:center;align-content:center}.content-between-m{-ms-flex-line-pack:justify;align-content:space-between}.content-around-m{-ms-flex-line-pack:distribute;align-content:space-around}.content-stretch-m{-ms-flex-line-pack:stretch;align-content:stretch}.order-0-m{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.order-1-m{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.order-2-m{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.order-3-m{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.order-4-m{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.order-5-m{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.order-6-m{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.order-7-m{-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7}.order-8-m{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8}.order-last-m{-webkit-box-ordinal-group:100000;-ms-flex-order:99999;order:99999}.fl-m{float:left}.fl-m,.fr-m{display:inline}.fr-m{float:right}.fn-m{float:none}.i-m{font-style:italic}.fs-normal-m{font-style:normal}.normal-m{font-weight:400}.b-m{font-weight:700}.fw1-m{font-weight:100}.fw2-m{font-weight:200}.fw3-m{font-weight:300}.fw4-m{font-weight:400}.fw5-m{font-weight:500}.fw6-m{font-weight:600}.fw7-m{font-weight:700}.fw8-m{font-weight:800}.fw9-m{font-weight:900}.h1-m{height:1rem}.h2-m{height:2rem}.h3-m{height:4rem}.h4-m{height:8rem}.h5-m{height:16rem}.h-25-m{height:25%}.h-50-m{height:50%}.h-75-m{height:75%}.h-100-m{height:100%}.min-h-100-ns{min-height:100%}.vh-25-m{height:25vh}.vh-50-m{height:50vh}.vh-75-m{height:75vh}.vh-100-m{height:100vh}.min-vh-100-m{min-height:100vh}.h-auto-m{height:auto}.h-inherit-m{height:inherit}.tracked-m{letter-spacing:.1em}.tracked-tight-m{letter-spacing:-.05em}.tracked-mega-m{letter-spacing:.25em}.lh-solid-m{line-height:1}.lh-title-m{line-height:1.25}.lh-copy-m{line-height:1.5}.mw-100-m{max-width:100%}.mw1-m{max-width:1rem}.mw2-m{max-width:2rem}.mw3-m{max-width:4rem}.mw4-m{max-width:8rem}.mw5-m{max-width:16rem}.mw6-m{max-width:32rem}.mw7-m{max-width:48rem}.mw8-m{max-width:64rem}.mw9-m{max-width:96rem}.mw-none-m{max-width:none}.w1-m{width:1rem}.w2-m{width:2rem}.w3-m{width:4rem}.w4-m{width:8rem}.w5-m{width:16rem}.w-10-m{width:10%}.w-20-m{width:20%}.w-25-m{width:25%}.w-30-m{width:30%}.w-33-m{width:33%}.w-34-m{width:34%}.w-40-m{width:40%}.w-50-m{width:50%}.w-60-m{width:60%}.w-70-m{width:70%}.w-75-m{width:75%}.w-80-m{width:80%}.w-90-m{width:90%}.w-100-m{width:100%}.w-third-m{width:33.33333%}.w-two-thirds-m{width:66.66667%}.w-auto-m{width:auto}.overflow-visible-m{overflow:visible}.overflow-hidden-m{overflow:hidden}.overflow-scroll-m{overflow:scroll}.overflow-auto-m{overflow:auto}.overflow-x-visible-m{overflow-x:visible}.overflow-x-hidden-m{overflow-x:hidden}.overflow-x-scroll-m{overflow-x:scroll}.overflow-x-auto-m{overflow-x:auto}.overflow-y-visible-m{overflow-y:visible}.overflow-y-hidden-m{overflow-y:hidden}.overflow-y-scroll-m{overflow-y:scroll}.overflow-y-auto-m{overflow-y:auto}.static-m{position:static}.relative-m{position:relative}.absolute-m{position:absolute}.fixed-m{position:fixed}.pa0-m{padding:0}.pa1-m{padding:.25rem}.pa2-m{padding:.5rem}.pa3-m{padding:1rem}.pa4-m{padding:2rem}.pa5-m{padding:4rem}.pa6-m{padding:8rem}.pa7-m{padding:16rem}.pl0-m{padding-left:0}.pl1-m{padding-left:.25rem}.pl2-m{padding-left:.5rem}.pl3-m{padding-left:1rem}.pl4-m{padding-left:2rem}.pl5-m{padding-left:4rem}.pl6-m{padding-left:8rem}.pl7-m{padding-left:16rem}.pr0-m{padding-right:0}.pr1-m{padding-right:.25rem}.pr2-m{padding-right:.5rem}.pr3-m{padding-right:1rem}.pr4-m{padding-right:2rem}.pr5-m{padding-right:4rem}.pr6-m{padding-right:8rem}.pr7-m{padding-right:16rem}.pb0-m{padding-bottom:0}.pb1-m{padding-bottom:.25rem}.pb2-m{padding-bottom:.5rem}.pb3-m{padding-bottom:1rem}.pb4-m{padding-bottom:2rem}.pb5-m{padding-bottom:4rem}.pb6-m{padding-bottom:8rem}.pb7-m{padding-bottom:16rem}.pt0-m{padding-top:0}.pt1-m{padding-top:.25rem}.pt2-m{padding-top:.5rem}.pt3-m{padding-top:1rem}.pt4-m{padding-top:2rem}.pt5-m{padding-top:4rem}.pt6-m{padding-top:8rem}.pt7-m{padding-top:16rem}.pv0-m{padding-top:0;padding-bottom:0}.pv1-m{padding-top:.25rem;padding-bottom:.25rem}.pv2-m{padding-top:.5rem;padding-bottom:.5rem}.pv3-m{padding-top:1rem;padding-bottom:1rem}.pv4-m{padding-top:2rem;padding-bottom:2rem}.pv5-m{padding-top:4rem;padding-bottom:4rem}.pv6-m{padding-top:8rem;padding-bottom:8rem}.pv7-m{padding-top:16rem;padding-bottom:16rem}.ph0-m{padding-left:0;padding-right:0}.ph1-m{padding-left:.25rem;padding-right:.25rem}.ph2-m{padding-left:.5rem;padding-right:.5rem}.ph3-m{padding-left:1rem;padding-right:1rem}.ph4-m{padding-left:2rem;padding-right:2rem}.ph5-m{padding-left:4rem;padding-right:4rem}.ph6-m{padding-left:8rem;padding-right:8rem}.ph7-m{padding-left:16rem;padding-right:16rem}.ma0-m{margin:0}.ma1-m{margin:.25rem}.ma2-m{margin:.5rem}.ma3-m{margin:1rem}.ma4-m{margin:2rem}.ma5-m{margin:4rem}.ma6-m{margin:8rem}.ma7-m{margin:16rem}.ml0-m{margin-left:0}.ml1-m{margin-left:.25rem}.ml2-m{margin-left:.5rem}.ml3-m{margin-left:1rem}.ml4-m{margin-left:2rem}.ml5-m{margin-left:4rem}.ml6-m{margin-left:8rem}.ml7-m{margin-left:16rem}.mr0-m{margin-right:0}.mr1-m{margin-right:.25rem}.mr2-m{margin-right:.5rem}.mr3-m{margin-right:1rem}.mr4-m{margin-right:2rem}.mr5-m{margin-right:4rem}.mr6-m{margin-right:8rem}.mr7-m{margin-right:16rem}.mb0-m{margin-bottom:0}.mb1-m{margin-bottom:.25rem}.mb2-m{margin-bottom:.5rem}.mb3-m{margin-bottom:1rem}.mb4-m{margin-bottom:2rem}.mb5-m{margin-bottom:4rem}.mb6-m{margin-bottom:8rem}.mb7-m{margin-bottom:16rem}.mt0-m{margin-top:0}.mt1-m{margin-top:.25rem}.mt2-m{margin-top:.5rem}.mt3-m{margin-top:1rem}.mt4-m{margin-top:2rem}.mt5-m{margin-top:4rem}.mt6-m{margin-top:8rem}.mt7-m{margin-top:16rem}.mv0-m{margin-top:0;margin-bottom:0}.mv1-m{margin-top:.25rem;margin-bottom:.25rem}.mv2-m{margin-top:.5rem;margin-bottom:.5rem}.mv3-m{margin-top:1rem;margin-bottom:1rem}.mv4-m{margin-top:2rem;margin-bottom:2rem}.mv5-m{margin-top:4rem;margin-bottom:4rem}.mv6-m{margin-top:8rem;margin-bottom:8rem}.mv7-m{margin-top:16rem;margin-bottom:16rem}.mh0-m{margin-left:0;margin-right:0}.mh1-m{margin-left:.25rem;margin-right:.25rem}.mh2-m{margin-left:.5rem;margin-right:.5rem}.mh3-m{margin-left:1rem;margin-right:1rem}.mh4-m{margin-left:2rem;margin-right:2rem}.mh5-m{margin-left:4rem;margin-right:4rem}.mh6-m{margin-left:8rem;margin-right:8rem}.mh7-m{margin-left:16rem;margin-right:16rem}.strike-m{text-decoration:line-through}.underline-m{text-decoration:underline}.no-underline-m{text-decoration:none}.tl-m{text-align:left}.tr-m{text-align:right}.tc-m{text-align:center}.ttc-m{text-transform:capitalize}.ttl-m{text-transform:lowercase}.ttu-m{text-transform:uppercase}.ttn-m{text-transform:none}.f-6-m,.f-headline-m{font-size:6rem}.f-5-m,.f-subheadline-m{font-size:5rem}.f1-m{font-size:3rem}.f2-m{font-size:2.25rem}.f3-m{font-size:1.5rem}.f4-m{font-size:1.25rem}.f5-m{font-size:1rem}.f6-m{font-size:.875rem}.measure-m{max-width:30em}.measure-wide-m{max-width:34em}.measure-narrow-m{max-width:20em}.indent-m{text-indent:1em;margin-top:0;margin-bottom:0}.small-caps-m{font-variant:small-caps}.truncate-m{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.clip-m{position:fixed!important;position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.ws-normal-m{white-space:normal}.nowrap-m{white-space:nowrap}.pre-m{white-space:pre}.v-base-m{vertical-align:baseline}.v-mid-m{vertical-align:middle}.v-top-m{vertical-align:top}.v-btm-m{vertical-align:bottom}}@media screen and (min-width:60em){.cover-l{background-size:cover!important}.contain-l{background-size:contain!important}.bg-center-l{background-position:50%}.bg-center-l,.bg-top-l{background-repeat:no-repeat}.bg-top-l{background-position:top}.bg-right-l{background-position:100%}.bg-bottom-l,.bg-right-l{background-repeat:no-repeat}.bg-bottom-l{background-position:bottom}.bg-left-l{background-repeat:no-repeat;background-position:0}.ba-l{border-style:solid;border-width:1px}.bt-l{border-top-style:solid;border-top-width:1px}.br-l{border-right-style:solid;border-right-width:1px}.bb-l{border-bottom-style:solid;border-bottom-width:1px}.bl-l{border-left-style:solid;border-left-width:1px}.bn-l{border-style:none;border-width:0}.br0-l{border-radius:0}.br1-l{border-radius:.125rem}.br2-l{border-radius:.25rem}.br3-l{border-radius:.5rem}.br4-l{border-radius:1rem}.br-100-l{border-radius:100%}.br-pill-l{border-radius:9999px}.br--bottom-l{border-radius-top-left:0;border-radius-top-right:0}.br--top-l{border-bottom-right-radius:0}.br--right-l,.br--top-l{border-bottom-left-radius:0}.br--right-l{border-top-left-radius:0}.br--left-l{border-top-right-radius:0;border-bottom-right-radius:0}.b--dotted-l{border-style:dotted}.b--dashed-l{border-style:dashed}.b--solid-l{border-style:solid}.b--none-l{border-style:none}.bw0-l{border-width:0}.bw1-l{border-width:.125rem}.bw2-l{border-width:.25rem}.bw3-l{border-width:.5rem}.bw4-l{border-width:1rem}.bw5-l{border-width:2rem}.bt-0-l{border-top-width:0}.br-0-l{border-right-width:0}.bb-0-l{border-bottom-width:0}.bl-0-l{border-left-width:0}.shadow-1-l{box-shadow:0 0 4px 2px rgba(0,0,0,.2)}.shadow-2-l{box-shadow:0 0 8px 2px rgba(0,0,0,.2)}.shadow-3-l{box-shadow:2px 2px 4px 2px rgba(0,0,0,.2)}.shadow-4-l{box-shadow:2px 2px 8px 0 rgba(0,0,0,.2)}.shadow-5-l{box-shadow:4px 4px 8px 0 rgba(0,0,0,.2)}.top-0-l{top:0}.left-0-l{left:0}.right-0-l{right:0}.bottom-0-l{bottom:0}.top-1-l{top:1rem}.left-1-l{left:1rem}.right-1-l{right:1rem}.bottom-1-l{bottom:1rem}.top-2-l{top:2rem}.left-2-l{left:2rem}.right-2-l{right:2rem}.bottom-2-l{bottom:2rem}.top--1-l{top:-1rem}.right--1-l{right:-1rem}.bottom--1-l{bottom:-1rem}.left--1-l{left:-1rem}.top--2-l{top:-2rem}.right--2-l{right:-2rem}.bottom--2-l{bottom:-2rem}.left--2-l{left:-2rem}.absolute--fill-l{top:0;right:0;bottom:0;left:0}.cl-l{clear:left}.cr-l{clear:right}.cb-l{clear:both}.cn-l{clear:none}.dn-l{display:none}.di-l{display:inline}.db-l{display:block}.dib-l{display:inline-block}.dit-l{display:inline-table}.dt-l{display:table}.dtc-l{display:table-cell}.dt-row-l{display:table-row}.dt-row-group-l{display:table-row-group}.dt-column-l{display:table-column}.dt-column-group-l{display:table-column-group}.dt--fixed-l{table-layout:fixed;width:100%}.flex-l{display:-webkit-box;display:-ms-flexbox;display:flex}.inline-flex-l{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.flex-auto-l{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;min-height:0}.flex-none-l{-webkit-box-flex:0;-ms-flex:none;flex:none}.flex-column-l{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.flex-column-l,.flex-row-l{-webkit-box-direction:normal}.flex-row-l{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}.flex-wrap-l{-ms-flex-wrap:wrap;flex-wrap:wrap}.items-start-l{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.items-end-l{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.items-center-l{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.items-baseline-l{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.items-stretch-l{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.self-start-l{-ms-flex-item-align:start;align-self:flex-start}.self-end-l{-ms-flex-item-align:end;align-self:flex-end}.self-center-l{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.self-baseline-l{-ms-flex-item-align:baseline;align-self:baseline}.self-stretch-l{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.justify-start-l{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.justify-end-l{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.justify-center-l{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.justify-between-l{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.justify-around-l{-ms-flex-pack:distribute;justify-content:space-around}.content-start-l{-ms-flex-line-pack:start;align-content:flex-start}.content-end-l{-ms-flex-line-pack:end;align-content:flex-end}.content-center-l{-ms-flex-line-pack:center;align-content:center}.content-between-l{-ms-flex-line-pack:justify;align-content:space-between}.content-around-l{-ms-flex-line-pack:distribute;align-content:space-around}.content-stretch-l{-ms-flex-line-pack:stretch;align-content:stretch}.order-0-l{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0}.order-1-l{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.order-2-l{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.order-3-l{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.order-4-l{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.order-5-l{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.order-6-l{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}.order-7-l{-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7}.order-8-l{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8}.order-last-l{-webkit-box-ordinal-group:100000;-ms-flex-order:99999;order:99999}.fl-l{float:left}.fl-l,.fr-l{display:inline}.fr-l{float:right}.fn-l{float:none}.i-l{font-style:italic}.fs-normal-l{font-style:normal}.normal-l{font-weight:400}.b-l{font-weight:700}.fw1-l{font-weight:100}.fw2-l{font-weight:200}.fw3-l{font-weight:300}.fw4-l{font-weight:400}.fw5-l{font-weight:500}.fw6-l{font-weight:600}.fw7-l{font-weight:700}.fw8-l{font-weight:800}.fw9-l{font-weight:900}.h1-l{height:1rem}.h2-l{height:2rem}.h3-l{height:4rem}.h4-l{height:8rem}.h5-l{height:16rem}.h-25-l{height:25%}.h-50-l{height:50%}.h-75-l{height:75%}.h-100-l{height:100%}.min-h-100-l{min-height:100%}.vh-25-l{height:25vh}.vh-50-l{height:50vh}.vh-75-l{height:75vh}.vh-100-l{height:100vh}.min-vh-100-l{min-height:100vh}.h-auto-l{height:auto}.h-inherit-l{height:inherit}.tracked-l{letter-spacing:.1em}.tracked-tight-l{letter-spacing:-.05em}.tracked-mega-l{letter-spacing:.25em}.lh-solid-l{line-height:1}.lh-title-l{line-height:1.25}.lh-copy-l{line-height:1.5}.mw-100-l{max-width:100%}.mw1-l{max-width:1rem}.mw2-l{max-width:2rem}.mw3-l{max-width:4rem}.mw4-l{max-width:8rem}.mw5-l{max-width:16rem}.mw6-l{max-width:32rem}.mw7-l{max-width:48rem}.mw8-l{max-width:64rem}.mw9-l{max-width:96rem}.mw-none-l{max-width:none}.w1-l{width:1rem}.w2-l{width:2rem}.w3-l{width:4rem}.w4-l{width:8rem}.w5-l{width:16rem}.w-10-l{width:10%}.w-20-l{width:20%}.w-25-l{width:25%}.w-30-l{width:30%}.w-33-l{width:33%}.w-34-l{width:34%}.w-40-l{width:40%}.w-50-l{width:50%}.w-60-l{width:60%}.w-70-l{width:70%}.w-75-l{width:75%}.w-80-l{width:80%}.w-90-l{width:90%}.w-100-l{width:100%}.w-third-l{width:33.33333%}.w-two-thirds-l{width:66.66667%}.w-auto-l{width:auto}.overflow-visible-l{overflow:visible}.overflow-hidden-l{overflow:hidden}.overflow-scroll-l{overflow:scroll}.overflow-auto-l{overflow:auto}.overflow-x-visible-l{overflow-x:visible}.overflow-x-hidden-l{overflow-x:hidden}.overflow-x-scroll-l{overflow-x:scroll}.overflow-x-auto-l{overflow-x:auto}.overflow-y-visible-l{overflow-y:visible}.overflow-y-hidden-l{overflow-y:hidden}.overflow-y-scroll-l{overflow-y:scroll}.overflow-y-auto-l{overflow-y:auto}.static-l{position:static}.relative-l{position:relative}.absolute-l{position:absolute}.fixed-l{position:fixed}.pa0-l{padding:0}.pa1-l{padding:.25rem}.pa2-l{padding:.5rem}.pa3-l{padding:1rem}.pa4-l{padding:2rem}.pa5-l{padding:4rem}.pa6-l{padding:8rem}.pa7-l{padding:16rem}.pl0-l{padding-left:0}.pl1-l{padding-left:.25rem}.pl2-l{padding-left:.5rem}.pl3-l{padding-left:1rem}.pl4-l{padding-left:2rem}.pl5-l{padding-left:4rem}.pl6-l{padding-left:8rem}.pl7-l{padding-left:16rem}.pr0-l{padding-right:0}.pr1-l{padding-right:.25rem}.pr2-l{padding-right:.5rem}.pr3-l{padding-right:1rem}.pr4-l{padding-right:2rem}.pr5-l{padding-right:4rem}.pr6-l{padding-right:8rem}.pr7-l{padding-right:16rem}.pb0-l{padding-bottom:0}.pb1-l{padding-bottom:.25rem}.pb2-l{padding-bottom:.5rem}.pb3-l{padding-bottom:1rem}.pb4-l{padding-bottom:2rem}.pb5-l{padding-bottom:4rem}.pb6-l{padding-bottom:8rem}.pb7-l{padding-bottom:16rem}.pt0-l{padding-top:0}.pt1-l{padding-top:.25rem}.pt2-l{padding-top:.5rem}.pt3-l{padding-top:1rem}.pt4-l{padding-top:2rem}.pt5-l{padding-top:4rem}.pt6-l{padding-top:8rem}.pt7-l{padding-top:16rem}.pv0-l{padding-top:0;padding-bottom:0}.pv1-l{padding-top:.25rem;padding-bottom:.25rem}.pv2-l{padding-top:.5rem;padding-bottom:.5rem}.pv3-l{padding-top:1rem;padding-bottom:1rem}.pv4-l{padding-top:2rem;padding-bottom:2rem}.pv5-l{padding-top:4rem;padding-bottom:4rem}.pv6-l{padding-top:8rem;padding-bottom:8rem}.pv7-l{padding-top:16rem;padding-bottom:16rem}.ph0-l{padding-left:0;padding-right:0}.ph1-l{padding-left:.25rem;padding-right:.25rem}.ph2-l{padding-left:.5rem;padding-right:.5rem}.ph3-l{padding-left:1rem;padding-right:1rem}.ph4-l{padding-left:2rem;padding-right:2rem}.ph5-l{padding-left:4rem;padding-right:4rem}.ph6-l{padding-left:8rem;padding-right:8rem}.ph7-l{padding-left:16rem;padding-right:16rem}.ma0-l{margin:0}.ma1-l{margin:.25rem}.ma2-l{margin:.5rem}.ma3-l{margin:1rem}.ma4-l{margin:2rem}.ma5-l{margin:4rem}.ma6-l{margin:8rem}.ma7-l{margin:16rem}.ml0-l{margin-left:0}.ml1-l{margin-left:.25rem}.ml2-l{margin-left:.5rem}.ml3-l{margin-left:1rem}.ml4-l{margin-left:2rem}.ml5-l{margin-left:4rem}.ml6-l{margin-left:8rem}.ml7-l{margin-left:16rem}.mr0-l{margin-right:0}.mr1-l{margin-right:.25rem}.mr2-l{margin-right:.5rem}.mr3-l{margin-right:1rem}.mr4-l{margin-right:2rem}.mr5-l{margin-right:4rem}.mr6-l{margin-right:8rem}.mr7-l{margin-right:16rem}.mb0-l{margin-bottom:0}.mb1-l{margin-bottom:.25rem}.mb2-l{margin-bottom:.5rem}.mb3-l{margin-bottom:1rem}.mb4-l{margin-bottom:2rem}.mb5-l{margin-bottom:4rem}.mb6-l{margin-bottom:8rem}.mb7-l{margin-bottom:16rem}.mt0-l{margin-top:0}.mt1-l{margin-top:.25rem}.mt2-l{margin-top:.5rem}.mt3-l{margin-top:1rem}.mt4-l{margin-top:2rem}.mt5-l{margin-top:4rem}.mt6-l{margin-top:8rem}.mt7-l{margin-top:16rem}.mv0-l{margin-top:0;margin-bottom:0}.mv1-l{margin-top:.25rem;margin-bottom:.25rem}.mv2-l{margin-top:.5rem;margin-bottom:.5rem}.mv3-l{margin-top:1rem;margin-bottom:1rem}.mv4-l{margin-top:2rem;margin-bottom:2rem}.mv5-l{margin-top:4rem;margin-bottom:4rem}.mv6-l{margin-top:8rem;margin-bottom:8rem}.mv7-l{margin-top:16rem;margin-bottom:16rem}.mh0-l{margin-left:0;margin-right:0}.mh1-l{margin-left:.25rem;margin-right:.25rem}.mh2-l{margin-left:.5rem;margin-right:.5rem}.mh3-l{margin-left:1rem;margin-right:1rem}.mh4-l{margin-left:2rem;margin-right:2rem}.mh5-l{margin-left:4rem;margin-right:4rem}.mh6-l{margin-left:8rem;margin-right:8rem}.mh7-l{margin-left:16rem;margin-right:16rem}.strike-l{text-decoration:line-through}.underline-l{text-decoration:underline}.no-underline-l{text-decoration:none}.tl-l{text-align:left}.tr-l{text-align:right}.tc-l{text-align:center}.ttc-l{text-transform:capitalize}.ttl-l{text-transform:lowercase}.ttu-l{text-transform:uppercase}.ttn-l{text-transform:none}.f-6-l,.f-headline-l{font-size:6rem}.f-5-l,.f-subheadline-l{font-size:5rem}.f1-l{font-size:3rem}.f2-l{font-size:2.25rem}.f3-l{font-size:1.5rem}.f4-l{font-size:1.25rem}.f5-l{font-size:1rem}.f6-l{font-size:.875rem}.measure-l{max-width:30em}.measure-wide-l{max-width:34em}.measure-narrow-l{max-width:20em}.indent-l{text-indent:1em;margin-top:0;margin-bottom:0}.small-caps-l{font-variant:small-caps}.truncate-l{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.clip-l{position:fixed!important;position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.ws-normal-l{white-space:normal}.nowrap-l{white-space:nowrap}.pre-l{white-space:pre}.v-base-l{vertical-align:baseline}.v-mid-l{vertical-align:middle}.v-top-l{vertical-align:top}.v-btm-l{vertical-align:bottom}}") || true) && "_4833c14d")

app.router((route) => [
  route('/', require('./pages/main'))
])

const tree = app.start()
document.body.appendChild(tree)

},{"./pages/main":5,"choo":15,"choo/html":14,"insert-css":24}],7:[function(require,module,exports){
const copy = (text, cb) => {
  var doc = document;
  parent = doc.body;
  var el = doc.createElement('input');

  // Remove from screen. 
  var style = el.style;
  style.position = 'fixed';
  style.width = 1;
  style.height = 1;
  style.opacity = 0.01;
  style.left = -9999;

  // Prevent zooming on iOS 
  style.fontSize = '12pt';

  // Exec `copy` command. 
  el.value = text;
  parent.appendChild(el);
  el.focus();
  el.setSelectionRange(0, text.length);
  doc.execCommand('copy');
  parent.removeChild(el);

  cb()
}

module.exports = copy

},{}],8:[function(require,module,exports){
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

module.exports = debounce

},{}],9:[function(require,module,exports){
module.exports = applyHook

// apply arguments onto an array of functions, useful for hooks
// (arr, any?, any?, any?, any?, any?) -> null
function applyHook (arr, arg1, arg2, arg3, arg4, arg5) {
  arr.forEach(function (fn) {
    fn(arg1, arg2, arg3, arg4, arg5)
  })
}

},{}],10:[function(require,module,exports){
const mutate = require('xtend/mutable')
const assert = require('assert')
const xtend = require('xtend')

const applyHook = require('./apply-hook')

module.exports = dispatcher

// initialize a new barracks instance
// obj -> obj
function dispatcher (hooks) {
  hooks = hooks || {}
  assert.equal(typeof hooks, 'object', 'barracks: hooks should be undefined or an object')

  const onStateChangeHooks = []
  const onActionHooks = []
  const onErrorHooks = []

  const subscriptionWraps = []
  const initialStateWraps = []
  const reducerWraps = []
  const effectWraps = []

  use(hooks)

  var reducersCalled = false
  var effectsCalled = false
  var stateCalled = false
  var subsCalled = false

  const subscriptions = start._subscriptions = {}
  const reducers = start._reducers = {}
  const effects = start._effects = {}
  const models = start._models = []
  var _state = {}

  start.model = setModel
  start.state = getState
  start.start = start
  start.use = use
  return start

  // push an object of hooks onto an array
  // obj -> null
  function use (hooks) {
    assert.equal(typeof hooks, 'object', 'barracks.use: hooks should be an object')
    assert.ok(!hooks.onError || typeof hooks.onError === 'function', 'barracks.use: onError should be undefined or a function')
    assert.ok(!hooks.onAction || typeof hooks.onAction === 'function', 'barracks.use: onAction should be undefined or a function')
    assert.ok(!hooks.onStateChange || typeof hooks.onStateChange === 'function', 'barracks.use: onStateChange should be undefined or a function')

    if (hooks.onStateChange) onStateChangeHooks.push(hooks.onStateChange)
    if (hooks.onError) onErrorHooks.push(wrapOnError(hooks.onError))
    if (hooks.onAction) onActionHooks.push(hooks.onAction)
    if (hooks.wrapSubscriptions) subscriptionWraps.push(hooks.wrapSubscriptions)
    if (hooks.wrapInitialState) initialStateWraps.push(hooks.wrapInitialState)
    if (hooks.wrapReducers) reducerWraps.push(hooks.wrapReducers)
    if (hooks.wrapEffects) effectWraps.push(hooks.wrapEffects)
  }

  // push a model to be initiated
  // obj -> null
  function setModel (model) {
    assert.equal(typeof model, 'object', 'barracks.store.model: model should be an object')
    models.push(model)
  }

  // get the current state from the store
  // obj? -> obj
  function getState (opts) {
    opts = opts || {}
    assert.equal(typeof opts, 'object', 'barracks.store.state: opts should be an object')

    const state = opts.state
    if (!opts.state && opts.freeze === false) return xtend(_state)
    else if (!opts.state) return Object.freeze(xtend(_state))
    assert.equal(typeof state, 'object', 'barracks.store.state: state should be an object')

    const namespaces = []
    const newState = {}

    // apply all fields from the model, and namespaced fields from the passed
    // in state
    models.forEach(function (model) {
      const ns = model.namespace
      namespaces.push(ns)
      const modelState = model.state || {}
      if (ns) {
        newState[ns] = newState[ns] || {}
        apply(ns, modelState, newState)
        newState[ns] = xtend(newState[ns], state[ns])
      } else {
        mutate(newState, modelState)
      }
    })

    // now apply all fields that weren't namespaced from the passed in state
    Object.keys(state).forEach(function (key) {
      if (namespaces.indexOf(key) !== -1) return
      newState[key] = state[key]
    })

    const tmpState = xtend(_state, xtend(state, newState))
    const wrappedState = wrapHook(tmpState, initialStateWraps)

    return (opts.freeze === false)
      ? wrappedState
      : Object.freeze(wrappedState)
  }

  // initialize the store hooks, get the send() function
  // obj? -> fn
  function start (opts) {
    opts = opts || {}
    assert.equal(typeof opts, 'object', 'barracks.store.start: opts should be undefined or an object')

    // register values from the models
    models.forEach(function (model) {
      const ns = model.namespace
      if (!stateCalled && model.state && opts.state !== false) {
        const modelState = model.state || {}
        if (ns) {
          _state[ns] = _state[ns] || {}
          apply(ns, modelState, _state)
        } else {
          mutate(_state, modelState)
        }
      }
      if (!reducersCalled && model.reducers && opts.reducers !== false) {
        apply(ns, model.reducers, reducers, function (cb) {
          return wrapHook(cb, reducerWraps)
        })
      }
      if (!effectsCalled && model.effects && opts.effects !== false) {
        apply(ns, model.effects, effects, function (cb) {
          return wrapHook(cb, effectWraps)
        })
      }
      if (!subsCalled && model.subscriptions && opts.subscriptions !== false) {
        apply(ns, model.subscriptions, subscriptions, function (cb, key) {
          const send = createSend('subscription: ' + (ns ? ns + ':' + key : key))
          cb = wrapHook(cb, subscriptionWraps)
          cb(send, function (err) {
            applyHook(onErrorHooks, err, _state, createSend)
          })
          return cb
        })
      }
    })

    // the state wrap is special because we want to operate on the full
    // state rather than indvidual chunks, so we apply it outside the loop
    if (!stateCalled && opts.state !== false) {
      _state = wrapHook(_state, initialStateWraps)
    }

    if (!opts.noSubscriptions) subsCalled = true
    if (!opts.noReducers) reducersCalled = true
    if (!opts.noEffects) effectsCalled = true
    if (!opts.noState) stateCalled = true

    if (!onErrorHooks.length) onErrorHooks.push(wrapOnError(defaultOnError))

    return createSend

    // call an action from a view
    // (str, bool?) -> (str, any?, fn?) -> null
    function createSend (selfName, callOnError) {
      assert.equal(typeof selfName, 'string', 'barracks.store.start.createSend: selfName should be a string')
      assert.ok(!callOnError || typeof callOnError === 'boolean', 'barracks.store.start.send: callOnError should be undefined or a boolean')

      return function send (name, data, cb) {
        if (!cb && !callOnError) {
          cb = data
          data = null
        }
        data = (typeof data === 'undefined' ? null : data)

        assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string')
        assert.ok(!cb || typeof cb === 'function', 'barracks.store.start.send: cb should be a function')

        const done = callOnError ? onErrorCallback : cb
        _send(name, data, selfName, done)

        function onErrorCallback (err) {
          err = err || null
          if (err) {
            applyHook(onErrorHooks, err, _state, function createSend (selfName) {
              return function send (name, data) {
                assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string')
                data = (typeof data === 'undefined' ? null : data)
                _send(name, data, selfName, done)
              }
            })
          }
        }
      }
    }

    // call an action
    // (str, str, any, fn) -> null
    function _send (name, data, caller, cb) {
      assert.equal(typeof name, 'string', 'barracks._send: name should be a string')
      assert.equal(typeof caller, 'string', 'barracks._send: caller should be a string')
      assert.equal(typeof cb, 'function', 'barracks._send: cb should be a function')

      setTimeout(function () {
        var reducersCalled = false
        var effectsCalled = false
        const newState = xtend(_state)

        if (onActionHooks.length) {
          applyHook(onActionHooks, data, _state, name, caller, createSend)
        }

        // validate if a namespace exists. Namespaces are delimited by ':'.
        var actionName = name
        if (/:/.test(name)) {
          const arr = name.split(':')
          var ns = arr.shift()
          actionName = arr.join(':')
        }

        const _reducers = ns ? reducers[ns] : reducers
        if (_reducers && _reducers[actionName]) {
          if (ns) {
            const reducedState = _reducers[actionName](data, _state[ns])
            newState[ns] = xtend(_state[ns], reducedState)
          } else {
            mutate(newState, reducers[actionName](data, _state))
          }
          reducersCalled = true
          if (onStateChangeHooks.length) {
            applyHook(onStateChangeHooks, data, newState, _state, actionName, createSend)
          }
          _state = newState
          cb(null, newState)
        }

        const _effects = ns ? effects[ns] : effects
        if (!reducersCalled && _effects && _effects[actionName]) {
          const send = createSend('effect: ' + name)
          if (ns) _effects[actionName](data, _state[ns], send, cb)
          else _effects[actionName](data, _state, send, cb)
          effectsCalled = true
        }

        if (!reducersCalled && !effectsCalled) {
          throw new Error('Could not find action ' + actionName)
        }
      }, 0)
    }
  }
}

// compose an object conditionally
// optionally contains a namespace
// which is used to nest properties.
// (str, obj, obj, fn?) -> null
function apply (ns, source, target, wrap) {
  if (ns && !target[ns]) target[ns] = {}
  Object.keys(source).forEach(function (key) {
    const cb = wrap ? wrap(source[key], key) : source[key]
    if (ns) target[ns][key] = cb
    else target[key] = cb
  })
}

// handle errors all the way at the top of the trace
// err? -> null
function defaultOnError (err) {
  throw err
}

function wrapOnError (onError) {
  return function onErrorWrap (err, state, createSend) {
    if (err) onError(err, state, createSend)
  }
}

// take a apply an array of transforms onto a value. The new value
// must be returned synchronously from the transform
// (any, [fn]) -> any
function wrapHook (value, transforms) {
  transforms.forEach(function (transform) {
    value = transform(value)
  })
  return value
}

},{"./apply-hook":9,"assert":undefined,"xtend":11,"xtend/mutable":12}],11:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],12:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],13:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.createElement = belCreateElement

},{"global/document":19,"hyperx":23,"on-load":38}],14:[function(require,module,exports){
module.exports = require('yo-yo')

},{"yo-yo":48}],15:[function(require,module,exports){
const history = require('sheet-router/history')
const sheetRouter = require('sheet-router')
const document = require('global/document')
const onReady = require('document-ready')
const href = require('sheet-router/href')
const hash = require('sheet-router/hash')
const hashMatch = require('hash-match')
const barracks = require('barracks')
const nanoraf = require('nanoraf')
const assert = require('assert')
const xtend = require('xtend')
const yo = require('yo-yo')

module.exports = choo

// framework for creating sturdy web applications
// null -> fn
function choo (opts) {
  opts = opts || {}

  const _store = start._store = barracks()
  var _router = start._router = null
  var _defaultRoute = null
  var _rootNode = null
  var _routes = null
  var _frame = null

  _store.use({ onStateChange: render })
  _store.use(opts)

  start.toString = toString
  start.router = router
  start.model = model
  start.start = start
  start.use = use

  return start

  // render the application to a string
  // (str, obj) -> str
  function toString (route, serverState) {
    serverState = serverState || {}
    assert.equal(typeof route, 'string', 'choo.app.toString: route must be a string')
    assert.equal(typeof serverState, 'object', 'choo.app.toString: serverState must be an object')
    _store.start({ subscriptions: false, reducers: false, effects: false })

    const state = _store.state({ state: serverState })
    const router = createRouter(_defaultRoute, _routes, createSend)
    const tree = router(route, state)
    return tree.outerHTML || tree.toString()

    function createSend () {
      return function send () {
        assert.ok(false, 'choo: send() cannot be called from Node')
      }
    }
  }

  // start the application
  // (str?, obj?) -> DOMNode
  function start (selector, startOpts) {
    if (!startOpts && typeof selector !== 'string') {
      startOpts = selector
      selector = null
    }
    startOpts = startOpts || {}

    _store.model(appInit(startOpts))
    const createSend = _store.start(startOpts)
    _router = start._router = createRouter(_defaultRoute, _routes, createSend)
    const state = _store.state({state: {}})

    if (!selector) {
      const tree = _router(state.location.pathname, state)
      _rootNode = tree
      return tree
    } else {
      onReady(function onReady () {
        const oldTree = document.querySelector(selector)
        assert.ok(oldTree, 'could not query selector: ' + selector)
        const newTree = _router(state.location.pathname, state)
        _rootNode = yo.update(oldTree, newTree)
      })
    }
  }

  // update the DOM after every state mutation
  // (obj, obj, obj, str, fn) -> null
  function render (data, state, prev, name, createSend) {
    if (!_frame) {
      _frame = nanoraf(function (state, prev) {
        const newTree = _router(state.location.pathname, state, prev)
        _rootNode = yo.update(_rootNode, newTree)
      })
    }
    _frame(state, prev)
  }

  // register all routes on the router
  // (str?, [fn|[fn]]) -> obj
  function router (defaultRoute, routes) {
    _defaultRoute = defaultRoute
    _routes = routes
  }

  // create a new model
  // (str?, obj) -> null
  function model (model) {
    _store.model(model)
  }

  // register a plugin
  // (obj) -> null
  function use (hooks) {
    assert.equal(typeof hooks, 'object', 'choo.use: hooks should be an object')
    _store.use(hooks)
  }

  // create a new router with a custom `createRoute()` function
  // (str?, obj, fn?) -> null
  function createRouter (defaultRoute, routes, createSend) {
    var prev = { params: {} }
    return sheetRouter(defaultRoute, routes, createRoute)

    function createRoute (routeFn) {
      return function (route, inline, child) {
        if (typeof inline === 'function') {
          inline = wrap(inline, route)
        }
        return routeFn(route, inline, child)
      }

      function wrap (child, route) {
        const send = createSend('view: ' + route, true)
        return function chooWrap (params, state) {
          const nwPrev = prev
          const nwState = prev = xtend(state, { params: params })
          if (opts.freeze !== false) Object.freeze(nwState)
          return child(nwState, nwPrev, send)
        }
      }
    }
  }
}

// initial application state model
// obj -> obj
function appInit (opts) {
  const loc = document.location
  const state = { pathname: (opts.hash) ? hashMatch(loc.hash) : loc.href }
  const reducers = {
    setLocation: function setLocation (data, state) {
      return { pathname: data.location.replace(/#.*/, '') }
    }
  }
  // if hash routing explicitly enabled, subscribe to it
  const subs = {}
  if (opts.hash === true) {
    pushLocationSub(function (navigate) {
      hash(function (fragment) {
        navigate(hashMatch(fragment))
      })
    }, 'handleHash', subs)
  } else {
    if (opts.history !== false) pushLocationSub(history, 'handleHistory', subs)
    if (opts.href !== false) pushLocationSub(href, 'handleHref', subs)
  }

  return {
    namespace: 'location',
    subscriptions: subs,
    reducers: reducers,
    state: state
  }

  // create a new subscription that modifies
  // 'app:location' and push it to be loaded
  // (fn, obj) -> null
  function pushLocationSub (cb, key, model) {
    model[key] = function (send, done) {
      cb(function navigate (pathname) {
        send('location:setLocation', { location: pathname }, done)
      })
    }
  }
}

},{"assert":undefined,"barracks":10,"document-ready":17,"global/document":19,"hash-match":21,"nanoraf":37,"sheet-router":43,"sheet-router/hash":40,"sheet-router/history":41,"sheet-router/href":42,"xtend":16,"yo-yo":48}],16:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],17:[function(require,module,exports){
'use strict'

var document = require('global/document')

module.exports = document.addEventListener ? ready : noop

function ready (callback) {
  var state = document.readyState
  if (state === 'complete' || state === 'interactive') {
    return setTimeout(callback, 0)
  }

  document.addEventListener('DOMContentLoaded', function onLoad () {
    callback()
  })
}

function noop () {}

},{"global/document":19}],18:[function(require,module,exports){
var slice = Array.prototype.slice

module.exports = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

},{}],19:[function(require,module,exports){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

},{"min-document":34}],20:[function(require,module,exports){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

},{}],21:[function(require,module,exports){
module.exports = function hashMatch (hash, prefix) {
  var pre = prefix || '/';
  if (hash.length === 0) return pre;
  hash = hash.replace('#', '');
  hash = hash.replace(/\/$/, '')
  if (hash.indexOf('/') != 0) hash = '/' + hash;
  if (pre == '/') return hash;
  else return hash.replace(pre, '');
}

},{}],22:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],23:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":22}],24:[function(require,module,exports){
var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

module.exports = function (css, options) {
    options = options || {};

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

},{}],25:[function(require,module,exports){
var domWalk = require("dom-walk")

var Comment = require("./dom-comment.js")
var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")
var Event = require("./event.js")
var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var removeEventListener = require("./event/remove-event-listener.js")

module.exports = Document;

function Document() {
    if (!(this instanceof Document)) {
        return new Document();
    }

    this.head = this.createElement("head")
    this.body = this.createElement("body")
    this.documentElement = this.createElement("html")
    this.documentElement.appendChild(this.head)
    this.documentElement.appendChild(this.body)
    this.childNodes = [this.documentElement]
    this.nodeType = 9
}

var proto = Document.prototype;
proto.createTextNode = function createTextNode(value) {
    return new DOMText(value, this)
}

proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace)
    return new DOMElement(tagName, this, ns)
}

proto.createElement = function createElement(tagName) {
    return new DOMElement(tagName, this)
}

proto.createDocumentFragment = function createDocumentFragment() {
    return new DocumentFragment(this)
}

proto.createEvent = function createEvent(family) {
    return new Event(family)
}

proto.createComment = function createComment(data) {
    return new Comment(data, this)
}

proto.getElementById = function getElementById(id) {
    id = String(id)

    var result = domWalk(this.childNodes, function (node) {
        if (String(node.id) === id) {
            return node
        }
    })

    return result || null
}

proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName
proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName
proto.contains = DOMElement.prototype.contains

proto.removeEventListener = removeEventListener
proto.addEventListener = addEventListener
proto.dispatchEvent = dispatchEvent

},{"./dom-comment.js":26,"./dom-element.js":27,"./dom-fragment.js":28,"./dom-text.js":29,"./event.js":30,"./event/add-event-listener.js":31,"./event/dispatch-event.js":32,"./event/remove-event-listener.js":33,"dom-walk":18}],26:[function(require,module,exports){
module.exports = Comment

function Comment(data, owner) {
    if (!(this instanceof Comment)) {
        return new Comment(data, owner)
    }

    this.data = data
    this.nodeValue = data
    this.length = data.length
    this.ownerDocument = owner || null
}

Comment.prototype.nodeType = 8
Comment.prototype.nodeName = "#comment"

Comment.prototype.toString = function _Comment_toString() {
    return "[object Comment]"
}

},{}],27:[function(require,module,exports){
var domWalk = require("dom-walk")
var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var removeEventListener = require("./event/remove-event-listener.js")
var serializeNode = require("./serialize.js")

var htmlns = "http://www.w3.org/1999/xhtml"

module.exports = DOMElement

function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
        return new DOMElement(tagName)
    }

    var ns = namespace === undefined ? htmlns : (namespace || null)

    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName
    this.nodeName = this.tagName
    this.className = ""
    this.dataset = {}
    this.childNodes = []
    this.parentNode = null
    this.style = {}
    this.ownerDocument = owner || null
    this.namespaceURI = ns
    this._attributes = {}

    if (this.tagName === 'INPUT') {
      this.type = 'text'
    }
}

DOMElement.prototype.type = "DOMElement"
DOMElement.prototype.nodeType = 1

DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
        child.parentNode.removeChild(child)
    }

    this.childNodes.push(child)
    child.parentNode = this

    return child
}

DOMElement.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        // TODO: Throw NotFoundError if needle.parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = this.childNodes.indexOf(needle)

        needle.parentNode = null
        this.childNodes[index] = elem
        elem.parentNode = this

        return needle
    }

DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem)
    this.childNodes.splice(index, 1)

    elem.parentNode = null
    return elem
}

DOMElement.prototype.insertBefore =
    function _Element_insertBefore(elem, needle) {
        // TODO: Throw NotFoundError if referenceElement is a dom node
        // and parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = needle === null || needle === undefined ?
            -1 :
            this.childNodes.indexOf(needle)

        if (index > -1) {
            this.childNodes.splice(index, 0, elem)
        } else {
            this.childNodes.push(elem)
        }

        elem.parentNode = this
        return elem
    }

DOMElement.prototype.setAttributeNS =
    function _Element_setAttributeNS(namespace, name, value) {
        var prefix = null
        var localName = name
        var colonPosition = name.indexOf(":")
        if (colonPosition > -1) {
            prefix = name.substr(0, colonPosition)
            localName = name.substr(colonPosition + 1)
        }
        if (this.tagName === 'INPUT' && name === 'type') {
          this.type = value;
        }
        else {
          var attributes = this._attributes[namespace] || (this._attributes[namespace] = {})
          attributes[localName] = {value: value, prefix: prefix}
        }
    }

DOMElement.prototype.getAttributeNS =
    function _Element_getAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        var value = attributes && attributes[name] && attributes[name].value
        if (this.tagName === 'INPUT' && name === 'type') {
          return this.type;
        }
        if (typeof value !== "string") {
            return null
        }
        return value
    }

DOMElement.prototype.removeAttributeNS =
    function _Element_removeAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        if (attributes) {
            delete attributes[name]
        }
    }

DOMElement.prototype.hasAttributeNS =
    function _Element_hasAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace]
        return !!attributes && name in attributes;
    }

DOMElement.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value)
}

DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name)
}

DOMElement.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name)
}

DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name)
}

DOMElement.prototype.removeEventListener = removeEventListener
DOMElement.prototype.addEventListener = addEventListener
DOMElement.prototype.dispatchEvent = dispatchEvent

// Un-implemented
DOMElement.prototype.focus = function _Element_focus() {
    return void 0
}

DOMElement.prototype.toString = function _Element_toString() {
    return serializeNode(this)
}

DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = []

    domWalk(this, function (node) {
        if (node.nodeType === 1) {
            var nodeClassName = node.className || ""
            var nodeClasses = nodeClassName.split(" ")

            if (classes.every(function (item) {
                return nodeClasses.indexOf(item) !== -1
            })) {
                elems.push(node)
            }
        }
    })

    return elems
}

DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase()
    var elems = []

    domWalk(this.childNodes, function (node) {
        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
            elems.push(node)
        }
    })

    return elems
}

DOMElement.prototype.contains = function _Element_contains(element) {
    return domWalk(this, function (node) {
        return element === node
    }) || false
}

},{"./event/add-event-listener.js":31,"./event/dispatch-event.js":32,"./event/remove-event-listener.js":33,"./serialize.js":35,"dom-walk":18}],28:[function(require,module,exports){
var DOMElement = require("./dom-element.js")

module.exports = DocumentFragment

function DocumentFragment(owner) {
    if (!(this instanceof DocumentFragment)) {
        return new DocumentFragment()
    }

    this.childNodes = []
    this.parentNode = null
    this.ownerDocument = owner || null
}

DocumentFragment.prototype.type = "DocumentFragment"
DocumentFragment.prototype.nodeType = 11
DocumentFragment.prototype.nodeName = "#document-fragment"

DocumentFragment.prototype.appendChild  = DOMElement.prototype.appendChild
DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild
DocumentFragment.prototype.removeChild  = DOMElement.prototype.removeChild

DocumentFragment.prototype.toString =
    function _DocumentFragment_toString() {
        return this.childNodes.map(function (node) {
            return String(node)
        }).join("")
    }

},{"./dom-element.js":27}],29:[function(require,module,exports){
module.exports = DOMText

function DOMText(value, owner) {
    if (!(this instanceof DOMText)) {
        return new DOMText(value)
    }

    this.data = value || ""
    this.length = this.data.length
    this.ownerDocument = owner || null
}

DOMText.prototype.type = "DOMTextNode"
DOMText.prototype.nodeType = 3
DOMText.prototype.nodeName = "#text"

DOMText.prototype.toString = function _Text_toString() {
    return this.data
}

DOMText.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data
    var left = current.substring(0, index)
    var right = current.substring(index + length, current.length)
    this.data = left + value + right
    this.length = this.data.length
}

},{}],30:[function(require,module,exports){
module.exports = Event

function Event(family) {}

Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type
    this.bubbles = bubbles
    this.cancelable = cancelable
}

Event.prototype.preventDefault = function _Event_preventDefault() {
    
}

},{}],31:[function(require,module,exports){
module.exports = addEventListener

function addEventListener(type, listener) {
    var elem = this

    if (!elem.listeners) {
        elem.listeners = {}
    }

    if (!elem.listeners[type]) {
        elem.listeners[type] = []
    }

    if (elem.listeners[type].indexOf(listener) === -1) {
        elem.listeners[type].push(listener)
    }
}

},{}],32:[function(require,module,exports){
module.exports = dispatchEvent

function dispatchEvent(ev) {
    var elem = this
    var type = ev.type

    if (!ev.target) {
        ev.target = elem
    }

    if (!elem.listeners) {
        elem.listeners = {}
    }

    var listeners = elem.listeners[type]

    if (listeners) {
        return listeners.forEach(function (listener) {
            ev.currentTarget = elem
            if (typeof listener === 'function') {
                listener(ev)
            } else {
                listener.handleEvent(ev)
            }
        })
    }

    if (elem.parentNode) {
        elem.parentNode.dispatchEvent(ev)
    }
}

},{}],33:[function(require,module,exports){
module.exports = removeEventListener

function removeEventListener(type, listener) {
    var elem = this

    if (!elem.listeners) {
        return
    }

    if (!elem.listeners[type]) {
        return
    }

    var list = elem.listeners[type]
    var index = list.indexOf(listener)
    if (index !== -1) {
        list.splice(index, 1)
    }
}

},{}],34:[function(require,module,exports){
var Document = require('./document.js');

module.exports = new Document();

},{"./document.js":25}],35:[function(require,module,exports){
module.exports = serializeNode

var voidElements = ["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];

function serializeNode(node) {
    switch (node.nodeType) {
        case 3:
            return escapeText(node.data)
        case 8:
            return "<!--" + node.data + "-->"
        default:
            return serializeElement(node)
    }
}

function serializeElement(elem) {
    var strings = []

    var tagname = elem.tagName

    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
        tagname = tagname.toLowerCase()
    }

    strings.push("<" + tagname + properties(elem) + datasetify(elem))

    if (voidElements.indexOf(tagname) > -1) {
        strings.push(" />")
    } else {
        strings.push(">")

        if (elem.childNodes.length) {
            strings.push.apply(strings, elem.childNodes.map(serializeNode))
        } else if (elem.textContent || elem.innerText) {
            strings.push(escapeText(elem.textContent || elem.innerText))
        } else if (elem.innerHTML) {
            strings.push(elem.innerHTML)
        }

        strings.push("</" + tagname + ">")
    }

    return strings.join("")
}

function isProperty(elem, key) {
    var type = typeof elem[key]

    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true
    }

    return elem.hasOwnProperty(key) &&
        (type === "string" || type === "boolean" || type === "number") &&
        key !== "nodeName" && key !== "className" && key !== "tagName" &&
        key !== "textContent" && key !== "innerText" && key !== "namespaceURI" &&  key !== "innerHTML"
}

function stylify(styles) {
    if (typeof styles === 'string') return styles
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        key = key.replace(/[A-Z]/g, function(c) {
            return "-" + c.toLowerCase();
        })
        attr += key + ":" + value + ";"
    })
    return attr
}

function datasetify(elem) {
    var ds = elem.dataset
    var props = []

    for (var key in ds) {
        props.push({ name: "data-" + key, value: ds[key] })
    }

    return props.length ? stringify(props) : ""
}

function stringify(list) {
    var attributes = []
    list.forEach(function (tuple) {
        var name = tuple.name
        var value = tuple.value

        if (name === "style") {
            value = stylify(value)
        }

        attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"")
    })

    return attributes.length ? " " + attributes.join(" ") : ""
}

function properties(elem) {
    var props = []
    for (var key in elem) {
        if (isProperty(elem, key)) {
            props.push({ name: key, value: elem[key] })
        }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute]
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute
        props.push({ name: name, value: prop.value })
      }
    }

    if (elem.className) {
        props.push({ name: "class", value: elem.className })
    }

    return props.length ? stringify(props) : ""
}

function escapeText(s) {
    var str = '';

    if (typeof(s) === 'string') { 
        str = s; 
    } else if (s) {
        str = s.toString();
    }

    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;")
}

},{}],36:[function(require,module,exports){
'use strict';
// Create a range object for efficently rendering strings to elements.
var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);

                                            }
                                            fromNextSibling = curFromNodeChild.nextSibling;
                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],37:[function(require,module,exports){
const window = require('global/window')
const assert = require('assert')

module.exports = nanoraf

// Only call RAF when needed
// (fn, fn?) -> fn
function nanoraf (render, raf) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function')
  assert.ok(typeof raf === 'function' || typeof raf === 'undefined', 'nanoraf: raf should be a function or undefined')

  if (!raf) { raf = window.requestAnimationFrame }

  var inRenderingTransaction = false
  var redrawScheduled = false
  var currentState = null

  // pass new state to be rendered
  // (obj, obj?) -> null
  return function frame (state, prev) {
    assert.equal(typeof state, 'object', 'nanoraf: state should be an object')
    assert.equal(typeof prev, 'object', 'nanoraf: prev should be an object')
    assert.equal(inRenderingTransaction, false, 'nanoraf: infinite loop detected')

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true

      raf(function redraw () {
        redrawScheduled = false
        if (!currentState) return

        inRenderingTransaction = true
        render(currentState, prev)
        inRenderingTransaction = false

        currentState = null
      })
    }

    // update data for redraw
    currentState = state
  }
}

},{"assert":undefined,"global/window":20}],38:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":19,"global/window":20}],39:[function(require,module,exports){
const assert = require('assert')

module.exports = match

// get url path section from a url
// strip querystrings / hashes
// strip protocol
// strip hostname and port (both ip and route)
// str -> str
function match (route) {
  assert.equal(typeof route, 'string')

  return route.trim()
    .replace(/[\?|#].*$/, '')
    .replace(/^(?:https?\:)\/\//, '')
    .replace(/^.*?(\/.*)/, '$1')
    .replace(/\/$/, '')
}

},{"assert":undefined}],40:[function(require,module,exports){
const window = require('global/window')
const assert = require('assert')

module.exports = hash

// listen to window hashchange events
// and update router accordingly
// fn(cb) -> null
function hash (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')
  window.onhashchange = function (e) {
    cb(window.location.hash)
  }
}

},{"assert":undefined,"global/window":20}],41:[function(require,module,exports){
const document = require('global/document')
const window = require('global/window')
const assert = require('assert')

module.exports = history

// listen to html5 pushstate events
// and update router accordingly
// fn(str) -> null
function history (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')
  window.onpopstate = function () {
    cb(document.location.href)
  }
}

},{"assert":undefined,"global/document":19,"global/window":20}],42:[function(require,module,exports){
const window = require('global/window')
const assert = require('assert')

module.exports = href

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// fn(str) -> null
function href (cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function')

  window.onclick = function (e) {
    const node = (function traverse (node) {
      if (!node) return
      if (node.localName !== 'a') return traverse(node.parentNode)
      if (node.href === undefined) return traverse(node.parentNode)
      if (window.location.host !== node.host) return traverse(node.parentNode)
      return node
    })(e.target)

    if (!node) return

    e.preventDefault()
    const href = node.href.replace(/#$/, '')
    cb(href)
    window.history.pushState({}, null, href)
  }
}

},{"assert":undefined,"global/window":20}],43:[function(require,module,exports){
const pathname = require('pathname-match')
const wayfarer = require('wayfarer')
const assert = require('assert')

module.exports = sheetRouter

// Fast, modular client router
// fn(str, any[..], fn?) -> fn(str, any[..])
function sheetRouter (dft, createTree, createRoute) {
  createRoute = (createRoute ? createRoute(_createRoute) : _createRoute)

  if (!createTree) {
    createTree = dft
    dft = ''
  }

  assert.equal(typeof dft, 'string', 'sheet-router: dft must be a string')
  assert.equal(typeof createTree, 'function', 'sheet-router: createTree must be a function')
  assert.equal(typeof createRoute, 'function', 'sheet-router: createRoute must be a function')

  const router = wayfarer(dft)
  const tree = createTree(createRoute)

  // register tree in router
  ;(function walk (tree, route) {
    if (Array.isArray(tree[0])) {
      // walk over all routes at the root of the tree
      tree.forEach(function (node) {
        walk(node, route)
      })
    } else if (tree[1]) {
      // handle inline functions as args
      const innerRoute = tree[0]
        ? route.concat(tree[0]).join('/')
        : route.length ? route.join('/') : tree[0]
      router.on(innerRoute, tree[1])
      walk(tree[2], route.concat(tree[0]))
    } else if (Array.isArray(tree[2])) {
      // traverse and append route
      walk(tree[2], route.concat(tree[0]))
    } else {
      // register path in router
      const nwRoute = tree[0]
        ? route.concat(tree[0]).join('/')
        : route.length ? route.join('/') : tree[0]
      router.on(nwRoute, tree[2])
    }
  })(tree, [])

  // match a route on the router
  return function match (route) {
    assert.equal(typeof route, 'string', 'route must be a string')
    const args = [].slice.call(arguments)
    args[0] = pathname(args[0])
    return router.apply(null, args)
  }
}

// register regular route
function _createRoute (route, inline, child) {
  if (!child) {
    child = inline
    inline = null
  }
  assert.equal(typeof route, 'string', 'route must be a string')
  assert.ok(child, 'child exists')
  route = route.replace(/^\//, '')
  return [ route, inline, child ]
}

},{"assert":undefined,"pathname-match":39,"wayfarer":44}],44:[function(require,module,exports){
const assert = require('assert')
const trie = require('./trie')

module.exports = Wayfarer

// create a router
// str -> obj
function Wayfarer (dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft)

  const _default = (dft || '').replace(/^\//, '')
  const _trie = trie()

  emit._trie = _trie
  emit.emit = emit
  emit.on = on
  emit._wayfarer = true

  return emit

  // define a route
  // (str, fn) -> obj
  function on (route, cb) {
    assert.equal(typeof route, 'string')
    assert.equal(typeof cb, 'function')

    route = route || '/'

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie)
    } else {
      const node = _trie.create(route)
      node.cb = cb
    }

    return emit
  }

  // match and call a route
  // (str, obj?) -> null
  function emit (route) {
    assert.notEqual(route, undefined, "'route' must be defined")
    const args = new Array(arguments.length)
    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i]
    }

    const node = _trie.match(route)
    if (node && node.cb) {
      args[0] = node.params
      return node.cb.apply(null, args)
    }

    const dft = _trie.match(_default)
    if (dft && dft.cb) {
      args[0] = dft.params
      return dft.cb.apply(null, args)
    }

    throw new Error("route '" + route + "' did not match")
  }
}

},{"./trie":47,"assert":undefined}],45:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],46:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],47:[function(require,module,exports){
const mutate = require('xtend/mutable')
const assert = require('assert')
const xtend = require('xtend')

module.exports = Trie

// create a new trie
// null -> obj
function Trie () {
  if (!(this instanceof Trie)) return new Trie()
  this.trie = { nodes: {} }
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')
  // strip leading '/' and split routes
  const routes = route.replace(/^\//, '').split('/')
  return (function createNode (index, trie, routes) {
    const route = routes[index]

    if (route === undefined) return trie

    var node = null
    if (/^:/.test(route)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes['$$']) {
        node = { nodes: {} }
        trie.nodes['$$'] = node
      } else {
        node = trie.nodes['$$']
      }
      trie.name = route.replace(/^:/, '')
    } else if (!trie.nodes[route]) {
      node = { nodes: {} }
      trie.nodes[route] = node
    } else {
      node = trie.nodes[route]
    }

    // we must recurse deeper
    return createNode(index + 1, node, routes)
  })(0, this.trie, routes)
}

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')

  const routes = route.replace(/^\//, '').split('/')
  const params = {}

  var node = (function search (index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined
    const route = routes[index]
    if (route === undefined) return trie

    if (trie.nodes[route]) {
      // match regular routes first
      return search(index + 1, trie.nodes[route])
    } else if (trie.name) {
      // match named routes
      params[trie.name] = route
      return search(index + 1, trie.nodes['$$'])
    } else {
      // no matches found
      return search(index + 1)
    }
  })(0, this.trie)

  if (!node) return undefined
  node = xtend(node)
  node.params = params
  return node
}

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string')
  assert.equal(typeof trie, 'object', 'trie should be a object')

  const split = route.replace(/^\//, '').split('/')
  var node = null
  var key = null

  if (split.length === 1) {
    key = split[0]
    node = this.create(key)
  } else {
    const headArr = split.splice(0, split.length - 1)
    const head = headArr.join('/')
    key = split[0]
    node = this.create(head)
  }

  mutate(node.nodes, trie.nodes)
  if (trie.name) node.name = trie.name

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return
      node[key] = node.nodes[''][key]
    })
    mutate(node.nodes, node.nodes[''].nodes)
    delete node.nodes[''].nodes
  }
}

},{"assert":undefined,"xtend":45,"xtend/mutable":46}],48:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'TEXTAREA' || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    }
  }
}

},{"./update-events.js":49,"bel":13,"morphdom":36}],49:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}]},{},[6]);
