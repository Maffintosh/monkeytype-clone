import { forwardRef } from "react";
import ResetIcon from "../../icons/ResetIcon";

interface ResetButtonProps {
  onClick: () => void;
}

export default forwardRef<HTMLButtonElement, ResetButtonProps>(
  function ResetButton({ onClick }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="block mx-auto mt-4 px-6 py-2 cursor-pointer rounded-lg"
      >
        <ResetIcon size={32} color="white" />
      </button>
    );
  },
);
