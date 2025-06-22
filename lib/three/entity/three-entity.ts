import * as THREE from 'three';
import { Entity } from '@/lib/core/models/entity';
import { ThreeTransform } from '../components/transform';

export class ThreeEntity extends Entity {
  get transform(): ThreeTransform { return this._transform; }

  private _transform: ThreeTransform;

  constructor(name: string) {
    super(name);
    const object3D = new THREE.Object3D();
    this._transform = new ThreeTransform(this, { object3D });
  }
}