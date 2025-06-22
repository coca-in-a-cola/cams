// TODO: implement abstract Vector3, Quaternion, Matrix4 to support canvas transform as well
import { Matrix4, Quaternion, Vector3 } from 'three';
import { Component } from '../models/component';
import { Entity } from '../models/entity';

export abstract class AbstractTransform<TEntity extends Entity = Entity, OptionsType = any> extends Component<TEntity, OptionsType> {
  abstract get position(): Vector3;
  abstract set position(value: Vector3);

  abstract get rotation(): Quaternion;
  abstract set rotation(value: Quaternion);

  abstract get scale(): Vector3;
  abstract set scale(value: Vector3);

  abstract get matrix(): Matrix4;

  start() { }
  update() { }
}
