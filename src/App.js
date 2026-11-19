import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowDownCircle, ArrowUpCircle } from "./icons/icons";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { TypeAnimation } from "react-type-animation";
import Plx from "react-plx";

const PORTFOLIO_PROJECTS = [
  {
    title: "Demucs & Basic Pitch",
    year: "2026",
    summary:
      "PyTorch 4-stem separation and ONNX CNN audio-to-MIDI note pruning.",
    facts: [
      "Separates mixes into 4 stems with Demucs before running Spotify's Basic Pitch CNN on CPU via ONNX Runtime.",
      "Per-stem frequency bounds cut false-positive MIDI notes from 2,809 down to 1,274 on a 3-minute track.",
      "Pairs melodic inference with an onset and band classifier for kick, snare, and hi-hat grooves.",
    ],
  },
  {
    title: "Musicore",
    year: "2026",
    repoUrl: "https://github.com/cnsaavedra/MUSICORE-PIPELINE",
    summary:
      "Offline NumPy/SciPy chroma and onset alignment compiled into editable FL Studio projects.",
    facts: [
      "Matches candidate MIDI against audio stems using ≤ 20ms onset lock and ≥ 0.65 active-frame chroma correlation.",
      "Computes offline BS.1770 loudness headroom and writes native binary .flp mixer and FX states.",
    ],
  },
  {
    title: "Pick For Us",
    year: "2018 / 2026",
    repoUrl: "https://github.com/cnsaavedra/pickforus",
    summary:
      "60-second anonymous group decision app using NegEx negation, Damerau-Levenshtein, and Approval Voting.",
    facts: [
      "Parses live group chat with NegEx clause-scope negation and word-boundary gazetteer matching.",
      "Recovers typos via Damerau-Levenshtein ≤ 1 and tallies spam-capped Combined Approval Voting {-1, 0, +1} with an inspectable trace.",
    ],
    images: [
      {
        alt: "PickForUs lobby",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/docs/media/lobby.png",
      },
      {
        alt: "PickForUs live chat",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/docs/media/live-chat.png",
      },
      {
        alt: "PickForUs verdict",
        src: "https://github.com/cnsaavedra/pickforus/raw/master/docs/media/verdict.png",
      },
    ],
  },
  {
    title: "Hook Coach & Voice AI",
    year: "2026",
    repoUrl: "https://github.com/cnsaavedra/npc-chat-v2",
    summary:
      "Librosa F0 pitch tracking, Krumhansl-Kessler key detection, faster-whisper STT, and Rust lode-bus.",
    facts: [
      "Segments vocal pitch and musical key from audio alongside syllable-locked lyric cadence analysis.",
      "Streams WebRTC VAD into faster-whisper and local LLMs, and coordinates multi-agent runs via a zero-CPU Rust CLI bus (lode-bus).",
    ],
  },
  {
    title: "Vision & Acoustic SimCore",
    year: "2026",
    repoUrl: "https://github.com/cnsaavedra/house-heist",
    summary:
      "OpenCV/MSS screen tensor pipelines, Tesseract OCR, and Godot C# decibel propagation AI.",
    facts: [
      "Real-time screen tensor capture and template/OCR detection in Python (wrist-helper, ocr-reader).",
      "Deterministic C# room-level sound propagation, resident/SWAT AI, and automated Blender 4.5 glTF asset validation (house-heist).",
    ],
  },
  {
    title: "FFXIV Statistics",
    year: "2024",
    summary:
      "Guild demographic parsing and market board velocity modeling via the Square Enix API.",
    facts: [
      "Parses Final Fantasy XIV server and free-company data into demographic breakdowns.",
      "Computes item sales velocity and demand, and displays gear/fashion catalogs.",
    ],
    slides: [
      "https://i.gyazo.com/f20c7e041f2b2e4d16a4a3dd037db063.png",
      "https://i.gyazo.com/0b62b9e6a7aeb24ce908d014cab2e2fc.png",
      "https://i.gyazo.com/ab826e146b39b2d6d4d2405b0ec74719.png",
    ],
  },
  {
    title: "Archived Pins",
    year: "2023",
    repoUrl: "https://github.com/cnsaavedra/archived-pins",
    summary:
      "Python Discord bot migrating pinned messages into dedicated archive channels.",
    facts: [
      "Transfers channel pins into a persistent archive channel via discord.py with isolated .env config and automated tests.",
    ],
    singleImage: "https://i.gyazo.com/01e0c3a831104f713f78597492c3d3b0.png",
  },
  {
    title: "Old MMO Friends",
    year: "2023",
    summary:
      "PostgreSQL and Express social graph platform for finding former guildmates.",
    facts: [
      "Indexes servers, aliases, friends, and messages in PostgreSQL via Sequelize ORM with Express MVC and JWT auth.",
    ],
    singleImage:
      "https://camo.githubusercontent.com/3e2e771e7d3eb2bf066d1d08ccb44d73af5c54a24446beaf6dc44e5c2c52047b/68747470733a2f2f692e6779617a6f2e636f6d2f64646537653936343964643833356536656164336432623939623465663535302e676966",
  },
];

