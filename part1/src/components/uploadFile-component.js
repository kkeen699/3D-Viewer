import React from 'react'

const UploadFileComponent =(props) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = () => {
      const lines = reader.result.split("\r\n")
      const num = lines[0].split(",").map(n => parseInt(n));
      const dots = [];
      const faces = [];
      let maxDist = 0;

      for(let i = 1; i <= num[0]; i++){
        const dot = lines[i].split(",").slice(1,4).map(n => parseFloat(n));
        maxDist = Math.max(maxDist, Math.sqrt(dot[0]**2+dot[1]**2+dot[2]**2));
        dots.push(dot);
      }

      for(let i = num[0]+1; i <= num[0]+num[1]; i++){
        const face = lines[i].split(",").map(n => parseInt(n)-1);
        faces.push(face);
      }

      props.setFaces(faces);
      props.setDots(dots);
      props.setScale(100/maxDist);
    }
  }

  return <input type="file" onChange={handleFileChange}/>
}

export default UploadFileComponent