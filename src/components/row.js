var h = require('virtual-dom/h')
var Cell = require('./cell')

var ObservArray = require('observ-array')

function createComponent (initialState) {
	const state = ObservArray(
		initialState.map( cellState => Cell(cellState).state )
	);

	return {
		state: state
	};
}

function render (state) {
  return h(
    'tr.row',
	h('td', {style: "padding: 0;"}, state.map(c => {
		 return Cell.render(c)
    }))
  )
}

createComponent.render = render;
module.exports = createComponent;
