import React, { useContext, useRef, useState } from 'react'

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")
        // canvas 안에 이미지 삽입
        const image = new Image();
        image.src = 'haru.png'
        image.onload = () => {
            context?.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
        }
        // canvas 비율
        context.scale(2, 2);
        // canvas line style
        context.lineCap = "round";
        context.strokeStyle = "pink";
        context.lineWidth = 5;
        contextRef.current = context;
    };

    // 처음 찍었을때 실행되는 함수
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true)
    }

    // 마지막 놓았을때 실행되는 함수
    const finishDrawing = ({ nativeEvent }) => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }
    // 그리는 함수
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
          return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
      };
      
    // 캔바스 지우는 함수
      const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
      }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                draw,
                clearCanvas,
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);
