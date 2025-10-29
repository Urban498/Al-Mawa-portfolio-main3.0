"use client";

import { Button } from "./button";
import { resetToDefaultLocale } from "../../utils/locale-utils";

interface ResetLanguageButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function ResetLanguageButton({ 
  className = "", 
  children = "Reset to English" 
}: ResetLanguageButtonProps) {
  const handleReset = () => {
    resetToDefaultLocale();
  };

  return (
    <Button 
      onClick={handleReset}
      variant="outline"
      size="sm"
      className={className}
    >
      {children}
    </Button>
  );
}
