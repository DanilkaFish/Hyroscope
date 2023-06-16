// let canvas = document.getElementById("webgl");
// let gl = getWebGLContext(canvas);
// if (!gl) {
//     console.log('Failed to get the rendering context for WebGL');
//
// }


let VSHADER_SOURCE=
    'attribute vec4 a_Position;\n' +
    'uniform vec4 u_Translation;\n' +
    'attribute vec4 a_Color;\n' +
    'attribute vec4 a_Normal;\n' +
    'uniform mat4 u_View;\n'+
    'uniform mat4 u_Proj;\n'+
    'uniform mat4 u_Trans;\n'+
    'uniform mat4 u_NormalTrans;\n'+
    'uniform vec3 u_DiffuseLight;\n' +   // Diffuse light color
    'uniform vec3 u_LightDirection;\n' + // Diffuse light direction (in the world coordinate, normalized)
    'uniform vec3 u_AmbientLight;\n' +   // Color of an ambient light
    'varying vec4 v_Color;\n' +
    // 'uniform mat4 u_Translation;\n'+
    'void main(){\n' +
        'gl_Position = u_Proj*u_View*(u_Trans*a_Position + u_Translation);\n' +
        'vec3 normal = normalize((u_NormalTrans*a_Normal).xyz);\n' +
        // The dot product of the light direction and the normal (the orientation of a surface)
        '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
        // Calculate the color due to diffuse reflection
        '  vec3 diffuse = u_DiffuseLight * a_Color.rgb * nDotL;\n' +
        // Calculate the color due to ambient reflection
        '  vec3 ambient = u_AmbientLight * a_Color.rgb;\n' +
        // Add the surface colors due to diffuse reflection and ambient reflection
        '  v_Color = vec4(diffuse + ambient, a_Color.a);\n' +
        // 'gl_PointSize=10.0;'+
'}\n';
let FSHADER_SOURCE=
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
        'gl_FragColor=v_Color;\n' +
    '}'
let canvas = document.getElementById("webgl");
let gl = getWebGLContext(canvas);
if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
}


let n=10,x=0,y1=-0.0,z=0,R1=0.1,y2=0.6,R2=0.01,h=0.2;
let l=(y2-y1)/2;
let HiroIndexBuffer = gl.createBuffer();
let SquareIndexBuffer = gl.createBuffer();
let TraceIndexBuffer = gl.createBuffer();
// if (!HiroIndexBuffer) {
//     console.log('Failed to create the buffer object');
//     return false;
// }
let Hirovertices1=new Float32Array(cilindres_vertices(n,R1,x,y1+0.2,z,y2-0.2));
let Hirocolors1 = new Float32Array(cilindres_color(n));
let Hironormals1 = new Float32Array(cilindres_normal(n));
let Hiroindices1 = new Uint8Array(cilindres_indices(n));
let Hirotranslation1=new Float32Array([0.0,0.0,0.0]);
let Hirovertices2=new Float32Array(cilindres_vertices(n,R2,x,y1,z,y2));
let Hirocolors2 = new Float32Array(cilindres_color(n));
let Hironormals2 = new Float32Array(cilindres_normal(n));
let Hiroindices2 = new Uint8Array(cilindres_indices(n));
let Hirotranslation2=new Float32Array([0.0,0.0,0.0]);
let Linevertices=new Float32Array(cilindres_vertices(10,0.002,x,0.0,z,1.0));
let Linecolors = new Float32Array(cilindres_color(n));
let Linenormals = new Float32Array(cilindres_normal(n));
let Lineindices = new Uint8Array(cilindres_indices(n));
let Linetranslation=new Float32Array([0.0,0.0,0.0]);
let r=0.95;
let Squarevertices=new Float32Array([
    1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // v0-v1-v2-v3 front
    1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,r,   1.0, 1.0,r, // v0-v3-v4-v5 right
    1.0, 1.0, 1.0,   1.0, 1.0, r,  -1.0, 1.0,r,  -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,r,  -1.0,-1.0,r,  -1.0,-1.0, 1.0, // v1-v6-v7-v2 left
    -1.0,-1.0,r,   1.0,-1.0,r,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // v7-v4-v3-v2 down
    1.0,-1.0,r,  -1.0,-1.0,r,  -1.0, 1.0,r,   1.0, 1.0,r]);
