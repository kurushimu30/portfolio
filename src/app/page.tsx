'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ExternalLink, Target, Terminal, Activity, Hexagon, Crosshair, Layers, Award, Shield, Code, Cpu, Briefcase, Sparkles, Swords, Check, Mail, Phone, MapPin, ArrowUpRight, Globe, Database, Gamepad2, Cloud, GitMerge } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

// --- ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "left" | "right" | "none" }) => {
  const y = direction === "up" ? 40 : 0;
  const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- DATA LAYER ---
const PROJECTS_ARK = [
  {
    category: "Flagship Deployment",
    title: "Code White",
    subtitle: "/ The Observer",
    impact: "Psychological Analog Horror",
    image: "/events/CodeWhite.png", 
    imageScaling: "w-[75%] h-[75%] object-contain drop-shadow-2xl", 
    lore: "Architected representing the ARK guild on the national stage at PGDX, engineered as a flagship demonstration of systemic, suspenseful analog framework architecture.",
    buffs: ["+ National Exhibition", "+ Analog Horror Mech", "+ Game Systems Design"]
  },
  {
    category: "Sovereign Deployment",
    title: "Thynkora AI",
    subtitle: "Web3/AI Sovereign Systems",
    image: "/events/thynkora_dashboard.png",
    imageScaling: "absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.05]",
    lore: "World Hackathon Finals deployment for ICP Hub. Engineered sovereign Next.js and Motoko smart contracts bridging decentralized Web2 interfaces to Web3 blockchain infrastructure.",
    buffs: ["+ Web3 Architecture", "+ Sovereign Engineering", "+ High-Pressure Execution"],
    link: "https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI",
  },
  {
    category: "Ecosystem Deployment",
    title: "ARK Incubator Ships",
    subtitle: "SOP Guild Management",
    lore: "Engineered the organizational runway for ARK members to seamlessly deploy operational builds to Itch.io and achieve national recognition.",
    buffs: ["+ Ecosystem Scaling", "+ Pipeline Engineering", "+ Node Leadership"],
    ships: [
      { name: "Bangungot", img: "/events/bangungot.jpg", link: "https://leeprince.itch.io/bangungot" },
      { name: "Checkmate", img: "/events/checkmate.png", link: "https://jokumaaa.itch.io/checkmate" }
    ]
  },
  {
    category: "Institutional Deployment",
    title: "BSIT Portal",
    subtitle: "中央 Institutional Digitization (May 2026)",
    image: "/events/DIT.png",
    imageScaling: "absolute inset-0 w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700",
    lore: "Architected a centralized web ecosystem to digitize institutional data submission directly for the Department Chairperson.",
    buffs: ["+ Institutional Trust", "+ Cognitive Bandwidth", "+ Systems Design"]
  }
];

const FEATURED_ACCOLADE = { 
  metric: "WORLD FINALIST", 
  title: "Global Hackathon Achievement", 
  subtitle: "Thynkora AI - ICP Hub World Finals", 
  lore: "Competed on the global stage against elite international nodes. Engineered sovereign Web3 contracts using Next.js and Motoko to bridge decentralized systems.",
  buffs: ["+ Global Tech Visibility", "+ Web3 Architecture", "+ High-Pressure Execution"],
  link: "https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI", 
  linkText: "Inspect Repository", 
  icon: <Globe size={40} className="text-amber-400"/> 
};

const REGULAR_ACCOLADES = [
  { metric: "1.13", title: "Cumulative GWA", subtitle: "Summa Cum Laude Track (PUP)", lore: "Sustained elite academic velocity while single-handedly architecting a 100+ member game studio ecosystem.", buffs: ["+ Cognitive Bandwidth", "+ Institutional Trust"], icon: <Award size={24}/> },
  { metric: "TOP 10", title: "National Finalist", subtitle: "DOST Base Build Blockchain", lore: "Architected decentralized blockchain solutions endorsed for national-level deployment.", buffs: ["+ State Endorsement", "+ System Scaling"], icon: <Hexagon size={24}/> },
  { metric: "LEAD", title: "Regional Tech Lead", subtitle: "Eneda Hackathon", lore: "Commanded technical deployment pipelines in highly volatile, time-restricted competitive environments.", buffs: ["+ Crisis Management", "+ Node Leadership"], icon: <Cpu size={24}/> },
  { metric: "DATA", title: "Business Analytics", subtitle: "TPG Solar Hackathon", lore: "Leveraged raw data synthesis to construct strategic, market-ready technical pipelines.", buffs: ["+ Data Synthesis", "+ Strategic Vision"], icon: <Activity size={24}/> },
  { metric: "PRES", title: "President's List", subtitle: "Distinction Certificate (PUP)", lore: "Flawless academic execution recognized directly by university executives.", buffs: ["+ Academic Sovereignty"], icon: <Shield size={24}/> },
];

const RECONNAISSANCE_BADGES = [
  { 
    role: "Founder & Chief Executive Officer", 
    org: "ARK - AcademiTech Research & Knowledge", 
    domain: "Ecosystem Architecture", 
    rarity: "MYTHIC FOUNDER", 
    rarityColor: "text-red-500 border-red-500/50 bg-red-500/10 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]",
    eventImg: "/events/DevConGameJam.jpg", 
    logoImg: "/logos/ark.jpg",
    impact: "Architected a 100+ member operational ecosystem from scratch, deploying 8 specialized departments."
  },
  { 
    role: "Executive: Associate of Staff & Partner", 
    org: "DEVCON Philippines", 
    domain: "Ecosystem Command", 
    rarity: "LEGENDARY NODE", 
    rarityColor: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    eventImg: "/events/6.JPG", 
    logoImg: "/logos/DevCon_Manila.jpg",
    impact: "Commanded regional ecosystem partnerships and executed structural technical deployments."
  },
  { 
    role: "National Delegate", 
    org: "DOST National Game Dev Bootcamp", 
    domain: "State Selection", 
    rarity: "LEGENDARY NODE", 
    rarityColor: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    eventImg: "/events/7.JPG", 
    logoImg: "/logos/dost.png",
    impact: "Selected for an elite state-sponsored technical bootcamp to engineer high-level game frameworks."
  },
  { 
    role: "Operations Staff", 
    org: "Philippine Blockchain Week", 
    domain: "Web3 System Operations", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/PBW_volunteer.jpg", 
    logoImg: "/logos/PBW.png",
    impact: "Executed core logistical operations for a massive global Web3 and blockchain infrastructure event."
  },
  { 
    role: "Operations Staff", 
    org: "Unleash Philippines", 
    domain: "Event Logistics", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/Unleash.jpg", 
    logoImg: "/logos/UNLEASH.png",
    impact: "Facilitated high-level event logistics for massive-scale tech community gatherings."
  },
  { 
    role: "Event Staff", 
    org: "IoT Conference Philippines", 
    domain: "Hardware & Systems Expo", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/IoT.jpg", 
    logoImg: "/logos/Iot.jpg",
    impact: "Managed operational workflows for national hardware and Internet-of-Things symposiums."
  },
  { 
    role: "Event Core Partner", 
    org: "YGG Play Summit & Nexhire", 
    domain: "Network Architecture", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/TechCareer.JPG", 
    logoImg: "/logos/ygg.png",
    impact: "Forged strategic talent pipelines bridging local developers with global Web3 gaming communities."
  },
  { 
    role: "Programming Team Support Manager", 
    org: "GDSC - PUP", 
    domain: "Institutional Leadership", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/GameJam CCIS.jpg", 
    logoImg: "/logos/gdgpup_logo.jpg",
    impact: "Mentored and scaled institutional programming teams, optimizing developer workflow and output."
  },
  { 
    role: "Core Media Asset Creator & Video Editor", 
    org: "AWS Cloud Club PUP", 
    domain: "Cloud & Media", 
    rarity: "EPIC DEPLOYMENT", 
    rarityColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    eventImg: "/events/2.JPG", 
    logoImg: "/logos/aws.png",
    impact: "Produced high-converting technical cinematic assets to market cloud infrastructure."
  },
  { 
    role: "Panel Judge - Game Jam", 
    org: "CCIS Week 2025", 
    domain: "Ecosystem Adjudication", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/PictureJudge.jpg", 
    logoImg: "/logos/PUPLogo.png",
    impact: "Adjudicated and audited competitive game architectures for university-wide deployment events."
  },
  { 
    role: "AWS Cloud & Data Science Scholar", 
    org: "DataCamp Specialization Academy", 
    domain: "Technical Fellowship", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/4.JPG", 
    logoImg: "/logos/DC_Donates_logo_inverted.png",
    impact: "Secured elite data science and cloud architecture fellowship for advanced analytics training."
  },
  { 
    role: "Speaker & Event Host", 
    org: "Tech Industry Mindset Workshop", 
    domain: "Public Communication", 
    rarity: "RARE ACHIEVER", 
    rarityColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    eventImg: "/events/1.JPG", 
    logoImg: "/logos/PUPLogo.png",
    impact: "Commanded public communication, delivering high-impact workshops to emerging developers."
  },
  { 
    role: "Research Assistant", 
    org: "Quiz Management Systems", 
    domain: "Academic Research", 
    rarity: "COMMON NODE", 
    rarityColor: "text-zinc-400 border-zinc-500/20 bg-zinc-500/5",
    eventImg: "/events/5.JPG", 
    logoImg: "/logos/PUPLogo.png",
    impact: "Engineered robust academic validation architectures and backend data management flows."
  },
];

