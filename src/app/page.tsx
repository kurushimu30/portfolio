'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Target, Terminal, Activity, Hexagon, Crosshair, Layers, Play, Award, Shield, Code, Cpu, ChevronRight, Briefcase, Sparkles, Swords } from 'lucide-react';

// --- DATA LAYER ---
const LOGOS = ["DATACAMP", "AWS CLOUD CLUB", "DEVCON", "YGG PLAY SUMMIT", "PBW", "AFK", "GADGETS MAGAZINE"];

const ACCOLADES = [
  { metric: "1.13", title: "Cumulative GWA", subtitle: "Summa Cum Laude Track", icon: <Award size={20}/> },
  { metric: "NATL", title: "National Finalist", subtitle: "World Hackathon Finals", icon: <Target size={20}/> },
  { metric: "TOP", title: "Top Finalist", subtitle: "Base Build Blockchain", icon: <Hexagon size={20}/> },
  { metric: "100+", title: "Active Nodes", subtitle: "Developer Pipelines", icon: <Cpu size={20}/> },
];

const RECONNAISSANCE_BADGES = [
  { 
    role: "Founder & Chief Executive Officer", 
    org: "ARK - AcademiTech Research & Knowledge", 
    domain: "Ecosystem Architecture", 
    rarity: "MYTHIC FOUNDER", 
    rarityColor: "text-red-500 border-red-500/50 bg-red-500/10 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]",
    eventImg: "/events/DevConGameJam.jpg", 
    logoImg: "/logos/ark.jpg" 
  },
  { 
    role: "Executive: Associate of Staff & Partner", 
    org: "DEVCON Philippines", 
    domain: "Ecosystem Command", 
    rarity: "LEGENDARY NODE", 
    rarityColor: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    eventImg: "/events/6.JPG", 
    logoImg: "/logos/DevCon_Manila.jpg" 
  },
  { 
    role: "National Delegate", 
    org: "DOST National Game Dev Bootcamp", 
    domain: "State Selection", 
    rarity: "LEGENDARY NODE", 
    rarityColor: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    eventImg: "/events/7.JPG", 
    logoImg: "/logos/dost.png" 
  },
  { 
    role: "Operations Staff", 
    org: "Philippine Blockchain Week", 
    domain: "Web3 System Operations", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/PBW_volunteer.jpg", 
    logoImg: "/logos/PBW.png" 
  },
  { 
    role: "Operations Staff", 
    org: "Unleash Philippines", 
    domain: "Event Logistics", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/Unleash.jpg", 
    logoImg: "/logos/UNLEASH.png" 
  },
  { 
    role: "Operations Staff", 
    org: "IoT Conference Philippines", 
    domain: "Hardware & Systems Expo", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/IoT.jpg", 
    logoImg: "/logos/Iot.jpg" 
  },
  { 
    role: "Event Core Partner", 
    org: "YGG Play Summit & Nexhire", 
    domain: "Network Architecture", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/TechCareer.JPG", 
    logoImg: "/logos/ygg.png" 
  },
  { 
    role: "Programming Team Support Manager", 
    org: "GDSC - PUP", 
    domain: "Institutional Leadership", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/GameJam CCIS.jpg", 
    logoImg: "/logos/gdgpup_logo.jpg" 
  },
  { 
    role: "Core Media Asset Creator & Video Editor", 
    org: "AWS Cloud Club PUP", 
    domain: "Cloud & Media", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/2.JPG", 
    logoImg: "/logos/aws.png" 
  },
  { 
    role: "Panel Judge - Game Jam", 
    org: "CCIS Week 2025", 
    domain: "Ecosystem Adjudication", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/PictureJudge.jpg", 
    logoImg: "/logos/PUPLogo.png" 
  },
  { 
    role: "AWS Cloud & Data Science Scholar", 
    org: "DataCamp Specialization Academy", 
    domain: "Technical Fellowship", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/4.JPG", 
    logoImg: "/logos/DC_Donates_logo_inverted.png" 
  },
  { 
    role: "Speaker & Event Host", 
    org: "Tech Industry Mindset Workshop", 
    domain: "Public Communication", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/1.JPG", 
    logoImg: "/logos/PUPLogo.png" 
  },
  { 
    role: "Research Assistant", 
    org: "Quiz Management Systems", 
    domain: "Academic Research", 
    rarity: "COMMON NODE", 
    rarityColor: "text-zinc-400 border-zinc-500/20 bg-zinc-500/5",
    eventImg: "/events/5.JPG", 
    logoImg: "/logos/PUPLogo.png" 
  },
];

