"use strict";
//Inicialização da Câmera
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1.8);

//Inicialização do Canvas
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
render.setClearColor(0x101010);
var canvas = render.domElement;
document.body.appendChild(canvas);

//Movimentação do Mouse
var controleCamera = new THREE.OrbitControls(camera, canvas);

//Luz
var luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.setScalar(15);
cena.add(luz);

//Imagem de fundo
var texture = new THREE.TextureLoader().load('TrackModel.png');
var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
        map: texture
    }));
backgroundMesh.receiveShadow = true;
cena.add(backgroundMesh);

//Spline
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

var caminho = new THREE.Path(curva.getPoints(100));
var geometriaLinha = caminho.createPointsGeometry(50);
var materialPonto = new THREE.PointsMaterial({ size: 10, sizeAttenuation: false });

for (let p of curva.points) {
    var geometriaPonto = new THREE.Geometry();
    geometriaPonto.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    var ponto = new THREE.Points(geometriaPonto, materialPonto);
    cena.add(ponto);
}

var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);
//Fim do Spline

//Renderiza na Tela
function desenhar() {
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);