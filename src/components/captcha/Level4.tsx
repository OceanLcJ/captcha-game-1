import "./Level4.css";
import React, { useState, useEffect } from "react";

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

function Level4(props: Props) {
    props.setL("Slide image onto cutout");

    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const slider = document.querySelector(".slider-track")!.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(e.clientX - slider.left, slider.width));
        setPosition(newLeft);

        if (newLeft/slider.width >= 0.5 && newLeft/slider.width <= 0.6) {
            props.setSuccess(true);
        } else {
            props.setSuccess(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="level4">
            <img
                src={"/public/car.png"}
                alt={"car"}
                style={{
                    position: "absolute",
                    left: `${position}px`,
                    bottom: "50px",
                    transform: "translateX(-50%)",
                }}
            />

            <div className="slider-container">
                <div
                    className="slider-track"
                    onMouseDown={handleMouseDown}>

                    <div
                        className="slider-thumb"
                        style={{ left: `${position}px` }}
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
            </div>
        </div>
    );
}

export default Level4;