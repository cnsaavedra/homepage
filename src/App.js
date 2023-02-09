import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowDownCircle, ArrowUpCircle } from "./icons/icons";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { TypeAnimation } from "react-type-animation";
import Plx from "react-plx";

function App() {
  const [pageFirstLoad, setPageFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState("homepage");
  const [pressedAboutMeArrow, setPressedAboutMeArrow] = useState(false);
  const delay = currentPage === "homepage" ? 4 : 0.5;

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
      console.log(scrollDir);

      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [scrollDir, pageFirstLoad]);

  useEffect(() => {
    let timer1 = setTimeout(() => setPageFirstLoad(false), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [currentPage]);

  function aboutMe() {}

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
          startValue: 0.5,
          endValue: 1,
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

  const parallaxDataAlbums = [
    {
      start: "self",
      end: "#end",
      properties: [
        {
          startValue: "#3cb99c",
          endValue: "rgba(50,50,200,0.8)",
          property: "backgroundColor",
        },
        {
          startValue: 0,
          endValue: 100,
          property: "translateY",
        },
        {
          startValue: 0.75,
          endValue: 1,
          property: "opacity",
        },
      ],
    },
  ];

  function homePage() {
    return (
      <div>
        <section className="body-font font-poppins min-h-screen">
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
                className="absolute bottom-10 right-10 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:animate-pulse cursor-pointer"
              >
                <ArrowDownCircle size={45} />
              </div>
            )}
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col h-screen">
            <div className="text-center lg:w-2/3 w-full">
              {pageFirstLoad && (
                <TypeAnimation
                  sequence={[
                    "Hi,", // Types 'One'
                    1000, // Waits 2s
                    "Hi, my name is Christian Saavedra", // Types 'Three' without deleting 'Two'
                    () => {
                      console.log("Done typing!"); // Place optional callbacks anywhere in the array
                    },
                  ]}
                  wrapper="div"
                  cursor={true}
                  style={{ fontSize: "3em" }}
                />
              )}
              <Plx className="intro" parallaxData={parallaxData}>
                <h1
                  className={`${
                    pageFirstLoad ? "opacity-0" : "opacity-100"
                  } transition ease-in-out delay-150 title-font text-title mb-4 font-medium text-primary-800 text-black`}
                >
                  Welcome to my website
                </h1>
                <div className="flex justify-center items-center gap-8 mb-8">
                  <h6
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("experience");
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer hover:text-gray-200 transition-opacity ease-in-out delay-500 mb-8 leading-relaxed text-paragraph text-black`}
                  >
                    Experience
                  </h6>
                  <h6
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("portfolio");
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer hover:text-gray-200 transition-opacity ease-in-out delay-700 mb-8 leading-relaxed text-paragraph text-black`}
                  >
                    Portfolio
                  </h6>
                  <h6
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setPageFirstLoad(true);
                      setCurrentPage("contact");
                    }}
                    className={`${
                      pageFirstLoad ? "opacity-0" : "opacity-100"
                    } cursor-pointer hover:text-gray-200 transition-opacity ease-in-out delay-1000 mb-8 leading-relaxed text-paragraph text-black`}
                  >
                    Contact
                  </h6>
                </div>
                <div className="flex justify-center items-center gap-8 mb-8 ml-6">
                  <a href="https://github.com/cnsaavedra">
                    <img
                      className={`${
                        pageFirstLoad
                          ? "opacity-0 -left-36"
                          : "opacity-100 left-0"
                      }  transition-all ease-in-out delay-75 duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                      width={40}
                      height={40}
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="Github"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/christian-saavedra-b07413245/">
                    <img
                      className={`${
                        pageFirstLoad
                          ? "opacity-0 -left-36"
                          : "opacity-100 left-0"
                      }  transition-all ease-in-out delay-75 duration-500 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                      width={40}
                      height={40}
                      src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                      alt="Linkedin"
                    />
                  </a>
                  <a href="https://soundcloud.com/primaryflow">
                    <img
                      className={`${
                        pageFirstLoad
                          ? "opacity-0 -left-36"
                          : "opacity-100 left-0"
                      }  transition-all ease-in-out delay-75 duration-700 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                      width={40}
                      height={40}
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
                className="body-font font-poppins min-h-screen py-12"
              >
                <div className="flex flex-col justify-center items-center mx-auto">
                  <img
                    className="rounded-full w-[200px] h-[200px]"
                    src="https://media.licdn.com/dms/image/C4D03AQGwMRyxQcAftA/profile-displayphoto-shrink_200_200/0/1657980975938?e=1680739200&v=beta&t=FHyOmPGy-_d7Lul5MpPRnQLWRr7TDaaOxbqMcRwl3nQ"
                    alt="Profile"
                  />
                  <h1 className="text-[4em] my-8">About Me</h1>
                  <p className="md:w-[1000px] mb-8 mx-8 md:mx-0">
                    I graduated from the University of Toronto with an HBSc,
                    including Computer Science Major, Math and Statistics
                    Minors. Before graduating, I interned through Runner, where
                    I learned a lot about coding practices, industry standards,
                    and more involving dev workspaces. After graduating, I
                    returned to Runner / FutureFuture (Under the umbrella of
                    Runner), where I developed and maintained an E-Commerce
                    website involving many other projects related to analytics,
                    dispatching, and delivery software solutions. In Runner /
                    FutureFuture, I led a project staffed as a Full-stack & Lead
                    Developer working on various roles such as Front-end,
                    Back-end, Mobile, and Dev-ops. My main focus was to build a
                    dashboard for merchants/partners of the company that allows
                    them to View/Edit/Add orders, products, menu's, and also see
                    analtics/insights.
                  </p>
                  <p className="md:w-[1000px] mx-8 md:mx-0">
                    In my spare time, I developed my personal portfolio
                    <a href="github.com/cnsaavedra">
                      {" "}
                      (github.com/cnsaavedra){" "}
                    </a>
                    by making web, mobile, and desktop applications, mostly in
                    Javascript, Python, and its frameworks. Outside of my
                    professional and academic life, I'm a semi-professional
                    music producer. I have produced for record labels such as
                    Jazz Hop Café Records and I have achieved more than a
                    million streams through several music platforms (Spotify,
                    SoundCloud, Bandcamp, etc.). You can listen to my music
                    using the links below.
                  </p>
                  <div className="mx-8 md:mx-0 flex flex-col justify-start items-center my-8 gap-4 md:flex-row">
                    <a
                      className="text-blue-500 underline"
                      href="https://soundcloud.com/primaryflow"
                    >
                      SoundCloud
                    </a>
                    <a
                      className="text-blue-500 underline"
                      href="https://open.spotify.com/artist/1KBXaBhFptSB4D7ncgxITI"
                    >
                      Spotify
                    </a>
                    <a
                      className="text-blue-500 underline"
                      href="https://music.apple.com/ng/artist/dominant/id1275392590"
                    >
                      Apple Music
                    </a>
                    <a
                      className="text-blue-500 underline"
                      href="https://dominantmusic.bandcamp.com"
                    >
                      Bandcamp
                    </a>
                  </div>
                </div>
              </section>
            </Plx>
            <Plx className="intro" parallaxData={parallaxDataAlbums}>
              <section
                id="albums"
                ref={albumsRef}
                className="body-font font-poppins min-h-screen py-12 flex flex-col items-center justify-center"
              >
                <h1 className="my-8 text-[24px] text-white">
                  Have a sneak at my albums!
                </h1>
                <div className="mx-auto flex flex-col justify-center items-center w-[500px]">
                  <iframe
                    title="Harvest of Memories"
                    className="border-0 w-full h-[120px] self-center"
                    src="https://bandcamp.com/EmbeddedPlayer/album=1224178121/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/harvest-of-memories">
                      Harvest of Memories by DOMINANT
                    </a>
                  </iframe>
                  <iframe
                    title="winter story"
                    className="border-0 w-full h-[120px] self-center"
                    src="https://bandcamp.com/EmbeddedPlayer/album=2211329182/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/winter-story">
                      winter story by DOMINANT
                    </a>
                  </iframe>
                  <iframe
                    title="prismatic"
                    className="border-0 w-full h-[120px] self-center"
                    src="https://bandcamp.com/EmbeddedPlayer/album=793618864/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://dominantmusic.bandcamp.com/album/prismatic">
                      prismatic by DOMINANT
                    </a>
                  </iframe>
                </div>
              </section>
              <div id="end" />
            </Plx>
          </>
        )}
      </div>
    );
  }

  function experience() {
    return (
      <section className="body-font font-poppins">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setCurrentPage("homepage");
            }}
            className="absolute top-5 left-5 cursor-pointer"
          >
            <div className="hover:opacity-50">
              <ArrowLeft />
            </div>
          </div>
          <div className="text-center lg:w-2/3 w-full">
            <h1
              className={`${
                pageFirstLoad ? "opacity-0 top-10" : "opacity-100 top-0"
              } relative transition-all ease-in-out delay-75 title-font text-title mb-4 font-medium text-primary-800 text-black`}
            >
              Experience
            </h1>
          </div>
          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } relative transition-all ease-in-out delay-300 mb-8 pb-8 border-b-[0.5px] border-gray-200 w-full mx-auto flex justify-center flex-col items-center`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                width={40}
                height={40}
                src="https://media.licdn.com/dms/image/C560BAQE4LymCVTWYLg/company-logo_100_100/0/1519887572074?e=1682553600&v=beta&t=yQW-JNz_A5FHo6llpm6KFauBG1k24EXzIhEPFDsfFBw"
                alt="Logo"
              />
              <h1 className="font-bold text-[32px] my-12">
                FutureFuture Inc. (Jan 2022 - Jan 2023)
              </h1>
            </div>
            <ul className="gap-2 flex flex-col w-full justify-start">
              <h1 className="font-bold text-[20px] my-[5px]">
                Full-stack / Lead Developer
              </h1>
              <li className="text-[16px] ml-[8px]">
                • Worked on various projects: Merchant Dashboard, E-Commerce
                Tools, Delivery Solutions, Courier/Driver applications to help
                couriers with delivery all via React, React Native, PHP, Laravel
                and AWS.
              </li>
              <li className="text-[16px] ml-[8px]">
                • Developed new features, and pages and fixed bugs for the main
                delivery website including new checkout methods, blog page,
                partners page, career signup, and more • Developed new features
                for the delivery dashboard, improving the workflow of Customer
                Service and Dispatchers
              </li>
              <li className="text-[16px] ml-[8px]">
                • Automated metrics that allow couriers to see their statistics
                on delivering • Created a dashboard for merchants to use
                involving analytics that allows them to view/edit/add orders,
                products, menus, and insights for both web and mobile
              </li>
            </ul>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } relative transition-all ease-in-out delay-300 w-full mx-auto flex justify-center flex-col items-center`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                width={40}
                height={40}
                src="https://media.licdn.com/dms/image/C4E0BAQEP4gbQhWMX-A/company-logo_100_100/0/1639493389335?e=1682553600&v=beta&t=06FZkRCrXBS7liVuQzHR3hf13v6VZ8qhheYomIYFcRk"
                alt="Logo"
              />
              <h1 className="font-bold text-[32px] md:my-12">
                Runner Inc. (Jun 2019 - Aug 2020)
              </h1>
            </div>
            <ul className="gap-2 flex flex-col w-full justify-start">
              <h1 className="font-bold text-[20px] my-[5px]">
                Full-stack Developer
              </h1>
              <li className="text-[16px] ml-[8px]">
                • Using PHP, Laravel, AWS, Amazon Redshift, PostgreSQL, Stripe,
                Xero
              </li>
              <li className="text-[16px] ml-[8px]">
                • Worked on database queries to help with analytics
              </li>
              <li className="text-[16px] ml-[8px]">
                • Automating tables, charts, excel sheets, data manipulations,
                and data stores
              </li>
              <li className="text-[16px] ml-[8px]">
                • Created API's for all platforms worked on such as: e-commerce
                api's, analytics, database storing, invoice, automation, and map
                system for order/courier infos
              </li>
            </ul>
            <br />
            <ul className="gap-2 flex flex-col w-full justify-start my-4">
              <h1 className="font-bold text-[20px] my-[5px]">
                Front-end Developer
              </h1>
              <li className="text-[16px] ml-[8px]">
                • Worked on various projects:
                <li className="ml-[8px]">
                  - Dispatch to help dispatchers/couriers, Ecommerce website,
                  Analytics Platform, Courier App to help couriers with delivery
                </li>
              </li>
              <li className="text-[16px] ml-[8px]">
                • Overall improve, fix and organize code
              </li>
              <li className="text-[16px] ml-[8px]">
                • Improved UI/UX and added utilities/pages for dispatch team
                with task/order lists, user info, mapping system UI/UX, and
                auto-updates
              </li>
              <li className="text-[16px] ml-[8px]">
                • Improved UI/UX and added utilities/pages for the main website
                using animations and improved Frontend code
              </li>
              <li className="text-[16px] ml-[8px]">
                • Created application for both website and iOS that helps with
                analytics
              </li>
              <li className="text-[16px] ml-[8px]">
                • Started on an app for couriers using React Native on iOS
              </li>
              <li className="text-[16px] ml-[8px]">
                • Using custom CSS and Javascript
              </li>
              <li className="text-[16px] ml-[8px]">
                • Worked on both Vue and React Native
              </li>
              <li className="text-[16px] ml-[8px]">
                • QA work such as creating test, automation and overall bug
                testing
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    initial: 0,
    mode: "snap",
    vertical: false,
    spacing: 15,
    controls: true,
    breakpoints: {
      "(max-width: 768px)": {
        slidesPerView: 1,
        vertical: true,
      },
    },
  });

  const parallaxDataP1 = [
    {
      start: "self",
      end: 1500,
      duration: 1000,
      properties: [
        {
          startValue: 0.75,
          endValue: 1.05,
          property: "scale",
        },
      ],
    },
  ];

  const parallaxDataP2 = [
    {
      start: "self",
      end: 2400,
      properties: [
        {
          startValue: 0.75,
          endValue: 1.05,
          property: "scale",
        },
      ],
    },
  ];

  const parallaxDataP3 = [
    {
      start: "self",
      end: 2800,
      properties: [
        {
          startValue: 0.75,
          endValue: 1.05,
          property: "scale",
        },
      ],
    },
  ];

  const parallaxDataP4 = [
    {
      start: "self",
      end: 3900,
      properties: [
        {
          startValue: 0.75,
          endValue: 1.05,
          property: "scale",
        },
      ],
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  function portfolio() {
    return (
      <section className="body-font font-poppins">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setCurrentPage("homepage");
            }}
            className="absolute top-5 left-5 cursor-pointer"
          >
            <div className="hover:opacity-50">
              <ArrowLeft />
            </div>
          </div>
          <div className="text-center lg:w-2/3 w-full">
            <h1
              className={`${
                pageFirstLoad ? "opacity-0 top-10" : "opacity-100 top-0"
              } relative transition-all ease-in-out delay-75 title-font text-title mb-4 font-medium text-primary-800 text-black`}
            >
              Portfolio
            </h1>
          </div>
          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } relative transition-all ease-in-out delay-300`}
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="font-bold text-[50px] my-8">Old MMO Friends</h1>
            </div>
            <div className="flex flex-col md:flex-row md:gap-[250px] items-center pb-8 border-b-2 border-gray-200">
              <ul className="gap-2 flex flex-col justify-start mx-auto">
                <li className="text-[18px]">
                  • Users find and message other users to socialize/reconcile
                  via this social platform.
                </li>
                <li className="text-[18px]">
                  • Manages users; profiles, friends, messages, notifications
                  and other user information.
                </li>
                <li className="text-[18px]">
                  • Uses PostgreSQL via Sequelize creating queries
                </li>
                <li className="text-[18px]">
                  • Follows an MVC structure along with a client and a server,
                  with Express.js back-end framework.
                </li>
                <li className="text-[18px] mb-8 md:mb-0">
                  • Hashes user passwords with JWT tokens
                </li>
              </ul>
              <div className="mx-auto flex justify-center">
                <img
                  className="object-contain"
                  src="https://camo.githubusercontent.com/3e2e771e7d3eb2bf066d1d08ccb44d73af5c54a24446beaf6dc44e5c2c52047b/68747470733a2f2f692e6779617a6f2e636f6d2f64646537653936343964643833356536656164336432623939623465663535302e676966"
                  alt="Logo"
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } relative transition-all ease-in-out delay-300`}
          >
            <div className="flex flex-col items-start md:items-center gap-4 mb-4">
              <h1 className="font-bold text-[50px] my-8">FFXIV Statistics</h1>
            </div>
            <div className="flex flex-col md:flex-row md:gap-[250px] items-center pb-8 border-b-2 border-gray-200">
              <ul className="gap-2 flex flex-col justify-start mx-auto">
                <li className="text-[18px]">
                  • Using the API of Final Fantasy 14 by Square Enix to gather
                  data that allows to analyze statistics given by the API
                </li>
                <li className="text-[18px]">
                  • Manipulated data to get the results we need in a UI/UX
                  friendly manner, designed to show an attractive way to present
                  statistics
                </li>
                <li className="text-[18px]">
                  • Ability to find out the demographics of a guild, through
                  data manipluations and parsing
                </li>
                <li className="text-[18px]">
                  • Ability to find out the best market values through finding
                  velocities of items sold and their demands
                </li>
                <li className="text-[18px] mb-8 md:mb-0">
                  • Efficiently uses CSS flex/grid to show the "fashion" section
                  of the website in an easy and efficient way to present the
                  clothings from the game
                </li>
              </ul>
              <div className="keen-slider max-w-[500px] overflow-hidden">
                <div
                  ref={sliderRef}
                  className="keen-slider flex gap-4 h-[500px] w-[500px] overflow-hidden"
                >
                  <div className="keen-slider__slide flex flex-col justify-center items-center">
                    <img
                      className="h-[500px]"
                      src="https://i.gyazo.com/f20c7e041f2b2e4d16a4a3dd037db063.png"
                      alt="Logo"
                    />
                    <h6 className="flex justify-center self-center">1/3</h6>
                  </div>
                  <div className="keen-slider__slide flex flex-col justify-center items-center">
                    <img
                      className="h-[500px]"
                      src="https://i.gyazo.com/0b62b9e6a7aeb24ce908d014cab2e2fc.png"
                      alt="Logo"
                    />
                    <h6 className="flex justify-center self-center">2/3</h6>
                  </div>
                  <div className="keen-slider__slide flex flex-col justify-center items-center">
                    <img
                      className="h-[500px] object-cover"
                      src="https://i.gyazo.com/ab826e146b39b2d6d4d2405b0ec74719.png"
                      alt="Logo"
                    />
                    <h6 className="flex justify-center self-center">3/3</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              pageFirstLoad ? "opacity-0" : "opacity-100"
            } relative transition-all ease-in-out delay-300`}
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="font-bold text-[50px] my-8">Pick For Us</h1>
            </div>
            <div className="flex flex-col md:gap-[500px] items-center pb-8 border-b-2 border-gray-200">
              <ul className="gap-8 md:gap-2 flex flex-col justify-start">
                <li className="text-[18px] flex flex-col italic">
                  • Done through vanilla Javascript, HTML, using MongoDB for the
                  database to show that the foundation of Javascript, HTML,
                  jQuery, Database related languages
                </li>
                <li className="text-[18px]">
                  • Hanging out with friends? Everyone is indecisive and you all
                  don't know where to go? Get everyone on this website and
                  anonymously share your thoughts on what to do for the rest of
                  the day!
                </li>
                <li className="text-[18px] flex flex-col">
                  • What's so special about this? Can't we just share our
                  thoughts in real life?
                  <span className="text-[15px] ml-8">
                    No one will be the decisive friend and finalize a place. It
                    is also most likely that deep down, you and your friends
                    have an idea what you all really want. This website will
                    extract the information needed from you and your friends to
                    finalize and get the most wanted option. And really if
                    everyone is indecisive, who is the leader of the group? THIS
                    WEBSITE!
                  </span>
                </li>
                <li className="text-[18px] flex flex-col">
                  •How do you extract the most wanted option?
                  <span className="text-[15px] ml-8">
                    You are given 60 seconds to put in your thoughts, therefore
                    the website is trying to get the first thing that comes to
                    you and your friends minds.
                    {!isMobile ? (
                      <Plx className="p1-img" parallaxData={parallaxDataP1}>
                        <img
                          className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                          src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/mainmenu.png"
                          alt="Logo"
                        />
                      </Plx>
                    ) : (
                      <img
                        className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                        src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/mainmenu.png"
                        alt="Logo"
                      />
                    )}
                  </span>
                </li>
                <li className="text-[18px] flex flex-col">
                  • For example if we want to choose a food place, we would
                  select "Picking Food".
                  {!isMobile ? (
                    <Plx className="p2-img" parallaxData={parallaxDataP2}>
                      <img
                        className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                        src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/chatscreenfood.png"
                        alt="Logo"
                      />
                    </Plx>
                  ) : (
                    <img
                      className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                      src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/chatscreenfood.png"
                      alt="Logo"
                    />
                  )}
                </li>
                <li className="text-[18px] flex flex-col">
                  • In this scenario, seems like everyone is okay with whatever.
                  The website analyzes the data and tries to narrow down options
                  and finally giving the best option.
                  {!isMobile ? (
                    <Plx className="p3-img" parallaxData={parallaxDataP3}>
                      <img
                        className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                        src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/databasefood.png"
                        alt="Logo"
                      />
                    </Plx>
                  ) : (
                    <img
                      className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                      src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/databasefood.png"
                      alt="Logo"
                    />
                  )}
                </li>
                <li className="text-[18px] flex flex-col">
                  • From the database, the website narrowed down to only
                  selecting food and checks for the most common cuisine/food (If
                  someone says "I don't want burger" it would detect the "don't
                  want (insert food here)" and would not include burger).
                  {!isMobile ? (
                    <Plx className="p4-img" parallaxData={parallaxDataP4}>
                      <img
                        className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                        src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/suggestionfoodv2.png"
                        alt="Logo"
                      />
                    </Plx>
                  ) : (
                    <img
                      className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                      src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/suggestionfoodv2.png"
                      alt="Logo"
                    />
                  )}
                </li>
                <li className="text-[18px] flex flex-col">
                  • So in the end we are given these options!
                </li>
                <li className="text-[18px] flex flex-col">
                  • The "You have duplicates, but we fixed that for you" is
                  towards the message that had burger in the same sentence (Or
                  could be spammed by the same guy. Keep in mind if it's from
                  the same guy who wants to spam a certain cuisine/food in the
                  chat then not everyone indecisive and therefore that person
                  can plan the meal for everyone). It is a way to disallow from
                  repeating the same words accidentally.
                </li>
              </ul>
            </div>
          </div>
          <h1 className="my-8">
            More on{" "}
            <a
              href="https://github.com/cnsaavedra/"
              className="underline text-blue-300"
            >
              my github
            </a>
          </h1>
          {yPageOffset && (
            <div
              tabIndex={0}
              role="button"
              onClick={() => {
                setPressedAboutMeArrow(true);
                scrollToTop();
              }}
              className="z-50 bottom-10 right-10 transition-all ease-in-out delay-75 duration-200 animate-bounce hover:animate-pulse cursor-pointer"
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
      <div className="my-auto mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div
          tabIndex={0}
          role="button"
          onClick={() => {
            setCurrentPage("homepage");
          }}
          className="absolute top-5 left-5 cursor-pointer"
        >
          <div className="hover:opacity-50">
            <ArrowLeft />
          </div>
        </div>
        <div className="text-center lg:w-2/3 w-full">
          <h1
            className={`${
              pageFirstLoad ? "opacity-0 top-10" : "opacity-100 top-0"
            }  transition-all ease-in-out delay-75 title-font text-title mb-4 font-medium text-primary-800 text-black  top-[-150px]`}
          >
            Contact and Links
          </h1>
          <h6
            className={`${
              pageFirstLoad ? "opacity-0 top-10" : "opacity-100 top-0"
            }  transition-all ease-in-out delay-75 title-font text-[20px] mb-4 font-medium text-primary-800 text-black`}
          >
            Email:{" "}
            <span className="font-light text-[18px]">
              christian.nico.saavedra@gmail.com
            </span>
          </h6>
          <h6
            className={`${
              pageFirstLoad ? "opacity-0 top-10" : "opacity-100 top-0"
            }  transition-all ease-in-out delay-75 title-font text-[20px] mb-4 font-medium text-primary-800 text-black`}
          >
            Music Email:{" "}
            <span className="font-light text-[18px]">tokibitsu@gmail.com</span>
          </h6>
          <div className="flex flex-col md:flex-row gap-24 justify-center items-center relative my-auto md:h-[500px]">
            <a className="relative" href="https://github.com/cnsaavedra">
              <img
                className={`${
                  pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                } z-50 transition-all ease-in-out delay-75 duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                width={250}
                height={250}
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="Github"
              />
              <div className="absolute bottom-0 left-0 right-0 w-full h-full z-0 hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                <img
                  className={`${
                    pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                  } z-50 transition-all ease-in-out duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                  width={250}
                  height={250}
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="Github"
                />
                <h1 className="text-black absolute bottom-[-25px] right-[41%] text-center">
                  Github
                </h1>
              </div>
            </a>

            <a
              className="relative"
              href="https://www.linkedin.com/in/christian-saavedra-b07413245/"
            >
              <img
                className={`${
                  pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                } z-0 transition-all ease-in-out delay-75 duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                width={250}
                height={250}
                src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="Github"
              />
              <div className="absolute bottom-0 left-0 right-0 w-full h-full z-0 hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                <img
                  className={`${
                    pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                  } bg-white z-50 transition-all ease-in-out duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                  width={250}
                  height={250}
                  src="https://brand.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                  alt="Linkedin"
                />
                <h1 className="text-black absolute bottom-[-45px] right-[45%] text-center">
                  Linkedin
                </h1>
              </div>
            </a>

            <a className="relative" href="https://soundcloud.com/primaryflow">
              <img
                className={`${
                  pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                } z-0 transition-all ease-in-out delay-75 duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                width={250}
                height={250}
                src="https://cdn-icons-png.flaticon.com/512/145/145809.png"
                alt="SoundCloud"
              />
              <div className="absolute bottom-0 left-0 right-0 w-full h-full z-0 hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                <img
                  className={`${
                    pageFirstLoad ? "opacity-0 -left-36" : "opacity-100 left-0"
                  } bg-white z-50 transition-all ease-in-out duration-200 title-font text-[24px] mb-4 font-medium text-primary-800 text-black hover:-translate-y-1 hover:scale-110`}
                  width={250}
                  height={250}
                  src="https://cdn-icons-png.flaticon.com/512/145/145809.png"
                  alt="Linkedin"
                />
                <h1 className="text-black absolute bottom-[-30px] right-[32%] text-center">
                  SoundCloud
                </h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "homepage") {
    return homePage();
  } else if (currentPage === "experience") {
    return experience();
  } else if (currentPage === "portfolio") {
    return portfolio();
  } else if (currentPage === "contact") {
    return contact();
  }
}

export default App;
