import type { Cursor } from "../lib/types/types";
import { words } from "../lib/words";
import Character from "./Character";

interface WordProps {
  word: string;
  wordIdx: number;
  cursor: Cursor;
  typedChars: string[][];
  extraChars: string;
  caretRef: React.RefObject<HTMLDivElement | null> | null;
}

export default function Word({
  word,
  wordIdx,
  cursor,
  typedChars,
  extraChars,
  caretRef,
}: WordProps) {
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
            ref={isExtra ? caretRef : isCursor ? caretRef : null}
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
}
