import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const useThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const duckRef = useRef(null);
  const oceanRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#002135");
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(100, 100, 128, 128);
    const material = new THREE.MeshBasicMaterial({color: "#005e97", wireframe: true});
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2;
    scene.add(ocean);
    oceanRef.current = ocean;

    camera.position.z = 12;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);

    // Load the duck model
    const loader = new GLTFLoader();
    loader.load(
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
      (gltf) => {
        const duck = gltf.scene;
        duck.traverse((child) => {
          if (child.isMesh) {
            const wireframeGeometry = new THREE.WireframeGeometry(child.geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xf0b630 }); // Updated color
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            wireframe.scale.set(0.015, 0.015, 0.015);
            
            wireframe.rotation.x = Math.PI / 2;
            wireframe.rotation.y = Math.PI / 2;
            wireframe.rotation.z = Math.PI;
            
            duckRef.current = wireframe;
            scene.add(wireframe);
          }
        });
      },
      undefined,
      (error) => console.error('An error happened', error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      const positions = ocean.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        
        positions[i + 2] = Math.sin(x / 2 + time) * 
                           Math.cos(y / 2 + time) * 0.75 +
                           Math.sin(x / 1 + time * 0.5) * 
                           Math.cos(y / 3 + time * 0.5) * 0.25;
      }
      ocean.geometry.attributes.position.needsUpdate = true;

      if (duckRef.current) {
        const pinIndex = 128 * 58 - 1;
        const x = positions[pinIndex * 3];
        const y = positions[pinIndex * 3 + 1];
        const z = positions[pinIndex * 3 + 2];

        duckRef.current.position.set(x, z + 0.5, y);
        
        const normalX = positions[pinIndex * 3 + 2] - positions[(pinIndex - 1) * 3 + 2];
        const normalZ = positions[(pinIndex + 128) * 3 + 2] - positions[pinIndex * 3 + 2];
        const normal = new THREE.Vector3(normalX, 1, normalZ).normalize();

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.lookAt(new THREE.Vector3(0, 0, 0), normal, new THREE.Vector3(1, 0, 0));

        duckRef.current.quaternion.setFromRotationMatrix(rotationMatrix);
        duckRef.current.rotateX(Math.PI / 2);
        duckRef.current.rotateY(Math.PI / 2);
        duckRef.current.rotateZ(Math.PI);

        duckRef.current.position.y += Math.sin(time * 2) * 0.05;
        duckRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.sin(time) * 0.01);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return { mountRef, sceneRef, duckRef, oceanRef };
};

export default useThreeScene;