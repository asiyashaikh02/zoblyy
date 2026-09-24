import React, { useEffect, useRef } from 'react';

/**
 * Realistic Avian Flight Simulation
 * Powered by HTML5 Canvas with true avian kinematics:
 * - Articulated two-joint wings (shoulder + elbow/wrist flexing)
 * - Flap-and-glide state machine: 3–5 rapid downstroke beats followed by outstretched thermal gliding
 * - Dynamic banking: body and wings roll into turns with authentic 3D perspective
 * - Three distinct natural flight patterns:
 *   1. Alpine V-Flock (5 birds migrating west-to-east in aerodynamic echelon formation)
 *   2. High-Altitude Raptor (majestic eagle circling in thermal updrafts near the sunbeam)
 *   3. Ridge-Skimming Swifts (agile pair darting east-to-west across mountain peaks)
 */
export const FlyingBirdsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle high-DPI crisp rendering
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);
    handleResize();

    // =========================================================================
    // BIRD AGENT DEFINITIONS & KINEMATICS
    // =========================================================================

    interface Bird {
      // Position & Motion
      x: number;
      y: number;
      vx: number;
      vy: number;
      speed: number;
      baseSpeed: number;
      heading: number;
      bankAngle: number; // Roll angle during turns (-0.4 to +0.4 rad)

      // Avian Anatomy & Visuals
      scale: number;
      color: string;
      opacity: number;

      // Flap-and-Glide State Machine
      state: 'flapping' | 'gliding';
      stateTimer: number;
      wingPhase: number;
      flapFreq: number; // rad/sec
      glideDihedral: number; // Slight V-angle when gliding

      // Flocking / Trajectory Behavior
      group: 'v-flock' | 'thermal-raptor' | 'ridge-swift';
      formationOffsetX?: number;
      formationOffsetY?: number;
      thermalCenterX?: number;
      thermalCenterY?: number;
      thermalAngle?: number;
      thermalRadiusX?: number;
      thermalRadiusY?: number;
    }

    const birds: Bird[] = [];

    // Helper: Initialize or reset the V-Flock
    const initVFlock = (startX?: number) => {
      const baseY = height * 0.22;
      const spawnX = startX !== undefined ? startX : -120;
      const baseSpeed = 1.9 + Math.random() * 0.4;

      // 5 Birds in classic aerodynamic V-formation
      const offsets = [
        { ox: 0, oy: 0, s: 1.0, op: 0.88, color: '#0F172A' },       // Lead bird
        { ox: -52, oy: -28, s: 0.88, op: 0.82, color: '#1E293B' },  // Left wingman 1
        { ox: -56, oy: 30, s: 0.88, op: 0.82, color: '#1E293B' },   // Right wingman 1
        { ox: -108, oy: -54, s: 0.78, op: 0.76, color: '#334155' }, // Left wingman 2
        { ox: -114, oy: 58, s: 0.78, op: 0.76, color: '#334155' },  // Right wingman 2
      ];

      offsets.forEach((cfg, idx) => {
        birds.push({
          x: spawnX + cfg.ox,
          y: baseY + cfg.oy,
          vx: baseSpeed,
          vy: 0,
          speed: baseSpeed,
          baseSpeed: baseSpeed,
          heading: 0.05,
          bankAngle: 0,
          scale: cfg.s,
          color: cfg.color,
          opacity: cfg.op,
          state: Math.random() > 0.4 ? 'gliding' : 'flapping',
          stateTimer: 0.8 + Math.random() * 2.0,
          wingPhase: Math.random() * Math.PI * 2,
          flapFreq: 18 + Math.random() * 3, // ~3 wingbeats / second
          glideDihedral: 0.06 + Math.random() * 0.04,
          group: 'v-flock',
          formationOffsetX: cfg.ox,
          formationOffsetY: cfg.oy,
        });
      });
    };

    // Helper: Initialize High-Altitude Circling Raptor (Eagle)
    const initThermalRaptor = () => {
      birds.push({
        x: width * 0.65,
        y: height * 0.15,
        vx: 0,
        vy: 0,
        speed: 1.1,
        baseSpeed: 1.1,
        heading: 0,
        bankAngle: -0.22, // Natural banking into thermal circle
        scale: 0.58,
        color: '#1E3A8A', // Deep alpine sky haze tone
        opacity: 0.55,
        state: 'gliding',
        stateTimer: 6.0 + Math.random() * 4.0, // Long soaring glides
        wingPhase: 0,
        flapFreq: 12, // Slow, majestic flap frequency
        glideDihedral: 0.12,
        group: 'thermal-raptor',
        thermalCenterX: width * 0.58,
        thermalCenterY: height * 0.14,
        thermalAngle: 0,
        thermalRadiusX: 160,
        thermalRadiusY: 65,
      });
    };

    // Helper: Initialize Ridge-Skimming Swifts (crossing east-to-west)
    const initRidgeSwifts = (startX?: number) => {
      const baseY = height * 0.38;
      const spawnX = startX !== undefined ? startX : width + 80;
      const baseSpeed = 2.4 + Math.random() * 0.5;

      const swifts = [
        { ox: 0, oy: 0, s: 0.72, op: 0.78, color: '#0F172A' },
        { ox: 38, oy: 22, s: 0.62, op: 0.68, color: '#334155' },
      ];

      swifts.forEach((cfg) => {
        birds.push({
          x: spawnX + cfg.ox,
          y: baseY + cfg.oy,
          vx: -baseSpeed,
          vy: 0,
          speed: baseSpeed,
          baseSpeed: baseSpeed,
          heading: Math.PI - 0.05,
          bankAngle: 0,
          scale: cfg.s,
          color: cfg.color,
          opacity: cfg.op,
          state: Math.random() > 0.5 ? 'gliding' : 'flapping',
          stateTimer: 0.6 + Math.random() * 1.5,
          wingPhase: Math.random() * Math.PI * 2,
          flapFreq: 24, // Fast, agile swallow flaps
          glideDihedral: 0.04,
          group: 'ridge-swift',
          formationOffsetX: cfg.ox,
          formationOffsetY: cfg.oy,
        });
      });
    };

    // Spawn initial birds across the visible sky immediately so user sees motion instantly
    initVFlock(width * 0.25);
    initThermalRaptor();
    initRidgeSwifts(width * 0.75);

    // =========================================================================
    // HIGH-FIDELITY BIRD SILHOUETTE RENDERER
    // Draws anatomically accurate torso, forked tail, and two flexed wings
    // =========================================================================
    const drawAvian = (
      b: Bird,
      wingSpread: number,
      wristFlex: number
    ) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.heading);

      // Lift/pitch bobbing during active flapping (aerodynamic downstroke push)
      if (b.state === 'flapping') {
        const liftBob = Math.sin(b.wingPhase) * 1.5 * b.scale;
        ctx.translate(0, -liftBob);
      }

      ctx.globalAlpha = b.opacity;
      ctx.fillStyle = b.color;

      const s = b.scale;

      // 1. Sleek Torso, Beak & Swallow Fork Tail
      ctx.beginPath();
      // Beak tip
      ctx.moveTo(17 * s, 0);
      // Head to chest
      ctx.quadraticCurveTo(13 * s, 3.2 * s, 4 * s, 3.8 * s);
      // Belly
      ctx.quadraticCurveTo(-3 * s, 3.8 * s, -9 * s, 2.2 * s);
      // Left tail streamer (swallow-fork)
      ctx.lineTo(-21 * s, 5.5 * s);
      // Tail inner notch
      ctx.quadraticCurveTo(-16 * s, 0, -15 * s, 0);
      // Right tail streamer
      ctx.lineTo(-21 * s, -5.5 * s);
      // Tail base
      ctx.lineTo(-9 * s, -2.2 * s);
      // Back
      ctx.quadraticCurveTo(-3 * s, -3.2 * s, 4 * s, -3.2 * s);
      // Crown of head to beak
      ctx.quadraticCurveTo(13 * s, -2.6 * s, 17 * s, 0);
      ctx.closePath();
      ctx.fill();

      // 2. Left Wing (Upper wing in 2D perspective, Y < 0)
      // Shoulder joint
      const lsX = 2 * s;
      const lsY = -2.5 * s;

      // Banking alters apparent perspective length of wings
      const leftBankFactor = Math.max(0.4, 1 - b.bankAngle * 0.5);
      const rightBankFactor = Math.max(0.4, 1 + b.bankAngle * 0.5);

      const lWingSpan = 14 * s * leftBankFactor;
      const lTipSpan = 19 * s * leftBankFactor;

      // Elbow joint
      const lElbowX = lsX - Math.sin(wingSpread) * 3 * s;
      const lElbowY = lsY - Math.cos(wingSpread) * lWingSpan;

      // Wingtip position with trailing wrist flexion
      const lTipX = lElbowX - (5 * s) - Math.sin(wingSpread + wristFlex) * (4 * s);
      const lTipY = lElbowY - Math.cos(wingSpread + wristFlex) * lTipSpan;

      ctx.beginPath();
      ctx.moveTo(lsX, lsY);
      // Leading edge to elbow
      ctx.quadraticCurveTo(lsX + 2 * s, lElbowY + 2 * s, lElbowX, lElbowY);
      // Leading edge to wingtip (curved primary flight feathers)
      ctx.quadraticCurveTo(lElbowX - 1 * s, lTipY + 4 * s, lTipX, lTipY);
      // Trailing edge feather contour
      ctx.quadraticCurveTo(lTipX + 6 * s, lTipY + 8 * s, lElbowX - 4 * s, lElbowY + 3 * s);
      // Secondary feathers returning to flank
      ctx.quadraticCurveTo(lsX - 4 * s, lsY - 4 * s, -4 * s, -1.8 * s);
      ctx.closePath();
      ctx.fill();

      // 3. Right Wing (Lower wing in 2D perspective, Y > 0)
      const rsX = 2 * s;
      const rsY = 2.5 * s;

      const rWingSpan = 14 * s * rightBankFactor;
      const rTipSpan = 19 * s * rightBankFactor;

      const rElbowX = rsX - Math.sin(wingSpread) * 3 * s;
      const rElbowY = rsY + Math.cos(wingSpread) * rWingSpan;

      const rTipX = rElbowX - (5 * s) - Math.sin(wingSpread + wristFlex) * (4 * s);
      const rTipY = rElbowY + Math.cos(wingSpread + wristFlex) * rTipSpan;

      ctx.beginPath();
      ctx.moveTo(rsX, rsY);
      // Leading edge to elbow
      ctx.quadraticCurveTo(rsX + 2 * s, rElbowY - 2 * s, rElbowX, rElbowY);
      // Leading edge to wingtip
      ctx.quadraticCurveTo(rElbowX - 1 * s, rTipY - 4 * s, rTipX, rTipY);
      // Trailing edge feather contour
      ctx.quadraticCurveTo(rTipX + 6 * s, rTipY - 8 * s, rElbowX - 4 * s, rElbowY - 3 * s);
      // Trailing secondaries returning to flank
      ctx.quadraticCurveTo(rsX - 4 * s, rsY + 4 * s, -4 * s, 1.8 * s);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // =========================================================================
    // MAIN SIMULATION LOOP (60/120 FPS FLIGHT DYNAMICS)
    // =========================================================================
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.08); // Clamped delta time
      lastTime = currentTime;

      // Clear Canvas
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Track V-flock leader for relative formation followers
      let vLeadX = 0;
      let vLeadY = 0;
      let vLeadHeading = 0;

      // 1. Update & Render V-Flock Birds
      const vFlockBirds = birds.filter((b) => b.group === 'v-flock');
      if (vFlockBirds.length > 0) {
        const lead = vFlockBirds[0];

        // Lead bird follows smooth undulating alpine wave
        lead.x += lead.speed * 60 * dt;
        lead.y = height * 0.22 + Math.sin(lead.x * 0.0028) * 32;

        // Heading derived from trajectory slope
        const slope = Math.cos(lead.x * 0.0028) * (32 * 0.0028);
        lead.heading = Math.atan2(slope, 1);
        lead.bankAngle = slope * 0.6; // Gentle banking into climbs/descents

        vLeadX = lead.x;
        vLeadY = lead.y;
        vLeadHeading = lead.heading;

        // Followers track formation slots with natural slipstream dampening
        for (let i = 1; i < vFlockBirds.length; i++) {
          const follower = vFlockBirds[i];
          const targetX = vLeadX + (follower.formationOffsetX || 0);
          const targetY = vLeadY + (follower.formationOffsetY || 0);

          follower.x += (targetX - follower.x) * (0.07 * 60 * dt);
          follower.y += (targetY - follower.y) * (0.07 * 60 * dt);
          follower.heading = vLeadHeading;
          follower.bankAngle = lead.bankAngle;
        }

        // If entire flock crossed screen, reset to left side with randomized altitude
        if (lead.x > width + 220) {
          const newBaseY = height * (0.16 + Math.random() * 0.15);
          vFlockBirds.forEach((b) => {
            b.x = -160 + (b.formationOffsetX || 0);
            b.y = newBaseY + (b.formationOffsetY || 0);
          });
        }
      }

      // 2. Update & Render Circling Raptor (Thermal Soarer)
      const raptor = birds.find((b) => b.group === 'thermal-raptor');
      if (raptor && raptor.thermalCenterX !== undefined && raptor.thermalCenterY !== undefined) {
        // Slow majestic thermal circling
        raptor.thermalAngle = (raptor.thermalAngle || 0) + 0.32 * dt;
        const rx = raptor.thermalRadiusX || 160;
        const ry = raptor.thermalRadiusY || 65;

        const nextX = raptor.thermalCenterX + Math.cos(raptor.thermalAngle) * rx;
        const nextY = raptor.thermalCenterY + Math.sin(raptor.thermalAngle) * ry;

        raptor.heading = Math.atan2(nextY - raptor.y, nextX - raptor.x);
        raptor.x = nextX;
        raptor.y = nextY;
        raptor.bankAngle = -0.24; // Continuous inward bank
      }

      // 3. Update & Render Ridge Swifts (crossing east-to-west)
      const swifts = birds.filter((b) => b.group === 'ridge-swift');
      if (swifts.length > 0) {
        const leadSwift = swifts[0];
        leadSwift.x -= leadSwift.speed * 60 * dt;
        leadSwift.y = height * 0.38 + Math.sin(leadSwift.x * 0.0035) * 25;
        const swiftSlope = Math.cos(leadSwift.x * 0.0035) * (25 * 0.0035);
        leadSwift.heading = Math.PI - Math.atan2(swiftSlope, 1);
        leadSwift.bankAngle = -swiftSlope * 0.8;

        for (let i = 1; i < swifts.length; i++) {
          const comp = swifts[i];
          const targetX = leadSwift.x + (comp.formationOffsetX || 0);
          const targetY = leadSwift.y + (comp.formationOffsetY || 0);
          comp.x += (targetX - comp.x) * (0.08 * 60 * dt);
          comp.y += (targetY - comp.y) * (0.08 * 60 * dt);
          comp.heading = leadSwift.heading;
          comp.bankAngle = leadSwift.bankAngle;
        }

        if (leadSwift.x < -180) {
          const newY = height * (0.32 + Math.random() * 0.15);
          swifts.forEach((b) => {
            b.x = width + 120 + (b.formationOffsetX || 0);
            b.y = newY + (b.formationOffsetY || 0);
          });
        }
      }

      // 4. Update Flap-and-Glide Cycles & Render Each Bird
      birds.forEach((b) => {
        b.stateTimer -= dt;

        // Transition between flapping burst and effortless glide
        if (b.state === 'gliding' && b.stateTimer <= 0) {
          b.state = 'flapping';
          b.stateTimer = 0.8 + Math.random() * 0.7; // 3–5 wingbeats
        } else if (b.state === 'flapping' && b.stateTimer <= 0) {
          b.state = 'gliding';
          b.stateTimer = 1.8 + Math.random() * 2.2; // 2 to 4 seconds glide
        }

        let wingSpread: number;
        let wristFlex: number;

        if (b.state === 'flapping') {
          b.wingPhase += b.flapFreq * dt;
          b.speed = b.baseSpeed * 1.15; // Flapping accelerates bird

          const flapCycle = Math.sin(b.wingPhase);
          const flapSpeedDir = Math.cos(b.wingPhase); // > 0 = upstroke recovery

          wingSpread = flapCycle * 0.65;
          // Fluid aerodynamic wrist flex: folds inward during upstroke, snaps stiff on downstroke
          wristFlex = flapSpeedDir > 0
            ? -0.52 * Math.abs(flapCycle)
            : 0.14 * flapCycle;
        } else {
          // Outstretched soaring glide with subtle thermal air resistance flex
          b.speed = b.baseSpeed * 0.95;
          wingSpread = b.glideDihedral;
          wristFlex = 0.03 + Math.sin(currentTime * 0.002) * 0.02;
        }

        // Draw bird
        drawAvian(b, wingSpread, wristFlex);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-[4] select-none"
      aria-hidden="true"
      id="atmospheric-flying-birds"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
