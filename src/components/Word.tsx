import { forwardRef } from "react";
import { words } from "../lib/words";
import type { Cursor } from "../lib/types/types";
import Character from "./Character";

interface WordProps {
  word: string;
  wordIdx: number;
  cursor: Cursor;
  typedChars: string[][];
  extraChars: string;
}

export default forwardRef<HTMLDivElement, WordProps>(function Word(
  { word, wordIdx, cursor, typedChars, extraChars },
  ref,
) {
  return (
    <div className="flex p-2">
      {[...word, ...extraChars].map((char, idx) => {
        const isCursor = cursor.word === wordIdx && cursor.char === idx;
        const isExtra =
          extraChars.length > 0 &&
          cursor.word === wordIdx &&
          cursor.char - 1 === idx;

        return (
          <Character
            key={`${char}-${idx}`}
            ref={isExtra || isCursor ? ref : null}
            char={char}
            wordIdx={wordIdx}
            charIdx={idx}
            typedChars={typedChars}
            isExtraChar={idx > words[wordIdx].length - 1}
          />
        );
      })}
    </div>
  );
});
