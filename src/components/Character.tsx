import { useEffect, useState } from "react";

interface CharacterProps {
  char: string;
  charIdx: number;
  wordIdx: number;
  typedChars: string[][];
  isExtraChar: boolean;
}

export default function Character({
  char,
  wordIdx,
  charIdx,
  typedChars,
  isExtraChar,
}: CharacterProps) {
  const [isTyped, setIsTyped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const typedChar = typedChars[wordIdx]?.[charIdx];
    setIsTyped(typedChar !== undefined);
    setIsCorrect(isExtraChar ? false : typedChar === char);
  }, [typedChars]);

  return (
    <div
      className={`${isTyped ? (isCorrect ? "" : "text-red-400") : "opacity-50"} withoutRef`}
    >
      {char}
    </div>
  );
}
