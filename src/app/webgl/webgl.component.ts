import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'webgl',
  templateUrl: './webgl.component.html',
  styleUrls: ['./webgl.component.scss']
})
export class WebglComponent implements OnInit {

  @ViewChild('webGLCanvas') basicCanvas/*: ElementRef*/;

  private width: number = 400;
  private height: number = 400;

  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
  private renderer: THREE.WebGLRenderer;

  private cube: THREE.Mesh;
  private animationDisplay;
  private context: any;  

  constructor() { }

  ngOnInit() {
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: true, canvas: this.basicCanvas.nativeElement});

    this.renderer.setClearColor("#808080", 0.5);
    this.cube = this.createCube(1, new THREE.Color('rgb(255,96,70)'));

    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);

    window.addEventListener('resize', () => {
      this.onResize();
    });

    this.animationDisplay = window;
    window.requestAnimationFrame(() => {
        this.update();
    });

  }

  onResize(): void {

    //this.effect.setSize(this.width, this.height);
    var viewWidth = this.basicCanvas.nativeElement.clientWidth * window.devicePixelRatio;
    var viewHeight = this.basicCanvas.nativeElement.clientHeight * window.devicePixelRatio;

    this.camera.aspect = viewWidth/ viewHeight;
    this.camera.updateProjectionMatrix();
  }

  update(): void {

    this.cube.rotateY(0.03);

    this.renderer.render(this.scene, this.camera);

    this.animationDisplay.requestAnimationFrame(() => {
        this.update();
    });
  }

  createCube(size, color): THREE.Mesh {

    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial({color});

    return new THREE.Mesh(geometry, material);

  }
}
