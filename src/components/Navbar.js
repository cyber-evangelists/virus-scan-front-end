"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import NextLink from "next/link";

const NavBar = ({ setIsOpen, isOpen, className, logoClassName, color }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed !top-0 w-full z-30 transition-all  " +
          (hovered < 0 && !scrollActive ? " text-white-100 " : "") +
          (hovered < 0 && scrollActive
            ? " shadow-md backdrop-blur-sm !bg-[#ffffffe0]   "
            : "") +
          (hovered >= 0 ? " !bg-[#ffffff] shadow-md  " : "")
        }
        onMouseLeave={() => setHovered(-1)}
      >
        <div className="px-5 ">
          <nav className="lg:container mx-auto flex justify-between py-3 sm:py-4">
            <NextLink href="/" passHref>
              <span className="col-start-1 col-end-2 flex items-center">
                {/* <img src="/assets/logo.png" className="h-8 w-auto" /> */}
                <h1>
                  <span className="font-bold text-primary">
                    &nbsp; Virus
                    {/* &nbsp; */}
                  </span>
                  <span
                    style={{ fontWeight: "bold", paddingLeft: "5px" }}
                    className={logoClassName}
                  >
                    Scan
                  </span>
                </h1>
              </span>
            </NextLink>

            <ul className="hidden lg:flex col-start-4 font-primary col-end-8 items-center">
              {navData.map((n, i) => (
                <NextLink
                  href={n.link || {}}
                  passHref
                  key={n.id}
                  legacyBehavior
                >
                  <a
                    className={
                      className +
                      (scrollActive
                        ? "text-black-900 "
                        : `${color} hover:text-primary`) +
                      (activeLink === "feature"
                        ? " text-primary animation-active "
                        : " hover:text-primary-variant a")
                    }
                    onMouseEnter={() => setHovered(i)}
                  >
                    {n.title}
                  </a>
                </NextLink>
              ))}

              <NextLink href="/signup">
                <button className="self-center font-primary transition-all text-white-500 font-medium px-4 py-1 rounded-2xl">
                  Signup
                </button>
              </NextLink>
            </ul>
            {/* Mobile Navigation */}

            {!isOpen && (
              <div
                className="lg:hidden cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineMenu className=" text-3xl z-30 text-primary hover:text-primary-variant" />
              </div>
            )}

            {/* End Mobile Navigation */}
          </nav>
        </div>

        <div
          className="transition-all overflow-hidden px-5"
          style={{ maxHeight: hovered >= 0 ? "1000px" : "0" }}
        >
          {navData[hovered]?.menu && (
            <div className="container mx-auto font-primary">
              <NextLink href="#" passHref>
                <span>
                  <h2 className="text-2xl py-5 flex font-primary items-center">
                    Go to overview
                    <spaniOutlineArrowRight className="text-primary ml-5" />
                  </h2>
                </span>
              </NextLink>
              <div className="flex flex-wrap pb-10">
                {navData[hovered].menu.map((m) => (
                  <NextLink href={m.link} legacyBehavior>
                    <a className="w-[33%] py-3 text-lg text-black-500">
                      {m.title}
                    </a>
                  </NextLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;

NavBar.defaultProps = {
  className:
    "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-900 ",
  logoClassName: "text-white-400",
};

const navData = [
  {
    id: 1,
    title: "About us",
    link: "/about-us",
  },
  // {
  //   id: 2,
  //   title: "Contact us",
  //   link: "/contact-us",
  // },
  {
    id: 3,
    title: "login",
    link: "/login",
    //   menu: [
    //     {
    //       title: "Data and Artificial Intelligence",
    //       link: "/what-we-do/artificial-intelligence",
    //     },
    //   ],
  },
];
