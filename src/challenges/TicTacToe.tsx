import { useEffect, useState } from "react";
import Minimax from "tic-tac-toe-minimax";

type Cell = "X" | "O" | null;

interface TicTacToeProps {
  mode: "easy" | "hard"; // easy plays randomly, hard plays minimax
}

export const TicTacToe = ({ mode }: TicTacToeProps) => {
  const [board, setBoard] = useState<Cell[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [computerTurn, setComputerTurn] = useState(false);

  const checkWinner = (board: Cell[][]) => {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // check columns
    for (let j = 0; j < 3; j++) {
      if (
        board[0][j] &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]
      ) {
        return board[0][j];
      }
    }

    // check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }

    return null;
  };

  const playUserMove = async (i: number, j: number) => {
    const newBoard = board.map((r) => r.slice());
    newBoard[i][j] = "X";
    setBoard(newBoard);
    setComputerTurn(true);
  };

  useEffect(() => {
    const runTurn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // wait for half a second
      const newBoard = board.map((r) => r.slice());

      // play the computer's move
      if (mode === "easy") {
        const emptyCells: [number, number][] = [];
        newBoard.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell === null) {
              emptyCells.push([i, j]);
            }
          });
        });
        // randomly pick an empty cell
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newBoard[randomCell[0]][randomCell[1]] = "O";
        setBoard(newBoard);
        setComputerTurn(false);
      } else {
        const huPlayer = "X";
        const aiPlayer = "O";
        const symbols = {
          huPlayer: huPlayer,
          aiPlayer: aiPlayer,
        };
        const difficulty = "Hard";
        const boardArr = new Array(9).fill(null).map((_, i) => {
          return board.flat()[i] === null ? i : board.flat()[i];
        });

        const bestMove = Minimax.ComputerMove(boardArr, symbols, difficulty);
        console.log(bestMove);

        const row = Math.floor(bestMove / 3);
        const col = bestMove % 3;
        newBoard[row][col] = "O";
        setBoard(newBoard);
        setComputerTurn(false);
      }
    };

    if (computerTurn) {
      runTurn();
    }
  }, [board, computerTurn, mode]);

  const winner = checkWinner(board);
  const isDraw = board.flat().every((cell) => cell !== null) && !winner;

  return (
    <div>
      <h2>Tic Tac Toe</h2>
      {winner ? <p>{winner === "X" ? "You win!" : "Computer wins!"}</p> : null}
      {isDraw ? <p>It's a draw!</p> : null}
      <div>
        {board.map((row, i) => (
          <div key={i} className="flex border-collapse">
            {row.map((cell, j) => (
              <div
                className={`w-12 h-12 border-r border-b border-solid border-black flex items-center justify-center text-2xl
                  ${j === row.length - 1 ? "border-r-0" : ""} 
                  ${i === board.length - 1 ? "border-b-0" : ""}
                  ${i === 0 ? "border-t-0" : ""}
                  ${j === 0 ? "border-l-0" : ""}
                  ${computerTurn && "cursor-not-allowed pointer-events-none"}
                `}
                key={j}
                onClick={() => {
                  playUserMove(i, j);
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
