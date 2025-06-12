import { forwardRef } from "react";
import type { Cursor } from "../lib/types/types";
import Character from "./Character";
import { words } from "../lib/words";
import CharacterWithRef from "./CharacterWithRef";

interface WordProps {
  word: string;
  wordIdx: number;
  cursor: Cursor;
  typedChars: string[][];
  extraChars: string[];
}

export default forwardRef<HTMLDivElement, WordProps>(function Word(
  { word, wordIdx, cursor, typedChars, extraChars },
  ref,
) {
  return (
    <div className="flex p-2">
      {[...word, ...extraChars].map((char, idx) =>
        cursor.word === wordIdx && cursor.char === idx ? (
          <CharacterWithRef
            key={`${char}-${idx}`}
            ref={ref}
            char={char}
            wordIdx={wordIdx}
            charIdx={idx}
            typedChars={typedChars}
            isExtraChar={idx > words[wordIdx].length - 1}
          />
        ) : (
          <Character
            key={`${char}-${idx}`}
            char={char}
            wordIdx={wordIdx}
            charIdx={idx}
            typedChars={typedChars}
            isExtraChar={idx > words[wordIdx].length - 1}
          />
        ),
      )}
    </div>
  );
});
