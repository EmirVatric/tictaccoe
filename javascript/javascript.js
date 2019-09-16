const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const GameBoard = (() => {
  const renderBoard = () => {
    const table = document.getElementById('board');
    table.innerHTML = '';
    board.forEach((element, index) => {
      const node = document.createElement('DIV');
      const textnode = document.createTextNode(element);
      node.addEventListener('click', () => {
        game.move(index);
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
  const setPlayers = (name, figure, name2, figure2) => {
    player1 = Player(name, figure);
    player2 = Player(name2, figure2);
    currPlayer = player1;
  };
  const startGame = () => {
    const player1name = document.getElementById('player1name').value;
    const player2name = document.getElementById('player2name').value;
    const player1figure = document.getElementById('player1figure').value;
    const player2figure = document.getElementById('player2figure').value;
    setPlayers(player1name, player1figure, player2name, player2figure);
    GameBoard.renderBoard();
  };
  const move = (index) => {
    board[index] = currPlayer.figure;
    currPlayer = currPlayer === player1 ? player2 : player1;
    GameBoard.renderBoard();
  };
  return {
    move,
    setPlayers,
    startGame,
  };
};

const game = Controller();