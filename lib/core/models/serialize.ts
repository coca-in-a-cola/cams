type Serializer<T = any> = (value: T) => any;
type Deserializer<T = any> = (data: any, target: any) => T;

export const serializationMetadata = new WeakMap<any, Map<string, {
  serializer?: Serializer,
  deserializer?: Deserializer,
  exclude?: boolean
}>>();

/** Декоратор для исключения из сериализации */
export function DoNotSerialize(target: any, options: { name: string }) {
  const metadata = serializationMetadata.get(target.constructor) || new Map();
  metadata.set(options, { ...metadata.get(options), exclude: true });
  serializationMetadata.set(target.constructor, metadata);
}

/** декоратор Serializable */
export function Serializable<T>(options?: {
  serialize?: Serializer<T>,
  deserialize?: Deserializer<T>
}) {
  return (target: any, propertyKey: string) => {
    const metadata = serializationMetadata.get(target.constructor) || new Map();

    metadata.set(propertyKey, {
      ...metadata.get(propertyKey),
      serializer: options?.serialize || defaultSerializer,
      deserializer: options?.deserialize || ((data) => defaultDeserializer(data, target[propertyKey]))
    });

    serializationMetadata.set(target.constructor, metadata);
  };
}

export function defaultSerializer(value: any): any {
  if (value?.serialize instanceof Function) return value.serialize();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(defaultSerializer);
  return value;
}

export function defaultDeserializer(data: any, currentValue: any): any {
  if (currentValue?.deserialize instanceof Function) {
    currentValue.deserialize(data);
    return currentValue;
  }
  if (currentValue instanceof Date) return new Date(data);
  if (Array.isArray(currentValue)) {
    return data.map((item: any, index: number) =>
      defaultDeserializer(item, currentValue[index])
    );
  }
  return data;
}

// Вспомогательная функция для получения всех свойств
function getAllProperties(obj: any): string[] {
  const props = new Set<string>();
  do {
    Object.getOwnPropertyNames(obj).forEach(prop => props.add(prop));
    obj = Object.getPrototypeOf(obj);
  } while (obj && obj !== Object.prototype);
  return Array.from(props);
}

/** Автоматически вешает Serializable на все свойства */
export function AutoSerialize() {
  return (constructor: Function) => {
    const props = getAllProperties(constructor());

    for (const prop of props) {
      // Пропускаем уже декорированные свойства
      if (serializationMetadata.get(constructor)?.has(prop)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, prop);

      // Автоматически добавляем Serializable для не-function свойств
      if (!descriptor || typeof descriptor.value !== 'function') {
        Serializable()(constructor.prototype, prop);
      }
    }
  };
}