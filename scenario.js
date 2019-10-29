class Scenario {

    constructor() {
        //Render Boot
        this.render = new THREE.WebGLRenderer({
            antialias: true
        });
        this.render.setSize(window.innerWidth, window.innerHeight);
        this.render.setClearColor(0x101010);

        //sombra
        this.render.shadowMap.enabled = true;
        this.render.shadowMap.type = THREE.BasicShadowMap;

        //Canvas Boot
        this.canvas = this.render.domElement;
    }

    buildAmbientLight(x, y, z) {
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 1);
        this.ambientLight.position.set(x, y, z);
        return this.ambientLight;
    }


    buildSun(x, y, z) {
        var sunGeometry = new THREE.SphereGeometry(x, y, z);
        var sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        var sol = new THREE.Mesh(sunGeometry, sunMaterial);
        sol.castShadow = false;
        sol.receiveShadow = false;
        return sol;
    }

    buildSpotlight() {
        var light = new THREE.SpotLight(0xffffff, 0.7);
        light.castShadow = true;
        light.target.position.set(cubo.position.x, cubo.position.y, 0);
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 10;
        light.target = cubo;
        light.angle = 0.1;
        return light;
    }

    buildBackgroundImage(imgPath, x, y, z) {
        var texture = new THREE.TextureLoader().load(imgPath);
        var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(x, y, z),
            new THREE.MeshPhongMaterial({
                map: texture
            }));
        backgroundMesh.receiveShadow = true;
        return backgroundMesh;
    }

    buildSpline() {
        return new THREE.SplineCurve([
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
    }

    buildPoint(x, y, z) {
        var geometriaPonto = new THREE.Geometry();
        geometriaPonto.vertices.push(new THREE.Vector3(x, y, z));
        return new THREE.Points(geometriaPonto, materialPonto);
    }

    buildLine() {
        var materialLinha = new THREE.LineBasicMaterial({
            color: 0xFFFFFF
        });
        var geometriaLinha = caminho.createPointsGeometry(300);
        return new THREE.Line(geometriaLinha, materialLinha);
    }


    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }
}