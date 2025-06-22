import { Component, SerializedComponent } from './component';
import { Dictionary } from '../../dictionary';
import { AbstractTransform } from '../components/transform';

export interface SerializedEntity {
  name: string;
  components: SerializedComponent[];
}

export abstract class Entity {
  public name: string = 'Unnamed Entity';
  abstract get transform(): AbstractTransform | null;

  private components: Dictionary<string, Component> = {};
  constructor(name: string) {
    this.name = name;
  }

  getComponent<T extends Component>(cls: new (entity: Entity) => T): T | null {
    const name = cls.constructor.name;

    return this.components[name] as T || null;
  }

  addComponent<T extends Component>(cls: new (entity: Entity) => T): T {

    const name = cls.constructor.name;

    if (this.getComponent<T>(cls)) {
      throw new Error(`Component ${name} already exists on ${this.name}`);
    }

    const instance = new cls(this);
    this.components[name] = instance;
    return instance;
  }

  serialize(): any {
    const base: SerializedEntity = { name: this.name, components: [] };


    for (const name in this.components) {
      base.components.push(this.components[name].serialize());
    }

    return base;
  }
}