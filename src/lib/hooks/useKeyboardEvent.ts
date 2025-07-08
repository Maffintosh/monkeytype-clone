import { useEffect } from "react";
import type { Cursor } from "../types/types";
import { words } from "../words";

type SSA<T> = React.Dispatch<React.SetStateAction<T>>; // SSA stands for Set State Action
type RO<T> = React.RefObject<T>; // RO stands for Ref Object

export const useKeyboardEvent = (
  setTypedChars: SSA<string[][]>,
  setExtraChars: SSA<string[][]>,
  setCursor: SSA<Cursor>,
  typedCharsRef: RO<string[][]>,
  cursorRef: RO<Cursor>,
) => {
  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code.startsWith("Key")) {
        const key = evt.code.replace("Key", "").toLowerCase();
        handleCharPress(key);
      }

      if (evt.code === "Space") {
        handleSpacePress();
      }

      if (evt.code === "Backspace") {
        handleBackspacePress();
      }
    };

    const handleCharPress = (key: string) => {
      setTypedChars((prev) => {
        const newTypedChars = prev.map((word, idx) =>
          cursorRef.current.word === idx ? [...word, key] : [...word],
        );

        typedCharsRef.current = newTypedChars;
        setExtraChars(getExtraChars(typedCharsRef.current));
        return newTypedChars;
      });

      setCursor((prev) => {
        const newCursor = {
          ...prev,
          char: prev.char + 1,
        };

        cursorRef.current = newCursor;
        return newCursor;
      });
    };

    const handleSpacePress = () => {
      setCursor((prev) => {
        const newCursor = {
          word: Math.min(prev.word + 1, words.length - 1),
          char: 0,
        };

        cursorRef.current = newCursor;
        return newCursor;
      });
    };

    const handleBackspacePress = () => {
      setTypedChars((prev) => {
        const newTypedChars = prev.map((word, idx) =>
          cursorRef.current.word === idx
            ? [...word.filter((_, idx) => cursorRef.current.char - 1 !== idx)]
            : [...word],
        );

        typedCharsRef.current = newTypedChars;
        setExtraChars(getExtraChars(newTypedChars));

        return newTypedChars;
      });

      setCursor((prev) => {
        const newCursor = {
          ...prev,
          char: Math.max(prev.char - 1, 0),
        };

        cursorRef.current = newCursor;
        return newCursor;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

const getExtraChars = (typed: string[][]) => {
  return typed.map((typedWord, idx) => {
    const wordLen = words[idx].length;
    return typedWord.length > wordLen ? typedWord.slice(wordLen) : [];
  });
};
