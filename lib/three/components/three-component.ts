import { Component, ComponentConstructor } from '@/lib/core/models/component';
import { ThreeEntity } from '../entity/three-entity';


// ну их в жопу эти миксины
// export function AsThree<BaseType extends ComponentConstructor>(TheBase: BaseType) {
//     abstract class Mixed extends TheBase {
//       protected entity!: ThreeEntity;

//       constructor(...args: any[]) {
//         super(...args);
//       }
//     }
//     return Mixed;
// }

// export abstract class ThreeComponent extends Component {
//   protected entity!: ThreeEntity;

//   constructor(entity: ThreeEntity, options?: any) {
//     super(entity);
//     this.entity = entity;
//   }
// }