let colSq=[0.2,0.2,0.2];
let Squarecolors = new Float32Array([
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2],     // v0-v1-v2-v3 front
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2],     // v0-v3-v4-v5 right
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2],     // v0-v5-v6-v1 up
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2],      // v1-v6-v7-v2 left
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2],     // v7-v4-v3-v2 down
    colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2],   colSq[0],colSq[1],colSq[2], colSq[0],colSq[1],colSq[2]　    // v4-v7-v6-v5 back
]);
let Squarenormals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
]);
var Squareindices = new Uint8Array([
    0, 1, 2,   0, 2, 3,    // front
    4, 5, 6,   4, 6, 7,    // right
    8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
]);
let Squaretranslation=new Float32Array([0.0,0.0,0.0]);
let Tracevertices = new Float32Array([
  0.0,0.0,0.0
]);
let Tracenormals = new Float32Array([
  0.0,0.0,0.0
]);
let Tracecolors = new Float32Array([
  1.0,1.0,1.0
]);
let Tracetranslation=new Float32Array([0.0,0.0,0.0]);
let go=false;
let tick;
let last=Date.now();
let angle_velocity=3.14/180/10;
let angle_step=3.14/180*10;
let angle=0;
// let os=glMatrix.vec3.fromValues(0,1,0);
let eye=glMatrix.vec3.fromValues(1.5,1.5,0.4);

let angle_up=0, angle_eye=0;
let up=glMatrix.vec3.fromValues(0,0,1);
let center=glMatrix.vec3.fromValues(0.0,0.0,0.0);

let HiroTrans=glMatrix.mat4.create();
let View=glMatrix.mat4.create();
let square;
let theta0,phi0;
// let hyroscope=new Float32Array;
// let square=new Float32Array;
function main() {

    let Proj=glMatrix.mat4.create();
    let SquareTrans=glMatrix.mat4.fromValues(1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1);
    glMatrix.mat4.copy(HiroTrans,SquareTrans);
    glMatrix.mat4.lookAt(View,eye,center,up);
    glMatrix.mat4.perspective(Proj,1,canvas.width/canvas.height,0.1,100);
    gl.clearColor(1.0,1.0,0.8,1.0);
    gl.enable(gl.DEPTH_TEST);
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var u_DiffuseLight = gl.getUniformLocation(gl.program, 'u_DiffuseLight');
    var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
    var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
    let u_NormalTrans=gl.getUniformLocation(gl.program, 'u_NormalTrans');
    let u_Translation=gl.getUniformLocation(gl.program,'u_Translation');
    let u_Trans=gl.getUniformLocation(gl.program, 'u_Trans');
    gl.uniformMatrix4fv(u_NormalTrans,false,SquareTrans);
    gl.uniform3f(u_DiffuseLight, 1.0, 1.0, 1.0);
    gl.uniform4f(u_Translation, 0.0, 0.0, 0.0, 0.0);
    // Set the light direction (in the world coordinate)
    let lightDirection = glMatrix.vec3.fromValues(0.5, 0.5, 0.5);
    glMatrix.vec3.normalize(lightDirection,lightDirection);
    // document.write(lightDirection);
    gl.uniform3fv(u_LightDirection, lightDirection);
    // Set the ambient light
    gl.uniform3f(u_AmbientLight, 0.5, 0.5, 0.5);

    document.onkeydown=function(ev){keydown(ev,gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans);}
    // let u_Translation=gl.getUniformLocation(gl.program, 'u_Translation');
    let u_View=gl.getUniformLocation(gl.program,'u_View');
    let u_Proj=gl.getUniformLocation(gl.program, 'u_Proj');
    gl.uniformMatrix4fv(u_View,false,View);

    gl.uniformMatrix4fv(u_Proj,false,Proj);
    // drawSquare(gl)
    animate();
    draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans);

    tick=function(){
      if (go){
        g = document.getElementById("gravitation").value;
        psi1=document.getElementById("angleVelocity").value;
        M3=psi1*I3;
        UpdateValues();
        animate();
        draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans);
      } else{
        g = document.getElementById("gravitation").value;
        psi1=document.getElementById("angleVelocity").value;
        M3=psi1*I3;
        if ((theta0!=document.getElementById("Theta").value)||(phi0!=document.getElementById("Phi").value)){
          theta0=document.getElementById("Theta").value;
          theta=theta0*Math.PI/180;
          phi0=document.getElementById("Phi").value;
          phi=phi0*Math.PI/180;
          animate0();
          draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans);


        }
          UpdateValues();
      }


        // drawHiro(gl);
        // drawSquare(gl)
        // gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);

          // document.write("adf");
          requestAnimationFrame(tick);
        // handleButtonEvents("strart", func)
    }
    tick();
