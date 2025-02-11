class Board {
  constructor() {
    this.board = JSON.parse(localStorage.getItem("ai_board")) || [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  getBoard() {
    return this.board;
  }

  updateCell(row, col, value) {
    this.board[row][col] = value;
  }

  resetBoard() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  saveBoard() {
    localStorage.setItem("ai_board", JSON.stringify(this.board));
  }
}

class AIMemory {
  constructor() {
    this.memory = JSON.parse(localStorage.getItem("ai_memory")) || {};
  }

  getMemory() {
    return this.memory;
  }

  saveMemory() {
    localStorage.setItem("ai_memory", JSON.stringify(this.memory));
  }
}

class Game {
  constructor(board, aiMemory) {
    this.board = board;
    this.aiMemory = aiMemory;
    this.currentPlayer = parseInt(localStorage.getItem("ai_currentPlayer")) || 1; // 1 = Player (X), 2 = AI (O)
    this.checkAI();
  }

  checkWinner() {
    const board = this.board.getBoard();
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== 0)
        return { winner: board[i][0], cells: [[i, 0], [i, 1], [i, 2]] };

      if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== 0)
        return { winner: board[0][i], cells: [[0, i], [1, i], [2, i]] };
    }

    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0)
      return { winner: board[0][0], cells: [[0, 0], [1, 1], [2, 2]] };

    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== 0)
      return { winner: board[0][2], cells: [[0, 2], [1, 1], [2, 0]] };

    return { winner: 0, cells: [] };
  }

  checkDraw() {
    return this.board.getBoard().flat().every((cell) => cell !== 0);
  }

  minimax(board, depth, isMaximizing) {
    let { winner } = this.checkWinner();
    if (winner === 1) return -10 + depth;
    if (winner === 2) return 10 - depth;
    if (this.checkDraw()) return 0;

    let state = board.flat().join("");
    if (this.aiMemory.getMemory()[state] !== undefined) return this.aiMemory.getMemory()[state];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = 2;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = 0;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      this.aiMemory.getMemory()[state] = bestScore;
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = 1;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = 0;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      this.aiMemory.getMemory()[state] = bestScore;
      return bestScore;
    }
  }

  findBestMove() {
    let bestScore = -Infinity;
    let move = {};
    const board = this.board.getBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 2;
          let score = this.minimax(board, 0, false);
          board[i][j] = 0;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
  }

  aiTurn() {
    let move = this.findBestMove();
    this.board.updateCell(move.i, move.j, 2);
    this.updateBoard();
    this.currentPlayer = 1;
    this.saveCurrentPlayer();
  }

  updateBoard() {
    document.querySelectorAll("td").forEach((cell) => {
      let row = cell.getAttribute("data-row");
      let col = cell.getAttribute("data-col");
      const board = this.board.getBoard();
      if (board[row][col] === 1) {
        cell.textContent = "X";
      } else if (board[row][col] === 2) {
        cell.textContent = "O";
      }
    });

    let { winner, cells } = this.checkWinner();

    if (winner) {
      document.getElementById("message").textContent = winner === 1 ? "Player Wins!" : "AI Wins!";
      document.getElementById("msg").style.visibility = "visible";
      this.disableBoard();

      cells.forEach(([r, c]) => {
        document.querySelector(`[data-row="${r}"][data-col="${c}"]`).classList.add("winning-cell");
      });
      return;
    }

    if (this.checkDraw()) {
      document.getElementById("message").textContent = "It's a Draw!";
      document.getElementById("msg").style.visibility = "visible";
      this.disableBoard();
    }

    this.board.saveBoard();
    this.aiMemory.saveMemory();
  }

  disableBoard() {
    document.querySelectorAll("td").forEach((cell) => {
      cell.removeEventListener("click", this.handleCellClick.bind(this));
    });
  }

  handleCellClick(event) {
    if (this.currentPlayer === 2) return;
    
    let row = event.target.getAttribute("data-row");
    let col = event.target.getAttribute("data-col");
    
    if (this.board.getBoard()[row][col] === 0) {
      this.currentPlayer = 2;
      this.saveCurrentPlayer();
      this.board.updateCell(row, col, 1);
      this.updateBoard();
      let { winner } = this.checkWinner();
      if (!winner && !this.checkDraw()) {
        setTimeout(() => this.aiTurn(), 500);
      }
    }
  }

  resetGame() {
    this.board.resetBoard();
    this.currentPlayer = 1;
    this.saveCurrentPlayer();

    this.updateBoard();
    document.getElementById("msg").style.visibility = "hidden";
    document.querySelectorAll("td").forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("winning-cell");
      cell.addEventListener("click", this.handleCellClick.bind(this));
    });
  }

  saveCurrentPlayer() {
    localStorage.setItem("ai_currentPlayer", this.currentPlayer);
  }

  checkInit() {
    let { winner } = this.checkWinner();
    if (!winner && !this.checkDraw()) {
      setTimeout(() => this.aiTurn(), 500);
    }
  }
}

// Initialize the game
const board = new Board();
const aiMemory = new AIMemory();
const game = new Game(board, aiMemory);

document.querySelectorAll("td").forEach((cell) => {
  cell.addEventListener("click", game.handleCellClick.bind(game));
});

game.updateBoard(); // Update the board from stored memory