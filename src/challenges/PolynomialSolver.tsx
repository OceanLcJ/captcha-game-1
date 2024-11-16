import { useEffect, useState } from "react";

export const PolynomialSolver = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState(0);

  // set the coefficients randomly when the component mounts
  useEffect(() => {
    setA(Math.floor(Math.random() * 10));
    setB(Math.floor(Math.random() * 10));
  }, []);

  return (
    <div>
      <h2>Solve the polynomial:</h2>
      <p>
        {a}x + {b} = 0
      </p>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
      />
    </div>
  );
};
