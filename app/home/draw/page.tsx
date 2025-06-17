"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [penColour, setPenColour] = useState<string>("white");
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = penColour;
    context.lineWidth = 2;
    context.lineCap = "round";
    setCtx(context);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    ctx.strokeStyle = isErasing ? "black" : penColour;
    ctx.lineWidth = isErasing ? 16 : 2;
  }, [isErasing, penColour, ctx]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    isDrawing.current = true;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!ctx) return;
    isDrawing.current = false;
    ctx.closePath();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = image;
    link.click();
  };

  const handleEraser = () => {
    setIsErasing((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl h-[500px] border-2 border-white">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            cursor: isErasing
              ? 'url("/eraser.png") 8 8, pointer'
              : 'url("/pen.png") 0 0, auto',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></canvas>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={handleDownload}>Download Drawing</Button>
        <Button variant={isErasing ? "secondary" : "default"} onClick={handleEraser}>
          {isErasing ? "Eraser On" : "Eraser"}
        </Button>
      </div>
    </div>
  );
}
