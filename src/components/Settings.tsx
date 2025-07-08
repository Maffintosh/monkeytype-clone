import { useState } from "react";

interface WordMode {
  mode: "words";
  extra: 10 | 25 | 50 | 100;
}

interface TimeMode {
  mode: "time";
  extra: 15 | 30 | 60 | 120;
}

type Modes = WordMode | TimeMode | "quotes";

interface ISettings {
  activeMode: Modes;
  isPunctuation: boolean;
  isNumbers: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<ISettings>({
    activeMode: { mode: "words", extra: 25 },
    isPunctuation: false,
    isNumbers: false,
  });

  const handleTimeClick = () => {
    setSettings((prev) => ({
      ...prev,
      activeMode: { mode: "time", extra: 30 },
    }));
  };

  const handleWordsClick = () => {
    setSettings((prev) => ({
      ...prev,
      activeMode: { mode: "words", extra: 25 },
    }));
  };

  const handlePunctuationClick = () => {
    setSettings((prev) => ({
      ...prev,
      isPunctuation: !prev.isPunctuation,
    }));
  };

  const handleNumbersClick = () => {
    setSettings((prev) => ({
      ...prev,
      isNumbers: !prev.isNumbers,
    }));
  };

  return (
    <div className="flex w-fit gap-12 py-2 px-10 mx-auto mt-5 text-neutral-400 bg-neutral-950 rounded-xl">
      <div className="flex gap-4">
        <button
          onClick={handlePunctuationClick}
          className={`${settings.isPunctuation && "text-violet-300"} cursor-pointer`}
        >
          @ punctuation
        </button>
        <button
          onClick={handleNumbersClick}
          className={`${settings.isNumbers && "text-violet-300"} cursor-pointer`}
        >
          # numbers
        </button>
      </div>
      <div className="flex gap-4">
        <button>time</button>
        <button>words</button>
        <button>quotes</button>
      </div>
      <div className="flex gap-4">
        <button>15</button>
        <button>30</button>
        <button>50</button>
      </div>
    </div>
  );
}
