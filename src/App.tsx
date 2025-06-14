import { useEffect, useRef, useState } from "react";
import AppWrapper from "./components/AppWrapper";
import Word from "./components/Word";
import ResetButton from "./lib/UI/ResetButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import type { Cursor } from "./lib/types/types";
import { words } from "./lib/words";

export default function App() {
  // Initial state
  const initialTypedChars: string[][] = words.map(() => []);
  const initialCursor: Cursor = { word: 0, char: 0 };

  // State
  const [typedChars, setTypedChars] = useState<string[][]>(initialTypedChars);
  const [extraChars, setExtraChars] = useState<string[][]>(initialTypedChars);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState<Cursor>(initialCursor);

  // Refs to avoid stale state
  const typedCharsRef = useRef<string[][]>(initialTypedChars);
  const cursorRef = useRef<Cursor>(initialCursor);

  // Refs to DOM Nodes
  const resetBtnRef = useRef<HTMLButtonElement | null>(null);

  // Refs for correct caret rendering
  const caretRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!caretRef.current || !wrapperRef.current) return;

    const cRect = caretRef.current.getBoundingClientRect();
    const wRect = wrapperRef.current.getBoundingClientRect();

    setCaretPos({
      x: cRect.left - wRect.left,
      y: cRect.top - wRect.top,
    });
  }, [cursor]);

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

  // Handlers
  const handleClick = () => {
    setTypedChars(initialTypedChars);
    setExtraChars(initialTypedChars);
    setCursor(initialCursor);
    typedCharsRef.current = initialTypedChars;
    cursorRef.current = initialCursor;

    resetBtnRef.current?.blur();
    wrapperRef.current?.focus();
  };

  // Utility
  const getExtraChars = (typed: string[][]) => {
    return typed.map((typedWord, idx) => {
      const wordLen = words[idx].length;
      return typedWord.length > wordLen ? typedWord.slice(wordLen) : [];
    });
  };

  const getCaretPosition = () => {
    // const offset = caretRef.current?.offsetWidth || 0;
    const pos = `translate(${caretPos.x}px, ${caretPos.y}px)`;

    return { transform: pos };
  };

  return (
    <AppWrapper>
      <Header />
      <main>
        <div
          ref={wrapperRef}
          tabIndex={-1}
          className="relative flex flex-wrap w-[80ch] text-4xl focus:outline-none"
        >
          {words.map((word, idx) => (
            <Word
              key={`${word}-${idx}`}
              ref={cursor.word === idx ? caretRef : null}
              word={word}
              wordIdx={idx}
              cursor={cursor}
              typedChars={typedChars}
              extraChars={extraChars[idx].join("")}
            />
          ))}
          <div
            style={getCaretPosition()}
            className={`absolute w-[3px] h-[40px] left-0 transition blink-animation`}
          ></div>
        </div>
        <ResetButton ref={resetBtnRef} onClick={handleClick} />
      </main>
      <Footer />
    </AppWrapper>
  );
}
