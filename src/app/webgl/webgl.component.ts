import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { ColladaLoader } from 'three-full';

@Component({
  selector: 'webgl',
  templateUrl: './webgl.component.html',
  styleUrls: ['./webgl.component.scss']
})
export class WebglComponent implements OnInit {

  @ViewChild('webGLCanvas') basicCanvas/*: ElementRef*/;

  private width: number = 400;
  private height: number = 400;

  private renderer: THREE.WebGLRenderer;
  private animationWindow : Window;
  private canvas: any;
  private sceneElements = [];

  private timeElapsed : number = 0.0;
  private then : number = 0.0;

  constructor() { }

  ngOnInit() {

    this.canvas = document.getElementById( "basic-canvas" );

    var modelPaths = [
      { name:"model1", file:"./assets/collada/cow/cow.dae", model:null },
      { name:"model2", file:"./assets/collada/pig/pig.dae", model:null },
      { name:"model3", file:"./assets/collada/horse/horse.dae", model:null },
    ]

    this.then = new Date().getTime();

    this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: true, canvas: this.canvas});

    this.renderer.setClearColor("#808080", 1);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    for (let entry of modelPaths) {

      // once the model is loader this manager is called to add to the scene
      const loadingManager = new THREE.LoadingManager( () => {

      } );
  
      // load the model and call the manager above
      const loader = new ColladaLoader( loadingManager );
      loader.load( entry.file, ( collada ) => {

        const {scene, camera} = this.makeScene();
        var element = document.getElementById( entry.name );      
        scene.userData.element = element;
        scene.userData.camera = camera;
        
        entry.model = collada.scene;
        entry.model.scale.set(0.5, 0.5, 0.5);
        scene.add(collada.scene);

        this.addScene(element, this.getRandColor(5), (time, rect) => {
  
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          entry.model.rotation.z += THREE.Math.degToRad(90.0*time);
          this.renderer.render(scene, camera);
        }); 

      } );      
    }

    window.addEventListener('resize', () => {
      this.onResize();
    });

    this.animationWindow = window;
    window.requestAnimationFrame(() => {
        this.update();
    });

  }

  onResize(): void {

    var width = this.canvas.clientWidth;
    var height = this.canvas.clientHeight;

    if ( this.canvas.width !== width || this.canvas.height !== height ) {
      this.renderer.setSize( width, height, false );
    }
  }

  update(): void {
    this.onResize();

    var now = new Date().getTime();

    this.timeElapsed = (now - this.then) * 0.001;          // compute time since last frame
    this.then = now;                            // remember time for next frame
    const fps = 1 / this.timeElapsed;             // compute frames per second

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setScissorTest(false);
    this.renderer.clear();
    
    this.renderer.setScissorTest(true);

    for (const {elem, bgCol, fn} of this.sceneElements) {
      this.renderer.setClearColor( bgCol, 0.5 );

      // get the viewport relative position opf this element
      // get its position relative to the page's viewport
      var rect = elem.getBoundingClientRect();
      // check if it's offscreen. If so skip it
      if ( rect.bottom < 0 || rect.top > this.renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > this.renderer.domElement.clientWidth ) {
        continue; // it's off screen
      }
      // set the viewport
      var width = rect.right - rect.left;
      var height = rect.bottom - rect.top;
      var left = rect.left;
      var bottom = this.renderer.domElement.clientHeight - rect.bottom;
      
      this.renderer.setViewport( left, bottom, width, height );
      this.renderer.setScissor( left, bottom, width, height );

      fn(this.timeElapsed, rect);
    }    

    // request next update
    this.animationWindow.requestAnimationFrame(() => {
      this.update();
    });
  }

  addScene(elem, bgCol, fn) {
    this.sceneElements.push({elem, bgCol, fn});
  }

  makeScene() {
    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    {
      const color = 0xFFFFFF;
      const intensity = .5;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    {
      var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.8 );
      scene.add( ambientLight );
    }
    return {scene, camera};
  }

   getRandColor(brightness){

    // Six levels of brightness from 0 to 5, 0 being the darkest
    /*var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";*/
    var val = '0x'+Math.floor(Math.random()*16777215).toString(16);
    return parseInt(val);
  }
}