tick();

    // initShaders(gl,VSHADER_COMPAS,FSHADER_COMPAS);
    // n=initVertexBuffer_Hyro(gl);
    // // document.write(n)
    // let u_View_Hyro=gl.getUniformLocation(gl.program,'u_View_Hyro');
    // let u_Proj_Hyro=gl.getUniformLocation(gl.program, 'u_Proj_Hyro');
    // gl.uniformMatrix4fv(u_View_Hyro,false,View);
    // gl.uniformMatrix4fv(u_Proj_Hyro,false,Proj);
    //
    // // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
    // // affin.translate(size,0,0);

}
function UpdateValues(){
  let info=document.getElementById("gravity");
  info.innerHTML = "g=" + g +" m/s<sup>2</sup>" ;
  info=document.getElementById("rotspeed");
  info.innerHTML = "w=" + psi1 +" rad/s" ;
  info=document.getElementById("theta");
  info.innerHTML = "theta0=" + theta0 +" rad" ;
  info=document.getElementById("phi");
  info.innerHTML = "phi0=" + phi0 +" rad" ;
}
function pause(){
go=false;
}
function start(){
go=true;
last=Date.now();
}
function reset(){
  Tracecolors=[1.0,1.0,1.0];
  Tracenormals=[0,0,0];
  Tracevertices=[0,0,0];
  theta0=document.getElementById("Theta").value;
  theta=theta0*Math.PI/180;
  phi0=document.getElementById("Phi").value;
  phi=phi0*Math.PI/180;
  animate0();
  draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans);
  I1=5,I3=1,m=1,g=1;
  M3=psi1*I3;
go=false;
}
let phi=0.0;
let theta=Math.PI/2-0.5;
let psi=0;
let phi1=0,psi1=5,theta1=0;
let alpha=0;
let beta=0;
let alpha1=0,beta1=0;
let ax=0,ay=0,az=0;
let Rd=0.2;
let xd=0,yd=0,zd=0;
let I1=10,I3=10,m=1,g=100;
let M3=psi1*I3;
// let os=glMatrix.vec3.fromValues(sin(theta)*sin(phi),sin(theta)*cos(phi),cos(theta));
function animate(){
    let now=Date.now();

    RungeCutta((now-last)/1000);
    let Tr1=glMatrix.mat4.create();
    let Tr2=glMatrix.mat4.create();
    let V=glMatrix.vec3.fromValues(xd,yd,zd);
    // glMatrix.mat4.fromYRotation(Tr1,psi);
    // // angle=(angle+angle_velocity*(now-last))%(2*3.1416);
    // glMatrix.mat4.fromZRotation(HiroTrans,-psi);
    glMatrix.mat4.fromZRotation(HiroTrans,psi);
    glMatrix.mat4.fromYRotation(Tr1,theta);
    glMatrix.mat4.fromZRotation(Tr2,phi);
    // glMatrix.vec3.transformMat4(V,os,HiroTrans);
    glMatrix.mat4.multiply(HiroTrans,Tr1,HiroTrans);
    glMatrix.mat4.multiply(HiroTrans,Tr2,HiroTrans);
    // glMatrix.mat4.translate(Tr1,Tr1,V);
    // glMatrix.mat4.multiply(HiroTrans,Tr1,HiroTrans);
    last=now;
}
function animate0(){

    let Tr1=glMatrix.mat4.create();
    let Tr2=glMatrix.mat4.create();
    let V=glMatrix.vec3.create();
    // glMatrix.mat4.fromYRotation(Tr1,psi);
    // // angle=(angle+angle_velocity*(now-last))%(2*3.1416);
    // glMatrix.mat4.fromZRotation(HiroTrans,-psi);
    glMatrix.mat4.fromZRotation(HiroTrans,psi);
    glMatrix.mat4.fromYRotation(Tr1,theta);
    glMatrix.mat4.fromZRotation(Tr2,phi);

    // glMatrix.vec3.transformMat4(V,os,HiroTrans);
    glMatrix.mat4.multiply(HiroTrans,Tr1,HiroTrans);
    glMatrix.mat4.multiply(HiroTrans,Tr2,HiroTrans);
    // glMatrix.mat4.translate(Tr1,Tr1,V);
    // glMatrix.mat4.multiply(HiroTrans,Tr1,HiroTrans);


}
function draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans){
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    xd=R0*sin(alpha)*sin(beta);
    yd=R0*sin(alpha)*cos(beta);
    zd=R0-R0*cos(alpha);
    drawHiro(gl,u_Trans,u_NormalTrans,u_Translation,HiroTrans);
    drawSquare(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans);
    drawTrace(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans);
}
function drawHiro(gl,u_Trans,u_NormalTrans,u_Translation,Trans){
    let n=initHiro1VertexBuffer(gl);

    gl.uniform4f(u_Translation, xd, yd, zd, 0.0);
    gl.uniformMatrix4fv(u_Trans,false,Trans);
    let Normal=glMatrix.mat4.create( );
    glMatrix.mat4.invert(Normal,Trans);
    glMatrix.mat4.transpose(Normal,Normal);
    gl.uniformMatrix4fv(u_NormalTrans,false,Normal);
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
    n=initHiro2VertexBuffer(gl);
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}
function drawSquare(gl,u_Trans,u_NormalTrans,u_Translation,Trans){
    gl.uniformMatrix4fv(u_Trans,false,Trans);
    gl.uniform4f(u_Translation, 0.0, 0.0, 0.0, 0.0);
    let Normal=glMatrix.mat4.create();
    glMatrix.mat4.invert(Normal,Trans);
    glMatrix.mat4.transpose(Normal,Normal);
    gl.uniformMatrix4fv(u_NormalTrans,false,Normal);
    let n=initSquareVertexBuffer(gl);
    // gl.drawArrays
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
    n=initLineVertexBuffer(gl);
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}
function drawTrace(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans){
    gl.uniform4f(u_Translation, xd, yd, zd, 0.0);
    gl.uniformMatrix4fv(u_Trans,false,SquareTrans);
    let v=glMatrix.vec4.fromValues(0.0,0.0,y2*1.2,1.0);
    glMatrix.vec4.transformMat4(v,v,HiroTrans);
    Tracevertices=Tracevertices.slice(0,Tracevertices.length-3);
    Tracevertices=Float32Concat(Tracevertices, [v[0],v[1],v[2]]);
    Tracevertices=Float32Concat(Tracevertices, [0,0,0]);
    Tracenormals=Float32Concat(Tracenormals, [0.0,0.0,0.0]);
    Tracecolors=Float32Concat(Tracecolors, [1.0,1.0,1.0]);
    // Tracevertices.push(v[1],v[2],v[3]);
    // Tracenormals.push(0.0,0.0,0.0);
    // Tracecolors.push(1.0,1.0,1.0);
    let Normal=glMatrix.mat4.create();
    glMatrix.mat4.invert(Normal,SquareTrans);
    glMatrix.mat4.transpose(Normal,Normal);
    gl.uniformMatrix4fv(u_NormalTrans,false,Normal);
    let n=initTraceVertexBuffer(gl);
    gl.drawArrays(gl.LINE_STRIP,0,n);
    // gl.drawArrays(gl.LINES_STRIP,n,2);
}

