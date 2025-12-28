import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
const ButtonLoading = ({ type, className, text, loading, onClick, ...props }) => {
  return (
    <Button 
    type={type} 
    disabled={loading} 
    onClick={onClick} 
    {...props}
    className={cn("",className)}
    >
      {loading && <Loader2 className="animate-spin" />}

      {text}
    </Button>
  );
};

export default ButtonLoading;
