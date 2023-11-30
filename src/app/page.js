"use client";
import { useState } from "react";

export default function Home() {
  const [searchType, setSearchType] = useState("url");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleButtonClick = (type) => {
    setSearchType(type);
    setSearch("");
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search: ", search.trim());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    } else {
      console.error("No file selected for upload.");
    }
  };
  return (
    <section className="min-h-screen flex justify-center flex-col gap-10 items-center">
      <div className="bg-gray-100 px-4 sm:mx-0 flex justify-start gap-5 w-[95%] sm:w-[80%] md:[70%] lg:[60%]">
        <button
          className={`py-4 focus:border-b-2 ${
            searchType === "url" ? "border-red-600" : "border-transparent"
          } px-8 text-lg md:text-xl font-medium`}
          onClick={() => handleButtonClick("url")}
        >
          URL
        </button>
        <button
          className={`py-4 focus:border-b-2 ${
            searchType === "file" ? "border-red-600" : "border-transparent"
          } px-8 text-lg md:text-xl font-medium`}
          onClick={() => handleButtonClick("file")}
        >
          FILE
        </button>
      </div>
      {searchType === "url" && (
        <div className="w-full">
          <form
            className="w-full px-4 sm:px-0 sm:w-[80%] md:[70%] lg:[60%] mx-auto"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none"
                placeholder="Search URL ..."
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#DC2626] hover:bg-[#AF1D1D] focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {searchType === "file" && (
        <div className="w-full">
          <form
            className="w-full px-4 sm:px-0 sm:w-[80%] md:[70%] lg:[60%] mx-auto"
            onSubmit={handleFileUpload}
          >
            <label
              htmlFor="file-upload"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Upload File
            </label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types
                onChange={handleFileChange}
                required
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:border-blue-500"
              >
                {selectedFile
                  ? `Selected File: ${selectedFile.name}`
                  : "Choose a File"}
              </label>
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#DC2626] hover:bg-[#AF1D1D] focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
