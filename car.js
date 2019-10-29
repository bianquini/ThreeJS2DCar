class Car {
    contructor() {
        this.posicao = 0;
        this.angulo = 0;
    }

    build(width, height, depth) {
        //Estrutura do Carro
        var boxGeometry = new THREE.BoxGeometry(width, height, depth);
        var boxMaterial = new THREE.MeshPhongMaterial({
            color: 'blue'
        });
        var struct = new THREE.Mesh(boxGeometry, boxMaterial);
        struct.castShadow = false;
        struct.receiveShadow = true;

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

        var planeGeometry = new THREE.PlaneGeometry(0.01,0.12,32);
        var planeMaterial = new THREE.MeshPhongMaterial({
            color: 0x6bbd1
        });
        var vidro1 = new THREE.Mesh(planeGeometry, planeMaterial);
        vidro1.rotation.y = 1.55;
        vidro1.position.x = 0.028;
        vidro1.position.y = 0.0005;
        vidro1.position.z = 0.004;

        var vidro2 = vidro1.clone();
        vidro2.rotation.y = -1.55;
        vidro2.position.x = -0.028;
        vidro2.position.y = 0.0005;
        vidro2.position.z = 0.004;

        this.car = new THREE.Group();
        this.car.add(struct);
        this.car.add(roda1);
        this.car.add(roda2);
        this.car.add(roda3);
        this.car.add(roda4);
        this.car.add(vidro1);
        this.car.add(vidro2);
        return this.car;
    }

    //TODO Refatorar para poder usar esse metodo no main
    movement(caminho) {
        // Adicionando a posição para o movimento
        this.posicao += 0.001;

        if (this.posicao > 1.0) {
            this.posicao = 0.001;
        }
        // Obtendo o ponto da posição
        var ponto = caminho.getPointAt(this.posicao);
        console.log(ponto);
        this.car.position.x = ponto.x;
        this.car.position.y = ponto.y;

        var angulo = this.getAngulo(this.posicao, caminho);
        // Define o quaternion
        this.car.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angulo);
    }

    getAngulo(posicao, caminho) {
        // Pegando a tangent 2D da curva
        var tangente = caminho.getTangent(posicao).normalize();

        // Mudando a tangent para 3D

        this.angulo = -Math.atan(tangente.x / tangente.y);

        return this.angulo;
    }

}
