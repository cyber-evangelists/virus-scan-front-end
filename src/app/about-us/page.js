import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white mt-[3rem]">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border">
        <h2 className="text-4xl font-extrabold text-red-600 dark:text-white mb-6">
          🚀 Welcome to Our Journey
        </h2>
        <p className="text-gray-700 dark:text-white">
          We are not just a team; we are a family on a mission. At [Your Company
          Name], we believe in creating experiences, not just products. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante
          dapibus diam. Integer nec odio. Praesent libero.
        </p>
        <p className="mt-4 text-gray-700 dark:text-white">
          Our mission is simple: To innovate, inspire, and make a positive
          impact. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
        <p className="mt-4 text-gray-700 dark:text-white">
          📬 Connect with us on social media or drop us an email. We're excited
          to hear from you and share this journey together!
        </p>
        <div className="flex mt-6 space-x-4">
          <a
            href="#"
            className="bg-red-600 hover:bg-red-700 text-white sm:text-sm text-xs sm:font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-red-300"
          >
            Follow us on Twitter
          </a>
          <a
            href="#"
            className="bg-red-600 hover:bg-red-700 text-white sm:text-sm text-xs sm:font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-red-500"
          >
            Like us on Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