function Float32Concat(first, second)
{
    var firstLength = first.length,
        result = new Float32Array(firstLength + second.length);
    result.set(first);
    result.set(second, firstLength);
    return result;
}

function keydown(ev,gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans){
    let delta=glMatrix.mat4.create()
    if (ev.keyCode==39){
        let a=glMatrix.vec3.create();
        glMatrix.vec3.negate(a,eye);
        glMatrix.vec3.add(a,center,a);

        glMatrix.vec3.rotateZ(a,a, center, angle_step);

        // document.write(a);
        glMatrix.vec3.negate(a,a);
        glMatrix.vec3.add(eye,center,a);
        // document.write(eye);
        glMatrix.mat4.lookAt(View,eye,center,up);
        let u_View=gl.getUniformLocation(gl.program,'u_View');
        gl.uniformMatrix4fv(u_View,false,View);

    } else if (ev.keyCode==37) {
        let a=glMatrix.vec3.create();
        glMatrix.vec3.negate(a,eye);
        glMatrix.vec3.add(a,center,a);

        glMatrix.vec3.rotateZ(a,a, center, -angle_step);

        // document.write(a);
        glMatrix.vec3.negate(a,a);
        glMatrix.vec3.add(eye,center,a);
        // document.write(eye);
        glMatrix.mat4.lookAt(View,eye,center,up);
        let u_View=gl.getUniformLocation(gl.program,'u_View');
        gl.uniformMatrix4fv(u_View,false,View);
    // } else if (ev.keyCode==38){
    //     eye_up=0.1;
    // } else if (ev.keyCode==40){
    //     eye_up=-0.1;
    } else if (ev.keyCode==187) {
        let a=glMatrix.vec3.create();
        glMatrix.vec3.scale(eye,eye,9/10);

        glMatrix.mat4.lookAt(View,eye,center,up);
        let u_View=gl.getUniformLocation(gl.program,'u_View');
        gl.uniformMatrix4fv(u_View,false,View);
    } else if (ev.keyCode==189) {
        let a=glMatrix.vec3.create();
        glMatrix.vec3.scale(eye,eye,11/10);

        glMatrix.mat4.lookAt(View,eye,center,up);
        let u_View=gl.getUniformLocation(gl.program,'u_View');
        gl.uniformMatrix4fv(u_View,false,View);
    // } else if (ev.keyCode==32) {
    //     tick(u_Trans,SquareTrans);
    }else return;
    draw(gl,u_Trans,u_NormalTrans,u_Translation,SquareTrans,HiroTrans)

}

