import { forwardRef, useEffect, useState } from "react";

interface CharacterProps {
  char: string;
  charIdx: number;
  wordIdx: number;
  typedChars: string[][];
  isExtraChar: boolean;
}

export default forwardRef<HTMLDivElement, CharacterProps>(
  function CharacterWithRef(
    { char, wordIdx, charIdx, typedChars, isExtraChar },
    ref,
  ) {
    const [isTyped, setIsTyped] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
      const typedChar = typedChars[wordIdx]?.[charIdx];
      setIsTyped(typedChar !== undefined);
      setIsCorrect(isExtraChar ? false : typedChar === char);
    }, [typedChars]);

    return (
      <div
        ref={ref}
        className={`${isTyped ? (isCorrect ? "" : "text-red-400") : "opacity-50"} withRef`}
      >
        {char}
      </div>
    );
  },
);
