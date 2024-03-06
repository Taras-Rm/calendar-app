import { ReactNode } from "react";

interface NavigationButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function NavigationButton({ children, onClick }: NavigationButtonProps) {
  return (
    <div
      className="flex justify-center items-center bg-lightGray cursor-pointer px-5 hover:bg-darkGray"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default NavigationButton;
