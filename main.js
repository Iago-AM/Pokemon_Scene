import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let camera, scene, renderer;
let controls, water, sun;
let camX = 30, camY = 30, camZ = 100;
let clock = new THREE.Clock();
clock.start();

const loader = new GLTFLoader();

//AUDIOLOADER
const listener = new THREE.AudioListener()
const audioLoader = new THREE.AudioLoader()
const backgroundSound = new THREE.Audio(listener)

// audioLoader.load('assets/Sounds/Ocean.mp3', function (buffer) {
//   backgroundSound.setBuffer(buffer);
//   backgroundSound.setLoop(true);
//   backgroundSound.setVolume(1.0);
//   backgroundSound.play();
// })



//LAPRAS
class Lapras {
  constructor() {
    loader.load("assets/Lapras/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(3, 3, 3)
      gltf.scene.position.set(0, -2.5, 0)
      gltf.scene.rotation.y = 3.5

      this.lapras = gltf.scene
      this.speed = {
        vel: 0,
        rot: 0
      }
    })
  }
  stop(){
    this.speed.vel = 0
    this.speed.rot = 0
  }

  update() {
    if (this.lapras) {
      this.lapras.rotation.y += this.speed.rot
      this.lapras.translateZ(this.speed.vel)
      this.lapras.translateY(0.02 * Math.sin(clock.getElapsedTime()))
    }
  }
}
const lapras = new Lapras()

//GAROTA SENTADA
class Sentada {
  constructor() {
    loader.load("assets/Sentada/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(10, 10, 10)
      gltf.scene.position.set(-6, 3.7, 83)
      gltf.scene.rotation.y = 3.5

      this.sentada = gltf.scene
      // this.speed1 = {
      //   vel1: 0,
      //   rot1: 0
      // }
    })
  }
  // stop(){
  //   this.speed1.vel1 = 0
  //   this.speed1.rot1 = 0
  // }

  // // update() {
  // //   if (this.sentada) {
  // //     this.sentada.rotation.y += this.speed1.rot1
  // //     this.sentada.translateZ(this.speed1.vel1)
  // //   }
  // // }
}
const sentada = new Sentada()

//MAGIKARP 1, 2, 3
class Magikarp {
  constructor() {
    loader.load("assets/Magikarp/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(1, 1, 1)
      gltf.scene.position.set(55, 1.5, 55)
      gltf.scene.rotation.y = 0

      this.magikarp = gltf.scene
      this.speed = {
        vel: .6,
      }
    })
  }

  update() {
    if (this.magikarp) {
      this.magikarp.rotation.y += -.003
      // this.magikarp.position.z += .09
      this.magikarp.translateZ(this.speed.vel)
    }
  }
}

class Magikarp1 {
  constructor() {
    loader.load("assets/Magikarp/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(1, 1, 1)
      gltf.scene.position.set(-55, 1.5, -55)
      gltf.scene.rotation.y = 0

      this.magikarp1 = gltf.scene
      this.speed = {
        vel: .4,
      }
    })
  }

  update() {
    if (this.magikarp1) {
      this.magikarp1.rotation.y += .005
      this.magikarp1.translateZ(this.speed.vel)
    }
  }
}

class Magikarp2 {
  constructor() {
    loader.load("assets/Magikarp/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(2, 2, 2)
      gltf.scene.position.set(110, 1.5, 255)
      gltf.scene.rotation.y = 0

      this.magikarp2 = gltf.scene
    })
  }

  update() {
    if (this.magikarp2) {
      this.magikarp2.rotation.y += .0005
      this.magikarp2.position.x += .09
      this.magikarp2.position.z += .05
    }
  }
}
const magikarp = new Magikarp()
const magikarp1 = new Magikarp1()
const magikarp2 = new Magikarp2()

//RAYQUAZA
class Rayquaza {
  constructor() {
    loader.load("assets/Rayquaza/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(15, 15, 15)
      gltf.scene.position.set(1000, 500, -3000)
      gltf.scene.rotation.y = -1

      this.rayquaza = gltf.scene
    })
  }

  update() {
    if (this.rayquaza) {
      // this.rayquaza.rotation.y += -.005
      this.rayquaza.position.x += -.9
    }
  }
}
const rayquaza = new Rayquaza()

//KYOGRE
class Kyogre {
  constructor() {
    loader.load("assets/Kyogre/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(20, 20, 20)
      gltf.scene.position.set(-1000, 5, -1600)
      gltf.scene.rotation.y = 1

      this.kyogre = gltf.scene
    })
  }

  update() {
    if (this.kyogre) {
      this.kyogre.position.x += .3
    }
  }
}
const kyogre = new Kyogre()

//GYARADOS
class Gyarados {
  constructor() {
    loader.load("assets/Gyarados/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(10, 10, 10)
      gltf.scene.position.set(1000, 15, 100)
      gltf.scene.rotation.y = .3

      this.gyarados = gltf.scene
    })
  }

  update() {
    if (this.gyarados) {
      this.gyarados.position.z += .3
    }
  }
}
const gyarados = new Gyarados()

