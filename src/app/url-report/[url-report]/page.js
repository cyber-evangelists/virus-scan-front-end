"use client";
import { NavBar } from "@/components";
import axios from "axios";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [scanData, setScanData] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [asideData, setAsideData] = useState([]);
  const [clickedKey, setClickedKey] = useState("");
  const [otherScan, setOtherScan] = useState([])
  const pathname = usePathname();
  const id = pathname.replace("/url-report/", "");

  const getScanResult = async () => {
    try {
      const token = getCookie("access_token_virus_scan");
      const response = await axios.get("/api/url-scan/get-scan-report", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
            scanId : id,
        },
      });
      setScanData(response?.data);
      setAsideData(response?.data?.scan_report?.scans);
      const firstAside = Object.keys(response?.data?.scan_report?.scans);
      setSelectedKey(firstAside[0]);
      setClickedKey(firstAside[0]);
    //   console.log("api/url-scan/get-scan-report", response);

    //   const otherScankeys = Object.keys(response?.data?.scan_report?.other_scan);
    //   setOtherScan(otherScankeys)

    //   console.log("scan reports - try ::", response?.data?.scan_report?.other_scan);

    } catch (error) {
      console.log("catch: ", error);
    }
  };

  const handleSelectedClick = (key) => {
    setSelectedKey(key);
    setClickedKey(key);
  };
  useEffect(() => {
    getScanResult();
  }, [pathname, id]);
  return (
    <>
      <section className="min-h-screen">
        <NavBar />
        <section className="mt-[4.5rem]">
          <div className="flex flex-col md:flex-row overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className="max-h-[100vh] md:w-64 overflow-y-auto bg-red-600">
              {/* Sidebar content goes here */}
              {/* Example: */}
              <ul className="p-4">
                {Object.keys(asideData)?.map((d, i) => (
                  <li
                    className={`text-white px-4 rounded py-2 cursor-pointer ${
                      selectedKey === d ? "bg-red-700" : ""
                    }`}
                    key={i}
                    onClick={() => handleSelectedClick(d)}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              {/* Cards go here */}
              {/* Example Card: */}
              <div className="p-4 m-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold">{selectedKey || "null"}</h2>
                <p>
                  detected:{" "}
                  {scanData?.scan_report?.scans[selectedKey]?.detected
                    ? "true"
                    : "false"}
                </p>
                <p>
                  result:{" "}
                  {scanData?.scan_report?.scans[selectedKey]?.result || "null"}
                </p>
                {/* <p>
                  update:{" "}
                  {scanData?.scan_report?.scans[selectedKey]?.update || "null"}
                </p>
                <p>
                  version:{" "}
                  {scanData?.scan_report?.scans[selectedKey]?.version || "null"}
                </p> */}
              </div>

              {/* <div className="p-4 m-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-2">
                  {otherScan[0] || "null"}:
                </h2>
                <h2 className="text-xl font-bold mb-2">
                  {scanData.scan_report?.other_scan[otherScan[0]] || "null"}
                </h2>
                <p>{otherScan[1] || "null"}: {scanData.scan_report?.other_scan[otherScan[1]] || "null"}</p>
                <p>{otherScan[2] || "null"}: {scanData.scan_report?.other_scan[otherScan[2]] || "null"}</p>
                <p>{otherScan[3] || "null"}: {scanData.scan_report?.other_scan[otherScan[3]] || "null"}</p>
                <p>{otherScan[4] || "null"}: {scanData.scan_report?.other_scan[otherScan[4]] || "null"}</p>
                <p>{otherScan[5] || "null"}: {scanData.scan_report?.other_scan[otherScan[5]] || "null"}</p>
                <p>{otherScan[6] || "null"}: {scanData.scan_report?.other_scan[otherScan[6]] || "null"}</p>
                <p>{otherScan[7] || "null"}: {scanData.scan_report?.other_scan[otherScan[7]] || "null"}</p>
                <p>{otherScan[8] || "null"}: {scanData.scan_report?.other_scan[otherScan[8]] || "null"}</p>
              </div> */}

              <div className="p-4 m-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-2">
                  {scanData?.url || "null"}
                </h2>
                <p>{formatDate(scanData?.created_at) || "null"}</p>
              </div>
              <div className="p-4 m-4 bg-white shadow-md rounded-md flex flex-col gap-2">
                <h2 className="text-xl font-bold mb-2">
                  Postive Alerts:{" "}
                  {`${scanData?.scan_report?.positives || 0}/${
                    scanData?.scan_report?.total || 0
                  }` || 0}
                </h2>
                <p>Resource: {scanData?.scan_report?.resource || "null"}</p>
                {/* <p>SHA1: {scanData?.scan_report?.sha1 || "null"}</p> */}
                {/* <p>SHA256: {scanData?.scan_report?.sha256 || "null"}</p> */}
              </div>
              {/* Add more cards as needed */}
            </main>
          </div>
        </section>
      </section>
    </>
  );
};

export default Page;

const formatDate = (timestamp) => {
  const dateObject = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return dateObject.toLocaleDateString("en-US", options);
};
