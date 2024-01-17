"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const SignUpForm = () => {
  const [signupData, setSignupData] = useState({
    userName: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [signupDataError, setSignupDataError] = useState({
    userName: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();

  const validatePassword = (password) => {
    // Password validation rules
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(signupData.fName.trim() === ""){
      setSignupDataError((prev)=> ({...prev, fName: "Requried"}))
      return;
    }
    if(signupData.lName.trim() === ""){
      setSignupDataError((prev)=> ({...prev, lName: "Requried"}))
      return;
    }
    if(signupData.userName.trim() === ""){
      setSignupDataError((prev)=> ({...prev, userName: "User Name is requried"}))
      return;
    }
    if(signupData.email.trim() === ""){
      setSignupDataError((prev)=> ({...prev, email: "Email is requried"}))
      return;
    }
    if (!emailRegex.test(signupData.email.trim())) {
      setSignupDataError((prev)=> ({...prev, email: "Email is not valid"}))
      return;
    }
    if(signupData.password.trim() === ""){
      setSignupDataError((prev)=> ({...prev, password: "password is requried"}))
      return;
    }
    if(!validatePassword(signupData.password.trim())){
      setSignupDataError((prev)=> ({...prev, password: "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."}))
      return;
    }
    if(signupData.password !== signupData.confirm_password){
      setSignupDataError((prev)=> ({...prev, confirm_password: "Password does not Matched"}))
      return;
    }

    const formData = {
      username: signupData.userName.trim(),
      password: signupData.password.trim(),
      first_name: signupData.fName.trim(),
      last_name: signupData.lName.trim(),
      email: signupData.email.trim(),
    };

    // console.log("here is runing...");
    // console.log("here is .env", process.env.NEXT_PUBLIC_API_URL);
    try {
      const response = await axios.post(
        `/api/users/signup`,
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("try response: ", response);

      if (response?.data?.inserted) {
        router.push("/login");
      }

    } catch (error) {
      console.log("catch :", error.response.data);
      toast.error(error.response.data.detail, {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`name is : ${name} and value is: ${value}`);
    setSignupDataError((prev)=> ({...prev, [name]: ""}))
    setSignupData((prevData) => ({
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label
                      htmlFor="fName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      value={signupData.fName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      required=""
                    />
                    <p className="text-red-600 text-xs h-4">{signupDataError.fName ? signupDataError.fName : ""}</p>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="lName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      value={signupData.lName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      required=""
                    />
                    <p className="text-red-600 text-xs mt-1 h-4">{signupDataError.lName ? signupDataError.lName : ""}</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={signupData.userName}
                    onChange={handleChange}
                    placeholder="johndoe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                    <p className="text-red-600 text-xs mt-1 h-4">{signupDataError.userName ? signupDataError.userName : ""}</p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={signupData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                    <p className="text-red-600 text-xs mt-1 h-4">{signupDataError.email ? signupDataError.email : ""}</p>
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
                    value={signupData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                    <p className="text-red-600 text-xs mt-1">{signupDataError.password ? signupDataError.password : ""}</p>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    value={signupData.confirm_password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                    <p className="text-red-600 text-xs mt-1 h-4">{signupDataError.confirm_password ? signupDataError.confirm_password : ""}</p>
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
                  className="w-full text-white mt-3 bg-[#DC2626] hover:bg-[#AF1D1D] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                  Already have an account?
                  <Link href={"/login"} legacyBehavior>
                    <a
                      href="#"
                      className="font-medium pl-1 text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
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

export default SignUpForm;
