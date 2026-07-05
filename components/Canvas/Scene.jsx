import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import NodeNetwork from './NodeNetwork';

export default function Scene({ formInteracted, setFormInteracted }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, isMobile ? 12 : 8], fov: isMobile ? 60 : 45 }} 
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <NodeNetwork formInteracted={formInteracted} setFormInteracted={setFormInteracted} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
