import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowDownCircle, ArrowUpCircle } from "./icons/icons";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { TypeAnimation } from "react-type-animation";
import Plx from "react-plx";

const PORTFOLIO_SYSTEMS = [
  {
    id: "SYS-01",
    code: "NN-AUDIO // DEMUCS-CNN",
    jp: "深層音源分離・神経転写",
    title: "Demucs & Basic Pitch Neural Audio",
    category: "DEEP LEARNING / AUDIO DSP",
    rarity: "★★★★★★",
    repoUrl: "https://github.com/cnsaavedra",
    tags: [
      "PyTorch Demucs v4",
      "Spotify Basic Pitch CNN (ICASSP 2022)",
      "ONNX Runtime",
      "Frequency-Band Onset Classifier",
    ],
    metrics: [
      { label: "FALSE-POSITIVE PRUNING", value: "2,809 → 1,274 notes (-54.6%)" },
      { label: "CPU ONNX INFERENCE", value: "~3s / 15s clip · ~25s / 3m song" },
      { label: "SEPARATION TOPOLOGY", value: "4-Stem Isolated Waveform → MIDI" },
    ],
    pipeline: [
      "RAW MIX WAV",
      "DEMUCS 4-STEM",
      "BASIC PITCH CNN (ONNX)",
      "FREQ-BOUND PRUNING",
      "MULTITRACK .MID",
    ],
    bullets: [
      "Splits full songs into isolated 4-stem WAV files with PyTorch Demucs first so bass notes and vocal overtones never collide inside the transcription network.",
      "Runs Spotify's Basic Pitch polyphonic convolutional neural network on CPU via ONNX Runtime to convert isolated audio stems directly into playable multitrack MIDI.",
      "Constrains each stem to the frequency band its instrument can physically play and tunes neural confidence thresholds, cutting cymbal-wash false positives on a 3-minute song from 2,809 raw notes down to 1,274 clean notes.",
      "Pairs melodic neural inference with a custom drum onset and frequency-band classifier that maps isolated percussion hits into kick, snare, and hi-hat grooves.",
    ],
    visualType: "neural-audio",
  },
  {
    id: "SYS-02",
    code: "DSP-COMPILER // MUSICORE",
    jp: "音響信号解析・バイナリ合成",
    title: "Musicore Signal & Binary FLP Engine",
    category: "SIGNAL PROCESSING / DSP",
    rarity: "★★★★★★",
    repoUrl: "https://github.com/cnsaavedra/MUSICORE-PIPELINE",
    tags: [
      "SciPy / NumPy DSP",
      "12-Pitch Chroma Correlation",
      "BS.1770 LUFS Metering",
      "Deterministic Binary Compiler",
    ],
    metrics: [
      { label: "CHROMA CORRELATION GATE", value: "≥ 0.65 active-frame match" },
      { label: "ONSET ALIGNMENT TOLERANCE", value: "≤ 20ms stem-to-MIDI lock" },
      { label: "MASTER LOUDNESS TARGET", value: "-11.5 LUFS · ≤ -1.0 dBTP" },
    ],
    pipeline: [
      "WAV + MIDI STEMS",
      "ONSET & CHROMA FIT",
      "ROLE CLASSIFIER",
      "BS.1770 GAIN STAGE",
      "NATIVE .FLP BINARY",
    ],
    bullets: [
      "Analyzes local WAV stems and MIDI tracks offline with NumPy and SciPy to compile a fully routed, ready-to-record FL Studio project file without opening the DAW.",
      "Scores every candidate MIDI note against the isolated audio stem—requiring an audio onset within 20 milliseconds and at least 0.65 relative chroma correlation on active frames before confirming a layer.",
      "Classifies confirmed harmonic parts into musical roles (Chord Body, Mid Pad, Hook Lead, Upper Pluck Arp) and computes bounded spectral EQ pockets (-2.5 dB at 3.52 kHz) so vocals sit cleanly in the mix.",
      "Calculates offline BS.1770 and RMS loudness headroom across all staged stems to set master pre-glue drive (-12 to +6 dB) with byte-identical parser roundtrips.",
    ],
    visualType: "dsp-compiler",
  },
  {
    id: "SYS-03",
    code: "NLP-DECISION // PICK-FOR-US",
    jp: "自然言語処理・合意形成推論",
    title: "Pick For Us",
    category: "NLP / SOCIAL CHOICE ENGINE",
    rarity: "★★★★★★",
    repoUrl: "https://github.com/cnsaavedra/pickforus",
    tags: [
      "NegEx Clause Negation (Chapman 2001)",
      "Word-Boundary Gazetteer",
      "Damerau-Levenshtein ≤ 1",
      "Combined Approval Voting {-1, 0, +1}",
    ],
    metrics: [
      { label: "DECISION WINDOW", value: "60-second anonymous blitz" },
      { label: "TYPO RECOVERY", value: "O(min(|a|,|b|)) edit distance ≤ 1" },
      { label: "BALLOT AGGREGATION", value: "{-1, 0, +1} spam-capped tally" },
    ],
    pipeline: [
      "60S LIVE CHAT",
      "NEGEX CLAUSE SPLIT",
      "GAZETTEER + LEVENSHTEIN",
      "APPROVAL VOTING {-1,0,+1}",
      "TRACEABLE TOP-3 VERDICT",
    ],
    bullets: [
      "Hanging out with friends and everyone is indecisive? Everyone joins a 60-second anonymous room and types honest cravings and vetoes before politeness stalls the group.",
      "Segments natural-language chat with NegEx clause-scope negation so messages like 'ramen sounds good no sushi' or 'I don't want burger' veto only the negated clause while keeping positive cravings intact.",
      "Matches multi-word phrases through a longest-phrase word-boundary Gazetteer and recovers single-edit typos ('spagetti' → Spaghetti, 'ramne' → Ramen) via Damerau-Levenshtein distance ≤ 1.",
      "Aggregates ballots using Combined Approval Voting {-1, 0, +1}—preventing vote-splitting, capping single-user repeat spam ('You have duplicates, but we fixed that for you'), and rendering an inspectable step-by-step algorithm trace.",
    ],
    visualType: "pickforus",
    images: [
      {
        caption: "01 // MAIN_LOBBY — 60-second room initialization & mode selection",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/mainmenu.png",
      },
      {
        caption: "02 // ANONYMOUS_STREAM — Live natural-language chat & timer countdown",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/chatscreenfood.png",
      },
      {
        caption: "03 // GAZETTEER_PARSE — Clause polarity & entity extraction matrix",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/databasefood.png",
      },
      {
        caption: "04 // APPROVAL_VERDICT — Negation-filtered Top 3 & duplicate spam guard",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/suggestionfoodv2.png",
      },
    ],
  },
  {
    id: "SYS-04",
    code: "VOICE-LLM // HOOK-NPC-BUS",
    jp: "音声認識・自律エージェント基盤",
    title: "Voice AI, Faster-Whisper & Multi-Agent Bus",
    category: "SPEECH AI / NEURAL AGENTS",
    rarity: "★★★★★",
    repoUrl: "https://github.com/cnsaavedra/npc-chat-v2",
    tags: [
      "Faster-Whisper Neural STT",
      "WebRTC VAD + Librosa F0 Pitch",
      "Krumhansl-Kessler Key Profiles",
      "Rust lode-bus + Local LLM Agents",
    ],
    metrics: [
      { label: "PITCH & KEY ENGINE", value: "12-Pitch Chroma + F0 Segmentation" },
      { label: "SPEECH PIPELINE", value: "WebRTC VAD → Faster-Whisper → LLM" },
      { label: "SYSTEMS BUS LATENCY", value: "< 250ms OS queue watcher · ≤ 24KB pack" },
    ],
    pipeline: [
      "MIC / STREAM AUDIO",
      "WEBRTC VAD + LIBROSA F0",
      "FASTER-WHISPER / KEY FIT",
      "LOCAL LLM / RUST BUS",
      "LIVE STUDIO OVERLAY",
    ],
    bullets: [
      "Tracks sung vocal fundamental frequency (F0) with Librosa and correlates 12-pitch class distributions against Krumhansl-Kessler major/minor profiles to detect musical key and note segments in Hook Coach.",
      "Models phonetic confusion matrices and syllable-locked cadence blueprints to generate singable lyric variations that preserve exact vowel endings and rhythm anchors.",
      "Streams real-time microphone audio through WebRTC Voice Activity Detection into Faster-Whisper neural speech-to-text and local OpenAI-compatible LLMs for reactive stream overlays in NPC-Chat-v2.",
      "Coordinates multi-agent research and build workflows through a native Rust systems bus (lode-bus) with RwLock file borrow-checking, secret-redacting 24 KB context packets, and sub-250ms OS event wakeups.",
    ],
    visualType: "voice-llm",
  },
  {
    id: "SYS-05",
    code: "CV-SIM // VISION-ACOUSTIC",
    jp: "視覚テンソル検出・空間音響推論",
    title: "Computer Vision & Acoustic AI Simulation",
    category: "COMPUTER VISION / SPATIAL AI",
    rarity: "★★★★★",
    repoUrl: "https://github.com/cnsaavedra/house-heist",
    tags: [
      "OpenCV (≥ 4.8) + MSS Tensors",
      "Tesseract OCR + CustomTkinter",
      "Godot 4 C# Deterministic SimCore",
      "Blender 4.5 Headless 3D Pipeline",
    ],
    metrics: [
      { label: "VISION CAPTURE", value: "High-frequency MSS screen tensors" },
      { label: "SIMULATION CORE", value: "Seeded decibel & multi-agent state AI" },
      { label: "3D ASSET FACTORY", value: "Automated glTF 2.0 / PBR geometry gate" },
    ],
    pipeline: [
      "SCREEN / WORLD STATE",
      "OPENCV / DECIBEL GRAPH",
      "OCR & AGENT PERCEPTION",
      "BEHAVIOR STATE MACHINE",
      "DETERMINISTIC ACTION",
    ],
    bullets: [
      "Captures desktop frames as fast NumPy tensors via MSS and runs OpenCV template, color-space, grid, and PyTesseract OCR detection pipelines in Wrist-Helper and OCR-Reader.",
      "Simulates physical decibel propagation across rooms, doorway occlusion, and multi-agent civilian, 911, and SWAT perception state machines in House Heist's pure C# deterministic SimCore.",
      "Automates headless 3D asset generation, PBR material validation, skeletal rigging, and glTF 2.0 metric verification through a scripted Python and Blender 4.5 pipeline.",
    ],
    visualType: "cv-sim",
  },
  {
    id: "SYS-06",
    code: "DATA-STAT // FFXIV-CENSUS",
    jp: "人口統計解析・市場速度推論",
    title: "FFXIV Statistics",
    category: "DATA ANALYTICS / MARKET VELOCITY",
    rarity: "★★★★★",
    repoUrl: "https://github.com/cnsaavedra",
    tags: [
      "Square Enix Telemetry API",
      "Guild Demographic Aggregation",
      "Market Velocity & Demand Modeling",
      "React Statistical Visualization",
    ],
    metrics: [
      { label: "DEMOGRAPHIC PARSING", value: "Guild census & class distributions" },
      { label: "ECONOMY MODELING", value: "Item sales velocity × demand curves" },
      { label: "VISUALIZATION", value: "Interactive multi-slide telemetry deck" },
    ],
    pipeline: [
      "SQUARE ENIX API",
      "JSON PARSER & CLEANER",
      "VELOCITY / CENSUS MATH",
      "STATISTICAL CHARTS",
      "INTERACTIVE UI",
    ],
    bullets: [
      "Ingests Final Fantasy XIV API data from Square Enix to parse and aggregate player population statistics.",
      "Transforms raw guild and server records into clean demographic breakdowns so players can inspect class distributions and free-company composition at a glance.",
      "Calculates item sales velocities and demand trends to surface high-value market board opportunities.",
      "Structures equipment and fashion catalog metadata into responsive grid views for fast visual comparison.",
    ],
    visualType: "slider",
    slides: [
      "https://i.gyazo.com/f20c7e041f2b2e4d16a4a3dd037db063.png",
      "https://i.gyazo.com/0b62b9e6a7aeb24ce908d014cab2e2fc.png",
      "https://i.gyazo.com/ab826e146b39b2d6d4d2405b0ec74719.png",
    ],
  },
  {
    id: "SYS-07",
    code: "DATA-PIPE // ARCHIVED-PINS",
    jp: "非同期メッセージ抽出・永続化",
    title: "Archived Pins",
    category: "AUTOMATED ETL / ARCHIVAL BOT",
    rarity: "★★★★",
    repoUrl: "https://github.com/cnsaavedra/archived-pins",
    tags: [
      "Python 3 + discord.py",
      "Automated Pin ETL Pipeline",
      "Zero-Loss Channel Migration",
      "Environment-Isolated Credentials",
    ],
    metrics: [
      { label: "INGESTION MODE", value: "Automated channel history sweep" },
      { label: "PRESERVATION", value: "Payloads, embeds & attachments" },
      { label: "SECURITY", value: "Dotenv token isolation + mocked suite" },
    ],
    pipeline: [
      "CHANNEL PIN EVENT",
      "DISCORD API FETCH",
      "PAYLOAD SERIALIZER",
      "ARCHIVE CHANNEL SINK",
      "INDEXED RECORD",
    ],
    bullets: [
      "Discord pin archiving pipeline built with Python and the Discord API.",
      "Creates a dedicated archive channel and automatically transfers existing pinned messages across channels so key team knowledge is never lost when pin limits fill up.",
      "Follows strict .env credential isolation and includes automated test coverage for reliable server deployment.",
    ],
    visualType: "single-image",
    image: "https://i.gyazo.com/01e0c3a831104f713f78597492c3d3b0.png",
  },
  {
    id: "SYS-08",
    code: "GRAPH-DB // OLD-MMO-FRIENDS",
    jp: "関係グラフ検索・再接続基盤",
    title: "Old MMO Friends",
    category: "RELATIONAL GRAPH / SOCIAL PLATFORM",
    rarity: "★★★★",
    repoUrl: "https://github.com/cnsaavedra",
    tags: [
      "PostgreSQL + Sequelize ORM",
      "Relational Entity Matching",
      "Express.js MVC Architecture",
      "JWT Cryptographic Auth",
    ],
    metrics: [
      { label: "STORAGE ENGINE", value: "PostgreSQL relational social graph" },
      { label: "ARCHITECTURE", value: "Client-Server MVC + REST API" },
      { label: "SECURITY", value: "Hashed credentials + JWT sessions" },
    ],
    pipeline: [
      "PLAYER ALIAS QUERY",
      "SEQUELIZE ORMJOIN",
      "POSTGRESQL GRAPH",
      "JWT AUTH GUARD",
      "RECONNECTION CHAT",
    ],
    bullets: [
      "Social reconnection platform where players index old game servers and character aliases to find and message former guildmates.",
      "Models user profiles, friend graphs, direct messages, and live notifications inside PostgreSQL using Sequelize queries.",
      "Follows a clean client-server MVC structure with an Express.js backend and hashed password authentication backed by JWT tokens.",
    ],
    visualType: "single-image",
    image:
      "https://camo.githubusercontent.com/3e2e771e7d3eb2bf066d1d08ccb44d73af5c54a24446beaf6dc44e5c2c52047b/68747470733a2f2f692e6779617a6f2e636f6d2f64646537653936343964643833356536656164336432623939623465663535302e676966",
  },
];

