"use client"
import React from "react";
import { BsDiscord } from "react-icons/bs";

function Footer() {
  return (
    <footer className="xl:container mx-auto px-5">
      <div className="py-5 border-t mx-auto flex items-center md:flex-row flex-col">
        <p className="sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} — All Right Reserved
          <a
            href="/"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Virus Scan
          </a>
        </p>
        <div className="sm:ml-5 flex gap-5 text-xs">
          <h1 className="cursor-pointer">Privacy Policy</h1>
          <h1 className="cursor-pointer">Security Policy</h1>
          {/* <h1 className="cursor-pointer">Imprint</h1> */}
        </div>
        <span className="inline-flex md:ml-auto md:mt-0 mt-4 justify-center md:justify-start">
          <a
            className="bg-primary p-2 rounded-full text-white-500 cursor-pointer hover:bg-primary-variant hover:shadow-xl"
            href="#"
            target="_blank"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a
            className="ml-3 bg-primary p-2 rounded-full text-white-500 cursor-pointer hover:bg-primary-variant hover:shadow-xl"
            href="#"
            target="_blank"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            className="ml-3 bg-primary p-2 rounded-full text-white-500 cursor-pointer hover:bg-primary-variant hover:shadow-xl"
            href="#"
            target="_blank"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            className="ml-3 bg-primary p-2 rounded-full text-white-500 cursor-pointer hover:bg-primary-variant hover:shadow-xl flex justify-center items-center"
            href="#"
            target="_blank"
          >
            <BsDiscord className="text-xl" />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