function FfxivSlider({ slides }) {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 1,
    initial: 0,
    mode: "snap",
    vertical: false,
    spacing: 15,
    controls: true,
  });

  return (
    <div className="keen-slider max-w-[500px] overflow-hidden mt-6">
      <div
        ref={sliderRef}
        className="keen-slider flex gap-4 max-h-[420px] w-full overflow-hidden"
      >
        {slides.map((src, idx) => (
          <div
            key={src}
            className="keen-slider__slide flex flex-col justify-center items-center"
          >
            <img
              className="max-h-[380px] object-contain"
              src={src}
              alt={`FFXIV Statistics ${idx + 1}`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xs opacity-50 mt-2">
              {idx + 1}/{slides.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [pageFirstLoad, setPageFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState("homepage");
  const [pressedAboutMeArrow, setPressedAboutMeArrow] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState("");
  const delay = currentPage === "homepage" ? 1.5 : 0.35;

  const aboutMeRef = useRef(null);
  const albumsRef = useRef(null);

  const [scrollDir, setScrollDir] = useState("none");
  const [yPageOffset, setYPageOffset] = useState(false);

  const isDark = theme === "dark";
  const hairlineClass = isDark ? "border-white/10" : "border-black/10";
  const mutedClass = isDark ? "text-[#9A9A9A]" : "text-[#737373]";

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
      top: 850,
      behavior: "smooth",
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function copyEmail(email) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(""), 1800);
    }
  }

  const parallaxData = [
    {
      start: 0,
      end: 500,
      properties: [
        {
          startValue: 1,
          endValue: 0,
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
          startValue: 0.85,
          endValue: 1,
          property: "opacity",
        },
      ],
    },
  ];

  function homePage() {
    return (
      <div>
        <section className="body-font font-poppins min-h-screen relative">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setPressedAboutMeArrow(true);
                    scrollToAboutMe();
                  }
                }}
                className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-40 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:opacity-50 cursor-pointer"
              >
                <ArrowDownCircle size={36} color="currentColor" />
              </div>
            )}

          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col h-screen">
            <div className="text-center lg:w-2/3 w-full">
              {pageFirstLoad && (
                <TypeAnimation
                  sequence={["Hi, my name is Christian"]}
                  wrapper="div"
                  cursor={true}
                  className="font-light text-3xl md:text-[2.5em]"
                />
              )}

              <Plx className="intro" parallaxData={parallaxData}>
                <h1
                  className={`${
                    pageFirstLoad ? "opacity-0" : "opacity-100"
                  } transition ease-in-out delay-150 title-font text-3xl md:text-title mb-3 font-light tracking-tight`}
                >
                  Welcome to my website
                </h1>
                <p
                  className={`${
                    pageFirstLoad ? "opacity-0" : "opacity-100"
                  } transition-opacity ease-in-out delay-300 text-sm font-light mb-10 ${mutedClass}`}
                >
                  Data, neural networks, and software engineering.
                </p>

                <div className="flex justify-center items-center gap-10 mb-10">
                  <button
                    type="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("experience");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer transition-opacity ease-in-out delay-300 duration-300 leading-relaxed text-paragraph font-light hover:opacity-35`}
                  >
                    Experience
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("portfolio");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer transition-opacity ease-in-out delay-500 duration-300 leading-relaxed text-paragraph font-light hover:opacity-35`}
                  >
                    Portfolio
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer transition-opacity ease-in-out delay-700 duration-300 leading-relaxed text-paragraph font-light hover:opacity-35`}
                  >
                    Contact
                  </button>
                </div>

                <div className="flex justify-center items-center gap-8 mb-8">
                  <a
                    href="https://github.com/cnsaavedra"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } transition-all ease-in-out duration-300 hover:opacity-40 hover:-translate-y-0.5`}
                  >
                    <img
                      className={isDark ? "invert" : ""}
                      width={26}
                      height={26}
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="GitHub"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christian-saavedra-b07413245/"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } transition-all ease-in-out duration-300 hover:opacity-40 hover:-translate-y-0.5`}
                  >
                    <img
                      className={isDark ? "brightness-200 grayscale" : ""}
                      width={26}
                      height={26}
                      src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                      alt="LinkedIn"
                    />
                  </a>
                  <a
                    href="https://soundcloud.com/primaryflow"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } transition-all ease-in-out duration-300 hover:opacity-40 hover:-translate-y-0.5`}
                  >
                    <img
                      width={26}
                      height={26}
                      src="https://cdn-icons-png.flaticon.com/512/145/145809.png"
                      alt="SoundCloud"
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
                className="body-font font-poppins min-h-screen py-28 px-6 flex items-center"
              >
                <div className="max-w-2xl mx-auto flex flex-col items-center text-left">
                  <img
                    className="rounded-full w-36 h-36 object-cover mb-10"
                    src="https://avatars.githubusercontent.com/u/16085208?v=4"
                    alt="Christian Saavedra"
                  />
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 self-start">
                    About Me
                  </h2>
                  <div className="space-y-5 text-sm md:text-base font-light leading-relaxed">
                    <p>
                      University of Toronto graduate (Computer Science, Math
                      &amp; Applied Statistics minors). Across TrillionCore,
                      Pettable, FutureFuture, and Runner, I&apos;ve built AI
                      pipelines, analytics systems, and full-stack software
                      serving 500,000+ users.
                    </p>
                    <p>
                      Outside of work, I focus on deep learning, audio signal
                      processing, NLP, and data tools on{" "}
                      <a
                        className="underline underline-offset-4 hover:opacity-40 transition-opacity"
                        href="https://github.com/cnsaavedra"
                        target="_blank"
                        rel="noreferrer"
                      >
                        github.com/cnsaavedra
                      </a>{" "}
                      — mostly in Python, TypeScript, and Rust.
                    </p>
                    <p>
                      I also produce instrumental music (Jazz Hop Café Records,
                      1M+ streams), which is what first pulled me into neural
                      audio separation and signal processing.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-start items-center gap-6 mt-8 self-start text-sm font-light">
                    <a
                      className="underline underline-offset-4 hover:opacity-40 transition-opacity"
                      href="https://soundcloud.com/primaryflow"
                      target="_blank"
                      rel="noreferrer"
                    >
                      SoundCloud
                    </a>
                    <a
                      className="underline underline-offset-4 hover:opacity-40 transition-opacity"
                      href="https://open.spotify.com/artist/1KBXaBhFptSB4D7ncgxITI"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Spotify
                    </a>
                    <a
                      className="underline underline-offset-4 hover:opacity-40 transition-opacity"
                      href="https://music.apple.com/ng/artist/dominant/id1275392590"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apple Music
                    </a>
                    <a
                      className="underline underline-offset-4 hover:opacity-40 transition-opacity"
                      href="https://dominantmusic.bandcamp.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Bandcamp
                    </a>
                  </div>
                </div>
              </section>
            </Plx>

            <section
              id="albums"
              ref={albumsRef}
              className="body-font font-poppins min-h-screen py-28 px-6 flex flex-col items-center justify-center"
            >
              <div className="max-w-[500px] w-full mx-auto">
                <h2 className="text-3xl font-light tracking-tight mb-2">
                  Albums
                </h2>
                <p className={`text-sm font-light mb-10 ${mutedClass}`}>
                  DOMINANT — 1M+ streams
                </p>
                <div className="space-y-4">
                  <iframe
                    title="Harvest of Memories"
                    className="border-0 w-full h-[120px]"
                    src="https://bandcamp.com/EmbeddedPlayer/album=1224178121/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/harvest-of-memories">
                      Harvest of Memories by DOMINANT
                    </a>
                  </iframe>
                  <iframe
                    title="winter story"
                    className="border-0 w-full h-[120px]"
                    src="https://bandcamp.com/EmbeddedPlayer/album=2211329182/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/winter-story">
                      winter story by DOMINANT
                    </a>
                  </iframe>
                  <iframe
                    title="prismatic"
                    className="border-0 w-full h-[120px]"
                    src="https://bandcamp.com/EmbeddedPlayer/album=793618864/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/prismatic">
                      prismatic by DOMINANT
                    </a>
                  </iframe>
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
        company: "TrillionCore",
        dates: "Dec 2025 – Present",
        role: "Full-Stack Developer",
        facts: [
          "Built an AI document enrichment pipeline across 10 document types with duplicate detection and pgvector search.",
          "Created the shared AI agent baseline and architecture rules across TrillionCore, Birch, and TrillionWork.",
          "Took Birch from prototype to live MVP (AI brief analysis, generated decks, 15-layout editor, QA simulator).",
          "Shipped 8 OAuth/webhook integrations, metered Stripe billing, and a Sentry-to-PR bot.",
        ],
      },
      {
        company: "Pettable",
        dates: "Apr 2023 – Dec 2025",
        role: "Full-Stack Developer",
        facts: [
          "Helped grow Pettable from ~150,000 to 250,000+ customers across funnel, checkout, and internal workflows.",
          "Built live revenue and operations dashboards plus the SQL and APIs behind them.",
          "Owned technical SEO (Webflow, structured data) and Segment/UTM/GTM subscription analytics.",
        ],
      },
      {
        company: "FutureFuture",
        dates: "Jan 2022 – Mar 2023",
        role: "Full-Stack Developer",
        facts: [
          "Built web and mobile analytics, e-commerce, and delivery apps (React, TypeScript, Laravel, AWS).",
          "Automated data pipelines behind 500,000+ users and led merchant and dispatcher dashboards.",
        ],
      },
      {
        company: "Runner",
        dates: "Jun 2019 – Aug 2020",
        role: "Front-End / Full-Stack Developer",
        facts: [
          "Developed e-commerce and analytics platforms with Vue, React Native, Laravel, and Redshift/PostgreSQL on large datasets.",
          "Moved from cross-browser QA and front-end fixes to owning full-stack tools and analytics APIs.",
        ],
      },
    ];

    return (
      <section className="body-font font-poppins min-h-screen">
        <button
          type="button"
          onClick={() => {
            setCurrentPage("homepage");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed top-7 left-7 md:top-10 md:left-10 z-40 cursor-pointer hover:opacity-35 transition-opacity"
          aria-label="Back to home"
        >
          <ArrowLeft color="currentColor" />
        </button>

        <div className="max-w-2xl mx-auto px-6 py-24">
          <div
            className={`${
              pageFirstLoad ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            } transition-all ease-in-out duration-300 text-center mb-14`}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
              Experience
            </h1>
            <p className={`text-sm font-light ${mutedClass}`}>
              University of Toronto — HBSc Computer Science, Math &amp; Applied
              Statistics
            </p>
            <a
              href={`${process.env.PUBLIC_URL}/Christian-Saavedra-Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm font-light underline underline-offset-4 hover:opacity-40 transition-opacity"
            >
              Resume (PDF) ↗
            </a>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } transition-opacity ease-in-out duration-300`}
          >
            {roles.map((r) => (
              <div
                key={r.company}
                className={`border-b ${hairlineClass} pb-8 mb-8`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h2 className="text-2xl font-light tracking-tight">
                    {r.company}
                  </h2>
                  <span className={`text-xs font-light ${mutedClass}`}>
                    {r.dates}
                  </span>
                </div>
                <div className={`text-sm font-light mb-4 ${mutedClass}`}>
                  {r.role}
                </div>
                <ul className="space-y-2 text-sm md:text-[15px] font-light leading-relaxed">
                  {r.facts.map((fact, idx) => (
                    <li key={idx}>• {fact}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pt-2 space-y-2 text-sm font-light">
              <div className={`text-xs uppercase tracking-widest mb-3 ${mutedClass}`}>
                Skills
              </div>
              <p>
                <span className="font-medium">AI &amp; Data</span> — PyTorch,
                ONNX, pgvector/HNSW, Anthropic/OpenAI APIs, MCP, BullMQ,
                BigQuery, Fivetran, Segment
              </p>
              <p>
                <span className="font-medium">Languages</span> — TypeScript,
                JavaScript, Python, SQL, Rust, PHP, R, Java, C
              </p>
              <p>
                <span className="font-medium">Web &amp; Infra</span> — React 19,
                Next.js, Node, Hono, oRPC, Prisma, PostgreSQL, AWS, Vercel,
                Railway, Docker, Stripe
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function portfolio() {
    return (
      <section className="body-font font-poppins min-h-screen">
        <button
          type="button"
          onClick={() => {
            setCurrentPage("homepage");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed top-7 left-7 md:top-10 md:left-10 z-40 cursor-pointer hover:opacity-35 transition-opacity"
          aria-label="Back to home"
        >
          <ArrowLeft color="currentColor" />
        </button>

        <div className="max-w-3xl mx-auto px-6 py-24">
          <div
            className={`${
              pageFirstLoad ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            } transition-all ease-in-out duration-300 text-center mb-14`}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
              Portfolio
            </h1>
            <p className={`text-sm font-light ${mutedClass}`}>
              Data, neural networks, signal processing, and web projects.
            </p>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } transition-opacity ease-in-out duration-300`}
          >
            {PORTFOLIO_PROJECTS.map((project, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div
                  key={project.title}
                  className={`border-b ${hairlineClass} py-6`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex(isOpen ? null : idx)
                    }
                    className="w-full text-left group focus:outline-none"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-light tracking-tight group-hover:opacity-45 transition-opacity">
                        {project.title}
                      </h2>
                      <span className={`text-xs font-light shrink-0 ${mutedClass}`}>
                        {project.year} {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    <p className={`text-sm font-light mt-1.5 ${mutedClass}`}>
                      {project.summary}
                    </p>
                  </button>

                  {isOpen && (
                    <div className="mt-5 pt-2 space-y-3 text-sm md:text-[15px] font-light leading-relaxed">
                      <ul className="space-y-2">
                        {project.facts.map((fact, fIdx) => (
                          <li key={fIdx}>• {fact}</li>
                        ))}
                      </ul>

                      {project.repoUrl && (
                        <div>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-sm underline underline-offset-4 hover:opacity-40 transition-opacity"
                          >
                            GitHub ↗
                          </a>
                        </div>
                      )}

                      {project.images && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                          {project.images.map((img) => (
                            <img
                              key={img.src}
                              src={img.src}
                              alt={img.alt}
                              className={`w-full object-contain border ${hairlineClass}`}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {project.slides && (
                        <FfxivSlider slides={project.slides} />
                      )}

                      {project.singleImage && (
                        <div className="pt-3">
                          <img
                            src={project.singleImage}
                            alt={project.title}
                            className="max-h-[380px] object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <a
              href="https://github.com/cnsaavedra/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-light underline underline-offset-4 hover:opacity-40 transition-opacity"
            >
              More on github.com/cnsaavedra ↗
            </a>
          </div>

          {yPageOffset && (
            <div
              tabIndex={0}
              role="button"
              onClick={() => {
                setPressedAboutMeArrow(true);
                scrollToTop();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setPressedAboutMeArrow(true);
                  scrollToTop();
                }
              }}
              className="fixed z-40 bottom-8 right-8 md:bottom-10 md:right-10 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:opacity-50 cursor-pointer"
            >
              <ArrowUpCircle size={36} color="currentColor" />
            </div>
          )}
        </div>
      </section>
    );
  }

  function contact() {
    return (
      <section className="body-font font-poppins min-h-screen flex flex-col items-center justify-center px-6">
        <button
          type="button"
          onClick={() => {
            setCurrentPage("homepage");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed top-7 left-7 md:top-10 md:left-10 z-40 cursor-pointer hover:opacity-35 transition-opacity"
          aria-label="Back to home"
        >
          <ArrowLeft color="currentColor" />
        </button>

        <div
          className={`${
            pageFirstLoad ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          } transition-all ease-in-out duration-300 text-center max-w-xl w-full`}
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-10">
            Contact
          </h1>

          <div className="space-y-4 text-sm md:text-base font-light">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:christian.nico.saavedra@gmail.com"
                className="hover:opacity-45 transition-opacity"
              >
                christian.nico.saavedra@gmail.com
              </a>
              <button
                type="button"
                onClick={() => copyEmail("christian.nico.saavedra@gmail.com")}
                className={`text-xs underline underline-offset-4 hover:opacity-45 transition-opacity ${mutedClass}`}
              >
                {copiedEmail === "christian.nico.saavedra@gmail.com"
                  ? "Copied"
                  : "Copy"}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className={mutedClass}>Music:</span>
              <a
                href="mailto:tokibitsu@gmail.com"
                className="hover:opacity-45 transition-opacity"
              >
                tokibitsu@gmail.com
              </a>
              <button
                type="button"
                onClick={() => copyEmail("tokibitsu@gmail.com")}
                className={`text-xs underline underline-offset-4 hover:opacity-45 transition-opacity ${mutedClass}`}
              >
                {copiedEmail === "tokibitsu@gmail.com" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-10 text-base font-light">
            <a
              href="https://github.com/cnsaavedra"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-40 transition-opacity"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/christian-saavedra-b07413245/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-40 transition-opacity"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://soundcloud.com/primaryflow"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-40 transition-opacity"
            >
              SoundCloud ↗
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ${
        isDark
          ? "bg-[#111111] text-[#F2F2F2]"
          : "bg-[#FAFAFA] text-[#141414]"
      }`}
    >
      <div
        className={`fixed inset-4 md:inset-6 pointer-events-none z-30 border ${hairlineClass}`}
      />

      <div className="fixed bottom-6 left-7 md:bottom-8 md:left-9 z-40 flex items-center gap-4 text-[11px] tracking-widest uppercase font-poppins">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`transition-opacity hover:opacity-45 ${
            !isDark ? "opacity-100" : "opacity-45"
          }`}
        >
          {!isDark ? "■ Light" : "□ Light"}
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`transition-opacity hover:opacity-45 ${
            isDark ? "opacity-100" : "opacity-45"
          }`}
        >
          {isDark ? "■ Dark" : "□ Dark"}
        </button>
      </div>

      {currentPage === "homepage" && homePage()}
      {currentPage === "experience" && experience()}
      {currentPage === "portfolio" && portfolio()}
      {currentPage === "contact" && contact()}
    </div>
  );
}

export default App;
