import type { ReactNode } from "react";
import { FaCodeBranch, FaPalette } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex-1 flex flex-col items-center justify-end pb-10 w-full">
      <HintsBlock />
      <div className="flex justify-between w-full pt-15 font-bold">
        <nav>
          <ul className="flex gap-4 cursor-pointer">
            <li className="hover:text-violet-300 transition">contact</li>
            <li className="hover:text-violet-300 transition">support</li>
            <li className="hover:text-violet-300 transition">github</li>
            <li className="hover:text-violet-300 transition">discord</li>
            <li className="hover:text-violet-300 transition">twitter</li>
            <li className="hover:text-violet-300 transition">terms</li>
            <li className="hover:text-violet-300 transition">sequrity</li>
            <li className="hover:text-violet-300 transition">privacy</li>
          </ul>
        </nav>
        <div className="flex gap-4 cursor-pointer">
          <div className="flex items-center gap-1 hover:text-violet-300 transition">
            <FaPalette /> <span>darknight</span>
          </div>
          <div className="flex items-center gap-1 hover:text-violet-300 transition">
            <FaCodeBranch /> <span>v1.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HintsBlock() {
  return (
    <div className="flex flex-col gap-4 items-center justify-end">
      <Hint>
        <HintBadge>tab</HintBadge>
        <HintText>+</HintText>
        <HintBadge>enter</HintBadge>
        <HintText>- restart test</HintText>
      </Hint>
      <Hint>
        <HintBadge>esc</HintBadge>
        <HintText>or</HintText>
        <HintBadge>ctrl</HintBadge>
        <HintText>+</HintText>
        <HintBadge>shift</HintBadge>
        <HintText>+</HintText>
        <HintBadge>p</HintBadge>
        <HintText>- command line</HintText>
      </Hint>
    </div>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold">{children}</div>
  );
}

function HintBadge({ children }: { children: ReactNode }) {
  return (
    <span className="px-1 text-neutral-800 bg-neutral-300 rounded-sm">
      {children}
    </span>
  );
}

function HintText({ children }: { children: ReactNode }) {
  return <span className="text-neutral-400 font-mono">{children}</span>;
}
