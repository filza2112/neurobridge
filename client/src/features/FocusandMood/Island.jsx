import { Canvas } from "@react-three/fiber";
import { Sphere, Plane } from "@react-three/drei";

function MoodMark({ x, y, mood }) {
  const color = mood === "😊" ? "yellow" : mood === "😐" ? "grey" : "blue";
  return (
    <Sphere args={[0.2, 16, 16]} position={[x, y, 0.5]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}

export default function Island({ entries }) {
  return (
    <Canvas style={{ height: 300 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Plane args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#8B4513" />
      </Plane>
      {entries.map((e, i) => {
        const hour = new Date(e.timestamp).getHours();
        const x = (hour - 12) / 12 * 2;
        const y = 0.3 + i * 0.1;
        return <MoodMark key={i} x={x} y={y} mood={e.mood} />;
      })}
    </Canvas>
  );
}
