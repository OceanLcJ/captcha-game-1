import * as fp from "fingerpose";
import "@tensorflow/tfjs-core";
import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
// import * as Hands from "@mediapipe/hands";
// import { Camera } from "@mediapipe/camera_utils";

const hands = new window.Hands({
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

// Make "high five" gesture
const FiveGesture = new fp.GestureDescription("five");

// All fingers should be extended (not curled)
for (const finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  FiveGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  // Allow for slight curl
  FiveGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
}

// add fist
const FistGesture = new fp.GestureDescription("fist");

// All fingers should be fully curled
for (const finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  FistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  // Allow for slight variation in curl
  FistGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
}

const knownGestures = [
  fp.Gestures.ThumbsUpGesture,
  fp.Gestures.VictoryGesture,
  FiveGesture,
  FistGesture,
];

const gestureNames = ["five", "fist", "thumbs_up", "victory"];

const gestureEstimator = new fp.GestureEstimator(knownGestures);

const gestureStrings = {
  thumbs_up: "👍",
  victory: "✌️", // this doesn't render in vscode, but it looks fine in the browser
  five: "🖐️",
  fist: "✊",
};

interface ThumbsUpProps {
  setL: (paragraph: string) => void;
  setP: (paragraph: string) => void;
  setSuccess: (val: boolean) => void;
}

export const ThumbsUp = ({ setL, setP, setSuccess }: ThumbsUpProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentGesture, setCurrentGesture] = useState<string>("thumbs_up");
  const [takeOutOfFrame, setTakeOutOfFrame] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (takeOutOfFrame) {
      setP("Move your hands");
      setL("Out of the video");
    } else {
      setP("Make this gesture");
      setL(gestureStrings[currentGesture]);
    }
  }, [currentGesture, setL, setP, takeOutOfFrame]);

  useEffect(() => {
    hands.onResults((results) => {
      if (takeOutOfFrame) {
        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        ) {
          setTakeOutOfFrame(false);
          const randomNextGesture =
            gestureNames[Math.floor(Math.random() * gestureNames.length)];
          setCurrentGesture(randomNextGesture);
        }
        return;
      }

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const formattedLandmarks = landmarks.map((l) => [l.x, l.y, l.z]);
        const predictions2 = gestureEstimator.estimate(formattedLandmarks, 9);

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
          setSuccessCount(successCount + 1);
          setTakeOutOfFrame(true);
        } else {
          // console.log("Lose!");
        }
      }
    });
  }, [currentGesture, takeOutOfFrame, successCount]);

  useEffect(() => {
    if (successCount >= 5) {
      setSuccess(true);
    }
  }, [successCount, setSuccess]);

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
      width: 300,
      height: 300,
    });
    camera.start();
  }, []);

  if (successCount > 5) {
    return (
      <div className="flex justify-center items-center text-center w-full">
        Confirmed: you have hands!
      </div>
    );
  }

  return (
    <div>
      <video
        className="w-full h-full"
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
