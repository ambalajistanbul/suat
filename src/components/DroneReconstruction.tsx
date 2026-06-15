/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Layers, Compass, Play, MapPin, Sparkles, Activity, RotateCw, Sun as SunIcon, Video, Check, Info, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface DroneReconstructionProps {
  lang: Language;
}

export default function DroneReconstruction({ lang }: DroneReconstructionProps) {
  const [activeTab, setActiveTab] = useState<'drone' | 'lidar' | 'reflectivity'>('drone');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  
  // Custom Video Integration State (Initialized with user's specific drone flight URL)
  const [videoInput, setVideoInput] = useState<string>('https://youtu.be/B8AlofIscqQ');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>('https://www.youtube.com/embed/B8AlofIscqQ?autoplay=1&mute=1&loop=1&playlist=B8AlofIscqQ&controls=1&showinfo=0&rel=0&iv_load_policy=3');
  const [videoType, setVideoType] = useState<'simulated' | 'youtube' | 'vimeo' | 'mp4'>('youtube');

  // LiDAR Interactive 3D Rotation State
  const [rotateX, setRotateX] = useState<number>(25);
  const [rotateY, setRotateY] = useState<number>(-20);
  const [scale, setScale] = useState<number>(1);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  // Solar Emissivity Model State
  const [solarHour, setSolarHour] = useState<number>(12); // Slider from 6:00 to 20:00
  const [isAnimatingSun, setIsAnimatingSun] = useState<boolean>(false);
  const solarTimerRef = useRef<NodeJS.Timeout | null>(null);

  const t = TRANSLATIONS[lang];
  const approvedLabel = lang === 'tr' ? 'Onaylı' : lang === 'ro' ? 'Aprobat' : lang === 'ru' ? 'Одобрено' : 'Approved';
  const pvDesc = lang === 'tr' ? '41.664 Monokristal Panel Modülü' : lang === 'ro' ? '41.664 module fotovoltaice monocristaline' : lang === 'ru' ? '41 664 монокристаллических модуля' : '41,664 Monocrystalline Modules';
  const subDesc = lang === 'tr' ? '220kV Focșani Vest fider bağlantısı' : lang === 'ro' ? 'Conexiune de 220kV în stația Focșani Vest' : lang === 'ru' ? 'Ячейка подключения 220 кВ ПС Фокшаны Вест' : 'Focșani Vest connection bay @ 220kV';

  // Coordinates of our BESS points
  const points = [
    { label: "BESS Site 1 (Cârligele 1)", x: "32%", y: "45%", desc: `150 MW / 300 MWh · ${approvedLabel}` },
    { label: "BESS Site 2 (Cârligele 2)", x: "48%", y: "55%", desc: `150 MW / 300 MWh · ${approvedLabel}` },
    { label: "PV Array (25 MW Solar)", x: "38%", y: "74%", desc: pvDesc },
    { label: "Substation Ext.", x: "85%", y: "15%", desc: subDesc }
  ];

  // Laser Scan Survey Trigger
  const triggerLaserScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2500);
  };

  // Video URL parser
  const handleLoadCustomVideo = () => {
    if (!videoInput.trim()) {
      setActiveVideoUrl('');
      setVideoType('simulated');
      return;
    }

    const url = videoInput.trim();
    
    // Check YouTube links
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      setVideoType('youtube');
      setActiveVideoUrl(`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0&rel=0&iv_load_policy=3`);
      setIsPlaying(true);
      return;
    }

    // Check Vimeo links
    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      setVideoType('vimeo');
      setActiveVideoUrl(`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`);
      setIsPlaying(true);
      return;
    }

    // Check MP4 / standard html5 video links
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('.mp4?') || url.includes('.webm?')) {
      setVideoType('mp4');
      setActiveVideoUrl(url);
      setIsPlaying(true);
      return;
    }

    // Fallback if not matching but looks like a link
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Treat as standard iframe if no direct matching
      setVideoType('youtube');
      setActiveVideoUrl(url);
      setIsPlaying(true);
    } else {
      alert(lang === 'tr' ? 'Lütfen geçerli bir YouTube, Vimeo veya direct MP4 video linki girin.' : 'Please enter a valid YouTube, Vimeo, or direct MP4 video link.');
    }
  };

  // Clear video integration
  const handleResetVideo = () => {
    setVideoInput('');
    setActiveVideoUrl('');
    setVideoType('simulated');
    setIsPlaying(false);
  };

  // Solar Animation Cycle toggle
  const toggleSunAnimation = () => {
    if (isAnimatingSun) {
      if (solarTimerRef.current) clearInterval(solarTimerRef.current);
      setIsAnimatingSun(false);
    } else {
      setIsAnimatingSun(true);
      solarTimerRef.current = setInterval(() => {
        setSolarHour((prev) => {
          if (prev >= 20) return 6;
          return parseFloat((prev + 0.2).toFixed(1));
        });
      }, 100);
    }
  };

  // Calculations for solar emissivity
  const fraction = (solarHour - 6) / 14; // 0 at 6:00, 1 at 20:00
  const angleRad = Math.PI * fraction; // 0 to PI
  const sinAngle = Math.sin(angleRad); // 0 to 1 to 0
  const solarIrradiance = Math.max(0, Math.round(1020 * sinAngle)); // W/m2
  const solarYieldMW = Math.max(0, parseFloat((25 * sinAngle).toFixed(1))); // MW peak out of 25 MW
  const isCharging = solarHour >= 7 && solarHour <= 17; // charging time
  const isDischarging = solarHour < 7 || solarHour > 17;

  return (
    <div className="glass rounded-3xl overflow-hidden shadow-xl" id="overview">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-brand-gold font-mono font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {t.mediaPortalSub}
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight font-sans text-slate-900">{t.droneVideoTitle}</h3>
          <p className="text-slate-650 text-sm max-w-xl mt-1 font-medium">{t.droneVideoSubtitle}</p>
        </div>

        {/* View Selection Controls */}
        <div className="flex overflow-x-auto max-w-full scrollbar-none bg-slate-100 border border-slate-200/80 p-1.5 rounded-2xl self-start md:self-auto shrink-0 font-mono text-xs gap-1">
          <button
            onClick={() => setActiveTab('drone')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'drone' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {t.droneViewTab}
          </button>
          <button
            onClick={() => setActiveTab('lidar')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'lidar' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {t.lidarTab}
          </button>
          <button
            onClick={() => setActiveTab('reflectivity')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'reflectivity' ? 'bg-brand-blue text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t.reflectivityTab}
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
        
        {/* VIEW 1: Drone Aerial Render with Embedded Video Player support */}
        {activeTab === 'drone' && (
          <div className="absolute inset-0 w-full h-full bg-slate-950">
            {videoType === 'simulated' ? (
              // SIMULATED HUD BACKGROUND
              <div className="absolute inset-0">
                {/* Elegant abstract topography canvas vector */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                
                {/* Simulated Aerial Landscape Map */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" fill="none">
                  {/* DJ205C Road path */}
                  <motion.path 
                    d="M 50,450 Q 250,420 400,280 T 800,100" 
                    stroke="#475569" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    className="opacity-50"
                  />
                  <path d="M 50,450 Q 250,420 400,280 T 800,100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" className="opacity-80" />
                  
                  {/* Land 15ha boundary in light green */}
                  <polygon points="250,220 380,210 440,320 280,340" fill="#15803d" fillOpacity="0.15" stroke="#16a34a" strokeWidth="2" />
                  {/* Land 16ha boundary in orange-green */}
                  <polygon points="400,200 540,190 590,300 430,314" fill="#0369a1" fillOpacity="0.15" stroke="#0284c7" strokeWidth="2" />
                  
                  {/* Focșani Vest Connection Path */}
                  <path d="M 400,280 L 850,150" stroke="#d99b19" strokeWidth="2" strokeDasharray="8,6" className="opacity-70 animate-pulse" />
                </svg>

                {/* Simulated movement indicator to add activity */}
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      className="text-center font-mono text-xs text-brand-gold bg-slate-950/90 border border-brand-gold/30 px-6 py-3 rounded-full shadow-lg"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🛸 {lang === 'tr' ? 'DRONE HAVADAN TARAMA AKTİF' : 'DRONE AERIAL FLYOVER SURVEILLANCE RUNNING'}
                    </motion.div>
                  </div>
                )}
              </div>
            ) : (
              // REAL INTEGRATED EMBEDDED PLAYER
              <div className="absolute inset-0 w-full h-full">
                {videoType === 'mp4' ? (
                  <video 
                    src={activeVideoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <iframe 
                    src={activeVideoUrl}
                    className="w-full h-full pointer-events-auto"
                    title="Drone flight video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            )}

            {/* Video overlay graphic mimicking drone HUD */}
            <div className="absolute inset-4 pointer-events-none border border-slate-500/20 rounded-xl flex flex-col justify-between p-4 z-20">
              <div className="flex justify-between items-start text-emerald-400 font-mono text-xs">
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/30 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  REC [HD 60FPS]
                </div>
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/30 text-right">
                  GPS: 45°40'50''N · 27°07'59''E
                </div>
              </div>
              
              {/* Drone center indicator crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-brand-gold/40">
                <div className="w-12 h-12 border border-brand-gold/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-gold/50 rounded-full" />
                </div>
              </div>

              <div className="flex justify-between items-end text-slate-400 font-mono text-[10px]">
                <div className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800/30">ALT: 218 m · HDG: 142° SE</div>
                <div className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800/30">EXPOSURE: AUT · ISO 100</div>
              </div>
            </div>

            {/* Play Button Overlay (when not playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-auto">
                <motion.button 
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-brand-gold hover:bg-brand-gold/90 text-brand-midnight flex items-center justify-center shadow-lg shadow-brand-gold/20 cursor-pointer transition-colors"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </motion.button>
                <h4 className="mt-4 font-bold text-lg text-white">
                  {videoType === 'simulated' ? t.playDroneTitle : (lang === 'tr' ? 'VİDEO OYNATMAYI BAŞLAT' : 'START DRONE VIDEO FEED')}
                </h4>
                <p className="text-slate-400 text-xs max-w-sm mt-1">
                  {videoType === 'simulated' ? t.playDroneDesc : (lang === 'tr' ? 'Canlı dron görüntüsünü telemetri HUD verileriyle başlatmak için tıklayın.' : 'Click to start the live drone overlay feed with active telemetry HUD HUD.')}
                </p>
              </div>
            )}

            {/* Playback Controls and Status Strip */}
            {isPlaying && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xl pointer-events-auto z-30 font-mono text-xs text-slate-300">
                <button onClick={() => setIsPlaying(false)} className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-150 cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {t.pauseSimulation}
                </button>
                
                <div className="flex-1 mx-6 hidden sm:block">
                  <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-wide">
                    {videoType === 'simulated' ? 'SIMULATION SYSTEM PATH: DJ205C ACCESS FEED' : 'EMBEDDED VIDEO INTERFACE ACTIVE'}
                  </span>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-gold"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: videoType === 'simulated' ? 15 : 45, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">SOURCE TYPE</span>
                  <span className="text-[11px] font-bold text-brand-gold uppercase">{videoType} MODE</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: LiDAR 3D Topographic Interactive Heightmap model */}
        {activeTab === 'lidar' && (
          <div className="absolute inset-0 w-full h-full bg-[#070b19] flex flex-col md:flex-row p-6 select-none justify-between overflow-hidden">
            
            {/* Interactive Height controls on left panel */}
            <div className="w-full md:w-56 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 font-mono text-xs z-10 self-start">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" /> LiDAR controls
              </span>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Rotate X</span>
                  <span className="text-white font-bold">{rotateX}°</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="65" 
                  value={rotateX} 
                  onChange={(e) => setRotateX(parseInt(e.target.value))}
                  className="w-full accent-brand-gold bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Rotate Z Angle</span>
                  <span className="text-white font-bold">{rotateY}°</span>
                </div>
                <input 
                  type="range" 
                  min="-90" 
                  max="90" 
                  value={rotateY} 
                  onChange={(e) => setRotateY(parseInt(e.target.value))}
                  className="w-full accent-brand-gold bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Model Scale</span>
                  <span className="text-white font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.7" 
                  max="1.5" 
                  step="0.1"
                  value={scale} 
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-brand-gold bg-slate-800"
                />
              </div>

              <button 
                onClick={triggerLaserScan}
                disabled={isScanning}
                className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/50 text-white font-bold rounded-lg cursor-pointer transition-colors text-center text-[11px] flex items-center justify-center gap-1.5 shadow-md"
              >
                <Activity className={`w-3.5 h-3.5 ${isScanning ? 'animate-bounce' : ''}`} />
                {isScanning ? (lang === 'tr' ? 'TARANIYOR...' : 'SCANNING...') : (lang === 'tr' ? 'LİDAR TARAMASI YAP' : 'TRIGGER LASER SURVEY')}
              </button>

              <button 
                onClick={() => { setRotateX(25); setRotateY(-20); setScale(1); }}
                className="w-full py-1 text-slate-400 hover:text-white transition-all text-[10px] flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3" /> Resets
              </button>
            </div>

            {/* Interactive pointcloud canvas rendered in SVG with isometric transforms */}
            <div className="flex-1 h-full min-h-[250px] relative flex items-center justify-center overflow-visible">
              
              {/* Actual interactive SVG that rotates with state controls */}
              <div 
                className="w-full max-w-lg h-full max-h-[400px] transition-transform duration-100 flex items-center justify-center cursor-move"
                style={{ 
                  transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 400" fill="none">
                  {/* Grid base */}
                  <g stroke="#1b294a" strokeWidth="1" strokeDasharray="5,5">
                    <line x1="50" y1="300" x2="550" y2="300" />
                    <line x1="50" y1="100" x2="550" y2="100" />
                    <line x1="50" y1="100" x2="50" y2="300" />
                    <line x1="550" y1="100" x2="550" y2="300" />
                    <line x1="175" y1="100" x2="175" y2="300" />
                    <line x1="300" y1="100" x2="300" y2="300" />
                    <line x1="425" y1="100" x2="425" y2="300" />
                  </g>

                  {/* Topographical contours that display as colorful 3D wireframe layers */}
                  <g strokeWidth="2">
                    {/* Layer 1: Base Contour (+64m Blue) */}
                    <path 
                      d="M 60,320 C 150,300 250,310 350,290 C 450,270 520,310 540,320" 
                      stroke="#2563eb" 
                      fill="none" 
                      className="opacity-40"
                    />
                    
                    {/* Layer 2: Mid Contour (+110m Green) */}
                    <path 
                      d="M 100,240 C 180,210 260,250 360,220 C 420,200 490,230 510,240" 
                      stroke="#10b981" 
                      fill="none" 
                      className="opacity-50"
                    />

                    {/* Layer 3: High Contour (+150m Yellow) */}
                    <path 
                      d="M 150,160 C 220,140 290,180 370,140 C 420,110 450,150 480,160" 
                      stroke="#f59e0b" 
                      fill="none" 
                      className="opacity-70 animate-pulse"
                    />

                    {/* Layer 4: Peak Contour (+176m Red) */}
                    <path 
                      d="M 220,100 C 260,88 320,95 380,84" 
                      stroke="#ef4444" 
                      fill="none" 
                      className="opacity-80"
                    />
                  </g>

                  {/* Point cloud scatter dots. Multi-colored dots simulating raw LiDAR data */}
                  <g opacity="0.85">
                    {/* Flat Terrain dots (Blue-Green) */}
                    <circle cx="90" cy="290" r="3" fill="#3b82f6" />
                    <circle cx="140" cy="310" r="3" fill="#1d4ed8" />
                    <circle cx="120" cy="270" r="3.5" fill="#10b981" />
                    <circle cx="180" cy="280" r="3" fill="#059669" />
                    <circle cx="210" cy="320" r="3" fill="#3b82f6" />
                    
                    {/* Sloped solar region dots (Green/Gold) */}
                    <circle cx="280" cy="220" r="3.5" fill="#10b981" />
                    <circle cx="330" cy="240" r="3" fill="#f59e0b" />
                    <circle cx="300" cy="190" r="3.5" fill="#10b981" />
                    <circle cx="350" cy="210" r="3" fill="#f59e0b" />
                    <circle cx="410" cy="250" r="3" fill="#059669" />
                    <circle cx="430" cy="180" r="3" fill="#f59e0b" />

                    {/* High BESS Plateau dots (Red/Gold) */}
                    <circle cx="200" cy="120" r="3.5" fill="#ef4444" />
                    <circle cx="250" cy="140" r="4" fill="#f59e0b" />
                    <circle cx="290" cy="110" r="3" fill="#ef4444" />
                    <circle cx="340" cy="130" r="3.5" fill="#ef4444" />
                    <circle cx="400" cy="115" r="3" fill="#ea580c" />
                    <circle cx="450" cy="135" r="4" fill="#ea580c" />
                  </g>

                  {/* Interactive Hotspot anchors inside the LiDAR space */}
                  {[
                    { id: 1, label: "BESS Plateau Segment A", x: 250, y: 140, color: '#f59e0b', elev: '+171m' },
                    { id: 2, label: "Municipal Lease Area B", x: 330, y: 240, color: '#10b981', elev: '+115m' },
                    { id: 3, label: "DJ205C Access Junction", x: 120, y: 270, color: '#3b82f6', elev: '+68m' }
                  ].map((node) => (
                    <g 
                      key={node.id} 
                      className="cursor-pointer group/node"
                      onMouseEnter={() => setHoveredPointId(node.id)}
                      onMouseLeave={() => setHoveredPointId(null)}
                    >
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={hoveredPointId === node.id ? 8 : 5} 
                        fill={node.color} 
                        className="transition-all duration-100"
                      />
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={hoveredPointId === node.id ? 16 : 10} 
                        stroke={node.color} 
                        strokeWidth="1.5" 
                        fill="none" 
                        className="animate-pulse"
                      />
                    </g>
                  ))}

                  {/* Active scanning beam slicing through the 3D model */}
                  {isScanning && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.9, 0.9, 0] }}
                      transition={{ duration: 2.5 }}
                    >
                      {/* Laser beam line */}
                      <rect x="30" y="50" width="540" height="4" fill="#10b981" className="shadow-emerald" />
                      {/* Laser fill sheen */}
                      <polygon points="30,50 570,50 570,350 30,350" fill="rgba(16, 185, 129, 0.04)" />
                    </motion.g>
                  )}
                </svg>
              </div>

              {/* Point hover HUD details */}
              <div className="absolute top-2 right-2 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl font-mono text-[10px] text-left text-slate-300 min-w-[150px] pointer-events-none">
                <div className="text-slate-500 uppercase font-black tracking-wider border-b border-slate-800 pb-1 mb-1">
                  Active Coordinates
                </div>
                {hoveredPointId ? (
                  <>
                    <div className="text-white font-bold">
                      {hoveredPointId === 1 ? 'BESS Plateau Segment A' : hoveredPointId === 2 ? 'Municipal Lease Area B' : 'DJ205C Access Junction'}
                    </div>
                    <div className="text-emerald-400 mt-1">ELEV: {hoveredPointId === 1 ? '+171m' : hoveredPointId === 2 ? '+115m' : '+68m'}</div>
                    <div className="text-slate-400">SLOPE ASPECT: &lt;1.5% Grade</div>
                  </>
                ) : (
                  <div>Hover over node coordinates to audit topography elevation data.</div>
                )}
              </div>
            </div>

            {/* Scale guide on far right */}
            <div className="absolute right-6 bottom-6 w-16 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between items-center text-[9px] font-mono text-slate-300 z-10 h-32">
              <span className="text-red-400 font-bold">+176 m</span>
              <div className="w-2.5 flex-1 my-1.5 rounded bg-gradient-to-t from-blue-600 via-[#10b981] to-red-500 border border-slate-700/50" />
              <span className="text-blue-400 font-bold">+64 m</span>
            </div>
          </div>
        )}

        {/* VIEW 3: Solar Yield dynamic orbital simulator */}
        {activeTab === 'reflectivity' && (
          <div className="absolute inset-0 w-full h-full bg-[#030612] flex flex-col justify-between p-6 overflow-hidden">
            
            {/* Top Interactive Banner */}
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 z-10">
              <div className="max-w-md border border-slate-800 bg-slate-950/95 p-4 rounded-2xl text-left">
                <span className="text-[#f59e0b] font-mono font-bold text-[10px] tracking-wider uppercase block mb-1">
                  🌟 {t.insolationIndexLabel} · 45°40'N
                </span>
                <h4 className="text-white font-bold font-display text-base">{t.solarYieldTitle}</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  {t.solarYieldDesc}
                </p>
              </div>

              {/* Live Solar generation readouts */}
              <div className="bg-slate-950/95 border border-slate-850 p-4 rounded-xl flex flex-col gap-1.5 font-mono text-xs text-slate-300 self-start sm:self-auto min-w-[160px] text-left">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-850 pb-1 border-opacity-30">
                  REAL-TIME READOUT
                </div>
                <div>Hour: <span className="text-white font-bold">{solarHour.toFixed(1).replace('.', ':')}0</span></div>
                <div>Solar Irradiance: <span className="text-amber-400 font-bold">{solarIrradiance} W/m²</span></div>
                <div>Instant Power: <span className="text-sky-400 font-bold">{solarYieldMW} MWp</span></div>
                <div className="flex items-center gap-1.5 mt-1 border-t border-slate-850 pt-1 text-[10px]">
                  {isCharging ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      CHARGING BESS SYSTEMS
                    </span>
                  ) : (
                    <span className="text-brand-gold font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
                      GRID SYSTEM INJECTION
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Circular Sun Orbit Representation */}
            <div className="my-2 h-20 relative flex items-center justify-center">
              <div className="w-full max-w-lg h-12 border-b border-dashed border-slate-800 relative">
                {/* Orbital Arch */}
                <svg className="absolute bottom-0 left-0 w-full h-24 overflow-visible" viewBox="0 0 400 100">
                  <path d="M 10,100 A 190,190 0 0,1 390,100" fill="none" stroke="#101a35" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Sun icon along the path based on fraction */}
                  {sinAngle > 0 && (
                    <motion.g
                      animate={{ x: 10 + 380 * fraction, y: 100 - 90 * sinAngle }}
                      transition={{ type: "tween", duration: 0.1 }}
                    >
                      <circle cx="0" cy="0" r="14" fill="#f59e0b" className="blur-xs opacity-70 animate-pulse" />
                      <circle cx="0" cy="0" r="8" fill="#fff" />
                    </motion.g>
                  )}
                </svg>
              </div>
            </div>

            {/* Live Slider and auto plays */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 z-10 mt-2 bg-slate-950/80 border border-slate-850 p-4 rounded-2xl">
              
              <div className="flex-1 w-full flex items-center gap-4">
                <button 
                  onClick={toggleSunAnimation}
                  className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold/90 text-slate-900 rounded-lg text-xs font-bold cursor-pointer transition-colors shrink-0 flex items-center gap-1"
                >
                  <SunIcon className={`w-3.5 h-3.5 ${isAnimatingSun ? 'animate-spin' : ''}`} />
                  {isAnimatingSun ? (lang === 'tr' ? 'DURDUR' : 'PAUSE') : (lang === 'tr' ? 'GÜNÜ BAŞLAT' : 'RUN CYCLE')}
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">06:00</span>
                  <input 
                    type="range"
                    min="6"
                    max="20"
                    step="0.5"
                    value={solarHour}
                    onChange={(e) => setSolarHour(parseFloat(e.target.value))}
                    className="flex-1 accent-brand-gold"
                  />
                  <span className="text-[10px] font-mono font-bold text-slate-400">20:00</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[9px]">{t.dailyAverageLabel}</span>
                  <span className="text-emerald-400 font-bold block text-sm">4.33 Hrs Peak</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-slate-500 block text-[9px]">{t.annualTotalLabel}</span>
                  <span className="text-brand-gold font-bold block text-sm">1,340 kWh/m²</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-slate-500 block text-[9px]">{t.moduleEfficiencyLabel}</span>
                  <span className="text-sky-400 font-bold block text-sm">21.8% N-Type</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Interactive map flags and hotspot overlays (always available except in Insufficient Views) */}
        {showOverlays && (
          <AnimatePresence>
            <div className="absolute inset-0 pointer-events-none z-10">
              {points.map((pt, idx) => (
                <motion.div
                  key={idx}
                  className="absolute p-2 pointer-events-auto"
                  style={{ left: pt.x, top: pt.y }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {/* Hotspot anchor */}
                  <div className="relative group/hotspot">
                    <span className="block w-4 h-4 rounded-full bg-brand-gold/30 border border-brand-gold flex items-center justify-center cursor-help shadow-lg">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
                    </span>

                    {/* Popover */}
                    <div className={`absolute bottom-6 translate-y-2 opacity-0 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 group-hover/hotspot:pointer-events-auto transition-all bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-2xl min-w-[180px] sm:min-w-[220px] z-50 text-left ${
                      idx === 3 ? 'right-0 translate-x-3 origin-bottom-right' : 'left-1/2 -translate-x-1/2'
                    }`}>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        {pt.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{pt.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={showOverlays} 
            onChange={(e) => setShowOverlays(e.target.checked)}
            className="w-4 h-4 rounded-md accent-brand-gold cursor-pointer"
          />
          <span className="text-slate-700 font-semibold">{t.showOverlaysLabel}</span>
        </label>

        <div className="flex items-center gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            {t.lidarCalibrated}
          </span>
          <span>·</span>
          <span>RO GRIDS V4.1IA</span>
        </div>
      </div>

    </div>
  );
}