const EVENT_COLLECTION = [
  "/events/1.JPG", "/events/IoT.jpg", "/events/3.JPG", "/events/Unleash.jpg", 
  "/events/PBW_volunteer.jpg", "/events/6.JPG", "/events/TechCareer.JPG"
];

const SYSTEM_AUDIT = [
  {
    category: "Architecture & Scale",
    title: "The 8-Department Framework",
    desc: "Scaled operations into a multi-disciplinary network managing over 100+ active student developer pipelines.",
    link: "https://www.facebook.com/ark.academitech2025",
  },
  {
    category: "Guild Deployments",
    title: "DEVCON Finals & PGDX",
    desc: "Orchestrated competitive deployments: 'Bangungot' and 'Checkmate'. Engineering 'Code White' for PGDX.",
    link: "https://leeprince.itch.io/bangungot",
  },
  {
    category: "Sovereign Engineering",
    title: "Thynkora AI & Web3",
    desc: "World Hackathon Finals (ICP) & Base Build. Next.js and Motoko smart contracts bridging Web2 to Web3.",
    link: "https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI",
  }
];

const SKILLS = [
  { category: "Infrastructure & Systems", tags: ["SOP Design", "Gamified HR Routing", "Pipeline Tasking", "Notion/Trello Architecture"] },
  { category: "Media Production", tags: ["AE Performance Editing", "Technical Devlogs", "Graphic Design Architecture", "Cinematic Trailers"] },
  { category: "Technical Engineering", tags: ["Object-Oriented Programming (OOP)", "Systems Design", "Data Dictionary Management", "Web3 / Motoko"] }
];

// --- BRAND WRAPPER & HELPER COMPONENTS ---

const getGlowColor = (rarity: string) => {
  if (rarity.includes("MYTHIC")) return "#ef4444"; // Red
  if (rarity.includes("LEGENDARY")) return "#f59e0b"; // Amber
  if (rarity.includes("EPIC")) return "#a855f7"; // Purple
  if (rarity.includes("RARE")) return "#22d3ee"; // Cyan
  return "#a1a1aa"; // Common / Zinc
};

