import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

interface SpeechRecognitionProps {
  index: 0 | 1 | 2 | 3;
  setL: (paragraph: string) => void;
  setP: (paragraph: string) => void;
  setSuccess: (val: boolean) => void;
}

const TOUNGUE_TWISTERS = ["I am definitely not a robot."];

export const SpeechRecognition = ({
  index,
  setL,
  setP,
  setSuccess,
}: SpeechRecognitionProps) => {
  const [value, setValue] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setValue(result);
    },
  });

  useEffect(() => {
    setValue("");
    setSuccess(false);
    setP("Repeat after me");
    setL(TOUNGUE_TWISTERS[index]);
  }, [index, setL, setP, setSuccess]);

  const validateSpeech = () => {
    const twister = TOUNGUE_TWISTERS[index];
    const normalizedTwister = twister.toLowerCase().replace(/\?|,|\./g, ""); // remove punctuation
    if (value.toLowerCase() === normalizedTwister) {
      setSuccess(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-between items-center flex-col p-5">
      <div className="text-2xl">{value}</div>
      <div
        onMouseDown={() => listen()}
        onMouseUp={() => {
          stop();
          validateSpeech();
        }}
        className="flex justify-center items-center gap-3 flex-col"
      >
        <svg
          fill={listening ? "#d01414" : "#000"}
          height="100px"
          width="100px"
          version="1.1"
          className="cursor-pointer"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490.9 490.9"
        >
          <g>
            <g>
              <path
                d="M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5
			C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5
			c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z"
              />
              <path
                d="M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3
			s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8
			c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9
			C106.6,220,101.2,214.5,94.4,214.5z"
              />
            </g>
          </g>
        </svg>
        <div className={listening ? "text-[#d01414]" : "text-gray-400"}>
          {listening ? "Listening" : "Press and hold to speak"}
        </div>
      </div>
    </div>
  );
};
