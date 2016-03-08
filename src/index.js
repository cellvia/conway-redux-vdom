var conways = require('conways');
var main = require('main-loop');
var vdom = require('virtual-dom');

var Board = require('./components/board.js')

const SIZE = 60;

document.addEventListener('DOMContentLoaded', () => {
	let initialState = conways.createBoard(SIZE)
	for (var i = 0, l = initialState.length; i < l; i++) {
	    for (var j = 0; j < l; j++) {
	      initialState[i][j] = Math.random() > 0.3;
	    }
	}
	const App = Board(initialState);

	const loop = main( App.state(), Board.render, vdom);
	document.body.appendChild(loop.target);


	App.state(loop.update); //when App state changes, update loop

	console.log( "begin" )
	console.log( App.saveData( ) );

	let test = 0;
	let end = false;
	let nextState = 0;
	(function step(){
	  nextState = conways.nextBoard( nextState || initialState );
	  App.loadData( nextState ); 
	  test++
	  if(!end) setTimeout(step, 10);
	  if(end){
	  	console.log("end")
		console.log( App.saveData( ) );
	  }
	})();

	setTimeout( () => { console.log(test) }, 1000 * 10 );
	setTimeout( () => { end = true }, 1000 * 10);
})
