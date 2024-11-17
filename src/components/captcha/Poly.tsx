import './Poly.css'
import React, { useState, useEffect } from "react";

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

// Generate random roots and calculate a, b, and c
const root1 = Math.floor(Math.random()*10)+1; // Random root1
const root2 = Math.floor(Math.random()*10)+1; // Random root2
const b = (root1 + root2); // b is actually less than 0
const c = root1 * root2;

function Poly(props: Props) {
    props.setP("Solve the quadratic equation.");
    props.setL("Enter the two roots of the equation");

    const [userRoot1, setUserRoot1] = useState("");
    const [userRoot2, setUserRoot2] = useState("");

    useEffect(() => {
        if (userRoot1 === '' || userRoot2 === '') {
            return;
        }

        const parsedRoot1 = Number(userRoot1);
        const parsedRoot2 = Number(userRoot2);

        const isCorrect = (parsedRoot1 == root1 && parsedRoot2 == root2) ||
            (parsedRoot1 == root2 && parsedRoot2 == root1)

        if (isCorrect) {
            props.setSuccess(true);
        } else {
            props.setSuccess(false);
        }
    }, [userRoot1, userRoot2])

    return (
        <div className="Poly-container">
            <div className="Poly">
                <h2 className="equation">
                    Solve: x<sup>2</sup> - {b}x + {c} = 0
                </h2>

                <div className="input">
                    <label className="input-label">
                        Root 1:
                        <input
                            type="number"
                            className="input-box"
                            value={userRoot1}
                            onChange={(e) => setUserRoot1(e.target.value)}
                        />
                    </label>
                    <label className="input">
                        Root 2:
                        <input
                            type="number"
                            className="input-box"
                            value={userRoot2}
                            onChange={(e) => setUserRoot2(e.target.value)}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Poly;
