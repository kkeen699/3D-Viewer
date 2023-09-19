import React, { useRef, useEffect, useState } from 'react'
import UploadFileComponent from './uploadFile-component'
import {drawDot, drawLine, drawFace, rotateX, rotateY} from "../utils"
import "./style.css"

const Part2Component =() => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState([0,0]);
  const [dots, setDots] = useState([]);
  const [faces, setFaces] = useState([]);
  const [scale, setScale] = useState(100);

  const handleDragStart = (e) =>{
    e.dataTransfer.setDragImage(new Image(0,0), 0, 0);
    setPos([e.clientX, e.clientY]);
  }
  const handleDrag = (e) => {
    if(e.clientX !== 0 && e.clientY !== 0){
      // right: dx positive, left: dx negative
      const dx = (e.clientX - pos[0])/100;
      // up: dy negative, down: dy positive
      const dy = (e.clientY - pos[1])/100;
      let newDots = [...dots];
      newDots.forEach((dot) => {
        // horizontal movement -> rotate about Y-axis
        rotateY(dot, dx);
        // vertical movement -> rotate about X-axis
        rotateX(dot, dy);
      })
      setDots(newDots);
    }
    setPos([e.clientX, e.clientY]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const draw = (canvas, context) => {
      // reset the window
      context.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        drawDot(context, dot, scale);
      })
      // sort faces by the average Z to ensure the front face would not be covered
      const sortFace = [...faces].sort((f1, f2)=>{
        const z1 = (dots[f1[0]][2]+dots[f1[1]][2]+dots[f1[2]][2])/3;
        const z2 = (dots[f2[0]][2]+dots[f2[1]][2]+dots[f2[2]][2])/3;
        return z1 - z2;
      })
      sortFace.forEach((face) => {
        drawLine(context, dots[face[0]], dots[face[1]], dots[face[2]], scale);
        drawFace(context, dots[face[0]], dots[face[1]], dots[face[2]]);
      })
    }
    
    draw(canvas, context);
  }, [dots, faces, scale])
  
  
  return(
    <div>
      <UploadFileComponent setDots={setDots} setFaces={setFaces} setScale={setScale}/> 
      <br/><br/>
      <canvas className="myCanvas" width="300px" height="300px" ref={canvasRef} 
      onDragStart={handleDragStart} onDrag={handleDrag} draggable/>
    </div>
  )
}

export default Part2Component