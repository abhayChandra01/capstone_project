import React from "react";

interface StatusToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ isActive, onToggle }) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isActive}
        onChange={onToggle}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full ${
          isActive ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
          isActive ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </label>
  );
};

export default StatusToggle;
