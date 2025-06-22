import * as THREE from 'three';
import { Renderer } from '@lib/core/components';
import { Mesh } from '@lib/core/scriptable-objects';
import { ThreeEntity } from '../entity/three-entity';

export class MeshRenderer extends Renderer<ThreeEntity, any> {
  mesh: Mesh | null = null;
  material: THREE.Material | null = null;
  threeMesh: THREE.Mesh | null = null;

  private _visible: boolean = true;

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    if (this.threeMesh) {
      this.threeMesh.visible = value;
    }
  }

  start() {
    this.createThreeMesh();
  }

  update() {
    // Обновление состояния, если нужно
  }

  render() {
    // В Three.js рендеринг обычно централизован
    // Этот метод может использоваться для кастомного рендеринга
  }

  setMesh(mesh: Mesh) {
    this.mesh = mesh;
    this.updateGeometry();
  }

  setMaterial(material: THREE.Material) {
    this.material = material;
    if (this.threeMesh) {
      this.threeMesh.material = material;
    }
  }

  private createThreeMesh() {
    if (!this.mesh || !this.material) return;

    const geometry = this.mesh.toThreeBufferGeometry();
    this.threeMesh = new THREE.Mesh(geometry, this.material);

    // Привязка к трансформации
    const transform = this.entity?.transform;
    if (transform && transform.threeObject) {
      transform.threeObject.add(this.threeMesh);
    }
  }

  private updateGeometry() {
    if (!this.mesh || !this.threeMesh) return;

    const oldGeometry = this.threeMesh.geometry;
    this.threeMesh.geometry = this.mesh.toThreeBufferGeometry();

    // Освобождение ресурсов старой геометрии
    if (oldGeometry) {
      oldGeometry.dispose();
    }
  }
}