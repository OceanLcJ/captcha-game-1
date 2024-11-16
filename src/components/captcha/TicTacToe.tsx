import { useEffect, useState } from "react";
import Minimax from "tic-tac-toe-minimax";

type Cell = "X" | "O" | null;

interface TicTacToeProps {
  setL: (paragraph: string) => void;
  setP: (paragraph: string) => void;
  setSuccess: (val: boolean) => void;
  mode: "easy" | "hard"; // easy plays randomly, hard plays minimax
}

export const TicTacToe = ({ setL, setP, setSuccess, mode }: TicTacToeProps) => {
  const [board, setBoard] = useState<Cell[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (mode === "easy") {
      setL("Tic Tac Toe");
      setP("Beat the computer");
    } else {
      setL("Tic Tac Toe");
      setP("Beat the computer, but now it's really trying");
    }
  }, [mode]);

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
    if (newBoard[i][j] !== null || computerTurn) {
      return;
    }
    newBoard[i][j] = "X";
    setBoard(newBoard);
    setComputerTurn(true);
  };

  useEffect(() => {
    const runTurn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // wait for half a second
      const newBoard = board.map((r) => r.slice());

      if (
        checkWinner(newBoard) ||
        newBoard.flat().every((cell) => cell !== null)
      ) {
        return;
      }

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

  useEffect(() => {
    if (winner) {
      setSuccess(winner === "X");
    }
    if (isDraw) {
      setSuccess(false);
    }

    if (winner === "O" || isDraw) {
      setAttempts((prev) => prev + 1);
      setTimeout(() => {
        setBoard([
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]);
      }, 2000);
    }
  }, [winner, isDraw, setSuccess]);

  useEffect(() => {
    if (attempts >= 3) {
      setSuccess(true);
    }
  }, [attempts, setSuccess]);

  if (attempts >= 3) {
    return (
      <div className="relative h-full w-[350px] flex justify-center items-center text-center">
        What's more human than trying again and again, with no hope of success
        in sight? You can move onto the next level.
      </div>
    );
  }

  return (
    <div className="relative h-full w-[350px]">
      {/* Status */}
      {!!(winner || isDraw) && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="bg-gray-400 w-32 h-32 flex justify-center items-center rounded">
            {winner ? (winner === "X" ? "You win!" : "Computer wins!") : null}
            {isDraw ? "It's a draw!" : null}
          </div>
        </div>
      )}
      <div className="p-3 h-full w-full">
        <div className="h-full w-full flex flex-col">
          {board.map((row, i) => (
            <div key={i} className="flex flex-1 border-collapse">
              {row.map((cell, j) => (
                <div
                  className={`flex-1 border-r border-b border-solid border-black flex items-center justify-center text-2xl
                  ${cell === null && !computerTurn ? "cursor-pointer" : ""}
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
    </div>
  );
};
