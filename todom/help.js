
let n=20,x1=0,y1=0.4,z1=0.4,R=0.05,x2=0,y2=0.1,z2=0.4;
// let vertices=new Float32Array([
//     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
//     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,0.8,   1.0, 1.0,0.8, // v0-v3-v4-v5 right
//     1.0, 1.0, 1.0,   1.0, 1.0, 0.8,  -1.0, 1.0,0.8,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
//     -1.0, 1.0, 1.0,  -1.0, 1.0,0.8,  -1.0,-1.0,0.8,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
//     -1.0,-1.0,0.8,   1.0,-1.0,0.8,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 down
//     1.0,-1.0,0.8,  -1.0,-1.0,0.8,  -1.0, 1.0,0.8,   1.0, 1.0,0.8]);
// let colors = new Float32Array([
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
//     1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
// ]);
// let normals = new Float32Array([
//     0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
//     1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
//     0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
//     -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
//     0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
//     0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
// ]);
// var indices = new Uint8Array([
//     0, 1, 2,   0, 2, 3,    // front
//     4, 5, 6,   4, 6, 7,    // right
//     8, 9,10,   8,10,11,    // up
//     12,13,14,  12,14,15,    // left
//     16,17,18,  16,18,19,    // down
//     20,21,22,  20,22,23     // back
// ]);
//function cilindres_vertices(n,R,x,y1,z,y2) {
    let vertices_number = new Array();

    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[i * 12] = x + R* (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 1] = y1;//y
        vertices_number[i * 12 + 2] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 3] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 4] = y1;//y
        vertices_number[i * 12 + 5] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[i * 12 + 6] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 7] = y2;//y
        vertices_number[i * 12 + 8] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 9] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 10] = y2;//y
        vertices_number[i * 12 + 11] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//
    }
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[12*n+i * 18] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n+i * 18 + 1] = y1;//y
        vertices_number[12*n+i * 18 + 2] = z + R* (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n+i * 18 + 3] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n+i * 18 + 4] = y1;//y
        vertices_number[12*n+i * 18 + 5] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n+i * 18 + 6] = x;//x
        vertices_number[12*n+i * 18 + 7] = y1;//y
        vertices_number[12*n+i * 18 + 8] = z;//z
        vertices_number[12*n+i * 18 + 9] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n+i * 18 + 10] = y2;//y
        vertices_number[12*n+i * 18 + 11] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n+i * 18 + 12] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n+i * 18 + 13] = y2;//y
        vertices_number[12*n+i * 18 + 14] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n+i * 18 + 15] = x;//x
        vertices_number[12*n+i * 18 + 16] = y2;//y
        vertices_number[12*n+i * 18 + 17] = z;//z
    }
    return vertices_number;
}
function cilindres_indices(n) {
    let indices = new Array();
    for (let i = 0; i < n; i++) {
        indices[i*6 ]=i*4;
        indices[i*6 + 1]=i*4+1;
        indices[i*6 + 2]=i*4+2;
        indices[i*6 + 3]=i*4+1;
        indices[i*6 + 4]=i*4+2;
        indices[i*6 + 5]=i*4+3;
    }
    for (let i = 0; i < n; i++) {
        indices[6*n+i*6 ]=4*n+i*6;
        indices[6*n+i*6 + 1]=4*n+i*6+1;
        indices[6*n+i*6 + 2]=4*n+i*6+2;
        indices[6*n+i*6 + 3]=4*n+i*6+3;
        indices[6*n+i*6 + 4]=4*n+i*6+4;
        indices[6*n+i*6 + 5]=4*n+i*6+5;
    }
    return indices;
}
function cilindres_normal(n) {
    let vertices_normal= new Array();
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        xn=(Math.cos(i*phi) + Math.sin(i*phi)) + (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));
        yn=0;
        zn=(Math.cos(i*phi) - Math.sin(i*phi)) + (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));
        xn=xn/Math.sqrt((xn*xn+zn*zn));
        zn=zn/Math.sqrt((xn*xn+zn*zn));
        vertices_normal[i * 12] = xn;//x
        vertices_normal[i * 12 + 1] = 0//y
        vertices_normal[i * 12 + 2] = zn;//z
        vertices_normal[i * 12 + 3] = xn;//x
        vertices_normal[i * 12 + 4] = 0//y
        vertices_normal[i * 12 + 5] = zn;//z
        vertices_normal[i * 12 + 6] = xn//y
        vertices_normal[i * 12 + 7] = 0;//z
        vertices_normal[i * 12 + 8] = zn;//x
        vertices_normal[i * 12 + 9] = xn//y
        vertices_normal[i * 12 + 10] = 0;//z
        vertices_normal[i * 12 + 11] = zn;//z
    }
    for (let i = 0; i < n; i++) {
        vertices_normal[12*n + i * 18] = 0;//x
        vertices_normal[12*n +i * 18 + 1] = -1//y
        vertices_normal[12*n +i * 18 + 2] = 0;//z
        vertices_normal[12*n +i * 18 + 3] = 0;//x
        vertices_normal[12*n +i * 18 + 4] = -1//y
        vertices_normal[12*n +i * 18 + 5] = 0;//z
        vertices_normal[12*n +i * 18 + 6] = 0//x
        vertices_normal[12*n +i * 18 + 7] = -1;//y
        vertices_normal[12*n +i * 18 + 8] = 0;//z
        vertices_normal[12*n +i * 18 + 9] = 0//x
        vertices_normal[12*n +i * 18 + 10] = 1;//y
        vertices_normal[12*n +i * 18 + 11] = 0;//z
        vertices_normal[12*n +i * 18 + 12] = 0;//x
        vertices_normal[12*n +i * 18 + 13] = 1//y
        vertices_normal[12*n +i * 18 + 14] = 0;//z
        vertices_normal[12*n +i * 18 + 15] = 0;//x
        vertices_normal[12*n +i * 18 + 16] = 1//y
        vertices_normal[12*n +i * 18 + 17] = 0;//z
    }
    return vertices_normal;
}
function cilindres_color(n) {
    let color = new Array();
    for (let i = 0; i < 5*n; i++) {
        color[i*6 ]=1;
        color[i*6 + 1]=1;
        color[i*6 + 2]=1;
        color[i*6 +3]=0;
        color[i*6 + 4]=0;
        color[i*6 + 5]=0;
    }
    return color;
}
function cilindres_vertices(n,R,x,y1,z,y2) {
    let vertices_number = new Array();
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[i * 12] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 1] = y1;//y
        vertices_number[i * 12 + 2] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 3] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 4] = y1;//y
        vertices_number[i * 12 + 5] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[i * 12 + 6] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 7] = y2;//y
        vertices_number[i * 12 + 8] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 9] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 10] = y2;//y
        vertices_number[i * 12 + 11] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//
    }
    return vertices_number;
}
function cilindres_indices(n) {
    let indices = new Array();
    for (let i = 0, phi; i < n; i++) {
        indices[i*6 ]=i*4;
        indices[i*6 + 1]=i*4+1;
        indices[i*6 + 2]=i*4+2;
        indices[i*6 + 3]=i*4+1;
        indices[i*6 + 4]=i*4+2;
        indices[i*6 + 5]=i*4+3;
    }
    return indices;
}

