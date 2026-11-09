import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Eye, RotateCw, ChevronDown, ChevronUp, Palette } from 'lucide-react';

type ColorPaletteMode = 'all' | 'sapphire' | 'emerald' | 'crimson';

export const Gemstone3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [paletteMode, setPaletteMode] = useState<ColorPaletteMode>('all');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Mutable refs for Three.js state to prevent re-instantiating the WebGL context
  const stateRef = useRef({
    paletteMode: 'all' as ColorPaletteMode,
    wireframeMode: false,
    autoRotate: true,
    isVisible: true,
    targetRotationX: 0.15,
    targetRotationY: 0.35,
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.paletteMode = paletteMode;
  }, [paletteMode]);

  useEffect(() => {
    stateRef.current.wireframeMode = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 560;

    // 2. Setup Scene, Camera, Renderer (DPR clamped to [1, 1.5])
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const sapphireRimLight = new THREE.DirectionalLight(0x0f52ba, 4.0);
    sapphireRimLight.position.set(-5, 3, -3);
    scene.add(sapphireRimLight);

    const emeraldFillLight = new THREE.DirectionalLight(0x50c878, 2.5);
    emeraldFillLight.position.set(3, -2, -2);
    scene.add(emeraldFillLight);

    const crimsonAccentLight = new THREE.PointLight(0xdc143c, 4.5, 10);
    crimsonAccentLight.position.set(0, -1.8, 1.5);
    scene.add(crimsonAccentLight);

    // 5. Composite Gemstone Assembly (THREE.Group with multiple parts)
    const gemGroup = new THREE.Group();
    scene.add(gemGroup);

    // Part 1: Main Faceted Gemstone Geometry with procedural vertices
    const gemGeo = new THREE.IcosahedronGeometry(1.4, 2);
    gemGeo.deleteAttribute('uv');
    const nonIndexedGeo = gemGeo.index ? gemGeo.toNonIndexed() : gemGeo;
    const posAttr = nonIndexedGeo.attributes.position;
    const vertexCount = posAttr.count;

    const colorSapphire = new THREE.Color('#0F52BA');
    const colorEmerald = new THREE.Color('#50C878');
    const colorCrimson = new THREE.Color('#DC143C');
    const colorObsidian = new THREE.Color('#141416');

    const colors = new Float32Array(vertexCount * 3);
    const tempVec = new THREE.Vector3();

    for (let i = 0; i < vertexCount; i += 3) {
      const y = (posAttr.getY(i) + posAttr.getY(i + 1) + posAttr.getY(i + 2)) / 3;
      const x = (posAttr.getX(i) + posAttr.getX(i + 1) + posAttr.getX(i + 2)) / 3;
      const z = (posAttr.getZ(i) + posAttr.getZ(i + 1) + posAttr.getZ(i + 2)) / 3;

      const displacement = 1.0 + Math.sin(x * 3.2 + y * 2.5) * 0.08 + Math.cos(z * 3.8) * 0.05;
      for (let k = 0; k < 3; k++) {
        tempVec.set(posAttr.getX(i + k), posAttr.getY(i + k), posAttr.getZ(i + k));
        tempVec.multiplyScalar(displacement);
        posAttr.setXYZ(i + k, tempVec.x, tempVec.y, tempVec.z);
      }

      const diagonal = y * 0.95 + x * 0.45;
      let chosenColor = colorSapphire;
      if (diagonal > 0.4) {
        chosenColor = colorSapphire;
      } else if (diagonal > -0.1) {
        chosenColor = colorEmerald;
      } else if (diagonal > -0.6) {
        chosenColor = colorCrimson;
      } else {
        chosenColor = Math.sin(x * 6 + z * 3) > 0.1 ? colorObsidian : colorSapphire;
      }

      const facetLight = 0.9 + Math.random() * 0.25;
      for (let k = 0; k < 3; k++) {
        colors[(i + k) * 3] = Math.min(1, chosenColor.r * facetLight);
        colors[(i + k) * 3 + 1] = Math.min(1, chosenColor.g * facetLight);
        colors[(i + k) * 3 + 2] = Math.min(1, chosenColor.b * facetLight);
      }
    }

    nonIndexedGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    nonIndexedGeo.computeVertexNormals();

    const gemMaterial = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.18,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
      flatShading: true,
      transparent: true,
      opacity: 0.98,
    });

    const gemMesh = new THREE.Mesh(nonIndexedGeo, gemMaterial);
    gemGroup.add(gemMesh);

    const wireframeGeo = new THREE.WireframeGeometry(nonIndexedGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.12,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    gemGroup.add(wireframeMesh);

    // Part 2: Inner luminous core
    const innerGeo = new THREE.OctahedronGeometry(0.7, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0f52ba,
      emissive: 0x0f52ba,
      emissiveIntensity: 0.8,
      roughness: 0.4,
      metalness: 0.8,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    gemGroup.add(innerCore);

    // Part 3: Thin Orbital Light Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0f52ba,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.42;
    ring1.rotation.y = Math.PI * 0.15;
    ringGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.009, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xdc143c,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.35;
    ring2.rotation.z = Math.PI * 0.25;
    ringGroup.add(ring2);

    // Part 4: Floating Micro Satellite Crystals
    const satellites: { mesh: THREE.Mesh; speed: number; orbitRadius: number; angle: number; yOffset: number }[] = [];
    const shardGeos = [
      new THREE.OctahedronGeometry(0.12, 0),
      new THREE.TetrahedronGeometry(0.14, 0),
      new THREE.IcosahedronGeometry(0.1, 0),
    ];
    const shardMats = [
      new THREE.MeshStandardMaterial({ color: 0x0f52ba, roughness: 0.15, metalness: 0.6, emissive: 0x0f52ba, emissiveIntensity: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0x50c878, roughness: 0.15, metalness: 0.6, emissive: 0x50c878, emissiveIntensity: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0xdc143c, roughness: 0.15, metalness: 0.6, emissive: 0xdc143c, emissiveIntensity: 0.4 }),
    ];

    for (let i = 0; i < 5; i++) {
      const shard = new THREE.Mesh(shardGeos[i % shardGeos.length], shardMats[i % shardMats.length]);
      scene.add(shard);
      satellites.push({
        mesh: shard,
        speed: 0.5 + Math.random() * 0.5,
        orbitRadius: 1.9 + Math.random() * 0.6,
        angle: (i * Math.PI * 2) / 5,
        yOffset: (Math.random() - 0.5) * 1.0,
      });
    }

    // Part 5: Subtle cosmic dust particles
    const particleCount = isSoftwareGl ? 50 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Part 6: Reflective Ground Contact Shadow Plane
    const groundGeo = new THREE.PlaneGeometry(8, 8);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0b0b0b,
      roughness: 0.25,
      metalness: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.9;
    scene.add(ground);

    setIsLoaded(true);

    // 6. Interactive Drag & Pointer Events
    const handlePointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevPointerX = e.clientX;
      stateRef.current.prevPointerY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const deltaX = e.clientX - stateRef.current.prevPointerX;
      const deltaY = e.clientY - stateRef.current.prevPointerY;
      stateRef.current.prevPointerX = e.clientX;
      stateRef.current.prevPointerY = e.clientY;

      stateRef.current.targetRotationY += deltaX * 0.006;
      stateRef.current.targetRotationX += deltaY * 0.006;
      stateRef.current.targetRotationX = Math.max(-0.6, Math.min(0.6, stateRef.current.targetRotationX));
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = 'grab';
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Pause rendering when off-screen via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          stateRef.current.isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Animation Loop with Software WebGL pacing
    let frameId = 0;
    let lastTime = performance.now();
    const startTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      if (stateRef.current.isVisible) {
        if (stateRef.current.autoRotate && !stateRef.current.isDragging) {
          stateRef.current.targetRotationY += delta * 0.35;
        }

        gemGroup.rotation.y = THREE.MathUtils.damp(gemGroup.rotation.y, stateRef.current.targetRotationY, 4.5, delta);
        gemGroup.rotation.x = THREE.MathUtils.damp(gemGroup.rotation.x, stateRef.current.targetRotationX, 4.5, delta);
        gemGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

        innerCore.rotation.y -= delta * 0.6;
        innerCore.rotation.x += delta * 0.4;

        ringGroup.rotation.y += delta * 0.15;
        ring1.rotation.z += delta * 0.08;
        ring2.rotation.z -= delta * 0.06;

        for (const sat of satellites) {
          sat.angle += delta * sat.speed;
          sat.mesh.position.x = Math.cos(sat.angle) * sat.orbitRadius;
          sat.mesh.position.z = Math.sin(sat.angle) * sat.orbitRadius;
          sat.mesh.position.y = gemGroup.position.y + sat.yOffset + Math.sin(elapsedTime * 2 + sat.angle) * 0.15;
          sat.mesh.rotation.x += delta * 1.5;
          sat.mesh.rotation.y += delta * 2.0;
        }

        particles.rotation.y += delta * 0.04;

        if (gemMaterial.wireframe !== stateRef.current.wireframeMode) {
          gemMaterial.wireframe = stateRef.current.wireframeMode;
        }

        const mode = stateRef.current.paletteMode;
        if (mode === 'sapphire') {
          gemMaterial.color.setHex(0x0f52ba);
          gemMaterial.vertexColors = false;
        } else if (mode === 'emerald') {
          gemMaterial.color.setHex(0x50c878);
          gemMaterial.vertexColors = false;
        } else if (mode === 'crimson') {
          gemMaterial.color.setHex(0xdc143c);
          gemMaterial.vertexColors = false;
        } else {
          gemMaterial.color.setHex(0xffffff);
          gemMaterial.vertexColors = true;
        }
        gemMaterial.needsUpdate = true;

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isSoftwareGl) {
      afterDraw(animate);
    } else {
      frameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointerdown', handlePointerDown);

      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      nonIndexedGeo.dispose();
      gemGeo.dispose();
      innerGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      groundGeo.dispose();
      gemMaterial.dispose();
      innerMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMat.dispose();
      groundMat.dispose();
      for (const sat of satellites) {
        sat.mesh.geometry.dispose();
        (sat.mesh.material as THREE.Material).dispose();
      }

      renderer.dispose();
      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        data-testid="gemstone-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D Gemstone"
      />

      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0B0B]">
          <div className="w-10 h-10 rounded-full border-2 border-[#0F52BA] border-t-[#50C878] animate-spin" />
          <span className="text-xs text-slate-400 font-mono tracking-wider">INITIALIZING 3D GEMSTONE...</span>
        </div>
      )}

      {/* Interactive Collapsible Bottom Dock (Adheres to Three.js Directive: Unobstructed center, collapsible, zero pulsating dots) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center max-w-[94vw] w-auto">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1 mb-1.5 text-[11px] font-mono tracking-wider uppercase bg-[#141416]/90 hover:bg-[#1f1f23] text-slate-300 hover:text-white rounded-full border border-slate-800 backdrop-blur transition-all duration-200"
          aria-expanded={!isControlsCollapsed}
          aria-label={isControlsCollapsed ? 'Show 3D gemstone controls' : 'Hide 3D gemstone controls'}
        >
          {isControlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#50C878]" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Zen View</span>
            </>
          )}
        </button>

        {/* Expanded Control Dock */}
        {!isControlsCollapsed && (
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[#101012]/95 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md">
            {/* Palette Selection Swatches */}
            <div className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded-xl border border-white/5">
              <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
              <button
                onClick={() => setPaletteMode('all')}
                className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  paletteMode === 'all'
                    ? 'bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tri-Gemstone Faceted"
              >
                Faceted
              </button>
              <button
                onClick={() => setPaletteMode('sapphire')}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  paletteMode === 'sapphire'
                    ? 'bg-[#0F52BA] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Sapphire Blue"
              >
                <span className="w-2 h-2 rounded-full bg-[#0F52BA]" />
                Sapphire
              </button>
              <button
                onClick={() => setPaletteMode('emerald')}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  paletteMode === 'emerald'
                    ? 'bg-[#50C878] text-black font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Emerald Green"
              >
                <span className="w-2 h-2 rounded-full bg-[#50C878]" />
                Emerald
              </button>
              <button
                onClick={() => setPaletteMode('crimson')}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  paletteMode === 'crimson'
                    ? 'bg-[#DC143C] text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Crimson Red"
              >
                <span className="w-2 h-2 rounded-full bg-[#DC143C]" />
                Crimson
              </button>
            </div>

            {/* Wireframe and Rotate Toggles */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${
                  wireframeMode
                    ? 'bg-blue-600/30 text-blue-300 border-blue-500/50'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
                aria-pressed={wireframeMode}
                title="Toggle Wireframe inspection"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${
                  autoRotate
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
                aria-pressed={autoRotate}
                title="Toggle automatic rotation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
                <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