function initHiro1VertexBuffer(gl){
    // Write the vertex property to buffers (coordinates, colors and normals)
    if (!initArrayBuffer(gl, 'a_Position', Hirovertices1, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Color', Hirocolors1, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', Hironormals1, 3)) return -1;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Write the indices to the buffer object

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, HiroIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Hiroindices1, gl.STATIC_DRAW);
    return Hiroindices1.length;
}
function initHiro2VertexBuffer(gl){
    // Write the vertex property to buffers (coordinates, colors and normals)
    if (!initArrayBuffer(gl, 'a_Position', Hirovertices2, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Color', Hirocolors2, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', Hironormals2, 3)) return -1;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Write the indices to the buffer object

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, HiroIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Hiroindices2, gl.STATIC_DRAW);
    return Hiroindices2.length;
}
function initSquareVertexBuffer(gl){
    // Write the vertex property to buffers (coordinates, colors and normals)
    if (!initArrayBuffer(gl, 'a_Position', Squarevertices, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Color', Squarecolors, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', Squarenormals, 3)) return -1;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Write the indices to the buffer object
    if (!SquareIndexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SquareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Squareindices, gl.STATIC_DRAW);
    return Squareindices.length;
}
function initLineVertexBuffer(gl){
    // Write the vertex property to buffers (coordinates, colors and normals)
    if (!initArrayBuffer(gl, 'a_Position', Linevertices, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Color', Linecolors, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', Linenormals, 3)) return -1;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // Write the indices to the buffer object
    if (!SquareIndexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SquareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Lineindices, gl.STATIC_DRAW);
    return Lineindices.length;
}
function initTraceVertexBuffer(gl){
  if (!initArrayBuffer(gl, 'a_Position', Tracevertices, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Color', Tracecolors, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', Tracenormals, 3)) return -1;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return Math.floor(Tracevertices.length/3);
}
function initArrayBuffer(gl, attribute, data, num) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // Assign the buffer object to the attribute variable
    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
        console.log('Failed to get the storage location of ' + attribute);
        return false;
    }
    gl.vertexAttribPointer(a_attribute, num, gl.FLOAT, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(a_attribute);
    return true;
}
function cilindres_vertices(n,R,x,y1,z,y2) {
    let vertices_number = new Array();

    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[i * 12] = x + R* (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 2] = y1;//y
        vertices_number[i * 12 + 1] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 3] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 5] = y1;//y
        vertices_number[i * 12 + 4] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[i * 12 + 6] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[i * 12 + 8] = y2;//y
        vertices_number[i * 12 + 7] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[i * 12 + 9] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[i * 12 + 11] = y2;//y
        vertices_number[i * 12 + 10] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//
    }
    for (let i = 0, phi; i < n; i++) {
        phi = 2 * 3.1416 / n;
        vertices_number[12*n+i * 18] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n+i * 18 + 2] = y1;//y
        vertices_number[12*n+i * 18 + 1] = z + R* (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n+i * 18 + 3] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n+i * 18 + 5] = y1;//y
        vertices_number[12*n+i * 18 + 4] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n+i * 18 + 6] = x;//x
        vertices_number[12*n+i * 18 + 8] = y1;//y
        vertices_number[12*n+i * 18 + 7] = z;//z
        vertices_number[12*n+i * 18 + 9] = x + R * (Math.cos(i*phi) + Math.sin(i*phi));//x
        vertices_number[12*n+i * 18 + 11] = y2;//y
        vertices_number[12*n+i * 18 + 10] = z + R * (Math.cos(i*phi) - Math.sin(i*phi));//z
        vertices_number[12*n+i * 18 + 12] = x + R * (Math.cos((i+1)*phi) + Math.sin((i+1)*phi));//x
        vertices_number[12*n+i * 18 + 14] = y2;//y
        vertices_number[12*n+i * 18 + 13] = z + R * (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));//z
        vertices_number[12*n+i * 18 + 15] = x;//x
        vertices_number[12*n+i * 18 + 17] = y2;//y
        vertices_number[12*n+i * 18 + 16] = z;//z
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
        yn=(Math.cos(i*phi) - Math.sin(i*phi)) + (Math.cos((i+1)*phi) - Math.sin((i+1)*phi));
        zn=0;
        xn=xn/Math.sqrt((xn*xn+yn*yn));
        yn=yn/Math.sqrt((xn*xn+yn*yn));
        vertices_normal[i * 12] = xn;//x
        vertices_normal[i * 12 + 1] = yn//y
        vertices_normal[i * 12 + 2] = zn;//z
        vertices_normal[i * 12 + 3] = xn;//x
        vertices_normal[i * 12 + 4] = yn//y
        vertices_normal[i * 12 + 5] = zn;//z
        vertices_normal[i * 12 + 6] = xn//y
        vertices_normal[i * 12 + 7] = yn//z
        vertices_normal[i * 12 + 8] = zn;//x
        vertices_normal[i * 12 + 9] = xn//y
        vertices_normal[i * 12 + 10] = yn;//z
        vertices_normal[i * 12 + 11] = zn;//z
    }
    for (let i = 0; i < n; i++) {
        vertices_normal[12*n + i * 18] = 0;//x
        vertices_normal[12*n +i * 18 + 1] = 0//y
        vertices_normal[12*n +i * 18 + 2] = -1;//z
        vertices_normal[12*n +i * 18 + 3] = 0;//x
        vertices_normal[12*n +i * 18 + 4] = 0;//y
        vertices_normal[12*n +i * 18 + 5] = -1;//z
        vertices_normal[12*n +i * 18 + 6] = 0//x
        vertices_normal[12*n +i * 18 + 7] = 0;//y
        vertices_normal[12*n +i * 18 + 8] = -1;//z
        vertices_normal[12*n +i * 18 + 9] = 0//x
        vertices_normal[12*n +i * 18 + 10] = 0;//y
        vertices_normal[12*n +i * 18 + 11] = 1;//z
        vertices_normal[12*n +i * 18 + 12] = 0;//x
        vertices_normal[12*n +i * 18 + 13] = 0//y
        vertices_normal[12*n +i * 18 + 14] = 1;//z
        vertices_normal[12*n +i * 18 + 15] = 0;//x
        vertices_normal[12*n +i * 18 + 16] = 0//y
        vertices_normal[12*n +i * 18 + 17] = 1;//z
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
let L=0.3;
let R0=1.0;
function cossin(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*cos(phi)*sin(psi),R*cos(phi)*cos(psi),-R*sin(phi));
      return v;
}
function sincos(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*sin(phi)*cos(psi),-R*sin(phi)*sin(psi),0);
      return v;
}
function dcossin(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*(-phi1*sin(phi)*sin(psi)+psi1*cos(phi)*cos(psi)),R*(-phi1*sin(phi)*cos(psi)-psi1*cos(phi)*sin(psi)),-R*phi1*cos(phi));
      return v;
}
function dsincos(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*(phi1*cos(phi)*cos(psi)-psi1*sin(phi)*sin(psi)),R*(-phi1*cos(phi)*sin(psi)-psi1*sin(phi)*cos(psi)),0);
      return v;
}
function velocity(R,phi,phi1,psi,psi1){
let v=glMatrix.vec3.fromValues(R*(phi1*cos(phi)*sin(psi)+psi1*sin(phi)*cos(psi)),R*(phi1*cos(phi)*cos(psi)-psi1*sin(phi)*sin(psi)),-R*phi1*sin(phi));
    return v;
}
function dphivelocity(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*(-phi1*sin(phi)*sin(psi)+psi1*cos(phi)*cos(psi)),R*(-phi1*sin(phi)*cos(psi)-psi1*cos(phi)*sin(psi)),-R*phi1*cos(phi));
  return v;
}
function dpsivelocity(R,phi,phi1,psi,psi1){
  let v=glMatrix.vec3.fromValues(R*(phi1*cos(phi)*cos(psi)-psi1*sin(phi)*sin(psi)),R*(-phi1*cos(phi)*sin(psi)-psi1*sin(phi)*cos(psi)),0);
  return v;
}
function seconddif(theta,phi,theta1,phi1,psi,psi1,alpha,alpha1,beta,beta1,h){

let b1=(I1+m*l*l*2)/2*phi1*phi1*sin(2*theta)-M3*phi1*sin(theta) + m*g*l*sin(theta) +
 m*glMatrix.vec3.dot(velocity(l,alpha,alpha1,beta,beta1),dphivelocity(R0,theta,theta1,phi,phi1)) -
 m*glMatrix.vec3.dot(velocity(l,alpha,alpha1,beta,beta1),dcossin(R0,theta,theta1,phi,phi1)) -
 alpha1*m*glMatrix.vec3.dot(dcossin(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1)) -
 beta1*m*glMatrix.vec3.dot(dsincos(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1))

let b2= m*glMatrix.vec3.dot(velocity(l,alpha,alpha1,beta,beta1),dpsivelocity(R0,theta,theta1,phi,phi1)) -
 m*glMatrix.vec3.dot(velocity(l,alpha,alpha1,beta,beta1),dsincos(R0,theta,theta1,phi,phi1)) -
 alpha1*m*glMatrix.vec3.dot(dcossin(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)) -
 beta1*m*glMatrix.vec3.dot(dsincos(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)) -
 (I1+m*l*l)*phi1*theta1*sin(2*theta)+M3*sin(theta)*theta1;
b1=(I1+m*l*l*2)/2*phi1*phi1*sin(theta)-M3/2*phi1*sin(theta) + m*g*l*sin(theta) ;
b2= -(I1+m*l*l)*phi1*theta1*sin(theta)+M3*sin(theta)*theta1;

// function theta2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
//   return 1/2*phi1*phi1*sin(theta)+1/(I1+m*l*l)*(-M3/2*sin(theta)*phi1  + m*g*l*sin(theta));
// }
// function phi2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
//   if (Math.abs(sin(theta))<0.0001){ return 0}
//   else return 1/(I1+m*l*l)/sin(theta)/sin(theta)*(m*l*ax*sin(theta)*sin(phi) +M3*theta1*sin(theta)-phi1*theta1*sin(2*theta));
// }

// document.write(glMatrix.vec3.dot(velocity(l,alpha,alpha1,beta,beta1),dpsivelocity(R0,theta,theta1,phi,phi1)))
let b3=m*g*l*sin(alpha) + m*R0*R0*beta1*sin(2*alpha)/2 +
  m*glMatrix.vec3.dot(dphivelocity(l,alpha,alpha1,beta,beta1),velocity(R0,theta,theta1,phi,phi1)) -
  m*glMatrix.vec3.dot(dcossin(l,alpha,alpha1,beta,beta1),velocity(R0,theta,theta1,phi,phi1)) -
  theta1*m*glMatrix.vec3.dot(cossin(l,alpha,alpha1,beta,beta1),dcossin(R0,theta,theta1,phi,phi1)) -
  phi1*m*glMatrix.vec3.dot(cossin(l,alpha,alpha1,beta,beta1),dsincos(R0,theta,theta1,phi,phi1))
//
b3=0
let b4= m*glMatrix.vec3.dot(dpsivelocity(l,alpha,alpha1,beta,beta1),velocity(R0,theta,theta1,phi,phi1)) -
   m*glMatrix.vec3.dot(dsincos(l,alpha,alpha1,beta,beta1),velocity(R0,theta,theta1,phi,phi1)) -
   theta1*m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),dcossin(R0,theta,theta1,phi,phi1)) -
   phi1*m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),dsincos(R0,theta,theta1,phi,phi1)) -
   (m*R0*R0)*alpha1*beta1*sin(2*alpha);
