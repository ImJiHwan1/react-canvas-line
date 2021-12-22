import React from 'react'
import { useCanvas } from './CanvasContext'

export const ClearCanvasButton = () => {
    const { clearCanvas } = useCanvas();
 
    return <button onClick={clearCanvas}>전체 지우기</button>
}