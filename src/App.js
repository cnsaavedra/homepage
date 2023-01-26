import { useEffect, useState } from "react";
import ArrowLeft from "./icons/icons";

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
              Welcome to my Portfolio
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
            } relative transition-all ease-in-out delay-300 mb-8 pb-8 border-b-[0.5px] border-gray-200`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                width={20}
                height={20}
                src="https://media.licdn.com/dms/image/C560BAQE4LymCVTWYLg/company-logo_100_100/0/1519887572074?e=1682553600&v=beta&t=yQW-JNz_A5FHo6llpm6KFauBG1k24EXzIhEPFDsfFBw"
                alt="Logo"
              />
              <h1 className="font-bold">
                FutureFuture Inc. (Jan 2022 - Jan 2023)
              </h1>
            </div>
            <ul className="gap-2 flex flex-col w-[500px] justify-start">
              <h1 className="font-bold text-[12px] mb-[-5px]">
                Full-stack / Lead Developer
              </h1>
              <li className="text-[8px]">
                • Worked on various projects: Merchant Dashboard, E-Commerce
                Tools, Delivery Solutions, Courier/Driver applications to help
                couriers with delivery all via React, React Native, PHP, Laravel
                and AWS.
              </li>
              <li className="text-[8px]">
                • Developed new features, and pages and fixed bugs for the main
                delivery website including new checkout methods, blog page,
                partners page, career signup, and more • Developed new features
                for the delivery dashboard, improving the workflow of Customer
                Service and Dispatchers
              </li>
              <li className="text-[8px]">
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
            } relative transition-all ease-in-out delay-300`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                width={20}
                height={20}
                src="https://media.licdn.com/dms/image/C4E0BAQEP4gbQhWMX-A/company-logo_100_100/0/1639493389335?e=1682553600&v=beta&t=06FZkRCrXBS7liVuQzHR3hf13v6VZ8qhheYomIYFcRk"
                alt="Logo"
              />
              <h1 className="font-bold">Runner Inc. (Jun 2019 - Aug 2020)</h1>
            </div>
            <ul className="gap-2 flex flex-col w-[500px] justify-start">
              <h1 className="font-bold text-[12px] mb-[-5px]">
                Full-stack Developer
              </h1>
              <li className="text-[8px]">
                • Using PHP, Laravel, AWS, Amazon Redshift, PostgreSQL, Stripe,
                Xero
              </li>
              <li className="text-[8px]">
                • Worked on database queries to help with analytics
              </li>
              <li className="text-[8px]">
                • Automating tables, charts, excel sheets, data manipulations,
                and data stores
              </li>
              <li className="text-[8px]">
                • Created API's for all platforms worked on such as: e-commerce
                api's, analytics, database storing, invoice, automation, and map
                system for order/courier infos
              </li>
            </ul>
            <br />
            <ul className="gap-2 flex flex-col w-[500px] justify-start my-4">
              <h1 className="font-bold text-[12px] mb-[-5px]">
                Front-end Developer
              </h1>
              <li className="text-[8px]">
                • Worked on various projects:
                <li className="ml-[8px]">
                  - Dispatch to help dispatchers/couriers, Ecommerce website,
                  Analytics Platform, Courier App to help couriers with delivery
                </li>
              </li>
              <li className="text-[8px]">
                • Overall improve, fix and organize code
              </li>
              <li className="text-[8px]">
                • Improved UI/UX and added utilities/pages for dispatch team
                with task/order lists, user info, mapping system UI/UX, and
                auto-updates
              </li>
              <li className="text-[8px]">
                • Improved UI/UX and added utilities/pages for the main website
                using animations and improved Frontend code
              </li>
              <li className="text-[8px]">
                • Created application for both website and iOS that helps with
                analytics
              </li>
              <li className="text-[8px]">
                • Started on an app for couriers using React Native on iOS
              </li>
              <li className="text-[8px]">• Using custom CSS and Javascript</li>
              <li className="text-[8px]">
                • Worked on both Vue and React Native
              </li>
              <li className="text-[8px]">
                • QA work such as creating test, automation and overall bug
                testing
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (currentPage === "homepage") {
    return homePage();
  } else if (currentPage === "experience") {
    return experience();
  }
}

export default App;
