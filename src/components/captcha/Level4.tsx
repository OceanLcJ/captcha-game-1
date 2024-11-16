import './Level4.css'
import React, {useState} from "react";

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

function Level4(props: Props) {
    props.setP("");
    props.setL("Slide image onto cutout");

    const [position, setPosition] = useState(0);

    const handleDrag = (e: React.MouseEvent) => {
        const slider = e.currentTarget.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(e.clientX - slider.left, slider.width));
        setPosition(newLeft);
    };

    return (
        <div className="level4">

            <img
                src={"/public/car.png"}
                alt={"car"}
                style={{
                    position: "absolute",
                    left: `${position}px`,
                    bottom: "55px",
                    transform: "translateX(-50%)",
                }}
            />

            <div className="slider-container">
                <div className="slider-track" onMouseDown={(e) => handleDrag(e)}>
                    <div
                        className="slider-thumb"
                        style={{left: `${position}px`}}
                        onMouseDown={(e) => e.preventDefault()} // Prevent text selection on drag
                    />
                </div>
            </div>
        </div>
    );
}

export default Level4;