b4=0



// document.write(b3)
//
// let A=glMatrix.mat4.fromValues(I1+m*l*l,0,m*glMatrix.vec3.dot(cossin(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1)),m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1)),
// 0,(I1+m*l*l)*sin(theta)*sin(theta),m*glMatrix.vec3.dot(dcossin(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)),m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)),
// m*glMatrix.vec3.dot(cossin(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1)), m*glMatrix.vec3.dot(cossin(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)),m*R0*R0,0,
// m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),cossin(R0,theta,theta1,phi,phi1)),m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)),0,m*R0*R0*sin(alpha)*sin(alpha)
// );
let A=glMatrix.mat2.fromValues(I1+m*l*l,0,
0,(I1+m*l*l)*sin(theta)*sin(theta))
// document.write(A+"    ")



//let A=glMatrix.mat4.fromValues(I1+m*l*l,0,0,0,
// 0,(I1+m*l*l)*sin(theta)^2,0,0,
// 0, 0,m*R0*R0,0,
// m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),dcossin(R0,theta,theta1,phi,phi1)),m*glMatrix.vec3.dot(sincos(l,alpha,alpha1,beta,beta1),sincos(R0,theta,theta1,phi,phi1)),0,m*R0*R0*sin(theta)^2);
// A=glMatrix.mat4.fromValues(1,0,0,0,
//   0,1,0,0,
//   0,0,1,0,
//   0,0,0,1);
glMatrix.mat2.invert(A,A);
// document.write(A)
let B=glMatrix.vec2.fromValues(b1,b2);
glMatrix.vec2.transformMat2(B,B,A);
// document.write(B)
return B;
}
// function theta2(theta,phi,theta1,phi1,psi,psi1,h){
//   // let v=velocity(R0,alpha,alpha1,beta,beta1);
//   // let r=radvector(L,theta,theta1,phi,phi1);
//   // let drdphi=drdhi(L,theta,theta1,phi,phi1);
//   // glMatrix.vec3.add(r,r,drdphi);
//   // glMatrix.vec3.inverse(r,r);
//   return 1/2*phi1*phi1*sin(theta)+1/(I1+m*l*l)*(-M3/2*sin(theta)*phi1  + m*g*l*sin(theta));
// }
// function phi2(theta,phi,theta1,phi1,psi,psi1,h){
//   if (Math.abs(sin(theta))<0.0001){ return 0}
//   else return 1/(I1+m*l*l)/sin(theta)/sin(theta)*(M3*theta1*sin(theta)-phi1*theta1*sin(2*theta));
// }
//
// function RungeCutta(h){
//   let k1=new Array(9);
//   let B=seconddif(theta,phi,theta1,phi1,psi,psi1,alpha,alpha1,beta,beta1,h);
//   B=glMatrix.vec4.fromValues(B[0],B[1],0,0);
// // let B=[1,1,1,1]
//     k1[0]=h*B[0];
//     k1[1]=h*B[1];
//     k1[2]=h*B[2];
//     k1[3]=h*B[3];
//     k1[4]=h*theta1;
//     k1[5]=h*phi1;
//     k1[6]=h*alpha1;
//     k1[7]=h*beta1;
//     k1[8]=h*(M3/I3-phi1*cos(theta));
//
//   let k2=new Array(9);
//   B=seconddif(theta + k1[4]/2,phi*k1[5]/2,theta1+k1[0]/2,phi1+k1[1]/2,psi+k1[8]/2,psi1,alpha+k1[6]/2,alpha1+k1[2]/2,beta+k1[7]/2,beta1+k1[3]/2,h);
// B=glMatrix.vec4.fromValues(B[0],B[1],0,0);
//       k2[0]=h*B[0];
//       k2[1]=h*B[1];
//       k2[2]=h*B[2];
//       k2[3]=h*B[3];
//       k2[4]=h*(theta1+k1[0]/2);
//       k2[5]=h*(phi1+k1[1]/2);
//       k2[6]=h*(alpha1+k1[2]/2);
//       k2[7]=h*(beta1+k1[3]/2);
//       k2[8]=h*(M3/I3-(phi1+k1[1]/2)*cos(theta+k1[4]/2));
//   let k3=new Array(9);
//   B=seconddif(theta + k2[4]/2,phi*k2[5]/2,theta1+k2[0]/2,phi1+k2[1]/2,psi+k2[8]/2,psi1,alpha+k2[6]/2,alpha1+k2[2]/2,beta+k2[7]/2,beta1+k2[3]/2,h);
// B=glMatrix.vec4.fromValues(B[0],B[1],0,0);
//       k3[0]=h*B[0];
//       k3[1]=h*B[1];
//       k3[2]=h*B[2];
//       k3[3]=h*B[3];
//       k3[4]=h*(theta1+k2[0]/2);
//       k3[5]=h*(phi1+k2[1]/2);
//       k3[6]=h*(alpha1+k2[2]/2);
//       k3[7]=h*(beta1+k2[3]/2);
//       k3[8]=h*(M3/I3-(phi1+k2[1]/2)*cos(theta+k2[4]/2));
//   let k4=new Array(9);
//   B=seconddif(theta + k3[4]/2,phi*k3[5]/2,theta1+k3[0]/2,phi1+k3[1]/2,psi+k3[8]/2,psi1,alpha+k3[6]/2,alpha1+k3[2]/2,beta+k3[7]/2,beta1+k3[3]/2,h);
// B=glMatrix.vec4.fromValues(B[0],B[1],0,0);
//       k4[0]=h*B[0];
//       k4[1]=h*B[1];
//       k4[2]=h*B[2];
//       k4[3]=h*B[3];
//       k4[4]=h*(theta1+k3[0]/2);
//       k4[5]=h*(phi1+k3[1]/2);
//       k4[6]=h*(alpha1+k3[2]/2);
//       k4[7]=h*(beta1+k3[3]/2);
//       k4[8]=h*(M3/I3-(phi1+k3[1]/2)*cos(theta+k3[4]/2));
//
//     theta1=(theta1+(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6)%(2*Math.PI);
//     phi1=(phi1+(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6)%(2*Math.PI);
//     alpha1=(alpha1+(k1[2]+2*k2[2]+2*k3[2]+k4[2])/6)%(2*Math.PI);
//     beta1=(beta1+(k1[3]+2*k2[3]+2*k3[3]+k4[3])/6)%(2*Math.PI);
//     theta=(theta+(k1[4]+2*k2[4]+2*k3[4]+k4[4])/6)%(2*Math.PI);
//     phi=(phi+(k1[5]+2*k2[5]+2*k3[5]+k4[5])/6)%(2*Math.PI);
//     alpha=(alpha+(k1[6]+2*k2[6]+2*k3[6]+k4[6])/6)%(2*Math.PI);
//     beta=(beta+(k1[7]+2*k2[7]+2*k3[7]+k4[7])/6)%(2*Math.PI);
//     psi=(psi+(k1[8]+2*k2[8]+2*k3[8]+k4[8])/6)%(2*Math.PI);
//   alpha=0;
// beta=0;
// alpha1=0;
// beta1=0;
//     return 0;
// }
function theta2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
  return ((I1+m*l*l*2)/2*phi1*phi1*sin(theta)-M3/2*phi1*sin(theta) + m*g*l*sin(theta))/(I1+m*l*l)
  // return 1/2*phi1*phi1*sin(theta)+1/(I1+m*l*l)*(-M3/2*sin(theta)*phi1  + m*g*l*sin(theta));
}
function phi2(theta,phi,theta1,phi1,psi,psi1,ax,ay,az,h){
  if (Math.abs(sin(theta))<0.0001){ return 0}
  // else return 1/(I1+m*l*l)/sin(theta)/sin(theta)*(m*l*ax*sin(theta)*sin(phi) +M3*theta1*sin(theta)-phi1*theta1*sin(2*theta));
  else return (-(I1+m*l*l)*phi1*theta1*sin(theta)+M3*sin(theta)*theta1)/((I1+m*l*l)*sin(theta)*sin(theta));
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
function cos(phi){
  return Math.cos(phi);
}
function sin(phi){
  return Math.sin(phi);
}
