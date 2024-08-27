import React, { useRef, useState, useEffect } from "react";

const ScratchUi = (data: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    ctx.fillStyle = "#c4c4c4"; // Background color of the scratch area
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if (e.type.startsWith("touch")) {
      // Handle touch events
      const touch = (e as unknown as TouchEvent).touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Handle mouse events
      x = (e as unknown as MouseEvent).clientX - rect.left;
      y = (e as unknown as MouseEvent).clientY - rect.top;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fill();
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    handleMove(e); // Call handleMove to start scratching immediately
  };

  const handleEnd = () => setIsScratching(false);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-2xl mb-4">Scratch to Reveal Your Gift!</h2>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 z-20 cursor-pointer"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />
        <div className="w-72 h-48 flex flex-col items-center text-white font-bold justify-center z-10">
          <h1 className="text-2xl">Congratulations! You've won</h1>
          <span className="font-bold text-3xl text-yellow-500">
            🎁{data?.data?.offer}🎁
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScratchUi;
