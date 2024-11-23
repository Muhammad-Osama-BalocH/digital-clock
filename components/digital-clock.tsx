"use client"; // Enables client-side rendering for this component

import { useState, useEffect, useMemo } from "react";

// Fallback implementation of a Card component in case it's missing
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 p-6 shadow-lg rounded-2xl ${className || ""}`}>
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  variant,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline";
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold ${
      variant === "outline"
        ? "border border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${className || ""}`}
  >
    {children}
  </button>
);

export default function DigitalClockComponent() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo(() => {
    if (!mounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-950 dark:bg-gray-900">
      <Card className="p-8 shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-2">Digital Clock</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Display current time in hours, minutes, and seconds.
        </p>
        <div className="text-6xl font-bold mb-6">{formattedTime}</div>
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(true)}
          >
            24-Hour Format
          </Button>
          <Button
            variant={!is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(false)}
          >
            12-Hour Format
          </Button>
        </div>
      </Card>
    </div>
  );
}
