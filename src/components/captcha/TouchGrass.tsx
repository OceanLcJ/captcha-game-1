import Anthropic from "@anthropic-ai/sdk";
import { useState } from "react";

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

export const TouchGrass = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [score, setScore] = useState<ClaudeResponse | null>(null);

  const getScore = async () => {
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
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        console.error("API error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  };

  return (
    <div>
      <p>
        Write a paragraph talking about how you enjoy touching grass. We will
        rate your paragraph out of 10. You must get 8/10 to pass this level
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Why do you enjoy touching grass?"
      />
      <button onClick={getScore} disabled={loading}>
        Verify
      </button>
      {loading && <p>Verifying...</p>}
      {score && (
        <div>
          <p>Score: {score.score}/10</p>
          <p>Comment: {score.comment}</p>
        </div>
      )}
    </div>
  );
};
