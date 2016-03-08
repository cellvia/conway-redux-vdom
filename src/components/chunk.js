var h = require('virtual-dom/h')
var cell = require('./cell')
var Thunk = require('vdom-thunk')

function render(data){
	return h('td', {style: "padding: 0;"}, data.map((c, i) => {
		 return cell(c)
    }))
}

module.exports = render