import { AbstractTransform } from "../components/transform";
import { Entity } from "../models/entity";
import { Prefab } from "./prefab";

/** Root level Entity */
export class Scene extends Entity {
  get transform(): AbstractTransform<Entity, any> | null {
    throw new Error("Method not implemented.");
  }
}
