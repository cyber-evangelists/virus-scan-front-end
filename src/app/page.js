"use client";
import { NavBar } from "@/components";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [searchType, setSearchType] = useState("file");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanData, setScanData]= useState([])
  const router = useRouter();
  const handleButtonClick = (type) => {
    setSearchType(type);
    setSearch("");
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("search: ", search.trim());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const token = getCookie("access_token_virus_scan");
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);

      try {
        const response = await axios.post(
          `/api/scan/scan-file`,
          { file: selectedFile },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.filename) {
          toast.success("Uploaded!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        console.log("try: ", response);
      } catch (error) {
        console.log("catch error: ", error);
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      console.error("No file selected for upload.");
    }
  };

  useEffect(() => {
    const token = getCookie("access_token_virus_scan");
    // console.log("token:::" , token);
    const fetechScanResults = async () => {
      try {
        const response = await axios.get(
          "/api/scan/get-scans",
          // {},
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            timeout: 60000 * 2,
          }
        );
        console.log("try...", response.data.scans_data);
        setScanData(response?.data?.scans_data)
      } catch (error) {
        console.log("catch: ", error);
      }
    };

    fetechScanResults();
  }, []);
  const handleReportResult = (id) => {
    // scan-report
    router.push(`scan-report/${id}`)

  };
  return (
    <section className="mt-[4.5rem] mb-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NavBar />
      <section className="min-h-screen container mx-auto flex justify-center flex-col gap-10 items-center">
        <div className="bg-gray-100 px-4 sm:mx-0 flex justify-start gap-5 w-[95%] sm:w-[80%] md:[70%] lg:[60%]">
          {/* <button
            className={`py-4 focus:border-b-2 ${
              searchType === "url" ? "border-red-600" : "border-transparent"
            } px-8 text-lg md:text-xl font-medium`}
            onClick={() => handleButtonClick("url")}
          >
            URL
          </button> */}
          <button
            className={`py-4 focus:border-b-2 ${
              searchType === "file" ? "border-red-600" : "border-transparent"
            } px-8 text-lg md:text-xl font-medium`}
            onClick={() => handleButtonClick("file")}
          >
            FILE
          </button>
        </div>

        {/* {searchType === "url" && (
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
        )} */}

        {/* {searchType === "file" && ( */}
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
        {/* )} */}

        <section className="sm:mx-0 flex flex-col gap-5 w-[95%] sm:w-[80%] md:[70%] lg:[60%]">
          {scanData.map((d, i) => (
            <>
              <div className="bg-gray-100 flex justify-between items-center px-5 py-4">
                <p>{d.filename}</p>
                <p>{formatDate(d.created_at)}</p>
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                  onClick={()=>handleReportResult(d?._id)}
                >
                  Get Results
                </button>
              </div>
            </>
          ))}
        </section>
      </section>
    </section>
  );
}

const formatDate = (timestamp) => {
  const dateObject = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  return dateObject.toLocaleDateString('en-US', options);
};

