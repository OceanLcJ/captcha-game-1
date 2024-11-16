import Anthropic from "@anthropic-ai/sdk";
import { useCallback, useEffect, useState } from "react";

// Obviously, this is really bad practice to store the API key in the frontend, but I'm doing this for the sake of speed
// I am going to disable this API key on Monday
const CLAUDE_API_KEY =
  "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";

const CLAUDE_PROMPT = `
  You are part of a CAPTCHA game. Users are asked to write a short paragraph talking about they enjoy touching grass. You must rate it on a scale of 1-10.
  First, here are some examples of paragraphs talking about touching grass with their scores.
  <Example>
    <Score>This example is a 10/10 because it is a perfect example of a paragraph talking about touching grass</Score>
    <Paragraph>I like touching grass because it is soft and cool. It is a great way to connect with nature and feel the earth beneath my feet. I love the feeling of grass between my toes and the fresh smell of the outdoors. </Paragraph>
  </Example>
  <Example>
    <Score>This example is a 8/10 because it is a good example of a paragraph talking about touching grass, but it is a bit short</Score>
    <Paragraph>I like touching grass because it is nice and green and sunny.</Paragraph>
  </Example>
  <Example>
    <Score>This example is a 5/10 because it is too short and does not provide enough detail</Score>
    <Paragraph>I like touching grass, it is good.</Paragraph>
  </Example>
  <Example>
    <Score>This example is a 2/10 because the user does not like touching grass</Score>
    <Paragraph>I hate grass, I've never seen grass before in my life</Paragraph>
  </Example>
  <Example>
    <Score>This example is a 0/10 because the user is not talking about touching grass</Score>
    <Paragraph>I like touching sand because it is soft. I love the feeling of sand between my toes on the beach.</Paragraph>
  </Example>
  Under the dashed line, you will now receive the short paragraph from a user. Return ONLY the following JSON format:
  {
    score: number,
    comment: string // explanation of why you gave the score. Be pithy and snarky.
  }
  -------------------------------------------------
`;

interface ClaudeResponse {
  score: number;
  comment: string;
}

// Initialize the client
const client = new Anthropic({
  apiKey: CLAUDE_API_KEY, // Replace with your actual API key
  dangerouslyAllowBrowser: true,
});

interface TouchGrassProps {
  setL: (paragraph: string) => void;
  setP: (paragraph: string) => void;
  checkSuccessCallback: React.MutableRefObject<null | (() => Promise<boolean>)>;
}

export const TouchGrass = ({
  setL,
  setP,
  checkSuccessCallback,
}: TouchGrassProps) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [score, setScore] = useState<ClaudeResponse | null>(null);

  const getScore = useCallback(async () => {
    setLoading(true);
    setScore(null);
    try {
      const message = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `${CLAUDE_PROMPT}${input}`,
          },
        ],
      });

      const response =
        message.content[0].type === "text" &&
        (JSON.parse(message.content[0].text) as ClaudeResponse);
      if (!response) {
        throw new Error("Invalid response");
      }
      setScore(response);
      setLoading(false);

      if (response.score >= 8) {
        await new Promise((resolve) => setTimeout(resolve, 10000)); // show the comment for a few seconds
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        console.error("API error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }, [input]);

  useEffect(() => {
    setL("Touching Grass");
    setP("Write a paragraph about why you enjoy");
    checkSuccessCallback.current = getScore;
  }, [checkSuccessCallback, getScore, setL, setP]);

  return (
    <div className="w-[350px] flex flex-col">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Why do you enjoy touching grass?"
        className="w-full font-sans resize-none p-3 flex-1"
      />
      {score && (
        <div className="p-3">
          <div className="mb-2 flex justify-between">
            <span
              className={`font-bold ${
                score.score >= 8 ? "text-green-400" : ""
              }`}
            >
              {score.score}/10
            </span>
            <span className="text-gray-500">Get 8/10 to pass</span>
          </div>
          <p>{score.comment}</p>
          {score.score >= 8 && (
            <p className="mt-2 text-gray-500">
              Moving to the next level in a few moments...
            </p>
          )}
        </div>
      )}
    </div>
  );
};
