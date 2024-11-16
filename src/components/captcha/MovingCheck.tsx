import { useEffect, useRef } from "react";

interface MovingCheckProps {
  setSuccess: (val: boolean) => void;
  setP: (paragraph: string) => void;
  setL: (paragraph: string) => void;
}

export const MovingCheck = ({ setSuccess, setP, setL }: MovingCheckProps) => {
  useEffect(() => {
    setP("Verify you are a human");
    setL("Click on the checkbox");
  });

  const checkRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const moving = useRef(false);

  useEffect(() => {
    const onMouseMove = async (e: MouseEvent) => {
      if (checkRef.current) {
        const rect = checkRef.current.getBoundingClientRect();
        const isNear =
          e.clientX >= rect.left - 10 &&
          e.clientX <= rect.right + 10 &&
          e.clientY >= rect.top - 10 &&
          e.clientY <= rect.bottom + 10;

        if (isNear && !moving.current) {
          moving.current = true;
          // wait a random amount of time between 0-0.4 second
          const waitMs = Math.random() * 400;
          await new Promise((resolve) => setTimeout(resolve, waitMs));

          // move the checkbox randomly within the wrapper, out of 10 pixels away
          const wrapRect = wrapRef.current!.getBoundingClientRect();
          const x = Math.random() * (wrapRect.width - 20);
          const y = Math.random() * (wrapRect.height - 20);
          checkRef.current.style.left = `${x}px`;
          checkRef.current.style.top = `${y}px`;
          moving.current = false;
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [checkRef]);

  return (
    <div className="flex relative w-[500px]" ref={wrapRef}>
      <input
        type="checkbox"
        className="absolute transition-all top-2 left-2 w-8 h-8"
        ref={checkRef}
        onClick={() => setSuccess(true)}
      />
      <div className="ml-12 mt-4">I am not a robot</div>
    </div>
  );
};
