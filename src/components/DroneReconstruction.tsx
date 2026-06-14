/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Layers, Compass, Play, MapPin, HardHat, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface DroneReconstructionProps {
  lang: Language;
}

export default function DroneReconstruction({ lang }: DroneReconstructionProps) {
  const [activeTab, setActiveTab] = useState<'drone' | 'lidar' | 'reflectivity'>('drone');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const t = TRANSLATIONS[lang];

  // Coordinates of our BESS points
  const points = [
    { label: "BESS Site 1 (Cârligele 1)", x: "32%", y: "45%", desc: "150 MW / 300 MWh · Onaylı" },
    { label: "BESS Site 2 (Cârligele 2)", x: "48%", y: "55%", desc: "150 MW / 300 MWh · Onaylı" },
    { label: "PV Array (25 MW Solar)", x: "38%", y: "74%", desc: "41,664 Monocrystalline Modules" },
    { label: "Substation Ext.", x: "85%", y: "15%", desc: "Focșani Vest connection bay @ 220kV" }
  ];

  return (
    <div className="glass rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 md:p-8 border-b border-white/5 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-brand-gold font-mono font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE MEDIA PORTAL
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight font-display text-white">{t.droneVideoTitle}</h3>
          <p className="text-slate-400 text-sm max-w-xl mt-1">{t.droneVideoSubtitle}</p>
        </div>

        {/* View Selection Controls */}
        <div className="flex bg-slate-950/60 border border-white/10 p-1.5 rounded-2xl self-start md:self-auto shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab('drone')}
            className={`px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'drone' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {t.droneViewTab}
          </button>
          <button
            onClick={() => setActiveTab('lidar')}
            className={`px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lidar' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {t.lidarTab}
          </button>
          <button
            onClick={() => setActiveTab('reflectivity')}
            className={`px-4 py-2 rounded-xl transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reflectivity' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t.reflectivityTab}
          </button>
        </div>
      </div>

      <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
        {/* VIEW 1: Drone Aerial Render */}
        {activeTab === 'drone' && (
          <div className="absolute inset-0 w-full h-full bg-slate-950">
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

            {/* Video overlay graphic mimicking drone HUD */}
            <div className="absolute inset-4 pointer-events-none border border-slate-800/40 rounded-xl flex flex-col justify-between p-4">
              <div className="flex justify-between items-start text-emerald-400 font-mono text-xs">
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/30 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  REC [HD 60FPS]
                </div>
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/30 text-right">
                  GPS: 45°40'50''N · 27°07'59''E
                </div>
              </div>
              <div className="flex justify-between items-end text-slate-400 font-mono text-[10px]">
                <div>ALT: 218 m · HDG: 142° SE</div>
                <div>EXPOSURE: AUT · ISO 100</div>
              </div>
            </div>

            {/* If not playing, show overlay placeholder play button */}
            {!isPlaying ? (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <motion.button 
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-brand-gold hover:bg-brand-gold/90 text-brand-midnight flex items-center justify-center shadow-lg shadow-brand-gold/20 cursor-pointer transition-colors"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </motion.button>
                <h4 className="mt-4 font-bold text-lg text-white">Cârligele Drone Flyover Flight</h4>
                <p className="text-slate-400 text-xs max-w-md mt-1">Play the simulated drone flight presenting high-resolution aerial mapping of the flat fields, DJ205C accessibility, and surrounding topography.</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulated playback controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-6 shadow-xl pointer-events-auto">
                  <button onClick={() => setIsPlaying(false)} className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full" /> PAUSE SIMULATION
                  </button>
                  <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-gold"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">DJ205C ACCESS</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: LiDAR 3D Topographic Spectrum Model */}
        {activeTab === 'lidar' && (
          <div className="absolute inset-0 w-full h-full bg-slate-950">
            {/* Topographic contours overlay */}
            <div className="absolute inset-0 bg-[#0d1527] opacity-60">
              <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                {/* Contours paths */}
                <path d="M 0,100 C 300,120 400,80 1000,150" stroke="#1e293b" strokeWidth="1" fill="none" />
                <path d="M 0,200 C 200,240 500,160 1000,220" stroke="#334155" strokeWidth="1" fill="none" />
                <path d="M 0,300 C 400,340 300,280 1000,310" stroke="#334155" strokeWidth="1.5" fill="none" />
                <path d="M 0,400 C 100,440 600,360 1000,420" stroke="#475569" strokeWidth="1" fill="none" />
              </svg>
            </div>

            {/* Altitude gradient scale bar */}
            <div className="absolute right-6 top-6 bottom-6 w-16 bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between items-center text-[10px] font-mono text-slate-300 z-10">
              <span className="text-red-400 font-bold">+176 m</span>
              <div className="w-3 flex-1 my-2 rounded-md bg-gradient-to-t from-blue-600 via-[#10b981] to-red-500 border border-slate-700/50" />
              <span className="text-blue-400 font-bold">+64 m</span>
            </div>

            {/* 3D LiDAR Visual point cloud */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-slate-900/90 border border-slate-800 p-4 rounded-2xl max-w-sm"
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold font-display text-white">LiDAR Cloud Reconstruction</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  The topographic profile consists of flat clay terrains (+64m) raising seamlessly into robust solar-efficient plateau segments (+176m) optimal for battery drainage and wind gusts.
                </p>
              </motion.div>
            </div>

            <div className="absolute left-6 bottom-6 bg-slate-950/80 border border-slate-800 px-3 py-2 rounded-xl text-left pointer-events-none">
              <div className="text-[10px] uppercase text-brand-gold font-bold tracking-wider font-mono">Dossier Code</div>
              <div className="text-sm font-bold text-white font-mono">LDR-CARL-V1</div>
            </div>
          </div>
        )}

        {/* VIEW 3: Solar Yield Emisivite */}
        {activeTab === 'reflectivity' && (
          <div className="absolute inset-0 w-full h-full bg-[#05050a] flex flex-col justify-between p-6">
            <div className="w-full max-w-md border border-slate-800 bg-slate-950/80 p-4 rounded-2xl self-start">
              <span className="text-[#f59e0b] font-mono font-bold text-[10px] tracking-wider uppercase block mb-1">Insolation Index</span>
              <h4 className="text-white font-bold font-display text-base">Güneş Enerjisi Emisivite Modeli</h4>
              <p className="text-slate-400 text-xs mt-1">
                45°40’K enleminde, yıllık m² başına 1.340 kWh/m² teorik ışınım değeriyle hem BESS şarj-deşarj çevrimini hem de 25 MW Solar dizisini destekleyen kararlı mikroiklim.
              </p>
            </div>

            <div className="flex items-center gap-6 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl self-start text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[9px]">GÜNLÜK ORTALAMA</span>
                <span className="text-emerald-400 font-bold block text-sm">4.33 Hrs Peak</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-slate-500 block text-[9px]">YILLIK TOPLAM DEĞER</span>
                <span className="text-brand-gold font-bold block text-sm">1,340 kWh/m²</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-slate-500 block text-[9px]">PANEL VERİMLİLİĞİ</span>
                <span className="text-sky-400 font-bold block text-sm">21.8% N-Type</span>
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
                    <span className="block w-4 h-4 rounded-full bg-brand-gold/30 border border-brand-gold flex items-center justify-center cursor-help">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
                    </span>

                    {/* Popover */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 group-hover/hotspot:pointer-events-auto transition-all bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-2xl min-w-[200px] z-50 text-left">
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
      <div className="p-4 md:p-6 bg-slate-950/80 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={showOverlays} 
            onChange={(e) => setShowOverlays(e.target.checked)}
            className="w-4 h-4 rounded-md accent-brand-gold cursor-pointer"
          />
          <span className="text-slate-400 font-medium">Show Site Boundary Hotspots & Labels Overlay</span>
        </label>

        <div className="flex items-center gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            LIDAR RECONSTRUCTION CALIBRATED
          </span>
          <span>·</span>
          <span>RO GRIDS V4.1IA</span>
        </div>
      </div>
    </div>
  );
}
