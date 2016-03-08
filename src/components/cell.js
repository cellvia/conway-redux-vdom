var h = require('virtual-dom/h')
var sheetify = require('sheetify')
var classNames = require('classnames')

var Observ = require('observ')

var prefix = sheetify('./cell.css')

function createComponent (initialState) {
	const state = Observ(!!initialState)
	return { state: state };
}

function render (state) {
  return h('span', {
      className: classNames(['cell', prefix, {
        alive: !!state, dead: !state
      }])
    })
}

createComponent.render = render;
module.exports = createComponent;