const GlassPanel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative bg-white/[0.015] border border-white/5 rounded-[24px] shadow-2xl overflow-hidden group hover:bg-white/[0.025] transition-colors ${className}`}>
    <div className="absolute top-4 left-4 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626] opacity-30 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-4 right-4 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626] opacity-30 group-hover:opacity-100 transition-opacity" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

// The Interactive Spotlight Badge Component
const InteractiveBadgeCard = ({ badge, onClick }: { badge: any, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative rounded-[20px] p-[2px] cursor-pointer group shadow-lg overflow-hidden h-full flex"
    >
      {/* Continuous Rotating Neon Glow Animation Layer */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${getGlowColor(badge.rarity)} 30%, transparent 50%)`
        }}
      />

      {/* Inner Dark Badge Card */}
      <div className="bg-[#0e0e12] w-full h-full rounded-[18px] p-5 flex flex-col items-center text-center relative z-20 overflow-hidden">
        
        {/* The Spotlight that follows the cursor */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, ${getGlowColor(badge.rarity)}25, transparent)`
          }}
        />

        {/* Ambient base glow */}
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0" 
          style={{ background: `radial-gradient(circle at center, ${getGlowColor(badge.rarity)}, transparent 70%)` }}
        />
        
        {/* Adjusted Logo Scale */}
        <div className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 mb-4 relative z-30 bg-black shadow-inner shrink-0">
          <img src={badge.logoImg} alt={badge.org} className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-100 transition-all group-hover:scale-110 duration-500" />
        </div>
        
        {/* Adjusted Text Scale */}
        <div className="z-30 w-full flex flex-col items-center flex-1">
          <span className={`text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border mb-2 inline-block shadow-sm bg-[#0e0e12] ${badge.rarityColor}`}>
            {badge.rarity}
          </span>
          <h4 className="text-sm font-bold tracking-tight text-white line-clamp-2 px-1 leading-snug mb-1">{badge.role}</h4>
          <p className="text-[10px] text-zinc-500 mt-auto w-full line-clamp-1">{badge.org}</p>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function SovereignCharacterPortfolio() {
  const heroRef = useRef<any>(null);
  const storyRef = useRef<any>(null);
  const reconRef = useRef<any>(null);
  const projectsRef = useRef<any>(null);
  const recordsRef = useRef<any>(null);
  const dataLogsRef = useRef<any>(null);
  const contactRef = useRef<any>(null);

  const [globalMousePos, setGlobalMousePosition] = useState({ x: 0, y: 0 });
  const [showHud, setShowHud] = useState(false);
  const [activeBadge, setActiveBadge] = useState<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setGlobalMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setShowHud(window.scrollY > 500);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (ref: React.RefObject<any>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const circuitProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#0b0b0f] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white relative pb-10 overflow-x-hidden">
      
      {/* Global Spotlight Ambient Overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block"
        animate={{ background: `radial-gradient(600px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(220, 38, 38, 0.03), transparent 80%)` }}
      />

      {/* Persistent Winding Circuit Backbone */}
      <div className="fixed left-4 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 z-0 hidden md:block pointer-events-none">
        <motion.div style={{ scaleY: circuitProgress }} className="w-full h-full bg-red-600 origin-top shadow-[0_0_15px_#dc2626]" />
        <motion.div style={{ top: useTransform(circuitProgress, [0, 1], ["0%", "100%"]) }} className="absolute left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
      </div>

      {/* ========================================== */}
      {/* FLOATING HUD (Navigation Bar)             */}
      {/* ========================================== */}
      <div className={`fixed left-4 md:left-9 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${showHud ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
        <div className="bg-[#121216]/90 backdrop-blur-xl border border-white/10 p-2.5 rounded-[24px] flex flex-col gap-5 items-center shadow-2xl">
          <button onClick={() => scrollTo(heroRef)} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Hexagon size={14} className="fill-current"/></button>
          <div className="w-3 h-[1px] bg-white/10" />
          <button onClick={() => scrollTo(reconRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Badge Book"><Swords size={16}/></button>
          <button onClick={() => scrollTo(projectsRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Projects"><Layers size={16}/></button>
          <button onClick={() => scrollTo(recordsRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Matrices"><Briefcase size={16}/></button>
          <button onClick={() => scrollTo(dataLogsRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Logs"><Activity size={16}/></button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 01. THE GUILD CHARACTER DASHBOARD HERO     */}
      {/* ========================================== */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 pl-4 md:pl-24 overflow-hidden bg-[#0a0a0c]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[70vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent blur-[100px] pointer-events-none z-0" />
        
        <div className="relative z-10 w-full max-w-[1400px] h-[85vh] min-h-[680px] bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[40px] p-4 flex flex-col md:flex-row gap-4 shadow-2xl">
          
          <div className={`hidden md:flex w-20 bg-white/[0.02] rounded-[32px] border border-white/5 flex-col items-center py-10 gap-10 transition-opacity duration-300 ${showHud ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mb-4"><Hexagon size={18} className="fill-black" /></div>
            <div className="flex flex-col gap-8 text-white/30">
              <button onClick={() => scrollTo(reconRef)} className="hover:text-red-500 transition-colors"><Swords size={22} /></button>
              <button onClick={() => scrollTo(projectsRef)} className="hover:text-red-500 transition-colors"><Layers size={22} /></button>
              <button onClick={() => scrollTo(dataLogsRef)} className="hover:text-red-500 transition-colors"><Activity size={22} /></button>
            </div>
            <div className="mt-auto"><Crosshair size={22} className="text-red-600 animate-pulse" /></div>
          </div>

          <GlassPanel className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/50 group">
            <div className="absolute inset-0 z-0">
              <img 
                src="/square-image.png" 
                alt="Mel Carl Chacon Profile Portrait"
                className="w-full h-full object-cover opacity-45 group-hover:scale-102 transition-transform duration-700 filter contrast-[1.1] brightness-[0.85] grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent" />
            </div>

            <div className="absolute top-6 right-6 border border-white/10 px-4 py-1.5 rounded-full font-mono text-[10px] bg-black/60 tracking-widest text-zinc-400 flex items-center gap-2 backdrop-blur-md z-10">
              <Sparkles size={12} className="text-amber-400 animate-pulse"/> LEVEL 100 STARTUP FOUNDER
            </div>

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl">THE<br />ARCHITECT.</h1>
            </div>
          </GlassPanel>

          <div className="w-full md:w-[360px] flex flex-col gap-4">
            <GlassPanel className="p-8 h-1/3 flex flex-col justify-center">
               <span className="inline-block px-3 py-1 bg-red-950/40 text-red-400 w-fit rounded-full text-[9px] font-mono uppercase tracking-widest mb-4 border border-red-900/30">Founder / CEO ARK</span>
               <h2 className="text-2xl font-bold tracking-tight mb-1">Mel Carl A. Chacon</h2>
               <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Class: Systems Engineer // BSIT 2-1</p>
            </GlassPanel>

            <GlassPanel className="p-8 h-1/3 flex flex-col justify-center bg-gradient-to-br from-red-950/10 to-transparent">
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4">Guild Assets Scale</h3>
              <div className="flex items-end justify-between border-b border-white/5 pb-2 mb-2">
                <span className="text-3xl font-black">100+</span>
                <span className="text-xs text-zinc-400 font-light pb-1">Active Guild Members</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-red-500">8</span>
                <span className="text-xs text-zinc-400 font-light pb-1">Core Operational Cells</span>
              </div>
            </GlassPanel>

            <GlassPanel className="p-8 h-1/3 flex flex-col justify-center">
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4">Mastered Skill Passives</h3>
              <ul className="text-xs text-zinc-300 font-light space-y-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Systemic SOP Framework Architecture</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> High-Income SaaS & Devlog Video Editing</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Gamified Organization Task Pipelines</li>
              </ul>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 02. FULL-SCREEN CINEMATIC MASTER QUOTE     */}
      {/* ========================================== */}
      <section className="min-h-screen w-full flex items-center justify-center relative border-b border-white/5 pl-4 md:pl-24 snap-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.01)_0%,_transparent_100%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center z-10 px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-[80px] font-black text-white leading-[0.95] tracking-tighter uppercase"
          >
            To command the vision, <br />
            <span className="font-serif italic font-light text-red-600 lowercase tracking-normal">one must ruthlessly</span> <br />
            engineer the execution.
          </motion.h2>
        </div>
      </section>

      {/* ========================================== */}
      {/* 03. RECONNAISSANCE: AQW BADGE SYSTEM       */}
      {/* ========================================== */}
      <section ref={reconRef} className="py-32 px-6 md:px-12 pl-12 md:pl-32 relative bg-[#09090d]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16">
            <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block">// Achievement Book</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Strategic Reconnaissance.</h2>
            <p className="text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
              Every position held across the Philippine tech landscape was an active deployment to harvest system metrics. Click an item card to audit the full badge record layout.
            </p>
          </div>

          {/* Fully Interactive Mouse-Tracking Grid Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {RECONNAISSANCE_BADGES.map((badge, i) => (
              <InteractiveBadgeCard 
                key={i} 
                badge={badge} 
                onClick={() => setActiveBadge(badge)} 
              />
            ))}
          </div>

          {/* DYNAMIC LIGHTBOX OVERLAY FOR BADGE PROFILE INSPECTOR */}
          <AnimatePresence>
            {activeBadge && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={() => setActiveBadge(null)}
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                  className="bg-[#111116] border border-white/10 rounded-[32px] p-6 md:p-8 max-w-2xl w-full flex flex-col gap-6 relative shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded border inline-block ${activeBadge.rarityColor}`}>
                        {activeBadge.rarity}
                      </span>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-2">{activeBadge.role}</h3>
                      <p className="text-sm font-serif italic text-zinc-400 mt-0.5">{activeBadge.org}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black shrink-0 ml-4">
                      <img src={activeBadge.logoImg} alt={activeBadge.org} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black/80 relative">
                    <img 
                      src={activeBadge.eventImg} 
                      alt="Verified Event Deployment Action" 
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.9]"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md font-mono text-[9px] text-red-400 tracking-wider">
                      VERIFIED_RECORD // FIELD_NODE: {activeBadge.domain}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono pt-2">
                    <span className="text-zinc-500">NODE STATUS: SECURED</span>
                    <button 
                      onClick={() => setActiveBadge(null)}
                      className="px-4 py-2 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl border border-white/10 text-[10px] uppercase tracking-widest transition-colors font-bold"
                    >
                      Close Terminal Record
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE EVENT COLLECTION INFINITE SCROLL */}
          <div className="mt-32">
             <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4 block">// Raw Operational Field Data</span>
             <div className="w-full overflow-hidden border-y border-white/5 bg-black/20 py-6">
                <motion.div animate={{ x: [0, -2000] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-4 w-max">
                   {[...EVENT_COLLECTION, ...EVENT_COLLECTION].map((imgSrc, i) => (
                     <div key={i} className="w-64 aspect-video rounded-xl overflow-hidden border border-white/10 shrink-0 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <img src={imgSrc} alt="Field Operation" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </motion.div>
             </div>
          </div>

          {/* THE NARRATIVE STORY CLIMAX */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="grid-cols-1 gap-4 lg:col-span-5 hidden sm:grid">
              <div className="rounded-[24px] overflow-hidden border border-white/5 h-[240px] relative bg-black/60 group">
                <img src="/events/World Hackathon.jpg" alt="World Hackathon Finals" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 filter grayscale" />
                <div className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-400 border border-white/10 px-2 py-1 bg-black/60 rounded backdrop-blur-md">WORLD_HACKATHON_STAGE</div>
              </div>
              <div className="rounded-[24px] bg-red-950/20 border border-red-900/30 p-8 flex flex-col justify-center relative overflow-hidden">
                <span className="text-4xl font-black text-white block mb-1">1.13</span>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Cumulative GWA / Trajectory Target</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#121218]/50 backdrop-blur-xl p-8 md:p-12 rounded-[32px] border border-white/5 relative overflow-hidden flex flex-col justify-center shadow-2xl">
              <span className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block">03 // The Realization</span>
              <h3 className="text-3xl font-serif italic mb-6 text-white">A critical error was detected.</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light mb-6">
                I realized I was gaining high prestige, winning national hackathons, and operating networks—but I was executing inside other people’s systems. I wasn't directly building my own universe. I was handling components, not the architecture.
              </p>
              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-lg text-white">So, I built ARK.</h4>
                   <p className="text-xs text-zinc-500 font-mono mt-1">Manufacturing the entire machine from the ground up.</p>
                </div>
                <div onClick={() => scrollTo(projectsRef)} className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform cursor-pointer">
                  <Play size={18} className="ml-1 text-white" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ========================================== */}
      {/* 04. STRATEGIC ALLIANCES                    */}
      {/* ========================================== */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01] pl-12 md:pl-32 pr-6 md:pr-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-12">Ecosystem Trust & Alignments</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            {LOGOS.map((logo, i) => (
              <div key={i} className="w-full aspect-[2/1] border border-white/5 rounded-xl flex items-center justify-center bg-[#0b0b0f] hover:border-red-900/30 transition-colors cursor-pointer group">
                <span className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest group-hover:text-white transition-colors">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 05. CORE ENGINEERING (Projects Bento)      */}
      {/* ========================================== */}
      <section ref={projectsRef} className="py-32 px-6 md:px-12 pl-12 md:pl-32 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20">
            <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block">// Phase 2</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">System Architecture.</h2>
            <p className="text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
              Verified software blueprints, interactive application pipelines, and flagship game builds engineered under absolute execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* FLAGSHIP: CODE WHITE */}
            <div className="md:col-span-12 lg:col-span-8 p-8 md:p-10 flex flex-col group bg-white/[0.015] border border-white/5 rounded-[32px] shadow-2xl overflow-hidden relative min-h-[420px]">
              <div className="absolute inset-0 z-0">
                <img src="/events/CodeWhite.png" alt="Code White Concept Grid" className="w-full h-full object-cover opacity-10 group-hover:scale-102 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/80 to-transparent" />
              </div>
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="px-3 py-1 bg-red-900/20 text-red-400 border border-red-900/30 rounded-full text-[10px] font-mono uppercase tracking-widest">Flagship Product Deployment</span>
                <span className="flex items-center gap-2 text-[10px] font-mono text-zinc-500"><Target size={14}/> Target: PGDX July 2026</span>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 mt-auto h-full z-10">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">Code White <br/><span className="text-zinc-500 text-2xl md:text-3xl">/ The Observer</span></h3>
                  <p className="text-sm text-zinc-400 font-light mb-6">Psychological and analog horror game exhibition asset representing the ARK guild on the national stage.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-400">Mech: Anxiety Meter</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-400">Mech: Spatial Eye Portals</span>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto border border-white/5 rounded-2xl overflow-hidden bg-black/40">
                  <img src="/events/CodeWhite.png" alt="Code White Cinematic Visual" className="w-full h-full object-cover filter contrast-[1.1]" />
                </div>
              </div>
            </div>

            {/* THYNKORA AI */}
            <div className="md:col-span-6 lg:col-span-4 p-8 flex flex-col group bg-white/[0.015] border border-white/5 rounded-[32px] shadow-2xl relative">
              <div className="flex justify-between items-center mb-8">
                <span className="text-red-500"><Code size={24} /></span>
                <a href="https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ExternalLink size={14}/></a>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thynkora AI</h3>
              <p className="text-xs text-zinc-400 font-serif italic mb-6">World Hackathon Finals (ICP Hub)</p>
              <div className="mt-auto aspect-video mb-6 rounded-xl overflow-hidden border border-white/5 bg-black/60">
                <img src="/events/thynkora_dashboard.png" alt="Thynkora UI System" className="w-full h-full object-cover filter contrast-[1.05]" />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Architecture: Next.js / Motoko / Web3</p>
            </div>

            {/* INCUBATED SHIPS */}
            <div className="md:col-span-6 lg:col-span-6 p-8 flex flex-col bg-white/[0.015] border border-white/5 rounded-[32px] shadow-2xl relative">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold">Incubator Pipeline Ships</h3>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase">DEVCON Finals</span>
              </div>
              <p className="text-sm text-zinc-400 font-light mb-6">Engineered the organizational runway for ARK members to hit national status and deploy to Itch.io.</p>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="space-y-3">
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                    <img src="/events/bangungot.jpg" alt="Bangungot Cover" className="w-full h-full object-cover" />
                  </div>
                  <a href="https://leeprince.itch.io/bangungot" target="_blank" rel="noreferrer" className="text-[10px] font-mono uppercase text-red-400 flex items-center gap-1 hover:text-white transition-colors">Bangungot <ExternalLink size={10}/></a>
                </div>
                <div className="space-y-3">
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                    <img src="/events/checkmate.png" alt="Checkmate Cover" className="w-full h-full object-cover" />
                  </div>
                  <a href="https://jokumaaa.itch.io/checkmate" target="_blank" rel="noreferrer" className="text-[10px] font-mono uppercase text-red-400 flex items-center gap-1 hover:text-white transition-colors">Checkmate <ExternalLink size={10}/></a>
                </div>
              </div>
            </div>

            {/* BSIT PORTAL */}
            <div className="md:col-span-12 lg:col-span-6 p-8 flex flex-col md:flex-row gap-6 items-center bg-white/[0.015] border border-white/5 rounded-[32px] shadow-2xl relative">
              <div className="flex-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block">Institutional Integration</span>
                <h3 className="text-xl font-bold mb-3">BSIT Accreditation Portal</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">Architected a centralized web ecosystem to digitize institutional data submission directly for the Department Chairperson.</p>
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-400">Deployed May 2026</span>
              </div>
              <div className="w-full md:w-48 aspect-square rounded-xl overflow-hidden border border-white/5 bg-black">
                 <img src="/events/thynkora.jpg" alt="Portal Schematic Capture" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 06. EXECUTIVE RECORD                       */}
      {/* ========================================== */}
      <section ref={recordsRef} className="py-24 px-6 md:px-12 lg:px-32 bg-[#09090d] border-t border-white/5">
        <div className="max-w-7xl mx-auto pl-0 md:pl-20">
          
          <div className="mb-12">
            <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block">// Verified Records</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8">Character Passives.</h2>
          </div>
            
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {ACCOLADES.map((item, i) => (
              <div key={i} className="bg-[#111115]/80 border border-white/5 rounded-2xl p-6 flex flex-col gap-3 shadow-lg hover:border-red-900/50 transition-colors">
                <div className="text-red-500">{item.icon}</div>
                <div>
                  <span className="text-2xl font-black text-white block leading-none mb-1">{item.metric}</span>
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-zinc-400">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layers size={14} /> Capability Matrices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SKILLS.map((skill, i) => (
                <div key={i} className="bg-white/[0.015] border border-white/5 rounded-2xl p-6 shadow-inner">
                  <h4 className="text-white font-bold text-sm mb-5 pb-3 border-b border-white/10">{skill.category}</h4>
                  <ul className="space-y-3">
                    {skill.tags.map((tag, idx) => (
                      <li key={idx} className="text-[11px] font-mono text-zinc-400 flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">_</span> {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 07. SYSTEM AUDIT                           */}
      {/* ========================================== */}
      <section ref={dataLogsRef} className="py-24 px-6 md:px-12 lg:px-32 bg-[#0b0b0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto pl-0 md:pl-20">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">System Audit.</h2>
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest mt-2">Verified Product Pipelines & Repositories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SYSTEM_AUDIT.map((audit, i) => (
              <a href={audit.link} target="_blank" rel="noreferrer" key={i} className="group flex flex-col p-8 bg-white/[0.01] border border-white/10 rounded-[32px] hover:bg-white/[0.03] hover:border-red-600/50 transition-all shadow-xl">
                <div className="mb-8 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase border border-red-900/30 px-3 py-1 rounded-full bg-red-950/20">{audit.category}</span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <ExternalLink size={14} className="text-white/50 group-hover:text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif italic mb-4 text-white group-hover:text-red-400 transition-colors">{audit.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light mt-auto">{audit.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 08. SECURE CONTACT TERMINAL                */}
      {/* ========================================== */}
      <footer ref={contactRef} className="py-24 px-6 md:px-12 lg:px-32 bg-[#09090d] relative overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto relative z-10 pl-0 md:pl-20">
          
          <div className="bg-[#111116]/60 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900" />
            
            <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
              <Terminal size={22} className="text-red-500" />
              <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">System.Handshake()</span>
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3.5 bg-red-500" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Initiate Transmission.</h2>
            <p className="text-sm text-zinc-400 font-light font-mono mb-12 max-w-xl">
              <span className="text-red-500 font-bold">root@architect:~#</span> Secure handshake connection pathways available for strategic guild integrations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest">
              <a href="mailto:melcarl.chacon@gmail.com" className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-red-500 hover:bg-red-950/10 transition-all group">
                <span className="text-zinc-400 group-hover:text-white">./Connect_Email</span>
                <ExternalLink size={14} className="text-white/20 group-hover:text-red-500" />
              </a>
              <a href="https://www.linkedin.com/in/melcarl-chacon/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-red-500 hover:bg-red-950/10 transition-all group">
                <span className="text-zinc-400 group-hover:text-white">./LinkedIn_Init</span>
                <ExternalLink size={14} className="text-white/20 group-hover:text-red-500" />
              </a>
              <a href="https://www.facebook.com/akumahonoyami" target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-red-500 hover:bg-red-950/10 transition-all group">
                <span className="text-zinc-400 group-hover:text-white">./Facebook_Link</span>
                <ExternalLink size={14} className="text-white/20 group-hover:text-red-500" />
              </a>
            </div>
          </div>

          <div className="text-center mt-24">
            <h1 className="text-[12vw] font-black text-white/[0.015] leading-none tracking-tighter uppercase select-none">CHACON</h1>
            <p className="text-center text-[9px] font-mono text-zinc-600 tracking-widest uppercase mt-4">© 2026 // Engineered for Absolute Execution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}