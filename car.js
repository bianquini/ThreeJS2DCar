class Car {
    contructor() {
    }

    build(width, height, depth) {
        //Car Structure
        var boxGeometry = new THREE.BoxGeometry(width, height, depth);
        var boxMaterial = new THREE.MeshPhongMaterial({
            color: 'red'
        });
        var struct = new THREE.Mesh(boxGeometry, boxMaterial);
        struct.castShadow = false;
        struct.receiveShadow = true;

        //Wheels
        var circleGeometry = new THREE.CircleGeometry(0.01, 32);
        var circleMaterial = new THREE.MeshPhongMaterial({
            color: 'black'
        });

        var roda1 = new THREE.Mesh(circleGeometry, circleMaterial);
        roda1.rotation.x = 2;
        roda1.rotation.y = 1.55;
        roda1.position.x = 0.028;
        roda1.position.y = 0.05;
        roda1.position.z = -0.017;

        var roda2 = roda1.clone();
        roda2.rotation.x = 2;
        roda2.rotation.y = -1.55;
        roda2.position.x = -0.028;
        roda2.position.y = 0.05;
        roda2.position.z = -0.017;

        var roda3 = roda1.clone();
        roda3.rotation.x = 2;
        roda3.rotation.y = -1.55;
        roda3.position.x = -0.028;
        roda3.position.y = -0.05;
        roda3.position.z = -0.017;

        var roda4 = roda1.clone();
        roda4.rotation.x = 2;
        roda4.rotation.y = 1.55;
        roda4.position.x = 0.028;
        roda4.position.y = -0.05;
        roda4.position.z = -0.017;

        //Glasses
        var sideGlassGeometry = new THREE.PlaneGeometry(0.01, 0.12, 32);
        var sideGlassMaterial = new THREE.MeshPhongMaterial({
            color: 0x6bbd1
        });
        var vidro1 = new THREE.Mesh(sideGlassGeometry, sideGlassMaterial);
        vidro1.rotation.y = 1.55;
        vidro1.position.x = 0.028;
        vidro1.position.y = 0.0005;
        vidro1.position.z = 0.001;

        var vidro2 = vidro1.clone();
        vidro2.rotation.y = -1.55;
        vidro2.position.x = -0.028;
        vidro2.position.y = 0.0005;
        vidro2.position.z = 0.001;

        var vidro3 = vidro1.clone();
        vidro3.rotation.y = -1.55;
        vidro3.position.x = -0.028;
        vidro3.position.y = 0.0005;
        vidro3.position.z = 0.02;

        var vidro4 = vidro1.clone();
        vidro4.rotation.y = 1.55;
        vidro4.position.x = 0.028;
        vidro4.position.y = 0.0005;
        vidro4.position.z = 0.02;

        var glassGeometry = new THREE.PlaneGeometry(0.045, 0.025, 32);
        var glassMaterial = new THREE.MeshPhongMaterial({
            color: 0x6bbd1
        });
        var vidro5 = new THREE.Mesh(glassGeometry, glassMaterial);
        vidro5.rotation.x = 1.55;
        vidro5.position.x = 0.0009;
        vidro5.position.y = -0.078;
        vidro5.position.z = 0.015;

        var vidro6 = vidro5.clone();
        vidro6.rotation.x = -1.55;
        vidro6.position.x = 0.0009;
        vidro6.position.y = 0.078;
        vidro6.position.z = 0.015;

        //Grouping Structure, Wheels and Glasses into one Object 
        this.car = new THREE.Group();
        this.car.add(struct);
        this.car.add(roda1);
        this.car.add(roda2);
        this.car.add(roda3);
        this.car.add(roda4);
        this.car.add(vidro1);
        this.car.add(vidro2);
        this.car.add(vidro3);
        this.car.add(vidro4);
        this.car.add(vidro5);
        this.car.add(vidro6);
        return this.car;
    }

    movement() {
        posicao += 0.001;

        if (posicao > 1.0) {
            posicao = 0.001;
        }

        var ponto = caminho.getPointAt(posicao);
        carro.position.x = ponto.x;
        carro.position.y = ponto.y;

        var angulo = this.getAngulo(posicao);
        carro.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angulo);
    }

    getAngulo(posicao) {
        var tangente = caminho.getTangent(posicao).normalize();
        angulo = -Math.atan(tangente.x / tangente.y);

        return angulo;
    }

}