function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const nodeCount = 34;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: i % 5 === 0 ? 2.6 : 1.7,
      layer: i % 3,
      weight: (0.4 + Math.random() * 0.58).toFixed(2),
    }));

    let tick = 0;
    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 145) {
            const alpha = (1 - dist / 145) * 0.16;
            ctx.strokeStyle = `rgba(15, 20, 28, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            if ((i + j) % 9 === 0 && dist < 115) {
              const t = ((tick * 0.008 + i * 0.17) % 1 + 1) % 1;
              const px = n.x + (m.x - n.x) * t;
              const py = n.y + (m.y - n.y) * t;
              ctx.fillStyle = "rgba(0, 200, 255, 0.65)";
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          const mAlpha = (1 - mDist / 160) * 0.55;
          ctx.strokeStyle = `rgba(0, 200, 255, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          if (mDist < 95 && i % 3 === 0) {
            ctx.fillStyle = "rgba(15, 20, 28, 0.55)";
            ctx.font = "10px 'JetBrains Mono', monospace";
            ctx.fillText(`h_${i}[${n.weight}]`, n.x + 6, n.y - 5);
          }
        }

        ctx.fillStyle =
          n.layer === 0
            ? "rgba(0, 200, 255, 0.75)"
            : "rgba(15, 20, 28, 0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}

function TacticalFrame({ currentPage, setCurrentPage, setPageFirstLoad }) {
  const pageLabels = {
    homepage: "01 // HOME_INDEX",
    experience: "02 // EXP_TELEMETRY",
    portfolio: "03 // NEURAL_ARCHIVE",
    contact: "04 // COMMS_TERMINAL",
  };

  const navItems = [
    { key: "homepage", idx: "01", label: "Home" },
    { key: "experience", idx: "02", label: "Experience" },
    { key: "portfolio", idx: "03", label: "Portfolio" },
    { key: "contact", idx: "04", label: "Contact" },
  ];

  return (
    <>
      <div className="fixed inset-3 md:inset-5 pointer-events-none z-40 border border-archive-line/80">
        <span className="absolute -top-2 -left-1.5 text-archive-muted font-mono text-xs select-none">
          +
        </span>
        <span className="absolute -top-2 -right-1.5 text-archive-muted font-mono text-xs select-none">
          +
        </span>
        <span className="absolute -bottom-2 -left-1.5 text-archive-muted font-mono text-xs select-none">
          +
        </span>
        <span className="absolute -bottom-2 -right-1.5 text-archive-muted font-mono text-xs select-none">
          +
        </span>
      </div>

      <header className="fixed top-3 md:top-5 left-3 md:left-5 right-3 md:right-5 z-50 flex items-center justify-between px-4 py-2.5 bg-archive-bg/85 backdrop-blur-md border-b border-archive-line">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            if (currentPage !== "homepage") {
              setPageFirstLoad(true);
              setCurrentPage("homepage");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="w-2 h-2 bg-archive-cyan inline-block group-hover:bg-archive-vermilion transition-colors" />
          <span className="font-mono text-[11px] md:text-xs tracking-wider text-archive-ink font-semibold">
            [ ARCHIVE // CNS-01 ]
          </span>
          <span className="hidden sm:inline-block font-jp text-[11px] text-archive-slate tracking-widest">
            データ・深層学習 // DATA &amp; DEEP LEARNING
          </span>
        </div>

        <nav className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const active = currentPage === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  if (currentPage !== item.key) {
                    setPageFirstLoad(true);
                    setCurrentPage(item.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`px-2.5 py-1 font-mono text-[11px] md:text-xs transition-all border ${
                  active
                    ? "bg-archive-ink text-white border-archive-ink"
                    : "bg-white/70 text-archive-slate border-archive-line hover:border-archive-ink hover:text-archive-ink"
                }`}
              >
                <span className="text-archive-cyan mr-1">{item.idx}</span>
                {item.label}
              </button>
            );
          })}
          <a
            href={`${process.env.PUBLIC_URL}/Christian-Saavedra-Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 font-mono text-[11px] md:text-xs transition-all border bg-archive-ink text-white border-archive-ink hover:bg-archive-cyan hover:text-archive-ink hover:border-archive-cyan"
          >
            <span className="text-archive-amber mr-1">PDF</span>
            Resume
          </a>
        </nav>
      </header>

      <footer className="fixed bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 z-40 pointer-events-none hidden md:flex items-center justify-between px-4 py-1.5 text-[11px] font-mono text-archive-slate">
        <div className="flex items-center gap-3 bg-archive-bg/80 px-2 py-0.5 border border-archive-line">
          <span className="text-archive-ink font-semibold">
            {pageLabels[currentPage]}
          </span>
          <span className="text-archive-muted">|</span>
          <span>UofT CS · MATH · STATS</span>
        </div>
        <div className="flex items-center gap-3 bg-archive-bg/80 px-2 py-0.5 border border-archive-line">
          <span>DOMAINS: NEURAL NETS · NLP · AUDIO DSP · CV</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </footer>
    </>
  );
}

function App() {
  const [pageFirstLoad, setPageFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState("homepage");
  const [pressedAboutMeArrow, setPressedAboutMeArrow] = useState(false);
  const [selectedSystemIndex, setSelectedSystemIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState("");
  const delay = currentPage === "homepage" ? 1.4 : 0.35;

  const aboutMeRef = useRef(null);
  const albumsRef = useRef(null);

  const [scrollDir, setScrollDir] = useState("none");
  const [yPageOffset, setYPageOffset] = useState(false);

  useEffect(() => {
    if (!pageFirstLoad) {
      const threshold = 0;
      let lastScrollY = window.pageYOffset;
      let ticking = false;

      const updateScrollDir = () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 550) {
          setYPageOffset(true);
        } else {
          if (currentPage === "portfolio") {
            setYPageOffset(false);
          }
        }

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false;
          return;
        }
        setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [scrollDir, pageFirstLoad, currentPage]);

  useEffect(() => {
    let timer1 = setTimeout(() => setPageFirstLoad(false), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [currentPage, delay]);

  function scrollToAboutMe() {
    window.scrollTo({
      top: 820,
      behavior: "smooth",
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const parallaxData = [
    {
      start: 0,
      end: 500,
      properties: [
        {
          startValue: 1,
          endValue: 0.15,
          property: "opacity",
        },
        {
          startValue: 1,
          endValue: 1.75,
          property: "translateY",
        },
      ],
    },
  ];

  const parallaxDataAboutMe = [
    {
      start: "self",
      end: "#albums",
      properties: [
        {
          startValue: 0.92,
          endValue: 1,
          property: "opacity",
        },
      ],
    },
  ];

  const [sliderRef] = useKeenSlider({
    slidesPerView: 1,
    initial: 0,
    mode: "snap",
    vertical: false,
    spacing: 15,
    controls: true,
  });

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(""), 2000);
    }
  }

  function homePage() {
    return (
      <div className="relative z-10 bg-tactical-grid">
        <section className="body-font font-poppins min-h-screen relative flex items-center justify-center">
          {!pressedAboutMeArrow &&
            !pageFirstLoad &&
            scrollDir !== "scrolling down" &&
            !yPageOffset && (
              <div
                tabIndex={0}
                role="button"
                onClick={() => {
                  setPressedAboutMeArrow(true);
                  scrollToAboutMe();
                }}
                className="fixed bottom-12 right-10 z-50 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:animate-pulse cursor-pointer flex flex-col items-center gap-1"
              >
                <span className="font-mono text-[10px] tracking-widest text-archive-slate bg-white/90 px-2 py-0.5 border border-archive-line">
                  SCROLL // DOSSIER
                </span>
                <ArrowDownCircle size={42} />
              </div>
            )}

          <div className="container mx-auto flex px-6 py-24 items-center justify-center flex-col min-h-screen">
            <div className="text-center lg:w-3/4 w-full max-w-4xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 mb-6 bg-white/90 border border-archive-line font-mono text-xs text-archive-slate shadow-sm">
                <span className="w-2 h-2 bg-archive-cyan inline-block" />
                <span>OPERATOR DOSSIER // CHRISTIAN SAAVEDRA</span>
                <span className="text-archive-muted hidden sm:inline">|</span>
                <span className="font-jp text-[11px] text-archive-muted hidden sm:inline">
                  ニューラル・データ工学
                </span>
              </div>

              {pageFirstLoad && (
                <div className="my-4 font-medium text-archive-ink">
                  <TypeAnimation
                    sequence={["Hi, my name is Christian"]}
                    wrapper="div"
                    cursor={true}
                    style={{ fontSize: "2.75em" }}
                  />
                </div>
              )}

              <Plx className="intro" parallaxData={parallaxData}>
                <h1
                  className={`${
                    pageFirstLoad ? "opacity-0" : "opacity-100"
                  } transition ease-in-out delay-150 title-font text-3xl md:text-title mb-3 font-semibold text-archive-ink tracking-tight`}
                >
                  Welcome to my website
                </h1>

                <p
                  className={`${
                    pageFirstLoad ? "opacity-0" : "opacity-100"
                  } transition-opacity ease-in-out delay-300 font-mono text-xs md:text-sm text-archive-slate max-w-2xl mx-auto mb-10`}
                >
                  Data Systems · Neural Networks · Deep Learning Audio &amp; NLP ·
                  Full-Stack Engineering
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-10">
                  {[
                    {
                      key: "experience",
                      code: "01",
                      jp: "経歴",
                      label: "Experience",
                      sub: "AI Pipelines · 500k+ Users",
                    },
                    {
                      key: "portfolio",
                      code: "02",
                      jp: "研究開発",
                      label: "Portfolio",
                      sub: "Neural Nets, NLP & DSP",
                    },
                    {
                      key: "contact",
                      code: "03",
                      jp: "通信",
                      label: "Contact",
                      sub: "Direct Links & Resume",
                    },
                  ].map((nav) => (
                    <button
                      key={nav.key}
                      type="button"
                      onClick={() => {
                        setPageFirstLoad(true);
                        setCurrentPage(nav.key);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`${
                        pageFirstLoad ? "opacity-0" : "opacity-100"
                      } group relative text-left bg-white/95 hover:bg-archive-ink text-archive-ink hover:text-white border border-archive-line hover:border-archive-ink px-6 py-4 min-w-[210px] transition-all duration-200 shadow-sm chamfer-btn`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-archive-cyan opacity-80 group-hover:w-1.5 transition-all" />
                      <div className="flex items-center justify-between font-mono text-[10px] text-archive-muted group-hover:text-archive-cyan mb-1">
                        <span>[STAGE // {nav.code}]</span>
                        <span className="font-jp">{nav.jp}</span>
                      </div>
                      <div className="text-lg font-semibold tracking-tight">
                        {nav.label}
                      </div>
                      <div className="font-mono text-[11px] text-archive-slate group-hover:text-gray-300 mt-0.5">
                        {nav.sub}
                      </div>
                    </button>
                  ))}
                  <a
                    href={`${process.env.PUBLIC_URL}/Christian-Saavedra-Resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } group relative text-left bg-archive-ink hover:bg-archive-cyan text-white hover:text-archive-ink border border-archive-ink px-6 py-4 min-w-[210px] transition-all duration-200 shadow-sm chamfer-btn`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-archive-amber opacity-90 group-hover:w-1.5 transition-all" />
                    <div className="flex items-center justify-between font-mono text-[10px] text-archive-cyan group-hover:text-archive-ink mb-1">
                      <span>[FILE // PDF]</span>
                      <span className="font-jp">履歴書 ↗</span>
                    </div>
                    <div className="text-lg font-semibold tracking-tight">
                      Resume
                    </div>
                    <div className="font-mono text-[11px] text-gray-300 group-hover:text-archive-ink mt-0.5">
                      View / Download (11-2026)
                    </div>
                  </a>
                </div>

                <div className="flex justify-center items-center gap-6 mb-8">
                  <a
                    href="https://github.com/cnsaavedra"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white border border-archive-line hover:border-archive-cyan transition-all hover:-translate-y-0.5 shadow-sm"
                    title="GitHub"
                  >
                    <img
                      width={32}
                      height={32}
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="Github"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christian-saavedra-b07413245/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white border border-archive-line hover:border-archive-cyan transition-all hover:-translate-y-0.5 shadow-sm"
                    title="LinkedIn"
                  >
                    <img
                      width={32}
                      height={32}
                      src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                      alt="Linkedin"
                    />
                  </a>
                  <a
                    href="https://soundcloud.com/primaryflow"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white border border-archive-line hover:border-archive-cyan transition-all hover:-translate-y-0.5 shadow-sm"
                    title="SoundCloud"
                  >
                    <img
                      width={32}
                      height={32}
                      src="https://cdn-icons-png.flaticon.com/512/145/145809.png"
                      alt="Soundcloud"
                    />
                  </a>
                </div>
              </Plx>
            </div>
          </div>
        </section>

        {!pageFirstLoad && (
          <>
            <Plx className="intro" parallaxData={parallaxDataAboutMe}>
              <section
                ref={aboutMeRef}
                id="about-me"
                className="body-font font-poppins min-h-screen py-20 px-4 flex items-center"
              >
                <div className="max-w-5xl mx-auto w-full bg-white/95 border border-archive-line shadow-sm p-6 md:p-12 chamfer-card relative">
                  <div className="flex flex-wrap items-center justify-between border-b border-archive-line pb-4 mb-8 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 bg-archive-ink text-white font-mono text-xs">
                        PROFILE // 01
                      </span>
                      <span className="font-mono text-xs text-archive-slate">
                        UNIVERSITY OF TORONTO · CS + MATH &amp; STATISTICS
                      </span>
                    </div>
                    <span className="font-jp text-xs text-archive-muted">
                      研究者プロフィール // OPERATOR BIO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                      <div className="relative p-2 bg-archive-bg border border-archive-line mb-5">
                        <img
                          className="w-[170px] h-[170px] object-cover"
                          src="https://media.licdn.com/dms/image/D5603AQGOtva26WsPhQ/profile-displayphoto-shrink_800_800/0/1676056266008?e=1681344000&v=beta&t=w2JUWQury__l50wXg---N10ynb8g8Ng4rxAkGt6FCGE"
                          alt="Christian Saavedra"
                        />
                        <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-archive-slate">
                          <span>ID: CNS-UofT</span>
                          <span className="text-archive-cyan font-semibold">
                            ACTIVE
                          </span>
                        </div>
                      </div>

                      <div className="w-full space-y-3 bg-archive-bg/70 p-4 border border-archive-line font-mono text-xs">
                        <div className="text-[11px] text-archive-slate font-semibold border-b border-archive-line pb-1.5">
                          CAPABILITY TELEMETRY
                        </div>
                        {[
                          {
                            name: "Deep Learning & Audio DSP",
                            pct: "96%",
                            bar: "w-[96%]",
                          },
                          {
                            name: "Data Pipelines & Analytics",
                            pct: "95%",
                            bar: "w-[95%]",
                          },
                          {
                            name: "NLP & Algorithmic Systems",
                            pct: "92%",
                            bar: "w-[92%]",
                          },
                          {
                            name: "Full-Stack & Cloud Infra",
                            pct: "94%",
                            bar: "w-[94%]",
                          },
                        ].map((stat) => (
                          <div key={stat.name}>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-archive-ink">
                                {stat.name}
                              </span>
                              <span className="text-archive-slate">
                                {stat.pct}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-archive-line overflow-hidden">
                              <div
                                className={`h-full bg-archive-ink ${stat.bar}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-4 text-archive-ink leading-relaxed">
                      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                        About Me
                      </h2>
                      <p className="text-sm md:text-base text-archive-ink/90">
                        University of Toronto HBSc graduate in Computer Science
                        with minors in Mathematical Sciences &amp; Applied
                        Statistics. Across TrillionCore, Pettable, FutureFuture,
                        and Runner, I have built AI document enrichment and
                        vector search pipelines, live revenue analytics, and
                        data workflows serving 500,000+ users.
                      </p>
                      <p className="text-sm md:text-base text-archive-ink/90">
                        Outside of work, I build deep learning, neural audio,
                        NLP, and multi-agent tools on{" "}
                        <a
                          href="https://github.com/cnsaavedra"
                          target="_blank"
                          rel="noreferrer"
                          className="underline font-mono text-sm text-archive-ink hover:text-archive-cyan"
                        >
                          github.com/cnsaavedra
                        </a>{" "}
                        using Python, TypeScript, Rust, PyTorch, ONNX Runtime,
                        and pgvector.
                      </p>
                      <p className="text-sm md:text-base text-archive-ink/90">
                        I am also a semi-professional music producer (Jazz Hop
                        Café Records, 1M+ streams across Spotify, SoundCloud,
                        and Bandcamp)—which directly led me into neural audio
                        source separation and signal processing.
                      </p>

                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        {[
                          {
                            label: "SoundCloud",
                            href: "https://soundcloud.com/primaryflow",
                          },
                          {
                            label: "Spotify",
                            href: "https://open.spotify.com/artist/1KBXaBhFptSB4D7ncgxITI",
                          },
                          {
                            label: "Apple Music",
                            href: "https://music.apple.com/ng/artist/dominant/id1275392590",
                          },
                          {
                            label: "Bandcamp",
                            href: "https://dominantmusic.bandcamp.com",
                          },
                        ].map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 bg-archive-bg hover:bg-archive-ink text-archive-ink hover:text-white border border-archive-line font-mono text-xs transition-colors"
                          >
                            [ {link.label} ↗ ]
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Plx>

            <section
              id="albums"
              ref={albumsRef}
              className="body-font font-poppins py-20 px-4 flex flex-col items-center justify-center"
            >
              <div className="max-w-4xl w-full bg-white/95 border border-archive-line p-6 md:p-10 chamfer-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between border-b border-archive-line pb-4 mb-6 gap-2">
                  <div>
                    <span className="font-mono text-xs text-archive-cyan font-semibold">
                      [ AUDIO ARCHIVE // 1,000,000+ STREAMS ]
                    </span>
                    <h2 className="text-2xl font-semibold text-archive-ink mt-1">
                      Have a sneak peek at my albums
                    </h2>
                  </div>
                  <span className="font-jp text-xs text-archive-muted">
                    音源アーカイブ // DISCOGRAPHY
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      code: "ALBUM_01",
                      title: "Harvest of Memories",
                      src: "https://bandcamp.com/EmbeddedPlayer/album=1224178121/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/",
                      href: "https://dominantmusic.bandcamp.com/album/harvest-of-memories",
                    },
                    {
                      code: "ALBUM_02",
                      title: "winter story",
                      src: "https://bandcamp.com/EmbeddedPlayer/album=2211329182/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/",
                      href: "https://dominantmusic.bandcamp.com/album/winter-story",
                    },
                    {
                      code: "ALBUM_03",
                      title: "prismatic",
                      src: "https://bandcamp.com/EmbeddedPlayer/album=793618864/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/",
                      href: "https://dominantmusic.bandcamp.com/album/prismatic",
                    },
                  ].map((album) => (
                    <div
                      key={album.code}
                      className="p-3 bg-archive-bg border border-archive-line"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-archive-slate mb-2">
                        <span>
                          {album.code} {"//"} {album.title.toUpperCase()}
                        </span>
                        <span>ARTIST: DOMINANT</span>
                      </div>
                      <iframe
                        title={album.title}
                        className="border-0 w-full h-[120px]"
                        src={album.src}
                        seamless
                      >
                        <a href={album.href}>{album.title} by DOMINANT</a>
                      </iframe>
                    </div>
                  ))}
                </div>
              </div>
              <div id="end" />
            </section>
          </>
        )}
      </div>
    );
  }

  function experience() {
    const roles = [
      {
        code: "RECORD_01 // DEC 2025 – PRESENT",
        company: "TrillionCore",
        role: "Full-Stack & AI Systems Developer",
        badges: ["PGVECTOR / HNSW", "MULTI-AGENT AI", "8 INTEGRATIONS"],
        facts: [
          "Shipped an AI document enrichment pipeline classifying 10 document types with duplicate detection and pgvector/HNSW search (design to prod in 1 week).",
          "Built the shared AI agent baseline across 3 production codebases (TrillionCore, Birch, TrillionWork) with nightly review loops and typed Router → Service → Repository boundaries.",
          "Took Birch from prototype to client-demo MVP (AI brief analysis, generated decks, 15-layout drag-and-drop editor, QA regression simulator).",
          "Launched 8 live data integrations (Drive, Gmail, GitHub, Railway, Vercel, Plaid, Fathom, Fireflies) with OAuth, self-recovering webhooks, and chat querying.",
          "Shipped metered Stripe billing end-to-end and an autonomous Sentry-to-PR error-fixing agent.",
        ],
      },
      {
        code: "RECORD_02 // APR 2023 – DEC 2025",
        company: "Pettable",
        role: "Full-Stack Developer",
        badges: ["150K → 250K+ CUSTOMERS", "SQL / BIGQUERY", "SEGMENT / GTM"],
        facts: [
          "Helped grow Pettable from ~150,000 to 250,000+ customers by improving checkout funnels and internal workflows.",
          "Built live revenue and operations dashboards plus the SQL and APIs backing a multimillion-dollar business.",
          "Rebuilt results and checkout into clean reusable components in a 3-week sprint.",
          "Owned technical SEO (structured data, speed) and Segment/UTM/GTM subscription attribution analytics.",
        ],
      },
      {
        code: "RECORD_03 // JAN 2022 – MAR 2023",
        company: "FutureFuture",
        role: "Full-Stack Developer",
        badges: ["500,000+ USERS", "REACT / TS / AWS"],
        facts: [
          "Built web and mobile analytics, e-commerce, and delivery apps; led the merchant and dispatcher dashboards.",
          "Automated core data pipelines behind 500,000+ users to improve delivery efficiency.",
        ],
      },
      {
        code: "RECORD_04 // JUN 2019 – AUG 2020",
        company: "Runner",
        role: "Front-End / Full-Stack Developer",
        badges: ["REDSHIFT / POSTGRES", "VUE / REACT NATIVE"],
        facts: [
          "Built e-commerce and analytics platforms with Vue, React Native, and Laravel focused on large datasets.",
          "Progressed from cross-browser QA and front-end fixes to owning full-stack tools and analytics APIs.",
        ],
      },
    ];

    const skillGroups = [
      {
        label: "AI & DATA",
        items:
          "PyTorch · ONNX · Vercel AI SDK · Anthropic/OpenAI · MCP · pgvector/HNSW · BullMQ · Fivetran · BigQuery · Segment",
      },
      {
        label: "LANGUAGES",
        items: "TypeScript · JavaScript · Python · SQL · Rust · PHP · R · Java · C",
      },
      {
        label: "WEB & INFRA",
        items:
          "React 19 · Next.js · Node · Hono · oRPC · Prisma · PostgreSQL · Tailwind · AWS · Vercel · Railway · Docker · Stripe",
      },
    ];

    return (
      <section className="body-font font-poppins min-h-screen pt-24 pb-20 px-4 relative z-10 bg-tactical-grid">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <button
              type="button"
              onClick={() => {
                setCurrentPage("homepage");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-archive-line hover:border-archive-ink font-mono text-xs text-archive-ink transition-all"
            >
              <ArrowLeft />
              <span>RETURN // HOME</span>
            </button>
            <a
              href={`${process.env.PUBLIC_URL}/Christian-Saavedra-Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-archive-ink hover:bg-archive-cyan text-white hover:text-archive-ink font-mono text-xs transition-colors chamfer-btn"
            >
              <span>[ DOWNLOAD RESUME PDF (11-2026) ↗ ]</span>
            </a>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0 top-4" : "opacity-100 top-0"
            } relative transition-all ease-in-out duration-300 mb-8 flex flex-wrap items-end justify-between gap-4`}
          >
            <div>
              <h1 className="text-3xl md:text-title font-semibold text-archive-ink tracking-tight">
                Experience &amp; Resume
              </h1>
              <p className="font-mono text-xs text-archive-slate mt-1">
                UNIVERSITY OF TORONTO · HBSc CS MAJOR · MATH &amp; APPLIED
                STATISTICS MINOR
              </p>
            </div>
            <span className="font-jp text-xs text-archive-muted">
              職務経歴・履歴書 // KEY FACTS
            </span>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } transition-opacity ease-in-out duration-300 space-y-5`}
          >
            {roles.map((r) => (
              <div
                key={r.company}
                className="bg-white/95 border border-archive-line p-6 md:p-7 chamfer-card shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-archive-line pb-3.5 mb-4">
                  <div>
                    <div className="font-mono text-[11px] text-archive-cyan font-semibold">
                      {r.code}
                    </div>
                    <h2 className="font-bold text-xl md:text-2xl text-archive-ink">
                      {r.company}{" "}
                      <span className="font-normal text-base text-archive-slate">
                        — {r.role}
                      </span>
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {r.badges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 bg-archive-bg border border-archive-line text-archive-ink"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-2 text-sm md:text-base text-archive-ink/90 leading-relaxed">
                  {r.facts.map((fact, idx) => (
                    <li key={idx}>• {fact}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-white/95 border border-archive-line p-6 chamfer-card shadow-sm">
              <div className="font-mono text-xs text-archive-cyan font-semibold mb-3">
                CORE STACK // PROGRAMMING &amp; AI SKILLS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {skillGroups.map((g) => (
                  <div
                    key={g.label}
                    className="p-3.5 bg-archive-bg border border-archive-line"
                  >
                    <div className="text-archive-ink font-semibold mb-1.5">
                      [{g.label}]
                    </div>
                    <div className="text-archive-slate leading-relaxed">
                      {g.items}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderTechnicalDiagram(sys) {
    if (sys.visualType === "neural-audio") {
      return (
        <div className="bg-archive-bg border border-archive-line p-5 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-archive-line pb-2">
            <span className="text-archive-ink font-semibold">
              NEURAL SIGNAL TELEMETRY // DEMUCS HT + BASIC PITCH CNN
            </span>
            <span className="text-archive-cyan">ONNX_CPU_RUNTIME</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-archive-line">
              <div className="text-[11px] text-archive-slate mb-2">
                01. 4-STEM SOURCE SEPARATION (ISOLATED OVERLAPS)
              </div>
              {[
                { stem: "VOCALS.WAV", freq: "85 Hz – 1.1 kHz", conf: "0.94" },
                { stem: "BASS.WAV", freq: "32 Hz – 350 Hz", conf: "0.97" },
                { stem: "OTHER.WAV", freq: "130 Hz – 4.2 kHz", conf: "0.89" },
                { stem: "DRUMS.WAV", freq: "Onset + Band Split", conf: "0.92" },
              ].map((row) => (
                <div
                  key={row.stem}
                  className="flex items-center justify-between py-1 border-b border-archive-line/60 last:border-0 text-[11px]"
                >
                  <span className="font-semibold text-archive-ink">
                    {row.stem}
                  </span>
                  <span className="text-archive-slate">{row.freq}</span>
                  <span className="text-archive-cyan">p={row.conf}</span>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 border border-archive-line flex flex-col justify-between">
              <div className="text-[11px] text-archive-slate mb-2">
                02. FALSE-POSITIVE NOTE PRUNING (3-MIN TRACK BENCHMARK)
              </div>
              <div className="space-y-3 my-auto">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Untuned Default Basic Pitch (`other` stem)</span>
                    <span className="text-archive-vermilion">2,809 notes</span>
                  </div>
                  <div className="w-full h-2 bg-archive-line">
                    <div className="h-full bg-archive-vermilion w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Frequency-Constrained &amp; Threshold-Tuned CNN</span>
                    <span className="text-emerald-600 font-semibold">
                      1,274 real notes (-54.6% noise)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-archive-line">
                    <div className="h-full bg-archive-cyan w-[45.3%]" />
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-archive-muted mt-3">
                Eliminates cymbal wash &amp; reverb-tail pitch hallucinations
                while preserving true harmonic voicings.
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (sys.visualType === "dsp-compiler") {
      return (
        <div className="bg-archive-bg border border-archive-line p-5 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-archive-line pb-2">
            <span className="text-archive-ink font-semibold">
              CHROMA &amp; LOUDNESS SOLVER // MUSICORE BINARY ENGINE
            </span>
            <span className="text-archive-cyan">FL_25.2.5_BINARY</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 border border-archive-line">
              <div className="text-[10px] text-archive-slate mb-1">
                GATE 01 // NOTE-TO-STEM LOCK
              </div>
              <div className="text-base font-semibold text-archive-ink">
                Δt ≤ 20 ms · Chroma ≥ 0.65
              </div>
              <p className="text-[11px] text-archive-slate mt-1">
                Every retained MIDI note must align with an audio stem onset and
                pass 12-pitch chroma correlation.
              </p>
            </div>
            <div className="bg-white p-3.5 border border-archive-line">
              <div className="text-[10px] text-archive-slate mb-1">
                GATE 02 // SPECTRAL POCKET EQ
              </div>
              <div className="text-base font-semibold text-archive-ink">
                3.52 kHz ≤ -2.5 dB
              </div>
              <p className="text-[11px] text-archive-slate mt-1">
                Automated PEQ2 role carving + drum-triggered sidechain ducking
                keeps lead vocal presence clear.
              </p>
            </div>
            <div className="bg-white p-3.5 border border-archive-line">
              <div className="text-[10px] text-archive-slate mb-1">
                GATE 03 // BS.1770 MASTER GLUE
              </div>
              <div className="text-base font-semibold text-archive-ink">
                -11.5 LUFS · ≤ -1 dBTP
              </div>
              <p className="text-[11px] text-archive-slate mt-1">
                Computes offline staged sum headroom to set bounded pre-glue
                drive (-12..+6 dB).
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (sys.visualType === "voice-llm" || sys.visualType === "cv-sim") {
      return (
        <div className="bg-archive-bg border border-archive-line p-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-archive-line pb-2 mb-3">
            <span className="text-archive-ink font-semibold">
              SYSTEM ARCHITECTURE // {sys.code}
            </span>
            <span className="text-archive-cyan">DETERMINISTIC_RUNTIME</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sys.metrics.map((m) => (
              <div
                key={m.label}
                className="bg-white p-3.5 border border-archive-line"
              >
                <div className="text-[10px] text-archive-slate">{m.label}</div>
                <div className="text-sm font-semibold text-archive-ink mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }

  function portfolio() {
    const activeSys =
      PORTFOLIO_SYSTEMS[selectedSystemIndex] || PORTFOLIO_SYSTEMS[0];

    return (
      <section className="body-font font-poppins min-h-screen pt-24 pb-24 px-4 relative z-10 bg-tactical-grid">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setCurrentPage("homepage");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-archive-line hover:border-archive-ink font-mono text-xs text-archive-ink transition-all"
            >
              <ArrowLeft />
              <span>RETURN // HOME</span>
            </button>
            <div className="font-mono text-xs text-archive-slate">
              [ ARCHIVE SELECTOR // {PORTFOLIO_SYSTEMS.length} REGISTERED
              SYSTEMS ]
            </div>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0 top-4" : "opacity-100 top-0"
            } relative transition-all ease-in-out duration-300 mb-6 flex flex-wrap items-end justify-between gap-4`}
          >
            <div>
              <div className="font-mono text-xs text-archive-cyan font-semibold">
                NEURAL NETWORKS · DEEP LEARNING · NLP · DATA ENGINEERING
              </div>
              <h1 className="text-3xl md:text-title font-semibold text-archive-ink tracking-tight">
                Portfolio &amp; Neural Archive
              </h1>
            </div>
            <a
              href="https://github.com/cnsaavedra/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-archive-ink text-white hover:bg-archive-cyan hover:text-archive-ink font-mono text-xs transition-colors"
            >
              [ GITHUB // CNSAAVEDRA ↗ ]
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Gacha Operator / System Archive Roster */}
            <div className="lg:col-span-4 space-y-2">
              <div className="font-mono text-[11px] text-archive-slate px-1 mb-2 flex justify-between">
                <span>SELECT SYSTEM RECORD</span>
                <span className="font-jp">システム一覧</span>
              </div>
              {PORTFOLIO_SYSTEMS.map((sys, idx) => {
                const isSelected = idx === selectedSystemIndex;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setSelectedSystemIndex(idx)}
                    className={`w-full text-left p-3.5 border transition-all relative chamfer-btn ${
                      isSelected
                        ? "bg-archive-ink text-white border-archive-ink shadow-sm"
                        : "bg-white/90 text-archive-ink border-archive-line hover:border-archive-ink"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isSelected ? "bg-archive-cyan" : "bg-transparent"
                      }`}
                    />
                    <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                      <span
                        className={
                          isSelected
                            ? "text-archive-cyan font-semibold"
                            : "text-archive-slate"
                        }
                      >
                        [{sys.id}] {sys.category}
                      </span>
                      <span className="text-archive-amber">{sys.rarity}</span>
                    </div>
                    <div className="font-semibold text-sm md:text-base leading-snug">
                      {sys.title}
                    </div>
                    <div
                      className={`font-jp text-[10px] mt-0.5 ${
                        isSelected ? "text-gray-300" : "text-archive-muted"
                      }`}
                    >
                      {sys.jp}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active System Inspection Stage */}
            <div className="lg:col-span-8 bg-white/95 border border-archive-line p-6 md:p-8 chamfer-card shadow-sm space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-archive-line pb-5">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-archive-cyan font-semibold">
                    <span>[{activeSys.id}]</span>
                    <span>{activeSys.code}</span>
                    <span className="text-archive-amber">
                      {activeSys.rarity}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-archive-ink mt-1">
                    {activeSys.title}
                  </h2>
                  <div className="font-jp text-xs text-archive-muted mt-0.5">
                    {activeSys.jp} {"//"} {activeSys.category}
                  </div>
                </div>
                <a
                  href={activeSys.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-archive-bg hover:bg-archive-ink text-archive-ink hover:text-white border border-archive-line font-mono text-xs transition-colors"
                >
                  [ INSPECT REPO ↗ ]
                </a>
              </div>

              {/* Model & Algorithm Tags */}
              <div className="flex flex-wrap gap-2">
                {activeSys.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-archive-bg border border-archive-line font-mono text-[11px] text-archive-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Neural / Data Pipeline Topology Strip */}
              <div className="bg-archive-bg/80 border border-archive-line p-4">
                <div className="font-mono text-[10px] text-archive-slate mb-2.5 flex justify-between">
                  <span>DATA &amp; INFERENCE PIPELINE TOPOLOGY</span>
                  <span>FORWARD_PASS // ACTIVE</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {activeSys.pipeline.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white border border-archive-line font-mono text-[11px] text-archive-ink font-medium">
                        {i + 1}. {step}
                      </span>
                      {i < activeSys.pipeline.length - 1 && (
                        <span className="font-mono text-archive-cyan text-xs">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Quantitative Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeSys.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3 bg-archive-bg/50 border border-archive-line"
                  >
                    <div className="font-mono text-[10px] text-archive-slate">
                      {metric.label}
                    </div>
                    <div className="font-mono text-xs md:text-sm font-semibold text-archive-ink mt-1">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Plain-English System Breakdown */}
              <div className="space-y-2.5">
                <div className="font-mono text-xs text-archive-slate font-semibold">
                  SYSTEM OVERVIEW &amp; ARCHITECTURE
                </div>
                <ul className="space-y-2.5 text-sm md:text-base text-archive-ink/90 leading-relaxed">
                  {activeSys.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>

              {/* Specialized Technical Diagram or Preserved Visual Evidence */}
              {renderTechnicalDiagram(activeSys)}

              {activeSys.visualType === "pickforus" && (
                <div className="space-y-6 pt-2">
                  <div className="font-mono text-xs text-archive-slate font-semibold border-t border-archive-line pt-4">
                    VISUAL WALKTHROUGH // 60-SECOND NLP &amp; APPROVAL VOTING
                    TRACE
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeSys.images.map((img) => (
                      <div
                        key={img.caption}
                        className="bg-archive-bg border border-archive-line p-3 flex flex-col justify-between"
                      >
                        <div className="font-mono text-[10px] text-archive-slate mb-2">
                          {img.caption}
                        </div>
                        <img
                          className="mx-auto object-contain max-h-[260px] bg-white border border-archive-line p-2"
                          src={img.src}
                          alt={img.caption}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSys.visualType === "slider" && (
                <div className="pt-2">
                  <div className="font-mono text-xs text-archive-slate font-semibold border-t border-archive-line pt-4 mb-3">
                    TELEMETRY GALLERY // SWIPE OR DRAG SLIDES
                  </div>
                  <div className="keen-slider max-w-[520px] mx-auto overflow-hidden border border-archive-line bg-archive-bg p-3">
                    <div
                      ref={sliderRef}
                      className="keen-slider flex gap-4 h-[420px] w-full overflow-hidden"
                    >
                      {activeSys.slides.map((src, idx) => (
                        <div
                          key={src}
                          className="keen-slider__slide flex flex-col justify-center items-center"
                        >
                          <img
                            className="h-[370px] object-contain"
                            src={src}
                            alt={`${activeSys.title} slide ${idx + 1}`}
                          />
                          <h6 className="font-mono text-xs text-archive-slate mt-2">
                            SLIDE // {idx + 1} OF {activeSys.slides.length}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSys.visualType === "single-image" && (
                <div className="pt-2">
                  <div className="font-mono text-xs text-archive-slate font-semibold border-t border-archive-line pt-4 mb-3">
                    SYSTEM CAPTURE // LIVE INTERFACE
                  </div>
                  <div className="bg-archive-bg border border-archive-line p-3 flex justify-center">
                    <img
                      className="object-contain max-h-[420px]"
                      src={activeSys.image}
                      alt={activeSys.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {yPageOffset && (
            <div
              tabIndex={0}
              role="button"
              onClick={() => {
                setPressedAboutMeArrow(true);
                scrollToTop();
              }}
              className="fixed z-50 bottom-12 right-10 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:animate-pulse cursor-pointer"
            >
              <ArrowUpCircle size={45} />
            </div>
          )}
        </div>
      </section>
    );
  }

  function contact() {
    return (
      <section className="body-font font-poppins min-h-screen pt-24 pb-20 px-4 flex items-center justify-center relative z-10 bg-tactical-grid">
        <div className="max-w-4xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={() => {
                setCurrentPage("homepage");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-archive-line hover:border-archive-ink font-mono text-xs text-archive-ink transition-all"
            >
              <ArrowLeft />
              <span>RETURN // HOME</span>
            </button>
            <span className="font-mono text-xs text-archive-slate">
              [ COMMS_TERMINAL // DIRECT CHANNELS ]
            </span>
          </div>

          <div className="bg-white/95 border border-archive-line p-6 md:p-12 chamfer-card shadow-sm">
            <div className="border-b border-archive-line pb-5 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-archive-cyan font-semibold">
                  TRANSMISSION CHANNELS // ONLINE
                </div>
                <h1 className="text-3xl md:text-title font-semibold text-archive-ink tracking-tight mt-1">
                  Contact and Links
                </h1>
              </div>
              <a
                href={`${process.env.PUBLIC_URL}/Christian-Saavedra-Resume.pdf`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-archive-ink hover:bg-archive-cyan text-white hover:text-archive-ink font-mono text-xs transition-colors chamfer-btn"
              >
                [ VIEW / DOWNLOAD RESUME PDF ↗ ]
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                {
                  code: "CHANNEL_01 // ENGINEERING & DATA",
                  label: "Email",
                  email: "christian.nico.saavedra@gmail.com",
                },
                {
                  code: "CHANNEL_02 // AUDIO & PRODUCTION",
                  label: "Music Email",
                  email: "tokibitsu@gmail.com",
                },
              ].map((item) => (
                <div
                  key={item.email}
                  className="p-4 bg-archive-bg border border-archive-line flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="font-mono text-[10px] text-archive-slate">
                      {item.code}
                    </div>
                    <div className="font-semibold text-sm text-archive-ink mt-1">
                      {item.label}
                    </div>
                    <div className="font-mono text-xs md:text-sm text-archive-ink mt-1 break-all">
                      {item.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.email)}
                      className="px-3 py-1 bg-white hover:bg-archive-ink text-archive-ink hover:text-white border border-archive-line font-mono text-[11px] transition-colors"
                    >
                      {copiedEmail === item.email
                        ? "[ COPIED TO CLIPBOARD ]"
                        : "[ COPY ADDRESS ]"}
                    </button>
                    <a
                      href={`mailto:${item.email}`}
                      className="px-3 py-1 bg-white hover:bg-archive-cyan text-archive-ink border border-archive-line font-mono text-[11px] transition-colors"
                    >
                      [ SEND MAIL ↗ ]
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  code: "LINK_01",
                  name: "GitHub",
                  sub: "github.com/cnsaavedra",
                  href: "https://github.com/cnsaavedra",
                  img: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                },
                {
                  code: "LINK_02",
                  name: "LinkedIn",
                  sub: "Christian Saavedra",
                  href: "https://www.linkedin.com/in/christian-saavedra-b07413245/",
                  img: "https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg",
                },
                {
                  code: "LINK_03",
                  name: "SoundCloud",
                  sub: "soundcloud.com/primaryflow",
                  href: "https://soundcloud.com/primaryflow",
                  img: "https://cdn-icons-png.flaticon.com/512/145/145809.png",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-6 bg-archive-bg/60 hover:bg-white border border-archive-line hover:border-archive-ink transition-all flex flex-col items-center text-center chamfer-btn"
                >
                  <div className="w-full flex justify-between font-mono text-[10px] text-archive-slate mb-4">
                    <span>{social.code}</span>
                    <span className="text-archive-cyan group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  </div>
                  <img
                    width={72}
                    height={72}
                    src={social.img}
                    alt={social.name}
                    className="mb-4 group-hover:scale-105 transition-transform"
                  />
                  <div className="font-semibold text-base text-archive-ink">
                    {social.name}
                  </div>
                  <div className="font-mono text-[11px] text-archive-slate mt-1">
                    {social.sub}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-archive-bg text-archive-ink relative selection:bg-archive-cyan selection:text-archive-ink">
      <NeuralBackground />
      <TacticalFrame
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPageFirstLoad={setPageFirstLoad}
      />
      {currentPage === "homepage" && homePage()}
      {currentPage === "experience" && experience()}
      {currentPage === "portfolio" && portfolio()}
      {currentPage === "contact" && contact()}
    </div>
  );
}

export default App;
