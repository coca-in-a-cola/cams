import { Entity } from '../models/entity';

export abstract class Prefab {

  private entity: Entity;

  get name(): string {
    return `${this.entity.name} (${this.constructor.name})`;
  }

  constructor(entity: Entity) {
    this.entity = entity;
  }

  abstract instatiate: () => Entity

  abstract destroy: () => void

  serialize(): any {
    return this.entity.serialize();
  }
}