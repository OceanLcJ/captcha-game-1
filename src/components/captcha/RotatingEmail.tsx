import { useEffect, useState } from "react";

interface RotatingEmailProps {
  username: string;
  setSuccess: (val: boolean) => void;
  setP: (paragraph: string) => void;
  setL: (paragraph: string) => void;
}

export const RotatingEmail = ({
  username,
  setSuccess,
  setP,
  setL,
}: RotatingEmailProps) => {
  useEffect(() => {
    setP("Last step");
    setL("Confirm your username");
  }, []);
  const [input, setInput] = useState("");
  // inject CSS rotating the whole window
  useEffect(() => {
    if (input.length === 0) {
      return;
    }

    const styleElem = document.createElement("style");
    styleElem.innerHTML = `
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate3D(1, 1, 1, 360deg);
        }
      }
      .window {
        animation: rotate 8s linear infinite;
        top: 25%;
        left: 25%;
      }
    `;
    document.head.appendChild(styleElem);
    return () => {
      styleElem.remove();
    };
  }, [input]);

  const keyboardRows = ["123456789←", "qwertyuiop", "asdfghjkl", "zxcvbnm"];

  useEffect(() => {
    if (input === username) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [input, username]);

  return (
    <div className="w-[500px]">
      <div className="my-2 text-center text-lg font-mono">
        {input.trim().length ? input : <span>&nbsp;</span>}
      </div>
      {/* Keyboard */}
      {keyboardRows.map((row) => (
        <div className="flex">
          {row.split("").map((key) => {
            return (
              <div
                className="flex flex-1 py-3 cursor-pointer hover:bg-gray-400 justify-center items-center bg-gray-300 m-1"
                onClick={() => {
                  if (key === "←") {
                    setInput((prev) => prev.slice(0, -1));
                  } else {
                    setInput((prev) => prev + key);
                  }
                }}
                key={key}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
      {/* Space key */}
      <div
        className="flex flex-1 py-3 cursor-pointer hover:bg-gray-400 justify-center items-center bg-gray-300 m-1"
        onClick={() => setInput((prev) => prev + " ")}
      >
        ␣
      </div>
    </div>
  );
};
