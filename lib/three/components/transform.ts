import { AbstractTransform } from '@/lib/core/components/transform';
import * as THREE from 'three';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { ThreeEntity } from '../entity/three-entity';

export interface ThreeTransformOptions {
  object3D?: THREE.Object3D
}

export class ThreeTransform extends AbstractTransform<ThreeEntity, ThreeTransformOptions> {
  private _position: THREE.Vector3 = new THREE.Vector3();
  private _rotation: THREE.Quaternion = new THREE.Quaternion();
  private _scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private _matrix: THREE.Matrix4 = new THREE.Matrix4();

  private object3D: THREE.Object3D | null = null;

  constructor(entity: ThreeEntity, options: ThreeTransformOptions) {
    super(entity);
    this.object3D = options.object3D || new THREE.Object3D();
    this.updateMatrix();
  }

  get position(): Vector3 {
    return this._position.clone();
  }

  set position(value: Vector3) {
    this._position.set(value.x, value.y, value.z);
    this.updateObject3D();
  }

  get rotation(): Quaternion {
    return this._rotation.clone();
  }

  set rotation(value: Quaternion) {
    this._rotation.set(value.x, value.y, value.z, value.w);
    this.updateObject3D();
  }

  get scale(): Vector3 {
    return this._scale.clone();
  }

  set scale(value: Vector3) {
    this._scale.set(value.x, value.y, value.z);
    this.updateObject3D();
  }

  get matrix(): Matrix4 {
    return this._matrix.clone();
  }

  get threeObject(): THREE.Object3D {
    return this.object3D!;
  }

  private updateObject3D() {
    if (!this.object3D) return;

    this.object3D.position.copy(this._position);
    this.object3D.quaternion.copy(this._rotation);
    this.object3D.scale.copy(this._scale);
    this.updateMatrix();
  }

  private updateMatrix() {
    this._matrix.compose(
      this._position,
      this._rotation,
      this._scale
    );
  }
}
