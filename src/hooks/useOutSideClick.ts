import { useEffect } from "react";

export default function useOutSideCick(
  ref: React.RefObject<HTMLDivElement>,
  exceptionId: "optionDropDown",
  Fn: () => void
) {
  useEffect(() => {
    
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current && event.target&&
        !ref.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== exceptionId
      ) {
        Fn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, Fn,exceptionId]);
}
