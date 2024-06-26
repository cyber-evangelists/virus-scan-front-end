"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [loginDataE, setLoginDataE] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.userName.trim() === "") {
      setLoginDataE((prev) => ({ ...prev, userName: "username is requried" }));
      return;
    }
    if (loginData.password.trim() === "") {
      setLoginDataE((prev) => ({ ...prev, password: "password is requried" }));
      return;
    }
    const formData = {
      username: loginData.userName.trim(),
      password: loginData.password.trim(),
    };
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/login`, formData);
      setLoginData({userName: "", password: ""})
      if (response.data.access_token) {
        toast.success("Login Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "access_token_virus_scan",
          response.data.access_token
        );

        setCookie("access_token_virus_scan", response.data.access_token, {
          maxAge: 24 * 60 * 60,
        });
        
        router.push("/");
      }
    } catch (error) {
      console.log("catch: ", error);
      toast.error(error.response.data.detail === "Invalid password"? "Invalid username or password" : "something went wrong!!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    finally{
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDataE((prev)=>({...prev, [name]: ""}))
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
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
      <section className="bg-gray-50 dark:bg-gray-900 mt-[1.7rem]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="userName"
                    name="userName"
                    id="userName"
                    value={loginData.userName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                  <p className="text-red-600 text-xs h-4">{loginDataE.userName ? loginDataE.userName : ""}</p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  <p className="text-red-600 text-xs h-4">{loginDataE.password ? loginDataE.password : ""}</p>
                </div>
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="w-full text-white bg-[#DC2626] hover:bg-[#AF1D1D] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Want to Create an account?
                  <Link href={"/signup"} legacyBehavior>
                    <a
                      href="#"
                      className="font-medium pl-1 text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Signup here
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
