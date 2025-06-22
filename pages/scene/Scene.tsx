'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    animationFrameId?: number;
  }>({});

  useEffect(() => {
    if (!mountRef.current || sceneRef.current.renderer) {
      return;
    }

    if (mountRef.current.childNodes.length) {
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Init Three.js
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    sceneRef.current.renderer = renderer;

    const update = () => {
      sceneRef.current.animationFrameId = requestAnimationFrame(update);
      renderer.render(scene, camera);
    };
    update();

    // Cleanup
    return () => {
      if (sceneRef.current.animationFrameId) {
        cancelAnimationFrame(sceneRef.current.animationFrameId);
      }
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sceneRef.current.renderer = undefined;
    };
  }, []);

  return <div ref={mountRef}></div>;
}