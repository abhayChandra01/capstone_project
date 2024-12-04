import React from "react";

interface LoadingProps {
  fullscreen: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullscreen }) => {
  const loadingSize = fullscreen ? "h-16 w-16" : "h-8 w-8";
  const containerSize = fullscreen
    ? "w-full h-full top-0 left-0"
    : "w-[calc(100vw-256px)] h-[calc(100vh-64px)] bottom-0 right-0";

  return (
    <div
      data-testid="loading-container"
      className={`fixed bg-black bg-opacity-15 ${containerSize} flex items-center justify-center z-50`}
    >
      <div
        data-testid="loading-spinner"
        className={`${loadingSize} border-t-4 border-b-4 border-gray-300 border-t-purple-500 border-b-purple-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