function cilindres_normal(n) {
    let vertices_normal= new Array();
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        xn=(Math.cos(i*phi) + Math.sin(i*phi)) + (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));
        yn=0;
        zn=(Math.cos(i*phi) - Math.sin(i*phi)) + (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));
        xn=xn/(xn^2+zn^2)^(0.5);
        zn=zn/(xn^2+zn^2)^(0.5);
        vertices_normal[i * 12] = xn;//x
        vertices_normal[i * 12 + 1] = 0//y
        vertices_normal[i * 12 + 2] = zn;//z
        vertices_normal[i * 12 + 3] = xn;//x
        vertices_normal[i * 12 + 4] = 0//y
        vertices_normal[i * 12 + 5] = zn;//z
        vertices_normal[i * 12 + 6] = xn//y
        vertices_normal[i * 12 + 7] = 0;//z
        vertices_normal[i * 12 + 8] = zn;//x
        vertices_normal[i * 12 + 9] = xn//y
        vertices_normal[i * 12 + 10] = 0;//z
        vertices_normal[i * 12 + 11] = zn;//z
    }
    return vertices_normal;
}
function cilindres_color(n) {
    let color = new Array();
    for (let i = 0, phi; i < 4*n; i++) {
        color[i*3 ]=0;
        color[i*3 + 1]=1;
        color[i*3 + 2]=0;

    }
    return color;
}
function CreateHiroscope(n,R,x,y1,z,y2){
    const Hirovertices=new Float32Array(cilindres_vertices(n,R,x,y1,z,y2));
    const Hirocolors = new Float32Array(cilindres_color(n));
    const Hironormals = new Float32Array(cilindres_normal(n));
    const Hiroindices = new Uint8Array(cilindres_indices(n));
    const arrays = {

    }
}




