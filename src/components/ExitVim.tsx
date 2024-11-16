import { useEffect, useState } from "react";

export const ExitVim = () => {
  const [input, setInput] = useState("");
  const [inputting, setInputting] = useState(false);

  const lines = [
    "                                ",
    "~                                ",
    "~                                ",
    "~                                ",
    "~                                             VIM - Vi IMproved",
    "~                                ",
    "~                                              version 9.0.2018",
    "~                                           by Bram Moolenaar et al.",
    "~                                Vim is open source and freely distributable",
    "~",
    "~                                         Become a registered Vim user!",
    "~                                type  :help registerBLUE&lt;Enter&gt;END   for information",
    "~                                type  RED?????END                   to exit",
    "~                                type  :helpBLUE&lt;Enter&gt;END  or  BLUE&lt;F1&gt;END  for on-line help",
    "~                                type  :help version9BLUE&lt;Enter&gt;END   for version info",
    "~                                ",
    "~                                ",
    "~                                ",
    "~                                ",
    inputting ? (input.length > 0 ? input : " ") : " ",
  ];

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === ":") {
        setInputting(true);
        setInput(":");
      } else if (inputting) {
        if (e.key === "Escape") {
          setInput("");
          setInputting(false);
        }
        if (e.key === "Enter") {
          if (input === ":q") {
            setInput("");
            setInputting(false);
            // PUT NEXT LEVEL HERE!
            alert("Nice!");
          }
          setInput("");
          setInputting(false);
        }
        if (e.key === "Backspace") {
          const newInput = input.slice(0, -1);
          setInput(newInput);
        }
        if (/[a-zA-Z0-9]/.test(e.key) && e.key.length === 1) {
          setInput(input + e.key);
        }
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [inputting, input]);

  return (
    <div className="bg-black font-mono relative">
      {/* Cursor */}
      {!inputting && (
        <div className="bg-white w-2 h-4 absolute top-1 left-[2px] animate-[blink_1s_steps(1,_start)_infinite] "></div>
      )}
      {lines.map((line, i) => (
        <div
          className="text-white"
          key={i}
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/ /g, "&nbsp;")
              .replace(/BLUE/g, '<span class="text-cyan-500">')
              .replace(/RED/g, '<span class="text-red-400">')
              .replace(/END/g, "</span>"),
          }}
        />
      ))}
      {inputting && (
        <div
          className={`bg-white w-2 h-4 absolute bottom-[2px] animate-[blink_1s_steps(1,_start)_infinite]`}
          style={{ left: `${input.length * 10}px` }}
        ></div>
      )}
    </div>
  );
};
