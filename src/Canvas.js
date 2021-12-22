import React, { useEffect } from 'react'
import { useCanvas } from './CanvasContext';

export function Canvas() {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, [])

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            ref={canvasRef}
        />
    )
}