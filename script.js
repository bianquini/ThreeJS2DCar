"use strict";
//Inicialização da Câmera
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.position.set(0, 0, 1.8);
camera.position.set(-0.83,0.15,0.2);
//Inicialização do Canvas
var scenario = new Scenario();
var render = scenario.getRender();
var canvas = scenario.getCanvas();
document.body.appendChild(canvas);

var posicao = 0;
var angulo = 0;

//Luz
var luz = scenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

//Imagem de fundo
var background = scenario.buildBackgroundImage('TrackModel.png', 2, 2, 0);
cena.add(background);


//Spline pista
var curva = scenario.buildSpline();

var caminho = new THREE.Path(curva.getPoints(300));
var materialPonto = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false
});

for (let p of curva.points) {
    var ponto = scenario.buildPoint(p.x, p.y, p.z);
    cena.add(ponto);
}

var linha = scenario.buildLine();
cena.add(linha);

//sol
var sol = scenario.buildSun(0.1, 50, 50);
sol.position.set(0.5, 0, 2);
cena.add(sol);

//Criando a caixa
var carro = new Car();
var cubo = carro.build(0.05, 0.15, 0.05);
cubo.position.set(-0.85, 0.16, 0.03);
cena.add(cubo);


//Cria um holofote para projetar a sombra
var light = scenario.buildSpotlight();
light.position.set(0.5, 0, 2);
cena.add(light);

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



//Renderiza na Tela
function desenhar() {

    this.movimento();
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);
