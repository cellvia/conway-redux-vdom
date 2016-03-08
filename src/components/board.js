var h = require('virtual-dom/h')
var Row = require('./row')
var Thunk = require('vdom-thunk')
var Observ = require('observ')
var ObservComputed = require('observ/computed')
var ObservStruct = require('observ-struct')
var ObservArray = require('observ-array')

function createComponent(initialState){
	const state = ObservArray( initialState.map( (rowState) => { return Row(rowState).state }) )

	const saveData = ObservComputed([state], rows => {
		const rowNum = rows.map( row => row.map( cell => Number(cell) ) );
		debugger
		return {
			rows: rowNum,
			binary: rowNum.reduce( (prev, curr) => curr.reduce( (prev2, curr) => { return prev2+""+Number(curr); }, prev ), "" ),
			countOn: rowNum.reduce( (prev, curr) => curr.reduce( (prev2, curr) => { return curr ? ++prev2 : prev2; }, prev ), 0 )
		}
	})

	const loadData = rows => rows.forEach( (row, i) => {
		var rowObs = state.get(i);
		rowObs.transaction( (rawArr) => {
			rawArr.forEach( (cell, ii) => {
				rawArr[ii] = row[ii];
			} )
		} )
	})

	return {
		state: state,
		saveData: saveData,
		loadData: loadData
	}
}

// (downstream)
function render (state) {
  return h('table#board',
    {style: "border-collapse: collapse;"},
    state.map( (rowState) => Row.render(rowState) )
  )
}

createComponent.render = render;
module.exports = createComponent;
