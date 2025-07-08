import { FaBell, FaUser, FaKeyboard, FaCrown, FaInfo } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Settings from "./Settings";

export default function Header() {
  return (
    <header className="flex-1 flex flex-col items-start w-full pt-5">
      <div className="flex items-center gap-6 w-full">
        <div className="text-4xl text-violet-300 cursor-pointer">Fuzzytype</div>
        <div className="flex w-full justify-between">
          <nav>
            <ul className="flex gap-6 justify-center cursor-pointer">
              <li>
                <FaKeyboard
                  size={18}
                  className="hover:fill-violet-300 transition"
                />
              </li>
              <li>
                <FaCrown
                  size={18}
                  className="hover:fill-violet-300 transition"
                />
              </li>
              <li>
                <FaInfo
                  size={18}
                  className="hover:fill-violet-300 transition"
                />
              </li>
              <li>
                <FaGear
                  size={18}
                  className="hover:fill-violet-300 transition"
                />
              </li>
            </ul>
          </nav>
          <div className="flex justify-center gap-6 cursor-pointer">
            <FaBell size={18} className="hover:fill-violet-300 transition" />
            <FaUser size={18} className="hover:fill-violet-300 transition" />
          </div>
        </div>
      </div>
      <Settings />
    </header>
  );
}
