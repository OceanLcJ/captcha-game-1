import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

import * as fp from "fingerpose";
import "@tensorflow/tfjs-core";
import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

const knownGestures = [
  fp.Gestures.ThumbsUpGesture,
  fp.Gestures.VictoryGesture,
  // Add other gestures
];

const gestureEstimator = new fp.GestureEstimator(knownGestures);

const landmarkColors = {
  thumb: "red",
  index: "blue",
  middle: "yellow",
  ring: "green",
  pinky: "pink",
  wrist: "white",
};

function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

const gestureStrings = {
  thumbs_up: "👍",
  victory: "✌🏻",
};

export const ThumbsUp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentGesture, setCurrentGesture] = useState<string | null>(
    "thumbs_up"
  );
  const [takeOutOfFrame, setTakeOutOfFrame] = useState(false);

  useEffect(() => {
    hands.onResults((results) => {
      if (takeOutOfFrame) {
        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        ) {
          setTakeOutOfFrame(false);
          const nextGesture =
            currentGesture === "thumbs_up" ? "victory" : "thumbs_up";
          setCurrentGesture(nextGesture);
        }
        return;
      }

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const formattedLandmarks = landmarks.map((l) => [l.x, l.y, l.z]);
        const predictions2 = gestureEstimator.estimate(formattedLandmarks, 9.5);

        if (!predictions2.gestures.length) {
          return;
        }

        const bestGesture = predictions2.gestures.reduce((best, current) =>
          best.score > current.score ? best : current
        );

        console.log(
          "Best gesture:",
          bestGesture.name + ": " + bestGesture.score
        );

        if (bestGesture.name === currentGesture) {
          console.log("Win!");
          setTakeOutOfFrame(true);
        } else {
          // console.log("Lose!");
        }
      }
    });
  }, [currentGesture, takeOutOfFrame]);

  useEffect(() => {
    // Set up webcam
    const videoElement = document.querySelector("video");

    if (!videoElement) {
      return;
    }

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });
    camera.start();
  }, []);

  return (
    <div>
      <h2>Thumbs Up</h2>
      <div className="text-lg">
        {currentGesture && !takeOutOfFrame && (
          <p>Make this: {gestureStrings[currentGesture]}</p>
        )}
        {takeOutOfFrame && <p>Take your hands out of the frame!</p>}
      </div>
      <video
        className="absolute"
        ref={videoRef}
        autoPlay
        muted
        playsInline
      ></video>
      <canvas
        className="absolute z-10"
        width="500"
        height="500"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
