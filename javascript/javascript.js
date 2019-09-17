let board = ['', '', '', '', '', '', '', '', ''];


const GameBoard = (() => {
  const renderBoard = (move) => {
    const table = document.getElementById('board');
    table.innerHTML = '';
    board.forEach((element, index) => {
      const node = document.createElement('DIV');
      const textnode = document.createTextNode(element);
      node.addEventListener('click', () => {
        move(index);
      });
      node.appendChild(textnode);
      table.appendChild(node);
    });
  };
  return {
    renderBoard,
  };
})();

const Player = (name, figure) => ({
  name,
  figure,
});

const Controller = () => {
  let player1;
  let player2;
  let currPlayer;
  let statsWinnerDraw;
  const setPlayers = (name, figure, name2, figure2) => {
    player1 = Player(name, figure);
    player2 = Player(name2, figure2);
    currPlayer = player1;
  };
  const checkHorizontal = () => ((board[0] !== '') && (board[0] === board[1] && board[1] === board[2]))
    || ((board[3] !== '') && (board[3] === board[4] && board[4] === board[5]))
    || ((board[6] !== '') && (board[6] === board[7] && board[7] === board[8]));

  const checkVertical = () => ((board[0] !== '') && (board[0] === board[3]) && (board[0] === board[6]))
    || ((board[1] !== '') && (board[1] === board[4] && board[4] === board[7]))
    || ((board[2] !== '') && (board[2] === board[5] && board[5] === board[8]));

  const checkCross = () => ((board[0] !== '') && (board[0] === board[4] && board[4] === board[8]))
    || ((board[2] !== '') && (board[2] === board[4] && board[4] === board[6]));

  const checkMatrix = () => checkHorizontal() || checkVertical() || checkCross();
  const checkDraw = () => board.filter((x) => x === '').length === 0;
  const move = (index) => {
    if (board[index] !== '') {
      return;
    }
    if (!statsWinnerDraw) {
      board[index] = currPlayer.figure;
      GameBoard.renderBoard(move);
    }
    if (checkMatrix()) {
      statsWinnerDraw = true;
      document.getElementById('current-player').innerHTML = `${currPlayer.name}--> winner !!`;
    } else if (checkDraw()) {
      statsWinnerDraw = true;
      document.getElementById('current-player').innerHTML = 'Draw !!';
    } else {
      currPlayer = currPlayer === player1 ? player2 : player1;
      document.getElementById('current-player').innerHTML = currPlayer.name;
    }
  };
  const startGame = () => {
    statsWinnerDraw = false;
    const player1name = document.getElementById('player1name').value;
    const player2name = document.getElementById('player2name').value;
    const player1figure = document.getElementById('player1figure').value;
    const player2figure = document.getElementById('player2figure').value;
    board = ['', '', '', '', '', '', '', '', ''];
    setPlayers(player1name, player1figure, player2name, player2figure);
    document.getElementById('current-player').innerHTML = currPlayer.name;
    GameBoard.renderBoard(move);
  };
  return {
    move,
    setPlayers,
    startGame,
  };
};

document.getElementById('startGame').addEventListener('click', () => {
  const game = Controller();
  game.startGame();
});