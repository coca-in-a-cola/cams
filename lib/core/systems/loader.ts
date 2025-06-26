import { Prefab } from '../entity/prefab';

export class LoadSystem {
  load(prefab: Prefab) {
    prefab.instatiate();
  }
}