//GROUDON
class Groudon {
  constructor() {
    loader.load("assets/Groudon/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(100, 100, 100)
      gltf.scene.position.set(-4300, 40, -2000)
      gltf.scene.rotation.y = 1

      this.groudon = gltf.scene
    })
  }

  update() {
    if (this.groudon) {
      // this.rayquaza.rotation.y += -.005
      this.groudon.position.x += -.9
    }
  }
}
const groudon = new Groudon()

//ILHA GRANDE
class Ilhinha {
  constructor() {
    loader.load("assets/Ilha_Grande/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(5000, 5000, 5000)
      gltf.scene.position.set(-2000, 100, -2000)
      gltf.scene.rotation.y = 1

      this.ilhinha = gltf.scene
    })
  }

  // update() {
  //   if (this.ilhinha) {
  //   }
  // }
}
const ilhinha = new Ilhinha()

//MONTANHA GELADA
class Montanha_Gelada {
  constructor() {
    loader.load("assets/Montanha_Gelada/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(1, 1, 1)
      gltf.scene.position.set(5000, 280, 5000)
      gltf.scene.rotation.y = 1

      this.montanha_gelada = gltf.scene
    })
  }
}
const montanha_gelada = new Montanha_Gelada()

//ARTICUNO
class Articuno {
  constructor() {
    loader.load("assets/Articuno/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(50, 50, 50)
      gltf.scene.position.set(5200, 600, 5200)
      gltf.scene.rotation.y = 3.5
      gltf.scene.rotation.x = -1
      gltf.scene.rotation.z = -1

      this.articuno = gltf.scene
    })
  }

  // update() {
  //   if (this.articuno) {
  //   }
  // }
}
const articuno = new Articuno()

//LOGO
class Logo {
  constructor() {
    loader.load("assets/Pokemon/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(1, 1, 1)
      gltf.scene.position.set(-1500, 1000, -5000)
      gltf.scene.rotation.y = .3
      

      this.logo = gltf.scene
    })
  }
}
const logo = new Logo()

//ILHA FLUTUANTE
class Flutuante {
  constructor() {
    loader.load("assets/Ilha_Flutuante/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(10, 10, 10)
      gltf.scene.position.set(-10, 10, 100)
      gltf.scene.rotation.y = 4
      

      this.flutuante = gltf.scene
    })
  }
}
const flutuante = new Flutuante()

//MEW
class Mew {
  constructor() {
    loader.load("assets/Mew/scene.gltf", (gltf) => {
      scene.add(gltf.scene)
      gltf.scene.scale.set(.1, .1, .1)
      gltf.scene.position.set(-10, 15, 100)
      gltf.scene.rotation.y = 3
      

      this.mew = gltf.scene
    })
  }
}
const mew = new Mew()

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  document.body.appendChild(renderer.domElement);


  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(camX, camY, camZ);

  //SOL

  sun = new THREE.Vector3();

  //ÁGUA

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('assets/waternormals.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add(water);

  //CÉU

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const parameters = {
    elevation: 2,
    azimuth: 180
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  function updateSun() {

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;

  }

  updateSun();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();

  // fpscontrols = new FirstPersonControls(camera, renderer.domElement);
  // controls.movementSpeed = 100;
  // controls.lookSpeed = 0.1;


  const waterUniforms = water.material.uniforms;

  window.addEventListener('resize', onWindowResize);

  window.addEventListener( 'keydown', function(e){
    if(e.key == "w"){
      lapras.speed.vel = .5
      // sentada.speed1.vel1 = 1
    }
    if(e.key == "s"){
      lapras.speed.vel = -.5
      // sentada.speed1.vel1 = -1
    }
    if(e.key == "d"){
      lapras.speed.rot = -0.05
      // sentada.speed1.rot1 = -0.1
    }
    if(e.key == "a"){
      lapras.speed.rot = 0.05
      // sentada.speed1.rot1 = 0.1
    }

    if(e.key == "1"){
      audioLoader.load('assets/Sounds/Rayquaza_Scream.mp3', function (buffer) {
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(false);
        backgroundSound.setVolume(0.9);
        backgroundSound.play();
      })
    }
  })
  window.addEventListener( 'keyup', function(e){
    lapras.stop()
    // sentada.stop()
  })
  
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);
  render();

  lapras.update()
  magikarp.update()
  magikarp1.update()
  magikarp2.update()
  rayquaza.update()
  kyogre.update()
  gyarados.update()
  //ilhinha.update()
  //montanha_gelada.update()
  //articuno.update()
  //logo.update()
  //flutuante.update()
  //mew.update()
  //sentada.update()
  //groudon.update()
}

function render() {

  water.material.uniforms['time'].value += 1.0 / 60.0;

  renderer.render(scene, camera);

}