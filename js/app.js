/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''],
  turn = 'X',
  winner = false,
  tie = false

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  document.body.classList.remove('winnerClass')
  document.body.classList.remove('tieClass')
  render()
}
const handleClick = (event) => {
  const squareIndex = event.target.id
  if (board[squareIndex] != '') {
    return
  }
  if (winner) {
    return
  }
  placePiece(squareIndex)
  checkForWinner(squareIndex)
  checkForTie(squareIndex)
  switchPlayerTurn(squareIndex)
  render()
}
const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  board.forEach((value, key) => {
    squareEls[key].textContent = board[key]
  })
}
const updateMessage = () => {
  if (!tie && !winner) {
    messageEl.innerText = `It's ${turn} Turn Now`
  } else if (!winner && tie) {
    messageEl.innerText = 'Oops Game Tie!!!'
    document.body.classList.add('tieClass')
  } else {
    messageEl.innerText = 'Congratulation you won'
    document.body.classList.add('winnerClass')
  }
}
const placePiece = (index) => {
  board[index] = turn
  squareEls[index].textContent = turn
}
const checkForWinner = (index) => {
  winningCombos.forEach((value, key) => {
    if (
      board[value[0]] != '' &&
      board[value[1]] == board[value[0]] &&
      board[value[2]] === board[value[1]]
    ) {
      winner = true
    }
  })
}
const checkForTie = (index) => {
  if (winner) {
    return
  } else if (board.indexOf('') == -1) {
    tie = true
  }
}
const switchPlayerTurn = (index) => {
  if (winner) {
    return
  }
  if (turn == 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((value) => {
  value.addEventListener('click', function () {
    handleClick(event)
  })
})
resetBtnEl.addEventListener('click', function () {
  init()
})
init()
updateBoard()
