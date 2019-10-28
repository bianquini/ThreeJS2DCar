"use strict";
//Inicialização da Câmera
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1.8);

//Inicialização do Canvas
var render = new THREE.WebGLRenderer({
    antialias: true
});
render.setSize(window.innerWidth, window.innerHeight);
render.setClearColor(0x101010);
var canvas = render.domElement;
document.body.appendChild(canvas);


var posicao = 0;
var posicaoNuvem = 0;
var angulo = 0;
var anguloNuvem = 0;

var cloudShape = new THREE.Shape();




//sombra
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.BasicShadowMap;

//Luz
var luz = new THREE.AmbientLight(0xffffff, 0.4);
// luz.position.setScalar(15);
cena.add(luz);

//Cria um holofote para projetar a sombra
var light = new THREE.PointLight(0xffffff, 0.8, 18);
light.position.set(0, 0, 3);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;
cena.add(light);



//Imagem de fundo
var texture = new THREE.TextureLoader().load('TrackModel.png');
var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshPhongMaterial({
        map: texture
    }));
backgroundMesh.receiveShadow = true;
cena.add(backgroundMesh);


//Spline pista
var curva = new THREE.SplineCurve([
    new THREE.Vector3(-0.85, 0.16, 0),
    new THREE.Vector3(-0.8, 0.78, 0),
    new THREE.Vector3(-0.4, 0.8, 0),
    new THREE.Vector3(-0.20, 0.43, 0),
    new THREE.Vector3(0.2, 0.41, 0),
    new THREE.Vector3(0.35, 0.82, 0),
    new THREE.Vector3(0.7, 0.82, 0),
    new THREE.Vector3(0.86, 0.48, 0),
    new THREE.Vector3(0.73, 0.2, 0),
    new THREE.Vector3(-0.25, -0.07, 0),
    new THREE.Vector3(-0.1, -0.25, 0),
    new THREE.Vector3(0.66, -0.25, 0),
    new THREE.Vector3(0.85, -0.55, 0),
    new THREE.Vector3(0.66, -0.8, 0),
    new THREE.Vector3(0.24, -0.81, 0),
    new THREE.Vector3(0.17, -0.63, 0),
    new THREE.Vector3(-0.1, -0.63, 0),
    new THREE.Vector3(-0.37, -0.87, 0),
    new THREE.Vector3(-0.7, -0.9, 0),
    new THREE.Vector3(-0.85, -0.5, 0),
    new THREE.Vector3(-0.85, 0.16, 0)
]);

var caminho = new THREE.Path(curva.getPoints(300));
var geometriaLinha = caminho.createPointsGeometry(300);
var materialPonto = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false
});

for (let p of curva.points) {
    var geometriaPonto = new THREE.Geometry();
    geometriaPonto.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    var ponto = new THREE.Points(geometriaPonto, materialPonto);
    cena.add(ponto);
}

var materialLinha = new THREE.LineBasicMaterial({
    color: 0xFFFFFF
});
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);

//fim spline da pista



//Spline nuvem

var splineCloud = new THREE.SplineCurve([
    new THREE.Vector3(-0.85, 0.16, 1),
    new THREE.Vector3(-0.8, 0.78, 1),
    new THREE.Vector3(-0.4, 0.8, 1),
    new THREE.Vector3(-0.20, 0.43, 1),
    new THREE.Vector3(0.2, 0.41, 1),
    new THREE.Vector3(0.25, 0.2, 1),
    new THREE.Vector3(-0.15, 0, 1),
    new THREE.Vector3(-0.85, 0.16, 1),

]);

var caminhoNuvem = new THREE.Path(splineCloud.getPoints(300));
var geometriaLinhaNuvem = caminhoNuvem.createPointsGeometry(300);
var materialPontoNuvem = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false
});

for (let s of splineCloud.points) {
    var geometriaPontoNuvem = new THREE.Geometry();
    geometriaPontoNuvem.vertices.push(new THREE.Vector3(s.x, s.y, s.z));
    var pontoNuvem = new THREE.Points(geometriaPontoNuvem, materialPontoNuvem);
    cena.add(pontoNuvem);
}


var materialNuvem = new THREE.LineBasicMaterial({
    color: 0xFFFFFF
});
var linhaNuvem = new THREE.Line(geometriaLinhaNuvem, materialNuvem);
linhaNuvem.position.set(0, 0, 1);
cena.add(linhaNuvem);
//Fim do Spline das nuvens