function cilindres_vertices(n,R1,x,y1,z,y2,R2,h) {
    let vertices_number = new Array();
    let y1t=(y1+y2)/2-h/2;
    let y2t=(y1+y2)/2+h/2;
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[i * 12] = x + R1 * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 1] = y1t;//y
        vertices_number[i * 12 + 2] = z + R1 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 3] = x + R1 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 4] = y1t;//y
        vertices_number[i * 12 + 5] = z + R1 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[i * 12 + 6] = x + R1 * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 7] = y2t;//y
        vertices_number[i * 12 + 8] = z + R1 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 9] = x + R1 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 10] = y2t;//y
        vertices_number[i * 12 + 11] = z + R1 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//
    }
    for (let i = n, phi; i < 2*n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[i * 12] = x + R2* (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 1] = y1;//y
        vertices_number[i * 12 + 2] = z + R2 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 3] = x + R2 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 4] = y1;//y
        vertices_number[i * 12 + 5] = z + R2 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[i * 12 + 6] = x + R2 * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 7] = y2;//y
        vertices_number[i * 12 + 8] = z + R2 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 9] = x + R2 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 10] = y2;//y
        vertices_number[i * 12 + 11] = z + R2 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//
    }
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[12*n*2+i * 18] = x + R1 * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n*2+i * 18 + 1] = y1t;//y
        vertices_number[12*n*2+i * 18 + 2] = z + R1 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n*2+i * 18 + 3] = x + R1 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n*2+i * 18 + 4] = y1t;//y
        vertices_number[12*n*2+i * 18 + 5] = z + R1 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n*2+i * 18 + 6] = x;//x
        vertices_number[12*n*2+i * 18 + 7] = y1t;//y
        vertices_number[12*n*2+i * 18 + 8] = z;//z
        vertices_number[12*n*2+i * 18 + 9] = x + R1 * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n*2+i * 18 + 10] = y2t;//y
        vertices_number[12*n*2+i * 18 + 11] = z + R1 * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n*2+i * 18 + 12] = x + R1 * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n*2+i * 18 + 13] = y2t;//y
        vertices_number[12*n*2+i * 18 + 14] = z + R1 * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n*2+i * 18 + 15] = x;//x
        vertices_number[12*n*2+i * 18 + 16] = y2t;//y
        vertices_number[12*n*2+i * 18 + 17] = z;//z
    }
    return vertices_number;
}
function cilindres_indices(n) {
    let indices = new Array();
    for (let i = 0; i < n; i++) {
        indices[i*6 ]=i*4;
        indices[i*6 + 1]=i*4+1;
        indices[i*6 + 2]=i*4+2;
        indices[i*6 + 3]=i*4+1;
        indices[i*6 + 4]=i*4+2;
        indices[i*6 + 5]=i*4+3;
    }
    for (let i = n; i < 2*n; i++) {
        indices[i*6 ]=i*4;
        indices[i*6 + 1]=i*4+1;
        indices[i*6 + 2]=i*4+2;
        indices[i*6 + 3]=i*4+1;
        indices[i*6 + 4]=i*4+2;
        indices[i*6 + 5]=i*4+3;
    }
    for (let i = 0; i < n; i++) {
        indices[12*n+i*6 ]=8*n+i*6;
        indices[12*n+i*6 + 1]=8*n+i*6+1;
        indices[12*n+i*6 + 2]=8*n+i*6+2;
        indices[12*n+i*6 + 3]=8*n+i*6+3;
        indices[12*n+i*6 + 4]=8*n+i*6+4;
        indices[12*n+i*6 + 5]=8*n+i*6+5;
    }
    return indices;
}
function cilindres_normal(n) {
    let vertices_normal= new Array();
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        xn=(Math.cos(i*phi) + Math.sin(i*phi)) + (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));
        yn=0;
        zn=(Math.cos(i*phi) - Math.sin(i*phi)) + (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));
        xn=xn/Math.sqrt((xn*xn+zn*zn));
        zn=zn/Math.sqrt((xn*xn+zn*zn));
        vertices_normal[i * 12] = xn;//x
        vertices_normal[i * 12 + 1] = 0//y
        vertices_normal[i * 12 + 2] = zn;//z
        vertices_normal[i * 12 + 3] = xn;//x
        vertices_normal[i * 12 + 4] = 0//y
        vertices_normal[i * 12 + 5] = zn;//z
        vertices_normal[i * 12 + 6] = xn//y
        vertices_normal[i * 12 + 7] = 0;//z
        vertices_normal[i * 12 + 8] = zn;//x
        vertices_normal[i * 12 + 9] = xn//y
        vertices_normal[i * 12 + 10] = 0;//z
        vertices_normal[i * 12 + 11] = zn;//z
    }
    for (let i = 2*n, phi; i < 3*n; i++) {
        vertices_normal[24*n + i * 18] = 0;//x
        vertices_normal[24*n +i * 18 + 1] = 1//y
        vertices_normal[24*n +i * 18 + 2] = 0;//z
        vertices_normal[24*n +i * 18 + 3] = 0;//x
        vertices_normal[24*n +i * 18 + 4] = 1//y
        vertices_normal[24*n +i * 18 + 5] = 0;//z
        vertices_normal[24*n +i * 18 + 6] = 0//x
        vertices_normal[24*n +i * 18 + 7] = 1;//y
        vertices_normal[24*n +i * 18 + 8] = 0;//z
        vertices_normal[24*n +i * 18 + 9] = 0//x
        vertices_normal[24*n +i * 18 + 10] = -1;//y
        vertices_normal[24*n +i * 18 + 11] = 0;//z
        vertices_normal[24*n +i * 18 + 12] = 0;//x
        vertices_normal[24*n +i * 18 + 13] = -1//y
        vertices_normal[24*n +i * 18 + 14] = 0;//z
        vertices_normal[24*n +i * 18 + 15] = 0;//x
        vertices_normal[24*n +i * 18 + 16] = -1//y
        vertices_normal[24*n +i * 18 + 17] = 0;//z
    }
    return vertices_normal;
}
function cilindres_color(n) {
    let color = new Array();
    for (let i = 0; i < 12*n; i++) {
        color[i*3 ]=0;
        color[i*3 + 1]=1;
        color[i*3 + 2]=0;
    }
    return color;
}
function cos(phi){
  return Math.cos(phi);
}
function sin(phi){
  return Math.sin(phi);
}

