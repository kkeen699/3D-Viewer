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