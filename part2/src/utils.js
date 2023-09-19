export const drawDot = (context, dot, scale) => {
    context.beginPath();
    context.arc(150+dot[0]*scale, 150-dot[1]*scale, 3, 0, 2 * Math.PI);
    context.fillStyle = "#0000FF";
    context.fill();
}

export const drawLine = (context, dot1, dot2, dot3, scale) => {
    context.beginPath();
    context.moveTo(150+dot1[0]*scale, 150-dot1[1]*scale);
    context.lineTo(150+dot2[0]*scale, 150-dot2[1]*scale);
    context.lineTo(150+dot3[0]*scale, 150-dot3[1]*scale);
    context.closePath();

    context.lineWidth = 2;
    context.strokeStyle = "#0000FF";
    context.stroke();
}

export const drawFace = (context, dot1, dot2, dot3) => {
    // two vector in face
    const v1 = dot1.map((dot, i) => dot2[i] - dot);
    const v2 = dot1.map((dot, i) => dot3[i] - dot);

    // cross product to get normal vector
    const normal = [v1[1]*v2[2]-v1[2]*v2[1], v1[2]*v2[0]-v1[0]*v2[2], v1[0]*v2[1]-v1[1]*v2[0]];
    // unit vector
    const length = Math.sqrt(normal[0]**2+normal[1]**2+normal[2]**2);
    normal.forEach((element, i) => normal[i] = element/length);
    // dot product with [0,0,1] and calculate the b value
    const color = 160*Math.abs(normal[2])+95;
    context.fillStyle = `rgba(0, 0, ${color}, 100)`;
    context.fill();
}

export const rotateX = (dot, dy) => {
    const doty = dot[1];
    const dotz = dot[2];
    dot[1] = doty*Math.cos(dy) - dotz*Math.sin(dy);
    dot[2] = doty*Math.sin(dy) + dotz*Math.cos(dy);
}

export const rotateY = (dot, dx) => {
    const dotx = dot[0];
    const dotz = dot[2];
    dot[0] = dotx*Math.cos(dx) + dotz*Math.sin(dx);
    dot[2] = -1*dotx*Math.sin(dx) + dotz*Math.cos(dx);
}