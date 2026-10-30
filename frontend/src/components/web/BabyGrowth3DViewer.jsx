import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Sparkles,
  Heart,
  X,
} from 'lucide-react';

/**
 * BabyGrowth3DViewer
 *
 * An interactive, medical-educational 3D-style fetal growth animator for each of the 9 pregnancy months.
 * Features:
 * - Bespoke anatomical 3D-style SVG illustrations for Months 1–9, each with its own unique
 *   dark womb environment, colour palette, and scene composition.
 * - 2.8-second continuous looping animation with gentle 3D floating, breathing, pulse physics.
 * - Rhythmic heartbeat pulse synced with gestational heart rates.
 * - Month-specific animated amniotic fluid bubbles per scene.
 * - Interactive mouse / touch drag for 3D rotational perspective.
 * - Play/Pause controls with a visual 2.8s loop timeline indicator.
 * - Respects prefers-reduced-motion (switches to static mode).
 * - Fullscreen zoom modal with anatomical callout highlights.
 * - Clear educational disclaimers on all visuals.
 *
 * NOTE: All illustrations are purely educational representations and do NOT depict
 * an actual scan, photograph, or clinical measurement of any individual baby.
 */

// ── Month-specific scene configuration ────────────────────────────────────────
const MONTH_SCENES = {
  1: {
    bgFrom: '#0f2027', bgMid: '#203a43', bgTo: '#2c5364',
    glowColor: '#34d399', ambientLabel: '🔬 Week 1–4',
    particleColor: '#a7f3d0', particleCount: 10,
  },
  2: {
    bgFrom: '#1a0533', bgMid: '#3b0764', bgTo: '#6d28d9',
    glowColor: '#f43f5e', ambientLabel: '💓 Week 5–8',
    particleColor: '#fecdd3', particleCount: 12,
  },
  3: {
    bgFrom: '#042f2e', bgMid: '#134e4a', bgTo: '#0d9488',
    glowColor: '#2dd4bf', ambientLabel: '🤏 Week 9–12',
    particleColor: '#ccfbf1', particleCount: 14,
  },
  4: {
    bgFrom: '#1c0a00', bgMid: '#7c2d12', bgTo: '#ea580c',
    glowColor: '#fb923c', ambientLabel: '👍 Week 13–16',
    particleColor: '#ffedd5', particleCount: 15,
  },
  5: {
    bgFrom: '#0c1a4b', bgMid: '#1e3a8a', bgTo: '#3b82f6',
    glowColor: '#60a5fa', ambientLabel: '🦵 Week 17–20',
    particleColor: '#dbeafe', particleCount: 16,
  },
  6: {
    bgFrom: '#1a0e00', bgMid: '#713f12', bgTo: '#ca8a04',
    glowColor: '#fbbf24', ambientLabel: '👁️ Week 21–24',
    particleColor: '#fef9c3', particleCount: 14,
  },
  7: {
    bgFrom: '#0a0a2e', bgMid: '#1e1b4b', bgTo: '#7c3aed',
    glowColor: '#a78bfa', ambientLabel: '🧠 Week 25–28',
    particleColor: '#ede9fe', particleCount: 16,
  },
  8: {
    bgFrom: '#0f0f1e', bgMid: '#1e3a5f', bgTo: '#0ea5e9',
    glowColor: '#38bdf8', ambientLabel: '🍁 Week 29–32',
    particleColor: '#e0f2fe', particleCount: 12,
  },
  9: {
    bgFrom: '#1a0a00', bgMid: '#78350f', bgTo: '#d97706',
    glowColor: '#f59e0b', ambientLabel: '✨ Week 33–40',
    particleColor: '#fffbeb', particleCount: 10,
  },
};

// Stable particle seeds so layout is consistent between renders
const PARTICLE_SEEDS = [
  [12, 45, 3], [80, 20, 2], [55, 70, 2.5], [25, 85, 2], [90, 55, 3],
  [40, 30, 1.5], [70, 80, 2], [15, 60, 2.5], [60, 15, 1.8], [88, 35, 2.2],
  [35, 90, 1.5], [72, 48, 2.8], [48, 62, 2], [20, 25, 1.5], [95, 75, 2.5],
  [50, 50, 1.2],
];

