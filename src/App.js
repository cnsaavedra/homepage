import { useEffect, useState } from "react";
import ArrowLeft from "./icons/icons";
import { Scrollbars } from "react-custom-scrollbars";

function App() {
  const [pageFirstLoad, setPageFirstLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState("homepage");
  const delay = 0.5;

  useEffect(() => {
    let timer1 = setTimeout(() => setPageFirstLoad(false), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [currentPage]);

  function homePage() {
    return (
      <section className="body-font font-poppins">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1
              className={`${
                pageFirstLoad ? "opacity-0" : "opacity-100"
              } transition ease-in-out delay-150 title-font text-title mb-4 font-medium text-primary-800 text-black`}
            >
              Welcome to my website
            </h1>
            <div className="flex justify-center items-center gap-8">
              <h6
                tabIndex={0}
                role="button"
                onClick={() => {
                  setPageFirstLoad(true);
                  setCurrentPage("experience");
                }}
                className={`${
                  pageFirstLoad ? "opacity-0" : "opacity-100"
                } cursor-pointer hover:text-gray-200 transition-opacity ease-in-out delay-500 mb-8 leading-relaxed text-black`}
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
                className={`${
                  pageFirstLoad ? "opacity-0" : "opacity-100"
                } cursor-pointer hover:text-gray-200 transition-opacity ease-in-out delay-1000 mb-8 leading-relaxed text-paragraph text-black`}
              >
                Contact
              </h6>
            </div>
          </div>
        </div>
      </section>
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
            <ArrowLeft />
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
              <h1 className="font-bold text-[32px] my-12">
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
            <ArrowLeft />
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
            <div className="flex flex-col md:flex-row md:gap-[500px] items-center pb-8 border-b-2 border-gray-200">
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
                <li className="text-[18px]">
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
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="font-bold text-[50px] my-8">FFXIV Statistics</h1>
            </div>
            <div className="flex flex-col md:flex-row md:gap-[500px] items-center pb-8 border-b-2 border-gray-200">
              <ul className="gap-2 flex flex-col md:justify-start">
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
                <li className="text-[18px]">
                  • Efficiently uses CSS flex/grid to show the "fashion" section
                  of the website in an easy and efficient way to present the
                  clothings from the game
                </li>
              </ul>
              <div className="flex md:flex-row flex-col items-center gap-8 md:gap-4 mx-auto overflow-y-auto">
                <img
                  className="md:w-[500px] md:h-[500px] object-contain"
                  src="https://i.gyazo.com/f20c7e041f2b2e4d16a4a3dd037db063.png"
                  alt="Logo"
                />
                <img
                  className="md:w-[500px] md:h-[500px] object-contain"
                  src="https://i.gyazo.com/0b62b9e6a7aeb24ce908d014cab2e2fc.png"
                  alt="Logo"
                />
                <img
                  className="md:w-[500px] md:h-[500px] object-contain"
                  src="https://i.gyazo.com/ab826e146b39b2d6d4d2405b0ec74719.png"
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
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="font-bold text-[50px] my-8">Pick For Us</h1>
            </div>
            <div className="flex flex-col md:gap-[500px] items-center pb-8 border-b-2 border-gray-200">
              <ul className="gap-2 flex flex-col justify-start">
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
                    <img
                      className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                      src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/mainmenu.png"
                      alt="Logo"
                    />
                  </span>
                </li>
                <li className="text-[18px] flex flex-col">
                  • For example if we want to choose a food place, we would
                  select "Picking Food".
                  <img
                    className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                    src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/chatscreenfood.png"
                    alt="Logo"
                  />
                </li>
                <li className="text-[18px] flex flex-col">
                  • In this scenario, seems like everyone is okay with whatever.
                  The website analyzes the data and tries to narrow down options
                  and finally giving the best option.
                  <img
                    className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                    src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/databasefood.png"
                    alt="Logo"
                  />
                </li>
                <li className="text-[18px] flex flex-col">
                  • From the database, the website narrowed down to only
                  selecting food and checks for the most common cuisine/food (If
                  someone says "I don't want burger" it would detect the "don't
                  want (insert food here)" and would not include burger).
                  <img
                    className="mx-auto object-contain my-24 border-[1px] border-gray-300 p-4"
                    src="https://github.com/cnsaavedra/pickforus/raw/master/meta/foodexamples/suggestionfoodv2.png"
                    alt="Logo"
                  />
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
        </div>
      </section>
    );
  }

  if (currentPage === "homepage") {
    return homePage();
  } else if (currentPage === "experience") {
    return experience();
  } else if (currentPage === "portfolio") {
    return portfolio();
  }
}

export default App;
