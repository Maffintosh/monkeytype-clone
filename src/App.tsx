import { useEffect, useRef, useState } from "react";
import AppWrapper from "./components/AppWrapper";
import Word from "./components/Word";
import ResetButton from "./lib/UI/ResetButton";
import type { Cursor } from "./lib/types/types";
import { words } from "./lib/words";

export default function App() {
  // Initial state
  const initialTypedChars: string[][] = words.map(() => []);
  const initialCursor: Cursor = { word: 0, char: 0 };

  // State
  const [typedChars, setTypedChars] = useState<string[][]>(initialTypedChars);
  const [extraChars, setExtraChars] = useState<string[][]>(initialTypedChars);
  const [cursor, setCursor] = useState<Cursor>(initialCursor);

  // Refs to avoid stale state
  const typedCharsRef = useRef<string[][]>(initialTypedChars);
  const extraCharsRef = useRef<string[][]>(initialTypedChars);
  const cursorRef = useRef<Cursor>(initialCursor);

  const resetBtnRef = useRef<HTMLButtonElement | null>(null);
  const fallbackFocusRef = useRef<HTMLDivElement | null>(null);

  // Refs for correct caret rendering
  const caretRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cPos = useRef({ x: 0, y: 0 });
  const wPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!caretRef.current || !wrapperRef.current) return;

      const cRect = caretRef.current.getBoundingClientRect();
      const wRect = wrapperRef.current.getBoundingClientRect();
      cPos.current = { x: cRect.left, y: cRect.top };
      wPos.current = { x: wRect.left, y: wRect.top };
    });
  }, [cursor]);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code.startsWith("Key")) {
        const key = evt.code.replace("Key", "").toLowerCase();

        setCursor((prev) => {
          const newCursor = {
            ...prev,
            char: prev.char + 1,
          };

          cursorRef.current = newCursor;
          return newCursor;
        });

        setTypedChars((prev) => {
          const newTypedChars = prev.map((word, idx) =>
            cursorRef.current.word === idx ? [...word, key] : [...word],
          );

          // const newExtraChars = calculateExtraChars(newTypedChars);
          // setExtraChars(newExtraChars);
          // extraCharsRef.current = newExtraChars;
          setExtraChars(calculateExtraChars(newTypedChars));

          typedCharsRef.current = newTypedChars;
          return newTypedChars;
        });
      }

      if (evt.code === "Space") {
        if (typedCharsRef.current[cursorRef.current.word].length === 0) return;

        setCursor((prev) => {
          const newCursor = {
            word: Math.min(prev.word + 1, words.length - 1),
            char: 0,
          };

          cursorRef.current = newCursor;
          return newCursor;
        });
      }

      if (evt.code === "Backspace") {
        setCursor((prev) => {
          const newCursor = {
            ...prev,
            char: Math.max(prev.char - 1, 0),
          };

          cursorRef.current = newCursor;
          return newCursor;
        });

        setTypedChars((prev) => {
          const newTypedChars = prev.map((word, idx) =>
            cursorRef.current.word === idx
              ? [...word.filter((_, idx) => cursorRef.current.char !== idx)]
              : [...word],
          );

          // const newExtraChars = calculateExtraChars(newTypedChars);
          // setExtraChars(newExtraChars);
          // extraCharsRef.current = newExtraChars;
          setExtraChars(calculateExtraChars(newTypedChars));

          typedCharsRef.current = newTypedChars;
          return newTypedChars;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handlers
  const handleClick = () => {
    setTypedChars(initialTypedChars);
    setExtraChars(initialTypedChars);
    setCursor(initialCursor);
    typedCharsRef.current = initialTypedChars;
    // extraCharsRef.current = initialTypedChars;
    cursorRef.current = initialCursor;

    resetBtnRef.current?.blur();
    fallbackFocusRef.current?.focus();
  };

  // Utility
  const calculateExtraChars = (typed: string[][]) => {
    return typed.map((typedWord, idx) => {
      const wordLen = words[idx].length;
      return typedWord.length > wordLen ? typedWord.slice(wordLen) : [];
    });
  };

  const calculateCaretPosition = () => {
    const offset = caretRef.current?.offsetWidth || 0;
    const pos = `translate(${cPos.current.x - wPos.current.x + offset}px, ${cPos.current.y - wPos.current.y}px)`;

    return { transform: pos };
  };

  return (
    <AppWrapper>
      <div ref={fallbackFocusRef} tabIndex={-1} className="focus:outline-none">
        <div
          ref={wrapperRef}
          className="relative flex flex-wrap w-[80ch] text-4xl text-neutral-400 font-mono"
        >
          {words.map((word, idx) => (
            <Word
              key={`${word}-${idx}`}
              ref={caretRef}
              word={word}
              wordIdx={idx}
              cursor={cursor}
              typedChars={typedChars}
              extraChars={extraChars[idx]}
            />
          ))}
          <div
            style={calculateCaretPosition()}
            className={`absolute w-[2px] h-[40px] left-0 transition bg-neutral-300`}
          ></div>
        </div>
        <ResetButton ref={resetBtnRef} onClick={handleClick} />
      </div>
    </AppWrapper>
  );
}
