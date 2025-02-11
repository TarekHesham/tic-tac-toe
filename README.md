# Tic Tac Toe Game 🎮

Welcome to the **Tic Tac Toe** game repository! This is a classic game of Tic Tac Toe implemented in JavaScript, where you can play against an AI opponent. <br>The AI uses the **Minimax algorithm** with **memory optimization** to make smart moves, ensuring a challenging experience every time you play.

---

## Features ✨

- **Play Against AI**: Challenge a smart AI opponent that uses the Minimax algorithm to make the best possible moves.
- **Persistent Memory**: The game saves the state of the board and the AI's memory using `localStorage`, so you can continue your game even after refreshing the page.
- **Responsive Design**: The game is designed to work seamlessly on different screen sizes.
- **Winning Animation**: When a player wins, the winning cells are highlighted for a satisfying visual effect.
- **Reset Game**: Easily reset the game at any time to start a new match.

---

## How to Play 🕹️

1. **Player (X)**: You play as **X**. Click on any empty cell to make your move.
2. **AI (O)**: The AI plays as **O** and will automatically make its move after you.
3. **Winning**: The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins the game.
4. **Draw**: If all cells are filled and no one has won, the game ends in a draw.
5. **Reset**: Click the reset button to start a new game.

---

## Code Overview �

The game is built using **JavaScript** and consists of three main classes:

1. **`Board`**: Manages the game board, including updating cells, resetting the board, and saving the board state to `localStorage`.
2. **`AIMemory`**: Stores the AI's memory of previous game states to optimize the Minimax algorithm.
3. **`Game`**: Handles the game logic, including checking for a winner, managing player turns, and running the Minimax algorithm for the AI's moves.

### Key Algorithms

- **Minimax Algorithm**: The AI uses this algorithm to evaluate all possible moves and choose the best one. It simulates all possible game outcomes to make the optimal decision.
- **Memory Optimization**: The AI stores previously calculated game states in memory to avoid redundant calculations, making the algorithm faster and more efficient.

---

## Installation 🛠️

To run this game locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/TarekHesham/tic-tac-toe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe
   ```
3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

---

## Demo 🎥

You can play the game directly by visiting the [live demo](https://tarekhesham.github.io/tic-tac-toe/).

---

## Screenshots 📸

![Game Screenshot](/images/screenshot.png)

---

## Contributing 🤝

Contributions are welcome! If you have any ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request.

---

## Credits 👏

- **Tarek ElFarawamy**: The developer of this game.
- **AI Assistance**: This project was developed with the help of AI tools for code optimization and suggestions.

---

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy the game! 🎉  
If you have any questions or feedback, feel free to reach out. 😊