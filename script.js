"use strict";
//Inicialização da Cena
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1.8);

//Inicialização do Canvas
var cenario = new Scenario();
var render = cenario.getRender();
var canvas = cenario.getCanvas();
document.body.appendChild(canvas);

//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

//Imagem de fundo
var fundo = cenario.buildBackgroundImage('TrackModel.png', 2, 2, 0);
cena.add(fundo);

//Spline da pista e linha
var curva = cenario.buildSpline();
var caminho = new THREE.Path(curva.getPoints(300));
var materialPonto = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false
});

for (let p of curva.points) {
    var ponto = cenario.buildPoint(p.x, p.y, p.z);
    cena.add(ponto);
}
var linha = cenario.buildLine();
cena.add(linha);

//Sol
var sol = cenario.buildSun(0.1, 50, 50);
sol.position.set(0.5, 0, 2);
cena.add(sol);

//Criando o carro
var car = new Car();
var carro = car.build(0.05, 0.15, 0.05);
carro.position.set(-0.85, 0.16, 0.03);
cena.add(carro);

//Variáveis de controle do Movimento do objeto
var posicao = 0;
var angulo = 0;

//Cria um holofote para projetar a sombra
var light = cenario.buildSpotlight();
light.position.set(0.5, 0, 2);
cena.add(light);

//Movimentação da Camera
cenario.buildCameraControl();

//Renderiza na Tela
function desenhar() {
    car.movement();
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);