const BADGE_TIERS = [
  { id: "MYTHIC", items: RECONNAISSANCE_BADGES.filter(b => b.rarity.includes("MYTHIC")) },
  { id: "LEGENDARY", items: RECONNAISSANCE_BADGES.filter(b => b.rarity.includes("LEGENDARY")) },
  { id: "EPIC", items: RECONNAISSANCE_BADGES.filter(b => b.rarity.includes("EPIC")) },
  { id: "RARE", items: RECONNAISSANCE_BADGES.filter(b => b.rarity.includes("RARE")) },
  { id: "COMMON", items: RECONNAISSANCE_BADGES.filter(b => b.rarity.includes("COMMON")) },
];

const EVENT_COLLECTION = [
  "/events/1.JPG","/events/2.JPG", "/events/IoT.jpg", "/events/3.JPG", "/events/4.JPG", "/events/5.JPG", "/events/Unleash.jpg", 
  "/events/PBW_volunteer.jpg", "/events/6.JPG", "/events/7.JPG", "/events/8.png", "/events/9.jpg","/events/10.jpg","/events/11.jpg", "/events/TechCareer.JPG",
  "/events/12.JPG", "/events/13.JPG",
];

const SKILLS = [
  { category: "Infrastructure & Systems", tags: ["SOP Design", "Gamified HR Routing", "Pipeline Tasking", "Notion/Trello Architecture"] },
  { category: "Media Production", tags: ["AE Performance Editing", "Technical Devlogs", "Graphic Design Architecture", "Cinematic Trailers"] },
  { category: "Technical Engineering", tags: ["Object-Oriented Programming (OOP)", "Systems Design", "Data Dictionary Management", "Web3 / Motoko"] }
];

// --- BRAND WRAPPER & HELPER COMPONENTS ---

const getGlowColor = (rarity: string) => {
  if (rarity.includes("MYTHIC")) return "#ef4444"; 
  if (rarity.includes("LEGENDARY")) return "#f59e0b"; 
  if (rarity.includes("EPIC")) return "#a855f7"; 
  if (rarity.includes("RARE")) return "#22d3ee"; 
  return "#a1a1aa"; 
};