//sol
var sunGeometry = new THREE.SphereGeometry(0.1, 50, 50);
var sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
var sol = new THREE.Mesh(sunGeometry, sunMaterial);
sol.position.set(0, 0, 2);
sol.castShadow = false;
sol.receiveShadow = false;
cena.add(sol);



//Criando a caixa
var boxGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.05);
var boxMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000
});
var cubo = new THREE.Mesh(boxGeometry, boxMaterial);
cubo.position.set(-0.85, 0.16, 0);
cubo.castShadow = false;
cubo.receiveShadow = true;
cena.add(cubo);


//Movimentação da Camera
var xi;
var yi;

canvas.addEventListener("mousedown", function (e) {
    xi = e.offsetX;
    yi = e.offsetY;

}, false);

canvas.addEventListener("mousemove", function (e) {

    if (e.buttons == 1) { //botão esquerdo do mouse
        camera.position.x = 8 * (xi - e.offsetX) / canvas.width;
        camera.position.y = 8 * (e.offsetY - yi) / canvas.height;
    }

    if (e.buttons == 2) { //botão direito do mouse
        camera.position.y = 3 * Math.sin((e.offsetY - yi) * Math.PI / 180);
        camera.position.z = 3 * Math.cos((e.offsetY - yi) * Math.PI / 180);
        camera.lookAt(cena.position);
    }

    if (e.buttons == 4) { //scroll do mouse
        camera.position.z = 0.2 * (e.offsetY - yi);
    }

}, false);



// movimento do objeto
function movimento() {
    // Adicionando a posição para o movimento
    posicao += 0.001;

    if (posicao > 1.0) {
        posicao = 0.001;
    }
    // Obtendo o ponto da posição
    var ponto = caminho.getPointAt(posicao);
    cubo.position.x = ponto.x;
    cubo.position.y = ponto.y;

    var angulo = getAngulo(posicao);
    // Define o quaternion
    cubo.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angulo);
}

function getAngulo(posicao) {
    // Pegando a tangent 2D da curva
    var tangente = caminho.getTangent(posicao).normalize();

    // Mudando a tangent para 3D

    angulo = -Math.atan(tangente.x / tangente.y);

    return angulo;
}


var x = -0.85;
var y = 0.16;

var scale = 50;
cloudShape.moveTo(x + 5 / scale, y + 5 / scale);
cloudShape.bezierCurveTo(x + 5 / scale, y + 5 / scale, x + 4 / scale, y, x, y);
cloudShape.bezierCurveTo(x - 6 / scale, y, x - 6 / scale, y + 7 / scale, x - 6 / scale, y + 7 / scale);
cloudShape.bezierCurveTo(x - 6 / scale, y + 11 / scale, x - 3 / scale, y + 15.4 / scale, x + 5 / scale, y + 19 / scale);
cloudShape.bezierCurveTo(x + 12 / scale, y + 15.4 / scale, x + 16 / scale, y + 11 / scale, x + 16 / scale, y + 7 / scale);
cloudShape.bezierCurveTo(x + 16 / scale, y + 7 / scale, x + 16 / scale, y, x + 10 / scale, y);
cloudShape.bezierCurveTo(x + 7 / scale, y, x + 5 / scale, y + 5 / scale, x + 5 / scale, y + 5 / scale);



var geometria = new THREE.ShapeGeometry(cloudShape);
var material = new THREE.MeshPhongMaterial({
    color: 0xffffff
});
var mesh = new THREE.Mesh(geometria, material);
mesh.receiveShadow = true;
mesh.position.z = 1;
cena.add(mesh);


// movimento da nuvem
function movimentoNuvem() {
    // Adicionando a posição para o movimento
    posicaoNuvem += 0.001;

    if (posicaoNuvem > 1.0) {
        posicaoNuvem = 0.001;
    }
    // Obtendo o ponto da posição
    var pontoNuvem = caminhoNuvem.getPointAt(posicaoNuvem);
    mesh.position.x = pontoNuvem.x;
    mesh.position.y = pontoNuvem.y;

    var anguloNuvem = getAnguloNuvem(posicaoNuvem);
    // Define o quaternion
    mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), anguloNuvem);
}

function getAnguloNuvem(posicaoNuvem) {
    // Pegando a tangent 2D da curva
    var tangenteNuvem = caminhoNuvem.getTangent(posicaoNuvem).normalize();

    // Mudando a tangent para 3D
    anguloNuvem = -Math.atan(tangenteNuvem.x / tangenteNuvem.y);

    return anguloNuvem;
}


//Renderiza na Tela
function desenhar() {

    this.movimento();
    this.movimentoNuvem();
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);
