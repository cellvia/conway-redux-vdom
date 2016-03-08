var conway = require('conways')

function reducer (state, action) {
  switch (action.type) {
    case 'SET' :
      state[action.location.row][action.location.column] = true
      return state
    case 'STEP':
      return conway.nextBoard(state)
    default:
      return state
  }
}

module.exports = reducer