const GlassPanel = ({ children, className = "", borderLabel = "" }: { children: React.ReactNode, className?: string, borderLabel?: string }) => (
  <div className={`relative bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl overflow-hidden group hover:border-white/20 transition-colors ${className}`}>
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-[24px] z-20 pointer-events-none" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-[24px] z-20 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-[24px] z-20 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-[24px] z-20 pointer-events-none" />
    {borderLabel && (
      <div className="absolute top-3 right-6 font-mono text-[8px] text-zinc-400 uppercase tracking-widest z-20 pointer-events-none">{borderLabel}</div>
    )}
    <div className="absolute top-4 left-4 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626] opacity-40 group-hover:opacity-100 transition-opacity z-20" />
    <div className="absolute bottom-4 right-4 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626] opacity-40 group-hover:opacity-100 transition-opacity z-20" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

const InteractiveBadgeCard = ({ badge, onClick }: { badge: any, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative rounded-[20px] p-[2px] cursor-pointer group shadow-lg overflow-hidden h-full flex flex-col w-full"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none"
        style={{ background: `conic-gradient(from 0deg, transparent 0%, ${getGlowColor(badge.rarity)} 30%, transparent 50%)`, willChange: "transform" }}
      />
      <div className="absolute inset-0 border border-white/10 rounded-[20px] z-10 transition-colors duration-500 group-hover:border-transparent" />

      <div className="bg-[#0e0e12] w-full h-full rounded-[18px] p-6 flex flex-col items-center text-center relative z-20 overflow-hidden">
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-500" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-zinc-500" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{ background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, ${getGlowColor(badge.rarity)}30, transparent)` }}
        />
        <div 
          className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-500 z-0" 
          style={{ background: `radial-gradient(circle at center, ${getGlowColor(badge.rarity)}, transparent 70%)` }}
        />
        
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 mb-5 relative z-30 bg-black shadow-inner shrink-0">
          <img src={badge.logoImg} alt={badge.org} className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all group-hover:scale-110 duration-500" />
        </div>
        
        <div className="z-30 w-full flex flex-col items-center flex-1">
          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded border mb-3 inline-block shadow-sm bg-[#0e0e12] ${badge.rarityColor}`}>
            {badge.rarity}
          </span>
          <h4 className="text-base md:text-lg font-bold tracking-tight text-white line-clamp-2 px-1 leading-snug mb-2">{badge.role}</h4>
          <p className="text-xs text-zinc-400 mt-auto w-full line-clamp-2">{badge.org}</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function SovereignCharacterPortfolio() {
  const heroRef = useRef<any>(null);
  const reconRef = useRef<any>(null);
  const projectsRef = useRef<any>(null);
  const recordsRef = useRef<any>(null);
  const arkRef = useRef<any>(null);
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
    <div className="bg-[#0b0b0f] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white relative pb-10 overflow-hidden snap-y snap-proximity">
      
      {/* ========================================== */}
      {/* GLOBAL BACKGROUND DESIGN SYSTEMS           */}
      {/* ========================================== */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block"
        animate={{ background: `radial-gradient(600px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(220, 38, 38, 0.03), transparent 80%)` }}
      />
      
      {/* SNAKING CIRCUIT LINE TRACING SCROLL */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Base Track */}
          <path 
            d="M 95 0 V 15 H 10 V 30 H 90 V 50 H 5 V 65 H 90 V 85 H 50 V 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="0.5" 
            vectorEffect="non-scaling-stroke" 
          />
          {/* Animated Red Laser */}
          <motion.path 
            d="M 95 0 V 15 H 10 V 30 H 90 V 50 H 5 V 65 H 90 V 85 H 50 V 100" 
            fill="none" 
            stroke="#dc2626" 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke" 
            style={{ pathLength: circuitProgress }}
            className="drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          />
        </svg>
      </div>

      {/* ========================================== */}
      {/* FLOATING HUD (Navigation Bar)             */}
      {/* ========================================== */}
      <div className={`fixed left-4 md:left-9 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${showHud ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
        <div className="bg-[#121216]/90 backdrop-blur-xl border border-white/10 p-2.5 rounded-[24px] flex flex-col gap-5 items-center shadow-2xl relative">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-[24px]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-[24px]" />
          <button onClick={() => scrollTo(heroRef)} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors relative group">
            <Hexagon size={14} className="fill-current"/>
            <div className="absolute inset-0 rounded-full border border-red-500 scale-150 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all" />
          </button>
          <div className="w-3 h-[1px] bg-white/10" />
          
          <button onClick={() => scrollTo(recordsRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Passives"><Briefcase size={16}/></button>
          <button onClick={() => scrollTo(reconRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Recon"><Swords size={16}/></button>
          <button onClick={() => scrollTo(projectsRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Architecture"><Layers size={16}/></button>
          <button onClick={() => scrollTo(arkRef)} className="text-white/40 hover:text-red-500 transition-colors" title="ARK Ecosystem"><Globe size={16}/></button>
          <div className="w-3 h-[1px] bg-white/10" />
          <button onClick={() => scrollTo(contactRef)} className="text-white/40 hover:text-red-500 transition-colors" title="Contact"><Mail size={16}/></button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 01. THE GUILD CHARACTER DASHBOARD HERO     */}
      {/* ========================================== */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center p-4 md:px-24 overflow-hidden z-20 snap-start">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[70vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent blur-[100px] pointer-events-none z-0" />
        
        <FadeIn className="relative z-10 w-full max-w-[1400px] h-[85vh] min-h-[680px] bg-[#0b0b0f]/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-4 flex flex-col md:flex-row gap-4 shadow-2xl">
          
            <div className={`hidden md:flex w-20 bg-white/[0.02] rounded-[32px] border border-white/5 flex-col items-center py-8 justify-between transition-opacity duration-300 ${showHud ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Hexagon size={18} className="fill-black" />
            </div>
            
            <div className="flex flex-col items-center gap-6 text-white/30 my-auto">
              <div className="flex flex-col gap-6">
                <button onClick={() => scrollTo(recordsRef)} title="Passives" className="hover:text-red-500 hover:scale-110 transition-all duration-200"><Briefcase size={22} /></button>
                <button onClick={() => scrollTo(reconRef)} title="Recon" className="hover:text-red-500 hover:scale-110 transition-all duration-200"><Swords size={22} /></button>
                <button onClick={() => scrollTo(projectsRef)} title="Architecture" className="hover:text-red-500 hover:scale-110 transition-all duration-200"><Layers size={22} /></button>
                <button onClick={() => scrollTo(arkRef)} title="ARK Ecosystem" className="hover:text-red-500 hover:scale-110 transition-all duration-200"><Globe size={22} /></button>
              </div>
              <div className="w-6 h-[1px] bg-white/10" />
              <div className="flex flex-col gap-6">
                <button onClick={() => scrollTo(contactRef)} title="Contact Info" className="hover:text-red-500 hover:scale-110 transition-all duration-200"><Mail size={22} /></button>
              </div>
            </div>
            
            <div className="mt-auto pt-4">
              <button onClick={() => scrollTo(heroRef)} title="Reset Targeting" className="text-red-600/60 hover:text-red-500 hover:scale-110 transition-all duration-200 group">
                <Crosshair size={22} className="animate-pulse group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <GlassPanel borderLabel="SYS.OP.AVATAR" className="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/80">
            <div className="absolute inset-0 z-0">
              <img src="/square-image.png" alt="Mel Carl Chacon Profile Portrait" className="w-full h-full object-cover opacity-60 filter contrast-[1.05] brightness-[0.95]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/20 to-transparent" />
            </div>
            <div className="absolute top-6 right-6 border border-white/10 px-4 py-1.5 rounded-full font-mono text-[10px] bg-black/60 tracking-widest text-zinc-400 flex items-center gap-2 backdrop-blur-md z-10">
              <Sparkles size={12} className="text-amber-400 animate-pulse"/> LEVEL 100 STARTUP FOUNDER
            </div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-white drop-shadow-2xl">THE<br />ARCHITECT.</h1>
            </div>
            <span className="absolute bottom-4 right-6 text-[8px] font-mono text-zinc-600 tracking-[0.3em] opacity-50">INIT_PHASE_COMPLETE</span>
          </GlassPanel>

          <div className="w-full md:w-[360px] flex flex-col gap-4">
            <GlassPanel borderLabel="ID.CARD" className="p-8 h-1/3 flex flex-col justify-center">
               <span className="inline-block px-3 py-1 bg-red-950/40 text-red-400 w-fit rounded-full text-[9px] font-mono uppercase tracking-widest mb-4 border border-red-900/30 shadow-[0_0_10px_rgba(220,38,38,0.2)]">Founder / CEO ARK</span>
               <h2 className="text-2xl font-bold tracking-tight mb-1">Mel Carl A. Chacon</h2>
               <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Class: Systems Engineer // BSIT 2-1
                Bachelor of Science in Information Technology
               </p>
            </GlassPanel>

            <GlassPanel borderLabel="METRIC.DATA" className="p-8 h-1/3 flex flex-col justify-center bg-gradient-to-br from-red-950/20 to-transparent">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest mb-4">Guild Assets Scale</h3>
              <div className="flex items-end justify-between border-b border-white/5 pb-2 mb-2">
                <span className="text-3xl font-black text-white">100+</span>
                <span className="text-xs text-zinc-300 font-light pb-1">Active Guild Members</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-red-500">8</span>
                <span className="text-xs text-zinc-300 font-light pb-1">Core Operational Cells</span>
              </div>
            </GlassPanel>

            <GlassPanel borderLabel="SKILL.TREE" className="p-8 h-1/3 flex flex-col justify-center">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest mb-4">Mastered Skill Passives</h3>
              <ul className="text-xs text-zinc-200 font-medium space-y-3">
                <li className="flex items-start gap-2"><Crosshair size={12} className="text-red-500 mt-0.5 shrink-0"/> Systemic SOP Framework Architecture</li>
                <li className="flex items-start gap-2"><Crosshair size={12} className="text-red-500 mt-0.5 shrink-0"/> Gamified Organization Task Pipelines</li>
                <li className="flex items-start gap-2"><Crosshair size={12} className="text-red-500 mt-0.5 shrink-0"/> Decentralized Talent Incubator Architecture</li>
                <li className="flex items-start gap-2"><Crosshair size={12} className="text-red-500 mt-0.5 shrink-0"/> Sovereign Asset Pipeline Engineering</li>
              </ul>
            </GlassPanel>
          </div>
        </FadeIn>
      </section>

      {/* ========================================== */}
      {/* 02. FULL-SCREEN CINEMATIC MASTER QUOTE     */}
      {/* ========================================== */}
      <section className="h-screen w-full flex items-center justify-center relative border-b border-white/5 snap-start snap-always bg-zinc-950 overflow-hidden z-30">
        <div className="absolute inset-0 bg-zinc-950 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.04)_0%,_transparent_70%)] pointer-events-none z-0" />
        
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] font-black text-white/[0.015] pointer-events-none whitespace-nowrap z-0 select-none tracking-tighter">
          EXECUTION
        </h1>

        <div className="max-w-5xl mx-auto text-center z-10 px-6 relative w-full">
          <div className="absolute -top-16 left-4 md:left-0 text-red-600/10"><Terminal size={48} /></div>
          <div className="absolute -bottom-16 right-4 md:right-0 text-red-600/10"><Code size={48} /></div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, margin: "-10%" }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[90px] font-black text-white leading-[0.9] tracking-tighter uppercase relative z-10 select-none"
          >
            To command the vision, <br />
            <span className="font-serif italic font-light text-red-600 lowercase tracking-normal block my-2">one must ruthlessly</span>
            engineer the execution.
          </motion.h2>
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE ACT I & II: The Foundation       */}
      {/* ========================================== */}
      <section className="min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-24 relative z-20 snap-start">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <FadeIn className="space-y-6" direction="left">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                   <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                   <span className="text-red-500 font-mono text-lg md:text-xl tracking-[0.3em] uppercase font-bold">ACT I // The Sandbox</span>
                </div>
                <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">
                  What am I? A founder? A visionary? A student? An ambitious builder who desperately wants to do it all?
                </p>
                <p className="text-zinc-200 font-bold bg-white/[0.03] border-l-2 border-red-500 pl-4 py-3 my-6 text-base tracking-wide">
                  None of it matters if you cannot execute.
                </p>
                <p className="text-base text-zinc-400 leading-relaxed font-light">
                  I am Mel Carl A. Chacon, 19. Built not by time, but by circumstances. My fuel is obsession.
                </p>
                <p className="text-base text-zinc-400 leading-relaxed font-light">
                  I always hated how the world operates. The baseline surroundings felt suffocating. But I possessed imagination; the exact kind of domain where you code a world inside a sandbox and you become the creator. An Architect. Not designing physical concrete buildings, but engineering absolute systems to force my goals into reality. That is who I am. My specialization is passion.
                </p>
            </FadeIn>
            
            <FadeIn className="space-y-6 flex flex-col justify-between" direction="right" delay={0.2}>
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                       <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                       <span className="text-red-500 font-mono text-lg md:text-xl tracking-[0.3em] uppercase font-bold">ACT II // Illusion of Separation</span>
                    </div>
                    <p className="text-base text-zinc-400 leading-relaxed font-light">
                      It began with a low-end device. As a kid, I saw a digital world, stepped inside, and became completely immersed. Then curiosity piqued: What if I turn my own reality into a game? How realistic, how enjoyable, how unyielding can I engineer it?
                    </p>
                </div>
                
                <div className="pt-12 md:pt-24">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
                      Fast forward <br />
                      to university.
                    </p>
                </div>
            </FadeIn>
        </div>
      </section>

      {/* ========================================== */}
      {/* 06. EXECUTIVE RECORD (Character Passives)  */}
      {/* ========================================== */}
      <section ref={recordsRef} className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-24 bg-[#09090d]/80 border-y border-white/5 relative z-20 backdrop-blur-sm snap-start">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeIn className="mb-16 text-center relative">
            <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block">// Verified Competition Records</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Character Passives.</h2>
            <p className="text-sm text-zinc-300 font-medium leading-relaxed mx-auto max-w-2xl">
              A comprehensive ledger of elite academic standards, world-stage hackathon deployments, and systemic capabilities. Every passive here acts as a permanent multiplier to the ecosystem's baseline velocity.
            </p>
          </FadeIn>
            
          {/* HIGHLIGHTED ACHIEVEMENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 relative z-10">
            
            {/* FEATURED: WORLD HACKATHON FINALIST */}
            <FadeIn className="group relative rounded-[24px] p-[2px] col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] cursor-default">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none"
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #f59e0b 30%, transparent 50%)` }}
              />
              <div className="absolute inset-0 border border-amber-500/20 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0a0a0d] relative z-20 w-full h-full rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none z-0" />
                 
                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 relative z-10 w-full">
                   <div className="text-amber-400 bg-amber-500/10 w-fit p-6 rounded-3xl border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] shrink-0 group-hover:scale-110 transition-transform duration-500">
                     {FEATURED_ACCOLADE.icon}
                   </div>
                   
                   <div className="flex-1 flex flex-col justify-center">
                     <h4 className="font-bold text-[10px] md:text-xs text-amber-500 uppercase tracking-[0.3em] mb-3 font-mono">Mythic Global Achievement</h4>
                     <span className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-lg block mb-4">{FEATURED_ACCOLADE.metric}</span>
                     <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{FEATURED_ACCOLADE.title}</h3>
                     <p className="text-sm text-zinc-400 font-mono mb-4">{FEATURED_ACCOLADE.subtitle}</p>
                     
                     <div className="bg-amber-500/[0.05] border-l-2 border-amber-500 pl-4 py-3 mb-6">
                        <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed italic">"{FEATURED_ACCOLADE.lore}"</p>
                     </div>

                     <div className="flex flex-wrap gap-2">
                        {FEATURED_ACCOLADE.buffs.map((buff, idx) => (
                           <span key={idx} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono tracking-widest uppercase rounded">
                              {buff}
                           </span>
                        ))}
                     </div>
                   </div>
                   
                   <a href={FEATURED_ACCOLADE.link} target="_blank" rel="noreferrer" className="mt-4 lg:mt-0 text-[10px] font-mono text-amber-500 hover:text-black flex items-center justify-center gap-2 border border-amber-500/30 hover:bg-amber-500 px-6 py-4 rounded-xl transition-colors font-bold uppercase tracking-widest shrink-0 self-start lg:self-center shadow-lg w-full lg:w-auto">
                     {FEATURED_ACCOLADE.linkText} <ExternalLink size={14}/>
                   </a>
                 </div>
              </div>
            </FadeIn>

            {/* REGULAR ACCOLADES */}
            {REGULAR_ACCOLADES.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group relative rounded-[20px] p-[2px] overflow-hidden cursor-default shadow-lg flex flex-col">
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none" 
                  style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }} 
                />
                <div className="absolute inset-0 border border-white/10 rounded-[20px] z-10 transition-colors duration-500 group-hover:border-transparent" />
                
                <div className="bg-[#0e0e12] w-full h-full rounded-[18px] p-8 flex flex-col relative z-20">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, #ef4444, transparent 70%)` }} />
                  
                  <div className="flex justify-between items-start z-10 relative mb-6">
                     <div className="text-red-500 bg-red-500/10 w-fit p-4 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500">
                        {item.icon}
                     </div>
                     <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest border border-white/5 bg-white/5 px-2 py-1 rounded">Passive Secured</span>
                  </div>
                  
                  <div className="z-10 relative flex-1 flex flex-col">
                    <h4 className="font-bold text-[10px] text-red-400 uppercase tracking-widest mb-2 font-mono">{item.title}</h4>
                    <span className="text-3xl md:text-4xl font-black text-white block leading-none mb-2 tracking-tight">{item.metric}</span>
                    <p className="text-[10px] text-zinc-400 font-mono mb-4 pb-4 border-b border-white/10">{item.subtitle}</p>
                    
                    <p className="text-xs text-zinc-300 font-light leading-relaxed italic mb-6">"{item.lore}"</p>
                    
                    <div className="mt-auto flex flex-col gap-2">
                      {item.buffs.map((buff, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-red-300 flex items-center gap-1.5 bg-red-950/20 px-2 py-1 rounded w-fit border border-red-900/30">
                           <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"/> {buff}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CAPABILITY MATRICES */}
          <div className="relative z-10">
            <FadeIn className="flex items-center justify-center gap-4 mb-10">
              <span className="w-16 h-[1px] bg-red-500/30" />
              <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest flex items-center gap-2">
                <Layers size={14} className="text-red-500"/> Core Capability Matrices
              </h3>
              <span className="w-16 h-[1px] bg-red-500/30" />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS.map((skill, i) => (
                <FadeIn key={i} delay={i * 0.15} className="group relative rounded-[20px] p-[2px] overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-10 rounded-[20px] pointer-events-none group-hover:from-red-500/10 transition-colors duration-500" />
                  
                  <div className="bg-[#0b0b0f] w-full h-full rounded-[18px] p-8 relative z-20 flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    
                    <h4 className="text-white font-bold text-lg mb-6 pb-4 border-b border-white/10 flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> {skill.category}
                    </h4>
                    
                    <ul className="space-y-4">
                      {skill.tags.map((tag, idx) => (
                        <li key={idx} className="text-xs font-mono text-zinc-300 flex items-center gap-3 group/item">
                          <span className="text-red-600 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300">&gt;</span> 
                          <span className="group-hover/item:text-white transition-colors">{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE ACT III: The Mission Bridge      */}
      {/* ========================================== */}
      <section className="min-h-screen w-full flex flex-col justify-center py-32 px-6 md:px-24 relative z-20 snap-start">
        <div className="max-w-5xl mx-auto w-full text-center">
          <FadeIn>
            <span className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 block">ACT III // The Target Coordinates</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-white">The Mission Framework</h2>
          </FadeIn>
          
          <FadeIn delay={0.2} className="text-white font-medium border border-white/10 rounded-2xl p-6 md:p-8 bg-[#111116]/80 backdrop-blur-md shadow-2xl text-left mx-auto max-w-3xl mb-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
             <p className="text-sm md:text-base leading-relaxed tracking-wide">
                <span className="font-bold text-red-500 mr-2">THE MISSION:</span> 
                To construct the leading independent, student-led Game Developer Studio and Startup Incubator in the Philippines. Why? Why not? If you are going to aim for a coordinate, aim for the stars.
             </p>
          </FadeIn>

          <FadeIn delay={0.4} className="space-y-6 max-w-2xl mx-auto text-left">
             <p className="text-sm text-zinc-400 leading-relaxed font-light">
               At first, I was naive. Scared. A fresh node stepping into an uncharted environment. I thought I was prepared, but that baseline security was an illusion. My vision was simply too massive for the default environment to accommodate.
             </p>
             <p className="text-sm text-zinc-400 leading-relaxed font-light">
               I watched everyone else follow the traditional corporate pipeline. But has anyone ever achieved legendary scale by doing what the majority does?
             </p>
             <p className="text-sm text-white leading-relaxed font-medium italic mt-8 border-t border-white/5 pt-8">
               &ldquo;I beg to differ. A man who follows the crowd will get no further than the crowd. The man who walks alone is bound to find himself in places no one has ever stepped before.&rdquo;
             </p>
          </FadeIn>
        </div>
      </section>

      {/* ========================================== */}
      {/* 03. RECONNAISSANCE: THE PYRAMID BADGE BOOK */}
      {/* ========================================== */}
      <section ref={reconRef} className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-24 relative z-20 border-t border-white/5 snap-start">
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 w-full">
          
          <FadeIn className="mb-20 text-center relative w-full max-w-2xl">
            <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block">// Achievement Book</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Strategic Reconnaissance.</h2>
            <p className="text-sm text-zinc-300 font-medium leading-relaxed mx-auto">
              Every position held across the Philippine tech landscape was an active deployment to harvest system metrics. Click an item card to audit the full badge record layout.
            </p>
          </FadeIn>

          {/* THE HIERARCHICAL PYRAMID MATRIX */}
          <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-[900px] relative">
            <div className="absolute top-20 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-red-600/50 via-white/10 to-transparent -z-10" />

            {BADGE_TIERS.map((tier, tierIdx) => (
              tier.items.length > 0 && (
                <FadeIn key={tier.id} delay={tierIdx * 0.15} className="flex flex-col items-center w-full relative">
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
                    {tier.items.map((badge, i) => (
                      <div key={i} className="w-[160px] sm:w-[190px] md:w-[220px] min-h-[220px]">
                        <InteractiveBadgeCard badge={badge} onClick={() => setActiveBadge(badge)} />
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )
            ))}
          </div>

          {/* DYNAMIC LIGHTBOX OVERLAY */}
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
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-[12px]" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-[12px]" />

                  <div className="flex justify-between items-start border-b border-white/5 pb-4 relative z-10">
                    <div>
                      <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded border inline-block ${activeBadge.rarityColor}`}>
                        {activeBadge.rarity}
                      </span>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-2">{activeBadge.role}</h3>
                      <p className="text-sm font-serif italic text-zinc-300 mt-0.5">{activeBadge.org}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black shrink-0 ml-4">
                      <img src={activeBadge.logoImg} alt={activeBadge.org} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black/80 relative z-10">
                    <img 
                      src={activeBadge.eventImg} 
                      alt="Verified Event Deployment Action" 
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.9]"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md font-mono text-[9px] text-red-400 tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> VERIFIED_RECORD // FIELD_NODE: {activeBadge.domain}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono pt-2 relative z-10">
                    <span className="text-zinc-400">NODE STATUS: SECURED</span>
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
          <FadeIn className="mt-40 w-full text-left relative z-10">
             <span className="text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase mb-6 block pl-4 border-l-2 border-zinc-700">// Raw Operational Field Data Stream</span>
             <div className="w-full overflow-hidden border-y border-white/5 bg-black/40 py-10 backdrop-blur-sm relative">
                <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-[#0b0b0f] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-[#0b0b0f] to-transparent z-10 pointer-events-none" />
                
                <motion.div animate={{ x: ["0%", "-10%"] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="flex gap-6 w-max">
                   {[...EVENT_COLLECTION, ...EVENT_COLLECTION, ...EVENT_COLLECTION, ...EVENT_COLLECTION].map((imgSrc, i) => (
                     <div key={i} className="w-80 md:w-96 lg:w-[450px] aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0 hover:scale-[1.02] transition-all duration-500 relative group shadow-2xl">
                        <img src={imgSrc} alt="Field Operation" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/60 transition-colors rounded-2xl z-10 shadow-[inset_0_0_20px_rgba(220,38,38,0)] group-hover:shadow-[inset_0_0_20px_rgba(220,38,38,0.3)]" />
                     </div>
                   ))}
                </motion.div>
             </div>
          </FadeIn>
        </div>
      </section>

            {/* ========================================== */}
      {/* 05. CORE ENGINEERING (Projects Bento)      */}
      {/* ========================================== */}
      <section ref={projectsRef} className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-24 border-t border-white/5 relative z-20 backdrop-blur-sm snap-start">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="mb-16 text-center relative">
            <span className="text-xs font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block pl-4 border-l-2 border-red-700 w-fit mx-auto">// Core Operational Deployments</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white">System Architecture.</h2>
            <p className="text-base text-zinc-300 font-medium max-w-2xl leading-relaxed mx-auto">
              A comprehensive ledger of verified software blueprints, interactive application pipelines, and flagship game builds engineered under absolute execution within the ARK ecosystem.
            </p>
          </div>
            
          {/* HIGH-LEVEL PROJECT GRID (ACHIEVEMENT STYLE) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 relative z-10">
            
            {/* FEATURED FLAGSHIP: CODE WHITE - FULL WIDTH (12 COLS) */}
            <div className="group relative rounded-[24px] p-[2px] col-span-1 md:col-span-12 overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.2)] cursor-default">
              {/* Spinning Glow Border */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none"
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }}
              />
              <div className="absolute inset-0 border border-red-500/20 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0a0a0d] relative z-20 w-full h-full rounded-[22px] p-8 md:p-12 flex flex-col lg:flex-row items-stretch gap-12">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none z-0" />
                 
                 <div className="flex-1 flex flex-col justify-center relative z-10">
                   <h4 className="font-bold text-xs text-red-500 uppercase tracking-[0.3em] mb-4 font-mono border-b border-red-900/50 pb-2 w-fit">Mythic ARK Deployment</h4>
                   <span className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-lg block mb-4">Code White</span>
                   <p className="text-sm text-zinc-400 font-mono mb-8 uppercase tracking-wider flex items-center gap-2">
                     / The Observer <span className="text-red-600 font-bold">• Flagship Exhibition Asset</span>
                   </p>
                   
                   <div className="bg-red-500/[0.05] border-l-2 border-red-500 pl-5 py-4 mb-8 relative overflow-hidden group/lore">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay group-hover/lore:scale-110 transition-transform duration-700 pointer-events-none" />
                      <p className="text-base text-zinc-300 font-light leading-relaxed italic relative z-10">
                         "Architected representing the ARK guild on the national stage at PGDX, engineered as a flagship demonstration of systemic, suspenseful analog framework architecture."
                      </p>
                   </div>

                   <div className="flex flex-wrap gap-3">
                      {["+ National Exhibition", "+ Analog Horror Mech", "+ Game Systems Design"].map((buff, idx) => (
                         <span key={idx} className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-widest uppercase rounded">
                            {buff}
                         </span>
                      ))}
                   </div>
                 </div>

                 {/* CODE WHITE PRESENTATION FRAME */}
                 <div className="w-full lg:w-1/2 aspect-video border border-white/10 rounded-3xl overflow-hidden bg-[#09090c] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] shrink-0 self-center flex items-center justify-center p-12 md:p-16 relative z-10">
                   <img src="/events/CodeWhite.png" alt="Code White Flagship Logo" className="w-full h-full object-contain drop-shadow-2xl filter contrast-[1.1] group-hover:scale-105 transition-transform duration-500" />
                 </div>
              </div>
            </div>

            {/* REGULAR DEPLOYMENT: THYNKORA AI - HALF WIDTH (6 COLS) */}
            <div className="group relative rounded-[24px] p-[2px] col-span-1 lg:col-span-6 overflow-hidden cursor-default shadow-lg flex flex-col">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none" 
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #22d3ee 30%, transparent 50%)` }} 
              />
              <div className="absolute inset-0 border border-white/10 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0e0e12] w-full h-full rounded-[22px] p-8 md:p-10 flex flex-col relative z-20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, #22d3ee, transparent 70%)` }} />
                
                <div className="flex justify-between items-start z-10 relative mb-8">
                   <div className="text-cyan-400 bg-cyan-500/10 w-fit p-5 rounded-2xl border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500">
                      <Code size={28} />
                   </div>
                   <div className="flex items-center gap-3">
                     <a href="https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/60 hover:border-cyan-500/50 hover:bg-cyan-950/40 hover:text-cyan-400 transition-colors"><ExternalLink size={20}/></a>
                     <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest border border-white/5 bg-white/5 px-3 py-1.5 rounded">Build Active</span>
                   </div>
                </div>
                
                <div className="z-10 relative flex-1 flex flex-col">
                  <h4 className="font-bold text-xs text-cyan-400 uppercase tracking-widest mb-3 font-mono">Sovereign Deployment</h4>
                  <span className="text-4xl md:text-5xl font-black text-white block leading-tight mb-3 tracking-tight">Thynkora AI</span>
                  <p className="text-xs md:text-sm text-zinc-400 font-mono mb-6 pb-6 border-b border-white/10">World Hackathon Finals deployment for ICP Hub</p>
                  
                  <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed italic mb-8">"Engineered sovereign Next.js and Motoko smart contracts bridging decentralized Web2 interfaces to Web3 blockchain infrastructure."</p>
                  
                  {/* Dashboard Image - Now taller and edge-to-edge */}
                  <div className="mt-auto w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-[#09090c] shadow-lg relative z-10 mb-6">
                    <img src="/events/thynkora_dashboard.png" alt="Thynkora UI System" className="w-full h-full object-cover object-top filter contrast-[1.05]" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["+ Web3 Architecture", "+ Sovereign Engineering", "+ High-Pressure Execution"].map((buff, idx) => (
                      <span key={idx} className="text-xs font-mono text-cyan-300 flex items-center gap-2 bg-cyan-950/20 px-3 py-1.5 rounded border border-cyan-900/30">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"/> {buff}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* REGULAR DEPLOYMENT: ARK INCUBATOR - HALF WIDTH (6 COLS) */}
            <div className="group relative rounded-[24px] p-[2px] col-span-1 lg:col-span-6 overflow-hidden cursor-default shadow-lg flex flex-col">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none" 
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }} 
              />
              <div className="absolute inset-0 border border-white/10 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0e0e12] w-full h-full rounded-[22px] p-8 md:p-10 flex flex-col relative z-20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, #ef4444, transparent 70%)` }} />
                
                <div className="flex justify-between items-start z-10 relative mb-8">
                   <div className="text-red-500 bg-red-500/10 w-fit p-5 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500">
                      <Swords size={28} />
                   </div>
                   <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest border border-white/5 bg-white/5 px-3 py-1.5 rounded">Pipeline Stable</span>
                </div>
                
                <div className="z-10 relative flex-1 flex flex-col">
                  <h4 className="font-bold text-xs text-red-400 uppercase tracking-widest mb-3 font-mono">Guild Incubation Architecture</h4>
                  <span className="text-4xl md:text-5xl font-black text-white block leading-tight mb-3 tracking-tight">ARK Incubator</span>
                  <p className="text-xs md:text-sm text-zinc-400 font-mono mb-6 pb-6 border-b border-white/10">Pipeline ships achieving national competitive status</p>
                  
                  <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed italic mb-8">"Engineered the organizational runway for ARK members to seamlessly deploy operational builds to Itch.io and achieve national recognition."</p>
                  
                  {/* Ships Grid - Enlarged aspect ratios */}
                  <div className="mt-auto grid grid-cols-2 gap-4 mb-6 relative z-10">
                    <div className="flex flex-col gap-3 group/item">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#09090c] shadow-lg relative z-10">
                        <img src="/events/bangungot.jpg" alt="Bangungot Cover" className="absolute inset-0 w-full h-full object-cover object-center group-hover/item:scale-105 transition-transform duration-500" />
                      </div>
                      <a href="https://leeprince.itch.io/bangungot" target="_blank" rel="noreferrer" className="text-xs font-mono uppercase text-red-400 flex items-center gap-1.5 hover:text-white transition-colors">Bangungot <ExternalLink size={12}/></a>
                    </div>
                    <div className="flex flex-col gap-3 group/item">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#09090c] shadow-lg relative z-10">
                        <img src="/events/checkmate.png" alt="Checkmate Cover" className="absolute inset-0 w-full h-full object-cover object-center group-hover/item:scale-105 transition-transform duration-500" />
                      </div>
                      <a href="https://jokumaaa.itch.io/checkmate" target="_blank" rel="noreferrer" className="text-xs font-mono uppercase text-red-400 flex items-center gap-1.5 hover:text-white transition-colors">Checkmate <ExternalLink size={12}/></a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["+ Ecosystem Scaling", "+ Pipeline Engineering", "+ Node Leadership"].map((buff, idx) => (
                      <span key={idx} className="text-xs font-mono text-red-300 flex items-center gap-2 bg-red-950/20 px-3 py-1.5 rounded border border-red-900/30">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> {buff}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* REGULAR DEPLOYMENT: BSIT PORTAL - FULL WIDTH HORIZONTAL (12 COLS) */}
            <div className="group relative rounded-[24px] p-[2px] col-span-1 md:col-span-12 overflow-hidden cursor-default shadow-lg flex flex-col">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500 z-0 pointer-events-none" 
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }} 
              />
              <div className="absolute inset-0 border border-white/10 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0e0e12] w-full h-full rounded-[22px] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative z-20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.10] transition-opacity duration-500 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, #ef4444, transparent 70%)` }} />
                
                {/* Left Side: Information */}
                <div className="w-full lg:w-5/12 z-10 relative flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                     <div className="text-red-500 bg-red-500/10 w-fit p-4 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:scale-110 transition-all duration-500">
                        <Target size={28} />
                     </div>
                     <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest border border-white/5 bg-white/5 px-3 py-1.5 rounded">Institutional Verified</span>
                  </div>
                  
                  <h4 className="font-bold text-xs text-red-400 uppercase tracking-widest mb-3 font-mono">Institutional Integration Deployment</h4>
                  <span className="text-4xl md:text-5xl font-black text-white block leading-tight mb-3 tracking-tight">BSIT Portal</span>
                  <p className="text-xs md:text-sm text-zinc-400 font-mono mb-6 pb-6 border-b border-white/10">Architecture for Departmental Digitization (May 2026)</p>
                  
                  <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed italic mb-8">"Architected a centralized web ecosystem to digitize institutional data submission directly for the Department Chairperson."</p>

                  <div className="flex flex-wrap gap-2">
                    {["+ Institutional Trust", "+ Cognitive Bandwidth", "+ Systems Design"].map((buff, idx) => (
                      <span key={idx} className="text-xs font-mono text-red-300 flex items-center gap-2 bg-red-950/20 px-3 py-1.5 rounded border border-red-900/30">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> {buff}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Massive Portal Image */}
                <div className="w-1/5 lg:w-7/12 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#09090c] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] relative z-10 shrink-0">
                   <img src="/events/DIT.png" alt="BSIT Portal Screenshot" className="w-full h-full object-cover object-top filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* ========================================== */}
      {/* 09. NEW: ARK ECOSYSTEM BREAKDOWN           */}
      {/* ========================================== */}
      <section ref={arkRef} className="min-h-screen w-full flex flex-col justify-center py-32 px-6 md:px-24 relative z-20 snap-start border-t border-white/5 bg-[#09090d]">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
            
            {/* Left Column: The Narrative, Logo & Quote */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8 relative">
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 blur-[120px] pointer-events-none z-0" />
              
              <FadeIn className="relative z-10" direction="left">
                <span className="text-[10px] font-mono text-red-600 tracking-[0.2em] uppercase mb-4 block border-l-2 border-red-700 pl-3 w-fit">// Ecosystem Architecture</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.85] text-white">ARK<br/><span className="text-3xl md:text-5xl text-zinc-500">Ph.Tech</span></h2>
              </FadeIn>
              
              <FadeIn delay={0.2} direction="left" className="w-32 h-32 md:w-48 md:h-48 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 bg-black shadow-2xl relative z-10 mb-2 shrink-0 group">
                 <img src="/ark_logo.png" alt="ARK Ecosystem Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </FadeIn>

              <FadeIn delay={0.3} direction="left" className="text-base text-zinc-300 font-light leading-relaxed relative z-10">
                ARK is not just a community; it is a meticulously scaled experiment in organizational autonomy. It acts as a massive operational engine designed to pull raw student potential and forge it into industry-ready deployment pipelines.
              </FadeIn>

              <FadeIn delay={0.4} direction="left" className="bg-red-500/[0.03] border-l-2 border-red-500 p-6 flex items-center rounded-r-2xl shadow-lg relative z-10">
                <p className="text-sm md:text-base text-white font-bold tracking-wide italic leading-relaxed">
                  "I do not just build the games. I build the machine that builds the developers."
                </p>
              </FadeIn>
            </div>

            {/* Right Column: The Core Mechanics & Call to Action */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6 relative z-10">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none z-0 animate-[spin_6s_linear_infinite]"
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn direction="right" delay={0.1} className="group relative rounded-[20px] p-[2px] overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors shadow-xl z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-10 rounded-[20px] pointer-events-none group-hover:from-red-500/10 transition-colors duration-500" />
                  <div className="bg-[#0b0b0f] w-full h-full rounded-[18px] p-8 relative z-20 flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all duration-500"><Layers size={24}/></div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">The 8-Department Topology</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      Structured the ecosystem into 8 specialized nodes (Engineering, Media, Member Development, etc.). The framework allows departments to communicate and execute cross-functional tasks without the founder becoming an operational bottleneck.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.2} className="group relative rounded-[20px] p-[2px] overflow-hidden bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors shadow-xl z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-10 rounded-[20px] pointer-events-none group-hover:from-amber-500/10 transition-colors duration-500" />
                  <div className="bg-[#0b0b0f] w-full h-full rounded-[18px] p-8 relative z-20 flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all duration-500"><Terminal size={24}/></div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Gamified Progression Loop</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      Implemented standard operating procedures structured like RPG progression. Raw first-year volunteer nodes level up through structured task completion, transforming into highly autonomous project facilitators.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.3} className="group relative rounded-[20px] p-[2px] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors shadow-xl z-10 md:col-span-2">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent z-10 rounded-[20px] pointer-events-none group-hover:from-cyan-500/10 transition-colors duration-500" />
                  <div className="bg-[#0b0b0f] w-full h-full rounded-[18px] p-8 relative z-20 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all duration-500"><Activity size={24}/></div>
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">High-Scale Asset Velocity</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                        By stabilizing the internal architecture, ARK maintains an active pipeline of 100+ student creators. This operational velocity allows us to continuously conceptualize, build, and ship production-ready assets to national events and exhibitions seamlessly.
                      </p>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-6 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 w-full md:w-auto shrink-0 mt-6 md:mt-0">
                      <div>
                        <span className="block text-4xl md:text-5xl font-black text-white tracking-tighter">100+</span>
                        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> Active Creators
                        </span>
                      </div>
                      <div>
                        <span className="block text-4xl md:text-5xl font-black text-white tracking-tighter">8</span>
                        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest flex items-center gap-2 mt-1">
                           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> Core Divisions
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <FadeIn direction="right" delay={0.4}>
                <a href="https://www.arkph.tech/" target="_blank" rel="noreferrer" className="w-full group relative flex items-center justify-between p-6 bg-[#0e0e12] border border-red-500/20 rounded-2xl hover:border-red-500/60 transition-all overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)] mt-2 z-10">
                  <div className="absolute inset-0 w-full h-full bg-red-600/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 flex flex-col">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-1 block">Live Domain</span>
                    <span className="text-white font-bold text-base md:text-lg">Access Ecosystem Interface</span>
                  </div>
                  <Globe size={24} className="text-red-500 group-hover:text-white relative z-10 transition-colors group-hover:animate-pulse shrink-0"/>
                </a>
              </FadeIn>

            </div>
          </div>

          {/* ========================================== */}
          {/* STRATEGIC INTEGRATIONS & ALIGNMENTS        */}
          {/* ========================================== */}
          <div className="mt-32 pt-20 border-t border-white/5 w-full relative z-10">
            <FadeIn className="text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-16 flex items-center justify-center gap-6">
              <span className="w-16 h-[1px] bg-zinc-700"/> Strategic Integrations <span className="w-16 h-[1px] bg-zinc-700"/>
            </FadeIn>
            
            <div className="flex flex-col gap-8 relative z-10">
              
              <FadeIn className="w-full group relative rounded-[24px] p-[2px] overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] cursor-default">
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-700 z-0 pointer-events-none"
                  style={{ background: `conic-gradient(from 0deg, transparent 0%, #22c55e 30%, transparent 50%)` }}
                />
                <div className="absolute inset-0 border border-green-500/20 rounded-[24px] z-10 transition-colors duration-500 group-hover:border-transparent" />
                
                <div className="bg-[#0a0a0d] relative z-20 w-full rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[80px] pointer-events-none z-0" />
                   
                   <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-green-950/30 border border-green-500/20 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform duration-500">
                      <Database size={40} className="text-green-500" />
                   </div>

                   <div className="flex-1 text-center md:text-left z-10">
                     <h4 className="font-bold text-[10px] md:text-xs text-green-500 uppercase tracking-[0.3em] mb-2 font-mono">Official Tech Partner</h4>
                     <span className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight block mb-4">DataCamp</span>
                     <p className="text-sm text-zinc-400 font-light max-w-xl mx-auto md:mx-0">
                       Integrated into the ecosystem to provide institutional-grade data science, AI, and machine learning curriculum pipelines for core members.
                     </p>
                   </div>

                   <div className="shrink-0 z-10">
                      <span className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono tracking-widest uppercase rounded-full flex items-center gap-2 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Integration Active
                      </span>
                   </div>
                </div>
              </FadeIn>

              <div className="w-full mt-4">
                <FadeIn className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] text-center">Community Partner Nodes</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "AFK", icon: <Gamepad2 size={24}/>, color: "hover:border-purple-500/50 hover:bg-purple-900/10 hover:text-purple-400" },
                    { name: "Philippine Blockchain Week", icon: <Hexagon size={24}/>, color: "hover:border-blue-500/50 hover:bg-blue-900/10 hover:text-blue-400" },
                    { name: "Arduino Day PH", icon: <Cpu size={24}/>, color: "hover:border-teal-500/50 hover:bg-teal-900/10 hover:text-teal-400" },
                    { name: "YGG Play Summit", icon: <Swords size={24}/>, color: "hover:border-yellow-500/50 hover:bg-yellow-900/10 hover:text-yellow-400" },
                    { name: "AWS Learning Club", desc: "TUP Manila", icon: <Cloud size={24}/>, color: "hover:border-orange-500/50 hover:bg-orange-900/10 hover:text-orange-400" },
                    { name: "The Programmers' Guild", desc: "PUP Manila", icon: <Terminal size={24}/>, color: "hover:border-red-500/50 hover:bg-red-900/10 hover:text-red-400" },
                    { name: "DevCon Manila", icon: <Code size={24}/>, color: "hover:border-indigo-500/50 hover:bg-indigo-900/10 hover:text-indigo-400" },
                    { name: "Workflow PH", icon: <GitMerge size={24}/>, color: "hover:border-pink-500/50 hover:bg-pink-900/10 hover:text-pink-400" }
                  ].map((partner, idx) => (
                    <FadeIn key={idx} delay={idx * 0.05} className={`group relative p-8 rounded-2xl bg-[#0a0a0d] border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-300 ${partner.color} shadow-lg cursor-default`}>
                      <div className="mb-5 text-zinc-600 transition-colors duration-300 group-hover:scale-110 transform">
                        {partner.icon}
                      </div>
                      <h5 className="font-bold text-sm text-zinc-200 tracking-tight group-hover:text-white transition-colors leading-tight">
                        {partner.name}
                      </h5>
                      {partner.desc && (
                        <span className="text-[9px] font-mono text-zinc-500 mt-2 tracking-widest uppercase">
                          {partner.desc}
                        </span>
                      )}
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-current rotate-45 opacity-20" />
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

{/* ========================================== */}
      {/* 08. SECURE CONTACT TERMINAL                */}
      {/* ========================================== */}
      <footer ref={contactRef} className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-24 bg-[#050505] relative overflow-hidden border-t border-white/5 z-20 snap-start">
        <div className="max-w-7xl mx-auto relative w-full z-10">
          
          <h1 className="absolute top-10 left-0 text-[18vw] font-black text-white/[0.015] leading-none tracking-tighter uppercase pointer-events-none select-none z-0 whitespace-nowrap">
            CONTACT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 relative z-10 pt-20">
            <FadeIn className="flex flex-col justify-start" direction="left">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white flex items-center gap-4">
                  Reach out <ArrowUpRight className="text-white" size={48} strokeWidth={3}/>
                </h2>
                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 rounded-xl bg-[#0a0a0d] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/20 transition-all shadow-lg"><FaTwitter size={18}/></a>
                  <a href="https://www.facebook.com/akumahonoyami" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#0a0a0d] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/20 transition-all shadow-lg"><FaFacebook size={18}/></a>
                  <a href="https://www.instagram.com/kuru.3437/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#0a0a0d] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/20 transition-all shadow-lg"><FaInstagram size={18}/></a>
                </div>
              </div>

              <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-sm">
                Have a project in mind, a partnership proposal, or just want to talk systems design and game development? Drop a message below. Whether you are looking to collaborate with ARK or discuss technical execution, I’m always open to high-impact opportunities.
              </p>
              
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-zinc-300 font-light text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0"><Check size={12}/></div>
                  Strategic Collaboration: Let’s discuss scaling organizational systems or joint ventures.
                </li>
                <li className="flex items-center gap-4 text-zinc-300 font-light text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0"><Check size={12}/></div>
                  Technical Execution: Inquiries regarding game development, pipelines, or performance editing.
                </li>
                <li className="flex items-center gap-4 text-zinc-300 font-light text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0"><Check size={12}/></div>
                  Direct Access: Skip the layers—you are communicating directly with the founder.
                </li>
              </ul>
            </FadeIn>

            {/* HIGH-TECH CONTACT FORM */}
            <FadeIn className="group relative rounded-[32px] p-[2px] overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.1)] cursor-default h-fit" direction="right">
              {/* Spinning Glow Border */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-700 z-0 pointer-events-none"
                style={{ background: `conic-gradient(from 0deg, transparent 0%, #ef4444 30%, transparent 50%)` }}
              />
              <div className="absolute inset-0 border border-red-500/20 rounded-[32px] z-10 transition-colors duration-500 group-hover:border-transparent" />
              
              <div className="bg-[#0a0a0d] relative z-20 w-full rounded-[30px] p-8 md:p-10 flex flex-col shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] pointer-events-none z-0" />
                 
                 <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                      <span className="text-red-500 font-mono text-xs tracking-[0.2em] uppercase font-bold">Initialize Secure Connection</span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Designation (Name)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:bg-red-500/5 transition-colors w-full shadow-inner" />
                      <input type="email" placeholder="Comms Link (Email)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:bg-red-500/5 transition-colors w-full shadow-inner" />
                   </div>
                   <textarea placeholder="Transmit Query / Proposal..." className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:bg-red-500/5 transition-colors w-full h-40 resize-none shadow-inner mb-6"></textarea>
                   
                   <button className="w-full bg-red-600/10 border border-red-500/30 text-red-500 font-mono font-bold uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center gap-3">
                     Transmit Data <ArrowUpRight size={18} />
                   </button>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* CONTACT INFO NODES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <FadeIn delay={0.1}>
              <div className="group relative p-8 rounded-2xl bg-[#0a0a0d] border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/10 shadow-lg cursor-default h-full">
                <div className="mb-5 text-zinc-600 transition-colors duration-300 group-hover:text-red-500 group-hover:scale-110 transform">
                  <Mail size={28}/>
                </div>
                <h4 className="text-white font-bold mb-2 tracking-tight">Direct Comms</h4>
                <p className="text-sm text-zinc-500 font-mono tracking-wide">melcarl.chacon@gmail.com</p>
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rotate-45 opacity-20" />
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="group relative p-8 rounded-2xl bg-[#0a0a0d] border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/10 shadow-lg cursor-default h-full">
                <div className="mb-5 text-zinc-600 transition-colors duration-300 group-hover:text-red-500 group-hover:scale-110 transform">
                  <Phone size={28}/>
                </div>
                <h4 className="text-white font-bold mb-2 tracking-tight">Voice Channel</h4>
                <p className="text-sm text-zinc-500 font-mono tracking-wide">+63 (9936907577)</p>
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rotate-45 opacity-20" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group relative p-8 rounded-2xl bg-[#0a0a0d] border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-500/50 hover:bg-red-900/10 shadow-lg cursor-default h-full">
                <div className="mb-5 text-zinc-600 transition-colors duration-300 group-hover:text-red-500 group-hover:scale-110 transform">
                  <MapPin size={28}/>
                </div>
                <h4 className="text-white font-bold mb-2 tracking-tight">Deployment Zone</h4>
                <p className="text-sm text-zinc-500 font-mono tracking-wide">Manila, Philippines</p>
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-[-16px] right-[-16px] w-8 h-8 bg-red-500 rotate-45 opacity-20" />
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="text-center mt-32 relative z-10 flex flex-col items-center">
            <span className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-zinc-500 tracking-widest mb-6">Testimonials</span>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">Endorsements & Reviews</h3>
            <h3 className="text-2xl md:text-4xl font-serif italic text-zinc-500 max-w-4xl mx-auto leading-relaxed mt-4">
              "Trusted by 100+ peers, developers, and collaborators across the local tech and game dev ecosystem."
            </h3>
            <p className="text-center text-[9px] font-mono text-zinc-600 tracking-widest uppercase mt-24">© 2026 // Engineered for Absolute Execution.</p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}