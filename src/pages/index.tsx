import { Inter } from "next/font/google";
import { useState } from "react";
import { message, Input, Button, Typography } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState<string>("");
  const [fixedText, setFixedText] = useState<string>("");
  return (
    <main
      className={`flex space-y-4 min-h-screen max-w-2xl mx-auto flex-col items-center p-8 ${inter.className} md:pt-32`}
    >
      <h1 className="text-2xl mb-0">Fix GPT Latex</h1>
      <p>Makes latex GPT output into nice markdown compatible strings.</p>
      <Input.TextArea
        placeholder="“ChatGPT markdown string here”"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        type="primary"
        className="w-full"
        onClick={() => {
          const fixed = text
            .replaceAll("\\[", "$$$$")
            .replaceAll("\\]", "$$$$")
            .replaceAll("\\( ", "$")
            .replaceAll(" \\)", "$");

          setFixedText(fixed);
          navigator.clipboard.writeText(fixed);
          message.success("Copied to clipboard");
        }}
      >
        Fix This
      </Button>
      <Typography.Text>{fixedText}</Typography.Text>
      <Button onClick={() => navigator.clipboard.writeText(fixedText)}>
        Copy to Clipboard
      </Button>
    </main>
  );
}
