// Pega os elementos da página
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Todas as combinações que dão vitória (índices das casas 0 a 8)
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

let board;    // array com 9 posições: '', 'X' ou 'O'
let current;  // jogador da vez
let gameOver; // true quando alguém ganha ou dá velha

// Prepara (ou reinicia) o jogo
function start() {
  board = Array(9).fill('');
  current = 'X';
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
  });
  statusEl.textContent = 'Vez do X';
}

// Retorna a linha vencedora ou null se ninguém ganhou ainda
function checkWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

// Executa uma jogada na casa i
function play(i) {
  if (gameOver || board[i]) return; // ignora clique em casa ocupada ou jogo acabado

  board[i] = current;
  cells[i].textContent = current;
  cells[i].classList.add(current.toLowerCase());

  const line = checkWinner();
  if (line) {
    line.forEach(k => cells[k].classList.add('win'));
    statusEl.textContent = `O ${current} ganhou!`;
    gameOver = true;
    return;
  }

  if (board.every(Boolean)) { // todas as casas preenchidas
    statusEl.textContent = 'Deu velha!';
    gameOver = true;
    return;
  }

  current = current === 'X' ? 'O' : 'X';
  statusEl.textContent = `Vez do ${current}`;
}

// Liga os cliques às funções
cells.forEach((cell, i) => cell.addEventListener('click', () => play(i)));
resetBtn.addEventListener('click', start);

start();