let R1, R2,J1,J2,g;
function psidif2(phi1,phi2,psi1,psi2,phi1dif1,phi2dif1,psi1dif1,psi2dif1){
let p=-R2/R1
let a1=2*R1*R2*(cos(psi1)*cos(psi2)*cos(phi1-phi2)+sin(psi1)*sin(psi2));
let a2=2*R1*R2*cos(psi1)*sin(psi2)*sin(phi1-phi2);
let a3=-2*R1*R2*sin(psi1)*cos(psi2)*sin(phi1-phi2);
let a4=2*R1*R2*sin(psi1)*sin(psi2)*cos(phi1-phi2);
let da1=2*R1*R2*(-psi1dif1*sin(psi1)*cos(psi2)*cos(phi1-phi2) -psi2dif1*sin(psi2)*cos(psi1)*cos(phi1-phi2) -\\
(phi1dif1-phi2dif1)*cos(psi1)*cos(psi2)*sin(phi1-phi2));
let da2=2*R1*R2*(-psi1dif1*sin(psi1)*sin(psi2)*sin(phi1-phi2) + psi2dif1*cos(psi1)*cos(psi2)*sin(phi1-phi2) + \\
(phi1dif1-phi2dif1)*cos(psi1)*sin(psi2)*cos(phi1-phi2));
let da3=2*R1*R2*(-psi1dif1*cos(psi1)*cos(psi2)*sin(phi1-phi2) + psi2dif1*sin(psi1)*sin(psi2)*sin(phi1-phi2) - \\
(phi1dif1-phi2dif1)*sin(psi1)*cos(psi2)*cos(phi1-phi2));
let da4=2*R1*R2*(psi1dif1*cos(psi1)*sin(psi2)*cos(phi1-phi2)  + psi2dif1*cos(psi2)*sin(psi1)*cos(phi1-phi2) -\\
(phi1dif1-phi2dif1)*sin(psi1)*sin(psi2)*sin(phi1-phi2));
let a5=2*R1*R1;
let a6=2*R2*R2+J2;
let a7=a5;
let a8=a6;
let b1=R1*R1*phi1dif1*phi1dif1*sin(psi1*2)+2*R1*R2*(psi1dif1*psi2dif1*(-sin(psi1)*cos(psi2)*cos(phi1-phi2)+cos(psi1)*sin(psi2))- \\
phi1dif1*phi2dif1*sin(psi1)*sin(psi2)*sin(phi1-phi2) - phi1dif1*psi1dif2*cos(psi1)*cos(psi2)*sin(phi1-phi2) + \\
phi1dif1*phi2dif1*cos(psi1)*sin(psi2)*cos(phi1-phi2))+g*R1*sin(psi1);
let b2=(R2*R2+J2)*phi2dif1*phi2dif1*sin(psi2*2)+2*R1*R2*(psi1dif1*psi2dif1*(-cos(psi1)*sin(psi2)*cos(phi1-phi2)+sin(psi1)*cos(psi2))+ \\
phi1dif1*phi2dif1*cos(psi1)*cos(psi2)*sin(phi1-phi2) + phi1dif1*psi1dif2*sin(psi1)*sin(psi2)*sin(phi1-phi2) + \\
phi1dif1*phi2dif1*sin(psi1)*cos(psi2)*cos(phi1-phi2))+g*R1*sin(psi2);
let b3=2*R1*R2*(psi1dif1*psi2dif1*(-cos(psi1)*cos(psi2)*sin(phi1-phi2))+ \\
phi1dif1*phi2dif1*cos(psi1)*sin(psi2)*cos(phi1-phi2) - phi1dif1*psi1dif2*sin(psi1)cos(psi2)*cos(phi1-phi2) - \\
phi1dif1*phi2dif1*sin(psi1)*sin(psi2)*sin(phi1-phi2));
let b4=-b3;
let A=glMatrix.mat4.fromValues([
  a5,a1,0,a2,
  a1,a6,a3,0,
  0,a3,a7,a4,
  a2,0,a4,a8
])
glMatrix.mat4.invert(A,A);
let B=glMatrix.vec4.fromValues([
  b1-da1*psi2dif1-da2*phi2dif1,
  b2-da1*psi1dif1-da3*phi1dif1,
  b3-da3*psi2dif1-da4*phi2dif1,
  b4-da2*psi1dif1-da4*phi1dif1
]);
glMatrix.vec4.transformMat4(B,B,A);
return  B;
}

