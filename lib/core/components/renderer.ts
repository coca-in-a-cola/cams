import { Component } from '../models/component';
import { Entity } from '../models/entity';

export abstract class Renderer<TEntity extends Entity = Entity, TOptions = any> extends Component<TEntity, TOptions> {
  abstract get visible(): boolean;
  abstract set visible(value: boolean);

  abstract render(): void;
}