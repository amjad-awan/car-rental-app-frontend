import React, { useState, useRef, useEffect } from 'react';
import './style.css'; // Create this CSS file

const DrawingApp = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || isErasing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const startErasing = ({ nativeEvent }) => {
    setIsErasing(true);
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.clearRect(offsetX - 10, offsetY - 10, 20, 20); // Customize eraser size
  };

  const erase = ({ nativeEvent }) => {
    if (!isErasing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.clearRect(offsetX - 10, offsetY - 10, 20, 20); // Customize eraser size
  };

  const endErasing = () => {
    setIsErasing(false);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="drawing-app">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click context menu
      />
      <button onClick={() => contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)}>Clear Drawing</button>
    </div>
  );
};

export default DrawingApp;