function theta2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
  return 1/2*phi1*phi1*sin(theta)+1/(I1+m*l*l)*(-M3/2*sin(theta)*phi1  + m*g*l*sin(theta));
}
function phi2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
  if (Math.abs(sin(theta))<0.0001){ return 0}
  else return 1/(I1+m*l*l)/sin(theta)/sin(theta)*(m*l*ax*sin(theta)*sin(phi) +M3*theta1*sin(theta)-phi1*theta1*sin(2*theta));
}

function RungeCutta(h){
  let k1=new Array(5);
    k1[0]=h*theta2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h);
    k1[1]=h*theta1;
    k1[2]=h*phi2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h);
    k1[3]=h*phi1;
    k1[4]=h*(M3/I3-phi1*cos(theta));
  let k2=new Array(5);
    k2[0]=h*theta2(theta+k1[1]/2,phi+k1[3]/2,theta1+k1[0]/2,phi1+k1[2]/2,psi+k1[4]/2,psi1,ax,ay,az,h);
    k2[1]=h*(theta1+k1[0]/2);
    k2[2]=h*phi2(theta+k1[1]/2,phi+k1[3]/2,theta1+k1[0]/2,phi1+k1[2]/2,psi+k1[4]/2,psi1,ax,ay,az,h);
    k2[3]=h*(phi1+k1[2]/2);
    k2[4]=h*(M3/I3-(phi1+k1[2]/2)*cos(theta+k1[1]/2));
  let k3=new Array(5);
    k3[0]=h*theta2(theta+k2[1]/2,phi+k2[3]/2,theta1+k2[0]/2,phi1+k2[2]/2,psi+k2[4]/2,psi1,ax,ay,az,h);
    k3[1]=h*(theta1+k2[0]/2);
    k3[2]=h*phi2(theta+k2[1]/2,phi+k2[3]/2,theta1+k2[0]/2,phi1+k2[2]/2,psi+k2[4]/2,psi1,ax,ay,az,h);
    k3[3]=h*(phi1+k2[2]/2);
    k3[4]=h*(M3/I3-(phi1+k2[2]/2)*cos(theta+k2[1]/2));
  let k4=new Array(5);
    k4[0]=h*theta2(theta+k3[1],phi+k3[3],theta1+k3[0],phi1+k3[2],psi+k3[4],psi1,ax,ay,az,h);
    k4[1]=h*(theta1+k3[0]);
    k4[2]=h*phi2(theta+k3[1],phi+k3[3],theta1+k3[0],phi1+k3[2],psi+k3[4],psi1,ax,ay,az,h);
    k4[3]=h*(phi1+k3[2]);
    k4[4]=h*(M3/I3-(phi1+k3[2])*cos(theta+k3[1])%(2*Math.PI));
    theta1=(theta1+(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6)%(2*Math.PI);
    theta=(theta+(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6)%(2*Math.PI);
    phi1=(phi1+(k1[2]+2*k2[2]+2*k3[2]+k4[2])/6)%(2*Math.PI);
    phi=(phi+(k1[3]+2*k2[3]+2*k3[3]+k4[3])/6)%(2*Math.PI);
    psi=(psi+(k1[4]+2*k2[4]+2*k3[4]+k4[4])/6)%(2*Math.PI);
    return 0;
}
function cos(phi){
  return Math.cos(phi);
}
function sin(phi){
  return Math.sin(phi);
}
