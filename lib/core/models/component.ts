import { Entity } from './entity';
import { AutoSerialize, defaultDeserializer, defaultSerializer, DoNotSerialize, serializationMetadata } from './serialize';

export type ComponentConstructor<T = Component> = new (entity: Entity, options?: any) => T;

export interface SerializedComponent {
  name: string;
  [key: string]: any;
}

@AutoSerialize()
export abstract class Component<TEntity extends Entity = Entity, TOptions = any> {

  private static instances: Component[] = [];

  @DoNotSerialize
  protected entity!: TEntity;

  constructor(entity: TEntity, options?: TOptions) {
    this.entity = entity;
    Component.instances.push(this);
  }

  public static getAll(): Component[] {
    return Component.instances;
  }

  /** Executed once on startup */
  abstract start(): void;

  /** Executed every frame */
  abstract update(): void;

  // Сериализация
  public serialize(): SerializedComponent {
    const metadata = serializationMetadata.get(this.constructor) || new Map();
    const result: SerializedComponent = { name: this.constructor.name };

    for (const [prop, config] of metadata) {
      if (config.exclude) continue;

      const value = this[prop as keyof this];
      result[prop] = config.serializer ? config.serializer(value) : defaultSerializer(value);
    }

    return result;
  }

  public deserialize(data: SerializedComponent): void {
    const metadata = serializationMetadata.get(this.constructor) || new Map();

    for (const [prop, config] of metadata) {
      if (config.exclude || !data.hasOwnProperty(prop)) continue;

      const currentValue = this[prop as keyof this];
      this[prop as keyof this] = config.deserializer
        ? config.deserializer(data[prop], currentValue)
        : defaultDeserializer(data[prop], currentValue);
    }
  }
}