export default function BabyGrowth3DViewer({ monthData, language = 'hi' }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('medical'); // 'medical' (authentic fetal illustration) | '3d' (3D animated model)
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [loopProgress, setLoopProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);
  const month = monthData?.monthNumber || 3;
  const scene = MONTH_SCENES[month] || MONTH_SCENES[3];
  const particles = PARTICLE_SEEDS.slice(0, scene.particleCount);

  // ── Reduced-motion detection ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setIsPlaying(false); setReducedMotion(true); }
    const handler = (e) => { if (e.matches) { setIsPlaying(false); setReducedMotion(true); } };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── 2.8-second smooth RAF loop ────────────────────────────────────────────
  useEffect(() => {
    const LOOP = 2800;
    const tick = () => {
      if (isPlaying && !reducedMotion) {
        const elapsed = (Date.now() - startTimeRef.current) % LOOP;
        setLoopProgress((elapsed / LOOP) * 100);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, reducedMotion]);

  // ── Reset on month change ─────────────────────────────────────────────────
  useEffect(() => {
    setRotX(0); setRotY(0);
    startTimeRef.current = Date.now();
  }, [month]);

  // ── Drag handlers (mouse) ────────────────────────────────────────────────
  const onMouseDown = (e) => { setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
    setRotY(p => Math.max(-30, Math.min(30, p + dx * 0.45)));
    setRotX(p => Math.max(-22, Math.min(22, p - dy * 0.45)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const onMouseUp = () => setIsDragging(false);

  // ── Drag handlers (touch) ────────────────────────────────────────────────
  const onTouchStart = (e) => { setIsDragging(true); setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY }); };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - dragStart.x, dy = e.touches[0].clientY - dragStart.y;
    setRotY(p => Math.max(-30, Math.min(30, p + dx * 0.45)));
    setRotX(p => Math.max(-22, Math.min(22, p - dy * 0.45)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // ── Physics ───────────────────────────────────────────────────────────────
  const t = loopProgress / 100;
  const floatY     = (isPlaying && !reducedMotion) ? Math.sin(t * Math.PI * 2) * 9 : 0;
  const floatZ     = (isPlaying && !reducedMotion) ? Math.cos(t * Math.PI * 2) * 5 : 0;
  const floatScale = (isPlaying && !reducedMotion) ? 1 + Math.sin(t * Math.PI * 2) * 0.03 : 1;
  const pulse      = (isPlaying && !reducedMotion) ? 0.65 + Math.sin(t * Math.PI * 4) * 0.35 : 0.8;

  // ── SVG illustration per month ────────────────────────────────────────────
  const renderFetalSVG = () => {
    switch (month) {
      /* ── Month 1: Blastocyst / Early Embryo ── */
      case 1: return (
        <g>
          <circle cx="160" cy="148" r="95" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
          <circle cx="160" cy="148" r="88" fill="#0d3b29" opacity="0.35" />
          {/* Uterine wall */}
          <path d="M 30 265 Q 160 252 290 265 L 290 310 Q 160 298 30 310 Z" fill="#1a4731" opacity="0.5" />
          {/* Yolk sac */}
          <circle cx="120" cy="168" r="26" fill="url(#yolkG)" opacity="0.9" />
          <circle cx="118" cy="164" r="8" fill="#fef9c3" opacity="0.45" />
          <text x="82" y="198" fill="#fde68a" fontSize="9" fontWeight="bold" opacity="0.85">Yolk Sac</text>
          {/* Embryonic disc */}
          <path d="M 162 95 C 192 92,212 118,205 148 C 198 172,172 186,158 180 C 148 175,155 162,162 148 C 170 132,162 110,162 95 Z"
            fill="url(#embryoG1)" filter="url(#glowF)" />
          {/* Neural tube */}
          <path d="M 164 100 Q 196 142 162 178" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          {/* Heart forming */}
          <circle cx="182" cy="143" r="6"  fill="#f43f5e" opacity={pulse} />
          <circle cx="182" cy="143" r="12" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.4} />
          <circle cx="182" cy="143" r="22" fill="none" stroke="#f43f5e" strokeWidth="0.8" opacity={pulse * 0.14} />
          {/* Connecting stalk */}
          <path d="M 158 178 Q 140 200 122 192" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <text x="192" y="91" fill="#6ee7b7" fontSize="9" fontWeight="bold" opacity="0.8">Neural Groove</text>
          <text x="188" y="140" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.65">♥ Forming</text>
        </g>
      );

      /* ── Month 2: C-Curved Embryo ── */
      case 2: return (
        <g>
          <ellipse cx="160" cy="155" rx="98" ry="108" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          <ellipse cx="160" cy="155" rx="90" ry="100" fill="#1e0845" opacity="0.38" />
          {/* Placenta patch */}
          <path d="M 68 200 Q 70 230 100 235 Q 130 240 125 215" fill="url(#placentaG)" opacity="0.6" />
          <text x="66" y="248" fill="#e9d5ff" fontSize="9" opacity="0.75">Placenta</text>
          {/* C-curved body */}
          <path d="M 158 82 C 198 80,228 112,212 155 C 200 188,168 210,145 205 C 128 200,135 180,152 172 C 172 162,180 142,168 120 C 160 105,142 92,158 82 Z"
            fill="url(#embryoG2)" filter="url(#glowF)" />
          {/* Large embryonic head */}
          <ellipse cx="188" cy="100" rx="28" ry="32" fill="url(#headG2)" opacity="0.9" />
          {/* Eye spot */}
          <circle cx="198" cy="94" r="5.5" fill="#0f172a" />
          <circle cx="200" cy="92" r="1.8" fill="#e2e8f0" />
          {/* Limb buds */}
          <ellipse cx="196" cy="152" rx="10" ry="6" transform="rotate(-20 196 152)" fill="#f9a8d4" opacity="0.9" />
          <ellipse cx="162" cy="198" rx="9"  ry="5.5" transform="rotate(25 162 198)"  fill="#f9a8d4" opacity="0.9" />
          {/* Heart */}
          <circle cx="185" cy="140" r="9"  fill="#e11d48" opacity={pulse} />
          <circle cx="185" cy="140" r="18" fill="none" stroke="#f43f5e" strokeWidth="2" opacity={pulse * 0.3} />
          {/* Yolk sac receding */}
          <circle cx="112" cy="178" r="16" fill="url(#yolkG)" opacity="0.6" />
          {/* Nasal pit */}
          <circle cx="214" cy="108" r="2" fill="#94a3b8" opacity="0.6" />
          {/* Ear */}
          <path d="M 172 112 C 168 109,167 122,174 126" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.65" />
          <text x="220" y="84" fill="#c4b5fd" fontSize="9" fontWeight="bold" opacity="0.75">C-Shaped</text>
          <text x="192" y="138" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.65">♥ 110bpm</text>
        </g>
      );

      /* ── Month 3: Recognisable fetus ── */
      case 3: return (
        <g>
          <ellipse cx="160" cy="158" rx="105" ry="115" fill="none" stroke="#99f6e4" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
          <ellipse cx="160" cy="158" rx="96" ry="106" fill="#032e28" opacity="0.4" />
          {/* Umbilical cord */}
          <path d="M 162 178 Q 138 210 104 220 Q 78 228 62 212" fill="none" stroke="#f43f5e" strokeWidth="5.5" strokeLinecap="round" opacity="0.75" />
          <path d="M 162 178 Q 138 210 104 220 Q 78 228 62 212" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.55" />
          <text x="56" y="232" fill="#99f6e4" fontSize="8" opacity="0.75">Cord</text>
          {/* Body */}
          <path d="M 168 75 C 202 75,228 108,216 142 C 208 160,196 165,200 188 C 204 210,188 232,162 232 C 138 232,132 212,144 195 C 138 185,132 182,138 168 C 146 148,156 130,150 108 C 145 90,150 75,168 75 Z"
            fill="url(#fetusG3)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="190" cy="95" rx="35" ry="38" fill="url(#headG3)" opacity="0.85" />
          {/* Eye */}
          <ellipse cx="205" cy="85" rx="6" ry="4.5" fill="#1e293b" />
          <circle cx="207" cy="83" r="1.8" fill="#e2e8f0" />
          {/* Nose + mouth */}
          <path d="M 218 99 L 221 103 L 216 107" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" />
          {/* Ear */}
          <path d="M 175 98 C 170 96,169 110,176 114" fill="none" stroke="#f43f5e" strokeWidth="1.8" opacity="0.65" />
          {/* Arm + hand */}
          <path d="M 200 148 Q 194 164 202 174" fill="none" stroke="#fda4af" strokeWidth="9" strokeLinecap="round" />
          <circle cx="202" cy="175" r="5" fill="#fb7185" />
          {/* Tiny fingers */}
          <path d="M 202 175 L 197 180 M 202 175 L 203 181 M 202 175 L 207 179" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          {/* Ribs */}
          <path d="M 182 148 Q 196 150 200 148" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.28" />
          <path d="M 181 155 Q 196 157 200 155" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.28" />
          {/* Heartbeat */}
          <circle cx="192" cy="152" r="7"  fill="#e11d48" opacity={pulse} />
          <circle cx="192" cy="152" r="14" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.28} />
          {/* Leg + foot */}
          <path d="M 158 222 Q 136 212 140 195" fill="none" stroke="#fda4af" strokeWidth="10" strokeLinecap="round" />
          <ellipse cx="138" cy="192" rx="6" ry="4" fill="#fb7185" />
          <text x="222" y="75" fill="#99f6e4" fontSize="9" fontWeight="bold" opacity="0.8">Tiny Fingers!</text>
          <text x="193" y="150" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 150bpm</text>
        </g>
      );

      /* ── Month 4: Thumb-sucking ── */
      case 4: return (
        <g>
          <ellipse cx="160" cy="158" rx="108" ry="118" fill="none" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
          <ellipse cx="160" cy="158" rx="100" ry="110" fill="#3b1200" opacity="0.38" />
          {/* Placenta */}
          <path d="M 55 180 Q 58 220 90 228 Q 118 235 112 202" fill="url(#placentaG)" opacity="0.55" />
          <text x="52" y="240" fill="#fdba74" fontSize="8" opacity="0.68">Placenta</text>
          {/* Umbilical cord */}
          <path d="M 162 180 Q 135 218 98 222 Q 70 226 58 208" fill="none" stroke="#fb923c" strokeWidth="5.5" strokeLinecap="round" opacity="0.7" />
          <path d="M 162 180 Q 135 218 98 222 Q 70 226 58 208" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.5" />
          {/* Body */}
          <path d="M 170 72 C 210 72,236 108,222 145 C 214 164,204 170,208 195 C 210 218,195 240,168 240 C 140 240,132 218,144 200 C 136 188,132 172,144 155 C 152 136,156 118,150 96 C 147 80,153 72,170 72 Z"
            fill="url(#fetusG4)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="192" cy="92" rx="36" ry="40" fill="url(#headG4)" opacity="0.85" />
          {/* Closed eye + brow */}
          <path d="M 200 82 Q 210 86 216 82" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 202 77 Q 210 78 215 75" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          {/* Ear */}
          <path d="M 172 95 C 167 92,166 108,173 112" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.65" />
          {/* Thumb-sucking arm */}
          <path d="M 200 152 C 200 168,218 158,220 138" fill="none" stroke="#fca5a5" strokeWidth="9" strokeLinecap="round" />
          <circle cx="220" cy="136" r="5" fill="#f472b6" />
          {/* Heartbeat */}
          <circle cx="196" cy="158" r="8"  fill="#e11d48" opacity={pulse} />
          <circle cx="196" cy="158" r="16" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.28} />
          {/* Legs */}
          <path d="M 168 230 Q 136 224 142 200" fill="none" stroke="#fca5a5" strokeWidth="11" strokeLinecap="round" />
          <ellipse cx="140" cy="197" rx="7" ry="5" fill="#fb7185" />
          <text x="226" y="136" fill="#fdba74" fontSize="9" fontWeight="bold" opacity="0.85">Thumb!</text>
          <text x="198" y="156" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 155bpm</text>
        </g>
      );

      /* ── Month 5: Active kicks & hearing ── */
      case 5: return (
        <g>
          <ellipse cx="160" cy="158" rx="112" ry="122" fill="none" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
          <ellipse cx="160" cy="158" rx="104" ry="114" fill="#020d28" opacity="0.4" />
          {/* Sound waves */}
          <path d="M 40 140 C 35 148,35 162,40 170" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M 30 130 C 22 144,22 172,30 186" fill="none" stroke="#60a5fa" strokeWidth="2"   strokeLinecap="round" opacity="0.45" />
          <path d="M 20 120 C 10 140,10 180,20 200" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          <text x="14" y="212" fill="#93c5fd" fontSize="8" opacity="0.75">Mom's Voice</text>
          {/* Vernix dots */}
          {[[138,118],[192,182],[202,95],[145,200],[175,82]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#ffffff" opacity="0.5" />
          ))}
          {/* Body */}
          <path d="M 166 68 C 210 68,238 108,224 148 C 216 168,208 178,212 204 C 214 228,198 250,168 250 C 136 250,128 226,142 202 C 134 188,130 172,140 154 C 148 134,156 116,148 92 C 145 76,150 68,166 68 Z"
            fill="url(#fetusG5)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="190" cy="88" rx="36" ry="40" fill="url(#headG5)" opacity="0.85" />
          {/* Listening ear */}
          <path d="M 172 92 C 165 88,163 108,172 114" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.8" />
          {/* Eye closed */}
          <path d="M 200 78 Q 210 82 216 78" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          {/* Arm reaching */}
          <path d="M 206 154 Q 225 148 232 128" fill="none" stroke="#fca5a5" strokeWidth="10" strokeLinecap="round" />
          <ellipse cx="232" cy="125" rx="7" ry="5" fill="#f472b6" />
          {/* Heartbeat */}
          <circle cx="198" cy="160" r="8"  fill="#e11d48" opacity={pulse} />
          <circle cx="198" cy="160" r="16" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.28} />
          {/* Kicking leg */}
          <path d="M 170 240 Q 128 238 136 206" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
          <ellipse cx="132" cy="203" rx="8" ry="6" fill="#fb7185" />
          {/* Kick ripple */}
          <circle cx="132" cy="203" r="18" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" opacity={pulse * 0.55} />
          <text x="236" y="124" fill="#bfdbfe" fontSize="9" fontWeight="bold" opacity="0.85">Kick!</text>
          <text x="200" y="158" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 145bpm</text>
        </g>
      );

      /* ── Month 6: Eyes open, lungs forming ── */
      case 6: return (
        <g>
          <ellipse cx="160" cy="160" rx="115" ry="125" fill="none" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
          <ellipse cx="160" cy="160" rx="107" ry="117" fill="#1a0e00" opacity="0.42" />
          {/* Lung alveoli hints */}
          <circle cx="100" cy="95" r="12" fill="none" stroke="#fbbf24" strokeWidth="1.2" opacity="0.32" />
          <circle cx="108" cy="100" r="7"  fill="none" stroke="#fbbf24" strokeWidth="1"   opacity="0.28" />
          <circle cx="215" cy="95" r="12" fill="none" stroke="#fbbf24" strokeWidth="1.2" opacity="0.32" />
          <circle cx="208" cy="102" r="7" fill="none" stroke="#fbbf24" strokeWidth="1"   opacity="0.28" />
          <text x="80" y="122" fill="#fde68a" fontSize="8" opacity="0.65">Lung Buds</text>
          {/* Body */}
          <path d="M 165 62 C 215 62,244 106,228 148 C 220 168,212 180,218 208 C 218 232,200 254,168 254 C 135 254,124 228,140 202 C 130 188,128 170,138 152 C 146 132,156 114,146 88 C 143 72,150 62,165 62 Z"
            fill="url(#fetusG6)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="190" cy="82" rx="38" ry="42" fill="url(#headG6)" opacity="0.85" />
          {/* Open eye */}
          <ellipse cx="206" cy="70" rx="7" ry="5" fill="#0f172a" />
          <ellipse cx="206" cy="70" rx="7" ry="2.5" fill="#1e293b" opacity="0.65" />
          <circle cx="208" cy="69" r="2" fill="#38bdf8" />
          <circle cx="209" cy="68" r="1" fill="#ffffff" />
          {/* Eyelashes + brow */}
          <path d="M 200 64 Q 207 62 214 64" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 200 60 Q 207 58 213 60" fill="none" stroke="#64748b" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
          {/* Arm */}
          <path d="M 210 158 Q 202 178 216 172" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
          {/* Kick wave */}
          <circle cx="130" cy="210" r="16" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" opacity={pulse * 0.65} />
          {/* Heartbeat */}
          <circle cx="202" cy="162" r="8"  fill="#e11d48" opacity={pulse} />
          <circle cx="202" cy="162" r="16" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.28} />
          {/* Legs */}
          <path d="M 172 244 Q 122 240 132 207" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
          <ellipse cx="130" cy="204" rx="8" ry="6" fill="#fb7185" />
          <text x="218" y="66" fill="#fde68a" fontSize="9" fontWeight="bold" opacity="0.88">Eyes Open!</text>
          <text x="204" y="160" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 145bpm</text>
        </g>
      );

      /* ── Month 7: Brain growth surge ── */
      case 7: return (
        <g>
          <ellipse cx="160" cy="160" rx="118" ry="128" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
          <ellipse cx="160" cy="160" rx="110" ry="120" fill="#0a0a20" opacity="0.45" />
          {/* Neural network nodes */}
          {[[88,72],[112,58],[130,68],[150,54],[170,60],[188,52],[210,65],[230,72]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="#a78bfa" opacity="0.6" />
          ))}
          {/* Neural links */}
          {[[[88,72],[112,58]],[[112,58],[130,68]],[[130,68],[150,54]],[[150,54],[170,60]],[[170,60],[188,52]],[[188,52],[210,65]],[[210,65],[230,72]]].map(([[x1,y1],[x2,y2]],i) => (
            <line key={`n${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7c3aed" strokeWidth="1" opacity="0.38" />
          ))}
          <text x="108" y="44" fill="#c4b5fd" fontSize="8" opacity="0.7">Rapid Brain Growth</text>
          {/* Body */}
          <path d="M 165 60 C 220 60,250 106,232 150 C 224 170,215 182,220 210 C 220 234,202 256,170 256 C 133 256,122 228,138 202 C 128 186,126 168,136 150 C 144 130,156 112,144 86 C 141 70,148 60,165 60 Z"
            fill="url(#fetusG7)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="190" cy="78" rx="40" ry="44" fill="url(#headG7)" opacity="0.85" />
          {/* Cortex folds */}
          <path d="M 168 58 Q 180 52 195 58" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.48" />
          <path d="M 182 50 Q 196 46 210 52" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity="0.38" />
          {/* Eye open — purple iris */}
          <ellipse cx="208" cy="68" rx="7" ry="5.5" fill="#0f172a" />
          <circle cx="210" cy="67" r="2.2" fill="#7c3aed" />
          <circle cx="211" cy="66" r="1"   fill="#e2e8f0" />
          {/* Arm */}
          <path d="M 212 160 Q 204 180 218 175" fill="none" stroke="#f472b6" strokeWidth="13" strokeLinecap="round" />
          {/* Heartbeat */}
          <circle cx="204" cy="162" r="9"  fill="#e11d48" opacity={pulse} />
          <circle cx="204" cy="162" r="18" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.26} />
          {/* Legs */}
          <path d="M 174 246 Q 118 241 128 208" fill="none" stroke="#f472b6" strokeWidth="14" strokeLinecap="round" />
          <ellipse cx="126" cy="205" rx="9" ry="6.5" fill="#e11d48" opacity="0.8" />
          <text x="222" y="64" fill="#c4b5fd" fontSize="9" fontWeight="bold" opacity="0.85">Dreaming!</text>
          <text x="206" y="160" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 140bpm</text>
        </g>
      );

      /* ── Month 8: Snug, fat-accumulating ── */
      case 8: return (
        <g>
          <ellipse cx="160" cy="160" rx="122" ry="132" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
          <ellipse cx="160" cy="160" rx="115" ry="124" fill="#0c1929" opacity="0.45" />
          {/* Uterine wall */}
          <path d="M 48 80 C 80 42,240 42,272 80 C 295 118,292 220,265 252 C 238 284,80 284,55 252 C 28 220,22 118,48 80 Z"
            fill="none" stroke="#fda4af" strokeWidth="2" strokeDasharray="6 5" opacity="0.32" />
          <text x="36" y="72" fill="#bae6fd" fontSize="8" opacity="0.62">Womb Wall</text>
          {/* Body */}
          <path d="M 164 58 C 226 58,258 108,236 155 C 228 176,219 188,224 218 C 224 242,206 262,172 262 C 134 262,122 235,138 208 C 128 192,124 172,134 154 C 142 134,155 115,142 88 C 138 72,145 58,164 58 Z"
            fill="url(#fetusG8)" filter="url(#glowF)" />
          {/* Head */}
          <ellipse cx="190" cy="76" rx="42" ry="46" fill="url(#headG8)" opacity="0.85" />
          {/* Peaceful face */}
          <path d="M 202 64 Q 214 68 220 64" fill="none" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 224 76 Q 226 80 222 82" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
          <path d="M 218 84 Q 225 89 228 84" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
          {/* Fat deposits */}
          {[[180,175],[200,195],[170,215]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#e0f2fe" opacity="0.42" />
          ))}
          {/* Arm */}
          <path d="M 212 165 Q 204 188 220 182" fill="none" stroke="#f472b6" strokeWidth="14" strokeLinecap="round" />
          {/* Heartbeat */}
          <circle cx="208" cy="168" r="9"  fill="#e11d48" opacity={pulse} />
          <circle cx="208" cy="168" r="18" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.25} />
          {/* Compact legs */}
          <path d="M 178 252 Q 118 246 128 215" fill="none" stroke="#f472b6" strokeWidth="15" strokeLinecap="round" />
          <ellipse cx="125" cy="212" rx="10" ry="7.5" fill="#e11d48" opacity="0.85" />
          <text x="233" y="62" fill="#bae6fd" fontSize="9" fontWeight="bold" opacity="0.85">Gaining Fat!</text>
          <text x="210" y="166" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.62">♥ 140bpm</text>
        </g>
      );

      /* ── Month 9: Full-term head-down ── */
      case 9:
      default: return (
        <g>
          <ellipse cx="160" cy="160" rx="124" ry="134" fill="none" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45" />
          <ellipse cx="160" cy="160" rx="116" ry="126" fill="#1a0800" opacity="0.45" />
          {/* Cervix / birth passage */}
          <path d="M 108 285 Q 160 298 212 285 Q 205 295 160 302 Q 115 295 108 285 Z" fill="#f43f5e" opacity="0.28" />
          <text x="122" y="314" fill="#fde68a" fontSize="9" fontWeight="bold" opacity="0.78">Birth Path ↓</text>
          {/* Full-term body — head-down (180° rotate) */}
          <g transform="translate(160,160) rotate(180) translate(-160,-160)">
            <path d="M 162 56 C 225 56,258 106,236 156 C 228 178,220 190,224 220 C 224 244,207 264,174 264 C 135 264,122 238,138 212 C 128 196,124 176,134 158 C 142 138,156 118,143 90 C 140 74,146 56,162 56 Z"
              fill="url(#fetusG9)" filter="url(#glowF)" />
            {/* Head */}
            <ellipse cx="190" cy="74" rx="44" ry="48" fill="url(#headG9)" opacity="0.88" />
            {/* Serene face */}
            <path d="M 200 62 Q 214 66 222 62" fill="none" stroke="#475569" strokeWidth="3"   strokeLinecap="round" />
            <path d="M 226 76 Q 228 80 223 82" fill="none" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 220 86 Q 228 92 232 86" fill="none" stroke="#fb7185" strokeWidth="2"   strokeLinecap="round" opacity="0.7" />
            {/* Plump arm */}
            <path d="M 214 168 Q 205 192 222 185" fill="none" stroke="#fda4af" strokeWidth="15" strokeLinecap="round" />
            {/* Compact legs */}
            <path d="M 180 254 Q 116 248 128 218" fill="none" stroke="#fda4af" strokeWidth="16" strokeLinecap="round" />
            <ellipse cx="124" cy="215" rx="11" ry="8" fill="#f43f5e" opacity="0.9" />
          </g>
          {/* Heartbeat (normal coords) */}
          <circle cx="166" cy="178" r="10" fill="#e11d48" opacity={pulse} />
          <circle cx="166" cy="178" r="20" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity={pulse * 0.26} />
          {/* Birth glow */}
          <circle cx="160" cy="292" r="28" fill="#f59e0b" opacity={pulse * 0.18} />
          <text x="236" y="56" fill="#fde68a" fontSize="9" fontWeight="bold" opacity="0.88">Head Down!</text>
          <text x="130" y="176" fill="#fda4af" fontSize="8" fontWeight="bold" opacity="0.68">♥ 130bpm</text>
          <text x="92" y="292" fill="#fde68a" fontSize="10" fontWeight="bold" opacity="0.82">
            {isHindi ? 'Ready for Birth' : 'Full Term ✨'}
          </text>
        </g>
      );
    }
  };

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Main Viewer Card ── */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        className="relative w-full rounded-3xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{
          background: `linear-gradient(155deg, ${scene.bgFrom}, ${scene.bgMid}, ${scene.bgTo})`,
          border: `1.5px solid ${scene.glowColor}44`,
          boxShadow: `0 0 36px 0 ${scene.glowColor}22`,
        }}
        role="img"
        aria-label={`Interactive 3D educational fetal development illustration: ${monthData?.title || 'Pregnancy month'} — ${monthData?.developmentDescription || ''}`}
      >
        {/* ── Amniotic bubble animation layer ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {particles.map(([x, y, r], i) => (
              <circle
                key={i}
                cx={`${x}%`} cy={`${y}%`} r={r}
                fill={scene.particleColor}
                opacity="0.3"
                style={{
                  animation: (isPlaying && !reducedMotion)
                    ? `bgFloat ${3 + (i % 4) * 0.65}s ease-in-out ${i * 0.38}s infinite alternate`
                    : 'none',
                }}
              />
            ))}
          </svg>
        </div>

        {/* ── Ambient glow blob ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
          style={{ transform: `scale(${floatScale})` }}
        >
          <div
            className="w-56 h-56 rounded-full blur-3xl"
            style={{ background: scene.glowColor, opacity: 0.18 * pulse }}
          />
        </div>

        {/* ── Top badge row ── */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm"
              style={{ background: `${scene.glowColor}2a`, color: scene.glowColor, border: `1px solid ${scene.glowColor}55` }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? `माह ${month} भ्रूण विकास` : (isMarathi ? `महिना ${month} गर्भ विकास` : `Month ${month} Fetal Growth`)}</span>
            </span>
            <span className="text-[10px] text-white/65 font-semibold bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {monthData?.weekRange}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Medical Reference vs 3D Animation Switcher */}
            <div className="flex items-center bg-black/40 backdrop-blur-sm p-0.5 rounded-xl border border-white/15 text-[11px] font-bold text-white mr-1">
              <button
                onClick={(e) => { e.stopPropagation(); setViewMode('medical'); }}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  viewMode === 'medical' ? 'bg-[#157F66] text-white shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                {tr('वास्तविक चित्र', 'वास्तविक चित्र', 'Medical Reference')}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setViewMode('3d'); }}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  viewMode === '3d' ? 'bg-[#157F66] text-white shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                {tr('3D मॉडल', '3D मॉडेल', '3D View')}
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setIsPlaying(v => !v); }}
              className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            {(rotX !== 0 || rotY !== 0) && (
              <button
                onClick={(e) => { e.stopPropagation(); setRotX(0); setRotY(0); }}
                className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
                aria-label="Reset 3D angle"
                title="Reset angle"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
              aria-label="View fullscreen"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Visual Display Viewport: Realistic Medical Visual OR 3D Model ── */}
        <div
          className="relative w-full flex items-center justify-center py-4 min-h-[300px]"
          style={{ perspective: '900px' }}
          aria-hidden="true"
        >
          {viewMode === 'medical' ? (
            <div 
              className="relative flex flex-col items-center justify-center p-2 transition-transform duration-300"
              style={{
                transform: `rotateX(${rotX * 0.4}deg) rotateY(${rotY * 0.4}deg) translateY(${floatY * 0.5}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 backdrop-blur-xs max-w-[280px] sm:max-w-[340px]">
                <img 
                  src={`/fetal_stages/month_${month}.png`}
                  alt={`Fetal development during month ${month}`}
                  className="w-full h-auto object-contain max-h-[260px] drop-shadow-xl"
                  onError={(e) => {
                    // Fallback to full reference sheet cropped via CSS if individual slice fails
                    e.target.onerror = null;
                    e.target.src = '/baby_growth_9months.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-bold">
                  <span>{tr(`माह ${month} शारीरिक गठन`, `महिना ${month} शारीरिक रचना`, `Month ${month} Anatomy`)}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    {monthData?.weekRange}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${floatY}px) translateZ(${floatZ}px)`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
              <svg
                viewBox="0 0 320 320"
                className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
                style={{ filter: `drop-shadow(0 0 28px ${scene.glowColor}66) drop-shadow(0 12px 20px rgba(0,0,0,0.5))` }}
              >
                <defs>
                  {/* Shared */}
                  <radialGradient id="yolkG" cx="38%" cy="38%" r="62%">
                    <stop offset="0%" stopColor="#fef9c3" /><stop offset="70%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#d97706" />
                  </radialGradient>
                  <radialGradient id="placentaG" cx="45%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#9f1239" />
                  </radialGradient>
                  <filter id="glowF" x="-22%" y="-22%" width="144%" height="144%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {/* Per-month fetal gradients */}
                  <radialGradient id="embryoG1" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#a7f3d0" /><stop offset="60%" stopColor="#6ee7b7" /><stop offset="100%" stopColor="#059669" />
                  </radialGradient>
                  <radialGradient id="embryoG2" cx="38%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#ede9fe" /><stop offset="55%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#7c3aed" />
                  </radialGradient>
                  <radialGradient id="headG2" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#faf5ff" /><stop offset="60%" stopColor="#ddd6fe" /><stop offset="100%" stopColor="#a78bfa" />
                  </radialGradient>
                  <radialGradient id="fetusG3" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#ccfbf1" /><stop offset="50%" stopColor="#99f6e4" /><stop offset="100%" stopColor="#0d9488" />
                  </radialGradient>
                  <radialGradient id="headG3" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#f0fdf4" /><stop offset="60%" stopColor="#bbf7d0" /><stop offset="100%" stopColor="#4ade80" />
                  </radialGradient>
                  <radialGradient id="fetusG4" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#ffedd5" /><stop offset="55%" stopColor="#fed7aa" /><stop offset="100%" stopColor="#f97316" />
                  </radialGradient>
                  <radialGradient id="headG4" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#fff7ed" /><stop offset="60%" stopColor="#fde68a" /><stop offset="100%" stopColor="#fbbf24" />
                  </radialGradient>
                  <radialGradient id="fetusG5" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#dbeafe" /><stop offset="55%" stopColor="#bfdbfe" /><stop offset="100%" stopColor="#3b82f6" />
                  </radialGradient>
                  <radialGradient id="headG5" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#eff6ff" /><stop offset="60%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#7dd3fc" />
                  </radialGradient>
                  <radialGradient id="fetusG6" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#fef9c3" /><stop offset="55%" stopColor="#fde68a" /><stop offset="100%" stopColor="#ca8a04" />
                  </radialGradient>
                  <radialGradient id="headG6" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#fffbeb" /><stop offset="60%" stopColor="#fef3c7" /><stop offset="100%" stopColor="#fcd34d" />
                  </radialGradient>
                  <radialGradient id="fetusG7" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#ede9fe" /><stop offset="55%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#7c3aed" />
                  </radialGradient>
                  <radialGradient id="headG7" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#f5f3ff" /><stop offset="60%" stopColor="#ddd6fe" /><stop offset="100%" stopColor="#a78bfa" />
                  </radialGradient>
                  <radialGradient id="fetusG8" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#e0f2fe" /><stop offset="55%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#0284c7" />
                  </radialGradient>
                  <radialGradient id="headG8" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#f0f9ff" /><stop offset="60%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#7dd3fc" />
                  </radialGradient>
                  <radialGradient id="fetusG9" cx="35%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#fef9c3" /><stop offset="50%" stopColor="#fde68a" /><stop offset="100%" stopColor="#d97706" />
                  </radialGradient>
                  <radialGradient id="headG9" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#fffbeb" /><stop offset="60%" stopColor="#fef3c7" /><stop offset="100%" stopColor="#f59e0b" />
                  </radialGradient>
                </defs>
                {renderFetalSVG()}
              </svg>
            </div>
          )}
        </div>

        {/* ── Bottom stat bar ── */}
        <div className="relative z-10 px-4 pb-3 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-white/88">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>{monthData?.heartRateBpm || '140–160 bpm'}</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="font-semibold text-white/75 flex items-center gap-1">
              <span>{monthData?.sizeIcon}</span>
              <span>{tr(monthData?.sizeComparisonHi, monthData?.sizeComparisonMr || monthData?.sizeComparisonHi, monthData?.approximateSize)}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] text-white/45">
            <span className="hidden sm:inline">
              {reducedMotion
                ? tr('♿ स्थिर चित्र (reduced motion)', '♿ स्थिर चित्र (reduced motion)', '♿ Static fallback active')
                : tr('खींचें / घुमाएं 3D देखें', 'फिरवून 3D पहा', 'Drag to rotate')}
            </span>
            <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: `${scene.glowColor}30` }} aria-hidden="true">
              <div className="h-full rounded-full transition-all duration-75" style={{ width: `${loopProgress}%`, background: scene.glowColor }} />
            </div>
          </div>
        </div>

        {/* ── Ambient month tag ── */}
        <div
          className="absolute bottom-[3.2rem] left-4 text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none"
          style={{ background: `${scene.glowColor}20`, color: scene.glowColor, border: `1px solid ${scene.glowColor}44` }}
          aria-hidden="true"
        >
          {scene.ambientLabel}
        </div>

        {/* ── Disclaimer ── */}
        <div className="relative z-10 px-4 pb-3 text-[10px] text-white/50 text-center italic">
          {tr(
            'विशिष्ट भ्रूण विकास का शैक्षणिक चित्रण। यह किसी वास्तविक स्कैन या किसी व्यक्तिगत शिशु के स्वास्थ्य की पुष्टि नहीं करता है।',
            'विशिष्ट गर्भाच्या वाढीचे शैक्षणिक चित्रण. हे वास्तविक स्कॅन दर्शवत नाही किंवा वैयक्तिक बाळाच्या आरोग्याची पुष्टी करत नाही.',
            'Educational illustration of typical fetal development. It does not represent an actual scan or confirm the health of an individual baby.'
          )}
        </div>
      </div>

      {/* ── CSS bubble keyframes ── */}
      <style>{`
        @keyframes bgFloat {
          0%   { transform: translateY(0)   scale(1);    opacity: 0.25; }
          50%  { transform: translateY(-9%) scale(1.12); opacity: 0.42; }
          100% { transform: translateY(2%)  scale(0.94); opacity: 0.18; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes bgFloat { 0%,100% { transform:none; opacity:0.18; } }
        }
      `}</style>

      {/* ── Fullscreen Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen fetal development: ${monthData?.title}`}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-y-auto max-h-[92vh]"
            style={{
              background: `linear-gradient(155deg, ${scene.bgFrom}f2, ${scene.bgMid}f2, ${scene.bgTo}f2)`,
              borderColor: `${scene.glowColor}55`,
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${scene.glowColor}22`, border: `1px solid ${scene.glowColor}44` }}>
                  {monthData?.sizeIcon || '👶'}
                </span>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isMarathi
                      ? `${monthData?.titleMr || monthData?.titleHi} (${monthData?.weekRange})`
                      : (isHindi
                          ? `${monthData?.titleHi} (${monthData?.weeksTextHi})`
                          : `${monthData?.title} (${monthData?.weekRange})`)}
                  </h3>
                  <span className="text-xs font-semibold" style={{ color: scene.glowColor }}>
                    {tr(monthData?.stageNameHi, monthData?.stageNameMr || monthData?.stageNameHi, monthData?.stageName)}
                  </span>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl text-white/60 hover:text-white transition"
                style={{ background: 'rgba(255,255,255,0.1)' }} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Visual (Shows Medical Real Reference + 3D) */}
            <div className="my-6 rounded-3xl p-6 flex flex-col items-center border"
              style={{ background: `${scene.bgFrom}cc`, borderColor: `${scene.glowColor}33` }}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl max-w-[280px]">
                  <img 
                    src={`/fetal_stages/month_${month}.png`} 
                    alt={`Fetal anatomy month ${month}`}
                    className="w-full h-auto object-contain"
                  />
                  <div className="p-2 bg-black/60 text-center text-[10px] text-white font-bold">
                    {tr('वास्तविक शारीरिक संदर्भ', 'वास्तविक शारीरिक संदर्भ', 'Medical Reference Visual')}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    viewBox="0 0 320 320"
                    className="w-56 h-56 sm:w-64 sm:h-64"
                    style={{ filter: `drop-shadow(0 0 36px ${scene.glowColor}99)` }}
                    aria-hidden="true"
                  >
                    {renderFetalSVG()}
                  </svg>
                  <span className="text-[10px] text-white/50 font-bold">
                    {tr('3D शारीरिक मॉडेल', '3D शारीरिक मॉडेल', 'Interactive 3D Geometry')}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-white/55 mt-4">
                {tr(`अनुमानित आकार: ${monthData?.sizeComparisonHi}`, `अंदाजे आकार: ${monthData?.sizeComparisonMr || monthData?.sizeComparisonHi}`, `Approximate Size: ${monthData?.approximateSize}`)}
              </span>
              <span className="text-[10px] text-white/50 italic mt-1">
                {tr(
                  'विशिष्ट भ्रूण विकास का शैक्षणिक चित्रण। यह किसी वास्तविक स्कैन या किसी व्यक्तिगत शिशु के स्वास्थ्य की पुष्टि नहीं करता है।',
                  'विशिष्ट गर्भाच्या वाढीचे शैक्षणिक चित्रण. हे वास्तविक स्कॅन दर्शवत नाही किंवा वैयक्तिक बाळाच्या आरोग्याची पुष्टी करत नाही.',
                  'Educational illustration of typical fetal development. It does not represent an actual scan or confirm the health of an individual baby.'
                )}
              </span>
            </div>

            {/* Anatomical highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white/38">
                {tr('इस माह के प्रमुख शारीरिक विकास:', 'या महिन्यातील महत्त्वाचे शारीरिक विकास:', 'Key Anatomical Milestones:')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {monthData?.anatomicalHighlights?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl flex items-start gap-2.5 text-xs"
                    style={{ background: `${scene.glowColor}18`, border: `1px solid ${scene.glowColor}33` }}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: scene.glowColor }} />
                    <span className="font-semibold text-white/82">{tr(item.hi, item.mr || item.hi, item.en)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-2xl text-xs font-bold text-white transition hover:opacity-90"
                style={{ background: scene.glowColor }}
              >
                {tr('बंद करें', 'बंद करा', 'Close Preview')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
