import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Updated Planet Styles - Consistent, Contrasting Colors
const planetStyles = [
    // Using a cool, sleek palette for better contrast against white text
    { name: 'S1', baseColor: 0x06b6d4, size: 0.22 }, // Cyan 600
    { name: 'S2', baseColor: 0x3b82f6, size: 0.18 }, // Blue 500
    { name: 'S3', baseColor: 0x9333ea, size: 0.25 }, // Violet 600
    { name: 'S4', baseColor: 0x06b6d4, size: 0.15 },
    { name: 'S5', baseColor: 0x3b82f6, size: 0.35 },
    { name: 'S6', baseColor: 0x9333ea, size: 0.30 },
    { name: 'S7', baseColor: 0x06b6d4, size: 0.28 },
    { name: 'S8', baseColor: 0x3b82f6, size: 0.20 }
];

let skillCounter = 0; // Global counter to cycle through planet styles

/**
 * SkillsOrbit Component - 3D Visualization using Three.js
 * Renders the skills data as an orbiting ecosystem.
 */
const SkillsOrbit = ({ data, activeCategories, setActiveCategories }) => {
    const mountRef = useRef(null);
    const filterStateRef = useRef(activeCategories);
    const [threeLoaded, setThreeLoaded] = useState(true); // Now loaded via import, so it's always available

    // Update the ref whenever activeCategories changes
    useEffect(() => {
        filterStateRef.current = activeCategories;
    }, [activeCategories]);

    // Function to create text sprites
    const createTextSprite = (text, color) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        const fontSize = 40;
        const font = `${fontSize}px Inter, sans-serif`;
        context.font = font;
        
        const textWidth = context.measureText(text).width;
        
        // Use functional dimensions for visibility
        canvas.width = textWidth + 20; 
        canvas.height = fontSize + 10;
        
        // Redraw with new dimensions
        context.font = font;
        context.fillStyle = color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        
        // Scale sprite relative to canvas size and desired 3D size
        const scaleFactor = 0.5;
        sprite.scale.set(canvas.width / fontSize * scaleFactor, canvas.height / fontSize * scaleFactor, 1);
        
        return sprite;
    };


    useEffect(() => {
        skillCounter = 0;
        
        let isSlowed = false; 
        let isDragging = false; 
        
        // DRAG/ZOOM CONTROL VARIABLES
        let previousMousePosition = { x: 0, y: 0 };
        const rotationSpeed = 0.005; 
        let currentCameraZ = 16; 
        const minZoomZ = 4;
        const maxZoomZ = 20;
        let initialPinchDistance = null;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); 

        // Camera angle control: 0 = top-down, 1 = side-on. 0.4 => 40% from top.
        const topAnglePercent = 0.4;
        const angleFromTop = topAnglePercent * (Math.PI / 2); // polar angle from Y axis
        const setCameraPositionFromDistance = (distance) => {
            // place camera on the Y-Z plane at given polar angle so it looks from "above" at the requested angle
            camera.position.x = 0;
            camera.position.y = distance * Math.sin(angleFromTop);
            camera.position.z = distance * Math.cos(angleFromTop);
            camera.lookAt(0, 0, 0);
        };

        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Dynamic Resizing and Initial Setup
        const setSize = () => {
            const width = currentMount.clientWidth;
            const height = 400; 
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        currentMount.appendChild(renderer.domElement);
        setSize();
        window.addEventListener('resize', setSize);

        // Initialize camera at the chosen top angle and distance
        setCameraPositionFromDistance(currentCameraZ);

        // --- PARTICLE SYSTEM (GALAXY BACKGROUND) ---
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 5000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const color = new THREE.Color();

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

            color.setHSL(0.5 + Math.random() * 0.1, 0.5, 0.8 + Math.random() * 0.2);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starMaterial = new THREE.PointsMaterial({ 
            size: 0.1, 
            vertexColors: true, 
            sizeAttenuation: true 
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);
        // --- END PARTICLE SYSTEM ---


        // Central Core (The Sun)
        const coreGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500, emissive: 0xface30, shininess: 50 });
        const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        coreMesh.userData.originalScale = coreMesh.scale.clone();
        scene.add(coreMesh);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2); 
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 10, 100);
        pointLight.position.set(0, 0, 0); 
        scene.add(pointLight);

        // Group to hold all orbiting objects 
        const orbitsGroup = new THREE.Group();
        scene.add(orbitsGroup);

        const skillCategories = Object.keys(data);
        // Increase base radius and spacing so labels don't overlap between rings
        const baseOrbitRadius = 3.5;   // radius of the innermost orbit
        const orbitSpacing = 3.5;      // distance between successive orbits
        let skillObjects = [];
        let categoryMeshes = {}; // Store all meshes and orbits by category name

        skillCategories.forEach((category, categoryIndex) => {
            const skills = data[category];
            const radius = baseOrbitRadius + categoryIndex * orbitSpacing;
            const orbitColor = new THREE.Color().setHSL(categoryIndex / skillCategories.length, 0.9, 0.6);

            // Orbit line (visual guide)
            const orbitGeometry = new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64);
            // Use MeshBasicMaterial for the orbit line too
            const orbitMaterial = new THREE.MeshBasicMaterial({ color: orbitColor, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
            const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbitMesh.rotation.x = Math.PI / 2; 
            orbitsGroup.add(orbitMesh);
            
            categoryMeshes[category] = { orbit: orbitMesh, planets: [] };
            
            // Skill Spheres (Planets)
            skills.forEach((skill, skillIndexInCat) => {
                const style = planetStyles[skillCounter % planetStyles.length];
                skillCounter++;
                
                const skillGeometry = new THREE.SphereGeometry(style.size, 16, 16);
                
                // Using MeshBasicMaterial for single, unlit, flat color
                const material = new THREE.MeshBasicMaterial({ 
                    color: style.baseColor, 
                }); 
                const mesh = new THREE.Mesh(skillGeometry, material);
                
                // Add Text Sprite (label)
                const textSprite = createTextSprite(skill, '#ffffff'); // White text
                if (textSprite) {
                    // Slightly increase vertical offset so labels clear neighboring rings
                    textSprite.position.y = style.size + 0.8;
                    mesh.add(textSprite);
                }
                
                // Calculate initial position around the orbit
                const angle = (skillIndexInCat / skills.length) * Math.PI * 2;
                mesh.position.x = radius * Math.cos(angle);
                mesh.position.z = radius * Math.sin(angle);
                
                // Store metadata for animation and filtering
                mesh.userData = { 
                    skill: skill, 
                    radius: radius, 
                    angle: angle, 
                    speed: (Math.random() * 0.003) + 0.001,
                    category: category // Store category for filtering
                };
                
                skillObjects.push(mesh);
                categoryMeshes[category].planets.push(mesh);
                orbitsGroup.add(mesh);
            });
        });

        // Function to update object visibility based on filters
        const updateVisibility = () => {
            const activeCats = filterStateRef.current;
            const filterActive = activeCats.length > 0;
            
            skillCategories.forEach(category => {
                const isVisible = !filterActive || activeCats.includes(category);
                
                // Toggle visibility for the orbit line
                if (categoryMeshes[category].orbit) {
                    categoryMeshes[category].orbit.visible = isVisible;
                }
                
                // Toggle visibility for all planets in the category
                categoryMeshes[category].planets.forEach(planet => {
                    planet.visible = isVisible;
                });
            });
        };
        // Initial visibility check
        updateVisibility();
        
        // Observer to run visibility update when activeCategories changes in React state
        const observer = new MutationObserver(() => {
            updateVisibility();
        });
        observer.observe(mountRef.current, { attributes: true, childList: true });

        
        // --- Interaction Handlers (Zoom/Slow Down & Drag/Touch) ---

        const getPinchDistance = (touch1, touch2) => {
            return Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) + 
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
        };
        
        // 1. Mouse Wheel Zoom (Desktop)
        const handleWheel = (event) => {
            event.preventDefault(); 
            const zoomSpeed = 0.005;
            currentCameraZ += event.deltaY * zoomSpeed; 
            currentCameraZ = Math.max(minZoomZ, Math.min(maxZoomZ, currentCameraZ));
            setCameraPositionFromDistance(currentCameraZ);
        };
 
        // 2. Drag/Touch Start/Move/End (Rotation & Pinch)
        const startDrag = (clientX, clientY) => {
            isDragging = true;
            isSlowed = true; 
            previousMousePosition = { x: clientX, y: clientY };
            if (currentMount) currentMount.style.cursor = 'grabbing';
        };
        
        const moveDrag = (clientX, clientY) => {
            if (!isDragging) return;

            const deltaX = clientX - previousMousePosition.x;
            const deltaY = clientY - previousMousePosition.y;

            orbitsGroup.rotation.y += deltaX * rotationSpeed;
            orbitsGroup.rotation.x += deltaY * rotationSpeed;
            
            const limit = Math.PI / 3;
            orbitsGroup.rotation.x = Math.max(-limit, Math.min(limit, orbitsGroup.rotation.x));

            previousMousePosition = { x: clientX, y: clientY };
        };

        const endDrag = () => {
            isDragging = false;
            // Resume auto-animation only if mouse is not hovering (or touch ended)
            isSlowed = currentMount.matches(':hover'); 
            
            if (currentMount) {
                currentMount.style.cursor = isSlowed ? 'grab' : 'default';
            }
        };

        // Mouse Events
        const onMouseDown = (e) => {
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        };
        const onMouseMove = (e) => {
            e.preventDefault();
            moveDrag(e.clientX, e.clientY);
        };
        const onMouseUp = () => {
            endDrag();
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        // Touch Events (for Mobile - handles both drag and pinch)
        const onTouchStart = (e) => {
            if (e.touches.length === 2) {
                // Pinch start
                initialPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
                isDragging = false; // Disable single-finger drag when pinching
                isSlowed = true; 
            } else if (e.touches.length === 1) {
                // Single finger drag start (for rotation)
                e.preventDefault();
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchMove = (e) => {
            if (e.touches.length === 2) {
                // Pinch move (Zoom)
                e.preventDefault();
                const currentPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);

                if (initialPinchDistance !== null) {
                    const pinchDifference = currentPinchDistance - initialPinchDistance;
                    const zoomSpeed = 0.05;

                    currentCameraZ -= pinchDifference * zoomSpeed; 
                    
                    currentCameraZ = Math.max(minZoomZ, Math.min(maxZoomZ, currentCameraZ));
                    setCameraPositionFromDistance(currentCameraZ);
                 
                     initialPinchDistance = currentPinchDistance; 
                 }
            } else if (e.touches.length === 1) {
                // Single finger move (Rotation)
                if (!isDragging) return; 
                e.preventDefault();
                moveDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchEnd = (e) => {
            if (e.touches.length === 0) {
                initialPinchDistance = null;
                endDrag(); 
            }
        };


        // Attach event listeners
        if (currentMount) {
            // Hover/Slow Down Listeners
            currentMount.addEventListener('mouseenter', handleMouseEnter);
            currentMount.addEventListener('mouseleave', handleMouseLeave);
            
            // Drag Listeners (Desktop)
            currentMount.addEventListener('mousedown', onMouseDown);
            // Zoom Listener (Desktop)
            currentMount.addEventListener('wheel', handleWheel);
            
            // Touch Listeners (Mobile - handles both drag and pinch)
            currentMount.addEventListener('touchstart', onTouchStart);
            currentMount.addEventListener('touchmove', onTouchMove);
            currentMount.addEventListener('touchend', onTouchEnd);
        }

        // Handle Hover/Mouse Enter/Leave (Desktop Slow Down)
        function handleMouseEnter() {
            isSlowed = true;
            if (currentMount && !isDragging) currentMount.style.cursor = 'grab';
        };
        function handleMouseLeave() {
            if (!isDragging) {
                isSlowed = false;
                if (currentMount) coreMesh.scale.copy(coreMesh.userData.originalScale);
            }
            if (currentMount) currentMount.style.cursor = isDragging ? 'grabbing' : 'default';
        };
        // --- End Interaction Handlers ---


        // Animation Loop
        const animate = () => {
            if (!currentMount || !currentMount.parentElement) return; 

            requestAnimationFrame(animate);

            // Re-run visibility check in the animation loop to ensure Three.js updates
            updateVisibility();

            if (!isDragging) { 
                const speedMultiplier = isSlowed ? 0.5 : 1.0;
                
                // Apply scaled rotation
                coreMesh.rotation.x += 0.001 * speedMultiplier;
                coreMesh.rotation.y += 0.005 * speedMultiplier;
                orbitsGroup.rotation.y += 0.002 * speedMultiplier;

                // Core Pulse (always runs if not dragging)
                const pulse = 1.0 + Math.sin(Date.now() * 0.005) * 0.01;
                coreMesh.scale.set(pulse, pulse, pulse);

                // Orbital movement 
                skillObjects.forEach(skill => {
                    // Only calculate and update position if the planet is visible
                    if (skill.visible) {
                        const { radius, speed } = skill.userData;
                        skill.userData.angle += speed * speedMultiplier; 
                        skill.position.x = radius * Math.cos(skill.userData.angle);
                        skill.position.z = radius * Math.sin(skill.userData.angle);
                    }
                });
            } else {
                 // DRAGGING/PINCHING STATE (when interactive)
                 // Core pulse still runs during drag/pinch
                 const pulse = 1.0 + Math.sin(Date.now() * 0.005) * 0.01;
                 coreMesh.scale.set(pulse, pulse, pulse);
            }
            
            // Particle system subtle rotation always runs for galaxy effect
            starField.rotation.y += 0.00005; 
            starField.rotation.x += 0.00002; 

            renderer.render(scene, camera);
        };
        
        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', setSize);
             if (currentMount) {
                currentMount.removeEventListener('mouseenter', handleMouseEnter);
                currentMount.removeEventListener('mouseleave', handleMouseLeave);
                currentMount.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                currentMount.removeEventListener('wheel', handleWheel);
                currentMount.removeEventListener('touchstart', onTouchStart);
                currentMount.removeEventListener('touchmove', onTouchMove);
                currentMount.removeEventListener('touchend', onTouchEnd);
                observer.disconnect();

                scene.traverse(object => {
                    if (!object.isMesh && !object.isSprite && !object.isPoints) return
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(m => m.dispose());
                        } else {
                            if (object.material.map) object.material.map.dispose();
                            object.material.dispose();
                        }
                    }
                });
                if (renderer.domElement) {
                     currentMount.removeChild(renderer.domElement);
                }
            }
        };
    }, [data]); 

    return (
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl dark:bg-slate-800">
            <h3 className="text-2xl font-bold mb-4 text-slate-800 border-b border-slate-200 pb-2 dark:text-slate-200 dark:border-slate-700">3D Skills Orbit</h3>
            <p className="text-slate-600 mb-4 dark:text-slate-400">
                This dynamic visualization groups my expertise into core competency areas, illustrating how my skills interoperate and orbit around core architectural principles. **Drag to rotate, pinch/scroll to zoom, and click the category tabs below to filter the visualization!**
            </p>
            <div 
                ref={mountRef} 
                style={{ 
                    width: '100%', 
                    height: '400px', 
                    margin: '0 auto', 
                    overflow: 'hidden', 
                    backgroundColor: '#030712', // Very dark gray/black for space
                    cursor: 'default' 
                }} 
                className="mt-4 rounded-xl"
            >
                {/* Three.js Canvas will be mounted here */}
            </div>
            {threeLoaded && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {Object.keys(data).map((category, index) => {
                        const isActive = activeCategories.includes(category);
                        const categoryColor = new THREE.Color().setHSL(index / Object.keys(data).length, 0.9, 0.6).getStyle();
                        
                        return (
                            <button
                                key={category} 
                                onClick={() => {
                                    // Toggle category in the state
                                    if (activeCategories.includes(category)) {
                                        setActiveCategories(activeCategories.filter(cat => cat !== category));
                                    } else {
                                        setActiveCategories([...activeCategories, category]);
                                    }
                                }}
                                className={`px-3 py-1 text-sm rounded-full font-medium shadow-md transition-all duration-300 ${
                                    isActive 
                                        ? 'text-white' // Active: White text on category color
                                        : 'text-slate-800 bg-slate-200 hover:bg-slate-300 dark:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600' // Inactive: Dark text on light grey
                                }`}
                                style={isActive ? { backgroundColor: categoryColor } : {}}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SkillsOrbit;
