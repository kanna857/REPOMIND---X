'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZoomIn, ZoomOut, RotateCcw, Filter, Sparkles, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface RepoNode {
  id: string;
  name: string;
  language: string;
  stars: number;
  openIssues: number;
  matchScore: number;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  issues: Array<{
    id: string;
    title: string;
    difficulty: string;
    claimed: boolean;
  }>;
}

export function OpenSourceGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  const [zoom, setZoom] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedNode, setSelectedNode] = useState<RepoNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<RepoNode | null>(null);

  // Nodes definition
  const rawNodes: RepoNode[] = [
    {
      id: 'repo-1',
      name: 'open-telemetry/python',
      language: 'Python',
      stars: 1850,
      openIssues: 184,
      matchScore: 96,
      x: 220,
      y: -70,
      z: 50,
      color: '#00F0FF',
      radius: 20,
      issues: [
        { id: '1', title: 'Fix timeout in token worker', difficulty: 'Easy', claimed: false },
        { id: '10', title: 'Add tracer lock boundary', difficulty: 'Beginner', claimed: false },
      ],
    },
    {
      id: 'repo-2',
      name: 'facebook/react',
      language: 'JavaScript',
      stars: 228000,
      openIssues: 840,
      matchScore: 94,
      x: -210,
      y: 90,
      z: -40,
      color: '#00dbe9',
      radius: 26,
      issues: [
        { id: '2', title: 'Improve error message for hook usage', difficulty: 'Beginner', claimed: false },
        { id: '11', title: 'Devtools render phase warning', difficulty: 'Easy', claimed: true },
      ],
    },
    {
      id: 'repo-3',
      name: 'vercel/next.js',
      language: 'TypeScript',
      stars: 125000,
      openIssues: 2100,
      matchScore: 91,
      x: 160,
      y: 190,
      z: 60,
      color: '#A855F7',
      radius: 24,
      issues: [
        { id: '3', title: 'Add warning for invalid glob matcher', difficulty: 'Easy', claimed: true },
        { id: '12', title: 'Optimize turbopack telemetry', difficulty: 'Intermediate', claimed: false },
      ],
    },
    {
      id: 'repo-4',
      name: 'fastapi/fastapi',
      language: 'Python',
      stars: 76000,
      openIssues: 540,
      matchScore: 88,
      x: -160,
      y: -180,
      z: -50,
      color: '#00FFA3',
      radius: 22,
      issues: [
        { id: '4', title: 'Pydantic v2 computed_field support', difficulty: 'Intermediate', claimed: false },
      ],
    },
    {
      id: 'repo-5',
      name: 'pallets/flask',
      language: 'Python',
      stars: 67500,
      openIssues: 112,
      matchScore: 97,
      x: 270,
      y: 40,
      z: -80,
      color: '#00FFA3',
      radius: 20,
      issues: [
        { id: '5', title: 'Add type annotations to session signer', difficulty: 'Beginner', claimed: false },
      ],
    },
    {
      id: 'repo-6',
      name: 'rust-lang/rust',
      language: 'Rust',
      stars: 97000,
      openIssues: 8200,
      matchScore: 82,
      x: -280,
      y: -40,
      z: 70,
      color: '#FFB800',
      radius: 25,
      issues: [
        { id: '6', title: 'Rustc borrow suggestion for moved field', difficulty: 'Intermediate', claimed: true },
      ],
    },
  ];

  const filteredNodes = rawNodes.filter((node) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'PYTHON') return node.language.toLowerCase().includes('python');
    if (activeFilter === 'TYPESCRIPT') return node.language.toLowerCase().includes('typescript') || node.language.toLowerCase().includes('javascript');
    if (activeFilter === 'RUST') return node.language.toLowerCase().includes('rust');
    return true;
  });

  // Interactive mouse drag state
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = rotationAngle;

    // Background particle stars
    const stars = Array.from({ length: 140 }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 800,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.002 + 0.001,
    }));

    // PR Particles moving along conduits
    const prParticles = Array.from({ length: 24 }, (_, i) => ({
      targetNodeIndex: i % filteredNodes.length,
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.003,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2 + panOffset.current.x;
      const centerY = canvas.height / 2 + panOffset.current.y;

      angle += 0.003;

      // Draw background ambient galaxy gradient
      const radialGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 420 * zoom);
      radialGradient.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      radialGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.05)');
      radialGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw starry background
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(220, 245, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(centerX + star.x * zoom, centerY + star.y * zoom, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw orbital concentric rings
      [140, 240, 330].forEach((radius) => {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * zoom, (radius * 0.55) * zoom, angle * 0.2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw central intelligent user node: "YOU // REPOMIND CORE"
      const coreRadius = 24 * zoom;
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreRadius * 2.5);
      coreGlow.addColorStop(0, 'rgba(0, 240, 255, 0.9)');
      coreGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.3)');
      coreGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#05070D';
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#00F0FF';
      ctx.font = `bold ${Math.max(10, 11 * zoom)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('YOU (CORE)', centerX, centerY + 4);

      // Draw connections from core to repositories
      filteredNodes.forEach((node) => {
        // Compute 3D rotation projection
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotX = node.x * cos - node.z * sin;
        const rotZ = node.x * sin + node.z * cos;
        const projX = centerX + (rotX * zoom);
        const projY = centerY + ((node.y + rotZ * 0.3) * zoom);

        // Conduit line
        const lineGrad = ctx.createLinearGradient(centerX, centerY, projX, projY);
        lineGrad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        lineGrad.addColorStop(1, `${node.color}55`);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(projX, projY);
        ctx.stroke();
      });

      // Draw flowing PR particles
      prParticles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const target = filteredNodes[p.targetNodeIndex % filteredNodes.length];
        if (!target) return;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotX = target.x * cos - target.z * sin;
        const rotZ = target.x * sin + target.z * cos;
        const targetX = centerX + (rotX * zoom);
        const targetY = centerY + ((target.y + rotZ * 0.3) * zoom);

        const currentX = centerX + (targetX - centerX) * p.progress;
        const currentY = centerY + (targetY - centerY) * p.progress;

        ctx.fillStyle = '#00FFA3';
        ctx.shadowColor = '#00FFA3';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5 * zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw repository nodes & orbiting issues
      filteredNodes.forEach((node) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotX = node.x * cos - node.z * sin;
        const rotZ = node.x * sin + node.z * cos;
        const projX = centerX + (rotX * zoom);
        const projY = centerY + ((node.y + rotZ * 0.3) * zoom);

        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        const currentRadius = (node.radius * (isSelected ? 1.25 : isHovered ? 1.15 : 1)) * zoom;

        // Outer Aura
        const aura = ctx.createRadialGradient(projX, projY, currentRadius * 0.6, projX, projY, currentRadius * 2);
        aura.addColorStop(0, `${node.color}66`);
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(projX, projY, currentRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node sphere
        ctx.fillStyle = '#0C101A';
        ctx.beginPath();
        ctx.arc(projX, projY, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#FFFFFF' : node.color;
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 ${Math.max(10, 11 * zoom)}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(node.name.split('/')[1], projX, projY + currentRadius + 14 * zoom);

        // Telemetry Match badge
        ctx.fillStyle = '#00FFA3';
        ctx.font = `bold ${Math.max(8, 9 * zoom)}px 'JetBrains Mono', monospace`;
        ctx.fillText(`${node.matchScore}% MATCH`, projX, projY + currentRadius + 26 * zoom);

        // Orbiting issue satellites
        node.issues.forEach((issue, idx) => {
          const orbitAngle = angle * 2 + (idx * Math.PI);
          const orbitDist = (currentRadius + 16) * zoom;
          const issueX = projX + Math.cos(orbitAngle) * orbitDist;
          const issueY = projY + Math.sin(orbitAngle) * (orbitDist * 0.7);

          ctx.fillStyle = issue.claimed ? '#FFB800' : '#00F0FF';
          ctx.beginPath();
          ctx.arc(issueX, issueY, 4 * zoom, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [zoom, activeFilter, hoveredNode, selectedNode]);

  // Click & Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      panOffset.current.x += deltaX;
      panOffset.current.y += deltaY;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Hit test detection for hover
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = canvas.width / 2 + panOffset.current.x;
    const centerY = canvas.height / 2 + panOffset.current.y;

    let found: RepoNode | null = null;
    filteredNodes.forEach((node) => {
      const projX = centerX + (node.x * zoom);
      const projY = centerY + (node.y * zoom);
      const dist = Math.hypot(mouseX - projX, mouseY - projY);
      if (dist < (node.radius + 15) * zoom) {
        found = node;
      }
    });
    setHoveredNode(found);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
    }
  };

  return (
    <div className="relative w-full h-[580px] rounded-2xl bg-[#080E1C]/90 border border-cyan-500/20 overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.8)]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={580}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Top HUD Controls Ribbon */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0C101A]/90 border border-cyan-500/25 backdrop-blur-md pointer-events-auto">
          {['ALL', 'PYTHON', 'TYPESCRIPT', 'RUST'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                activeFilter === filter
                  ? 'bg-[#00f0ff] text-[#00363a] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1b1f2a]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Viewport Zoom & Reset Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0C101A]/90 border border-cyan-500/25 backdrop-blur-md">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))}
              className="p-1.5 rounded-lg text-gray-300 hover:text-[#00F0FF] hover:bg-[#1b1f2a] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))}
              className="p-1.5 rounded-lg text-gray-300 hover:text-[#00F0FF] hover:bg-[#1b1f2a] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                panOffset.current = { x: 0, y: 0 };
              }}
              className="p-1.5 rounded-lg text-gray-300 hover:text-[#00F0FF] hover:bg-[#1b1f2a] transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Node Telemetry HUD Flyout */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 w-80 p-4 rounded-xl bg-[#0C101A]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }}></span>
              <span className="font-['Space_Grotesk'] text-sm font-bold text-white">{selectedNode.name}</span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          </div>

          <div className="py-3 space-y-2 font-mono text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">LANGUAGE</span>
              <span className="text-[#00F0FF]">{selectedNode.language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">AI MATCH RATE</span>
              <span className="text-[#00FFA3] font-bold">{selectedNode.matchScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">OPEN ISSUES</span>
              <span className="text-white">{selectedNode.openIssues}</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">Recommended Mission:</span>
            {selectedNode.issues.map((iss) => (
              <div
                key={iss.id}
                onClick={() => router.push(`/issues/${iss.id}`)}
                className="p-2 rounded-lg bg-[#141A28] hover:bg-cyan-500/10 border border-cyan-500/20 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-xs text-white group-hover:text-[#00F0FF] transition-colors">{iss.title}</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                    <span className="text-[#00f89e]">{iss.difficulty}</span>
                    <span>•</span>
                    <span className={iss.claimed ? 'text-[#FFB800]' : 'text-[#00F0FF]'}>
                      {iss.claimed ? 'Claimed' : 'Available'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00F0FF] transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push(`/issues/${selectedNode.issues[0]?.id || '1'}`)}
            className="w-full mt-3 py-2 rounded-lg bg-[#00F0FF] text-[#00363a] font-['Space_Grotesk'] text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_16px_rgba(0,240,255,0.4)] transition-all"
          >
            START MISSION DISPATCH
          </button>
        </div>
      )}

      {/* Bottom Ticker Strip */}
      <div className="absolute bottom-3 left-4 flex items-center gap-4 font-mono text-[11px] text-gray-400 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
          <span>ORBITAL MAPPING: ACTIVE</span>
        </div>
        <div className="hidden sm:inline text-gray-600">|</div>
        <div className="hidden sm:flex items-center gap-1 text-gray-400">
          <span>DRAG TO PAN • SCROLL TO ZOOM • CLICK TO RECON</span>
        </div>
      </div>
    </div>
  );
}
