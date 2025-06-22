import * as THREE from 'three';

export class Mesh {
  vertices: Float32Array;
  indices?: Uint16Array | Uint32Array;
  normals?: Float32Array;
  uvs?: Float32Array;

  constructor(vertices: number[] | Float32Array, indices?: number[] | Uint16Array | Uint32Array) {
    this.vertices = vertices instanceof Float32Array
      ? vertices
      : new Float32Array(vertices);

    if (indices) {
      this.indices = indices instanceof Uint16Array || indices instanceof Uint32Array
        ? indices
        : new Uint16Array(indices);
    }
  }

  toThreeBufferGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3));

    if (this.indices) {
      geometry.setIndex(new THREE.BufferAttribute(this.indices, 1));
    }

    return geometry;
  }
}
