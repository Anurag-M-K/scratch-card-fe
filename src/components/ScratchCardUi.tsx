import React, { useRef, useState, useEffect } from "react";

const ScratchUi = (data: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
console.log("Data",data)

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

    // Check localStorage to see if the user has already scratched
    const scratched = localStorage.getItem("isScratched") === "true";
    setIsScratched(scratched);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || isScratched) return;

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

  const handleEnd = () => {
    setIsScratching(false);
    // Check if the canvas is sufficiently scratched
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Simple check if enough of the canvas is scratched
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scratchedPixels = imageData.data.reduce((acc, value, index) => {
          return (index % 4 === 3 && value < 255) ? acc + 1 : acc;
        }, 0);
        if (scratchedPixels > 5000) { // Adjust this threshold based on your needs
          setIsScratched(true);
          localStorage.setItem("isScratched", "true");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {data?.data?.offer ? 
      <><h2 className="text-2xl mb-4">Scratch to Reveal Your Gift!</h2><div className="relative">
          {!isScratched && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-20 cursor-pointer"
              onMouseDown={handleStart}
              onMouseUp={handleEnd}
              onMouseMove={handleMove}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
              onTouchMove={handleMove} />
          )}
          <div className={`w-72 h-48 flex flex-col items-center text-white font-bold justify-center z-10 ${isScratched ? "" : ""}`}>
            <h1 className="text-2xl">Congratulations! You've won</h1>
            <span className="font-bold text-3xl text-yellow-500">
              🎁{data?.data?.offer}🎁
            </span>
          </div>
        </div></>
          : <h1>Expired</h1>}
    </div>
  );
};

export default ScratchUi;
