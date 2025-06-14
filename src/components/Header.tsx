import { FaBell, FaUser } from "react-icons/fa";

const icons = ["keyboard", "crown", "about", "settings"];

export default function Header() {
  return (
    <header className="flex-1 flex items-start w-full pt-5">
      <div className="flex items-center gap-6 w-full">
        <div className="text-4xl text-violet-300 cursor-pointer">Fuzzytype</div>
        <div className="flex w-full justify-between">
          <nav>
            <ul className="flex gap-6 justify-center cursor-pointer">
              {icons.map((icon, idx) => (
                <li key={`${icon}-${idx}`}>
                  <svg
                    width={24}
                    height={24}
                    fill="#AAABAC"
                    className="hover:fill-violet-300 transition"
                  >
                    <use xlinkHref={`/icons-sprite.svg#icon-${icon}`} />
                  </svg>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center gap-6 cursor-pointer">
            <div>
              <FaBell
                size={24}
                color="#AAABAC"
                className="hover:fill-violet-300 transition"
              />
            </div>
            <div>
              <FaUser
                size={24}
                color="#AAABAC"
                className="hover:fill-violet-300 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
