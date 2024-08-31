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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if (e.type.startsWith("touch")) {
      const touch = (e as unknown as TouchEvent).touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
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
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
          onMouseEnter={isScratching ? handleMove : undefined} // Start scratching on hover
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


// import React, { useRef, useEffect } from "react";

// const ScratchUi = (data: any) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const token = location.pathname.split("/").pop();
//   const uniquePurchaseKey = token || "defaultKey";
//   const localStorageKey = `scratchProgress_${uniquePurchaseKey}`;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas size
//     canvas.width = 300;
//     canvas.height = 200;

//     // Draw the scratchable overlay
//     ctx.fillStyle = "#c4c4c4";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Load saved scratch state from local storage
//     const savedImage = localStorage.getItem(localStorageKey);
//     if (savedImage) {
//       const img = new Image();
//       img.src = savedImage;
//       img.onload = () => {
//         ctx.drawImage(img, 0, 0);
//       };
//     }
//   }, [uniquePurchaseKey, localStorageKey]);

//   const saveCanvasState = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const savedImage = canvas.toDataURL();
//     localStorage.setItem(localStorageKey, savedImage);
//   };

//   const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     let x: number, y: number;

//     if (e.type.startsWith("touch")) {
//       const touch = (e as unknown as TouchEvent).touches[0];
//       x = touch.clientX - rect.left;
//       y = touch.clientY - rect.top;
//     } else {
//       x = (e as unknown as MouseEvent).clientX - rect.left;
//       y = (e as unknown as MouseEvent).clientY - rect.top;
//     }

//     ctx.globalCompositeOperation = "destination-out";
//     ctx.beginPath();
//     ctx.arc(x, y, 20, 0, Math.PI * 2, false);
//     ctx.fill();

//     // Save the updated canvas state
//     saveCanvasState();
//   };

//   const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
//     handleMove(e);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center mt-10">
//       {data?.data?.offer ? (
//         <>
//           <h2 className="text-2xl mb-4">Scratch to Reveal Your Gift!</h2>
//           <div className="relative w-72 h-48">
//             <canvas
//               ref={canvasRef}
//               className="absolute top-0 left-0 z-20 cursor-pointer"
//               onMouseDown={handleStart}
//               onMouseUp={handleMove}
//               onMouseMove={handleMove}
//               onTouchStart={handleStart}
//               onTouchEnd={handleMove}
//               onTouchMove={handleMove}
//             />
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center text-white font-bold justify-center z-10">
//               <h1 className="text-2xl">Congratulations! You've won</h1>
//               <span className="font-bold text-3xl text-yellow-500">
//                 🎁{data?.data?.offer}🎁
//               </span>
//             </div>
//           </div>
//         </>
//       ) : (
//         <h1>Expired</h1>
//       )}
//     </div>
//   );
// };

// export default ScratchUi;
