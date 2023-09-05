import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  signOutUser,
} from "../../redux/actionCreators/authActionCreator";
import { Avatar, Button, Space } from "antd";

const HomePage = () => {
  const adminUser = useSelector((state) => state.auth);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <div className="container overflow-hidden">
        {/*       
        <div className="text-4xl   text-center my-5 ">
          Welcome to Jamboree File Managemnt System
        </div> */}

        <div className="container mx-auto hidden md:block">
          {/* <NavigationComponent /> */}
          <div>
            <header className="container flex items-center  justify-between  mt-5">
              <div className="pl-8">
                <Link to={"/"}>
                <img
                  src="logo copy.jpg"
                  alt=""
                  className="object-cover cursor-pointer h-14"
                />
                </Link>
              </div>
              <ul className="flex space-x-3 items-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <div className="flex items-center text-white">
                        Welcome
                        <div className="text-blue-500  font-semibold ">
                          <Space direction="vertical" size={16}>
                            <Space wrap size={16} className="px-2">
                              <Avatar size="large" icon={<UserOutlined />} />
                            </Space>
                          </Space>
                          {user.displayName}
                        </div>
                      </div>
                    </div>
                    <li className=" md:py-1 md:px-5 rounded ">
                      <Button className="border-none text-white font-bold md:text-sm text-xs ">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </Button>
                    </li>
                    {adminUser.adminUser.map((user) => user.data.role) ==
                    "super admin" ? (
                      <li className=" md:py-1 md:px-5 rounded shadow-md ">
                        <Button className="border-none text-white font-bold text-sm ">
                          <Link to={"/admin"}>Admin</Link>
                        </Button>
                      </li>
                    ) : null}
                    <li className=" py-1  px-5 rounded text-white font-bold ">
                      <Button
                        className="border-none text-sm text-white font-bold "
                        onClick={() => dispatch(signOutUser())}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="sign ">
                        <Link
                          className="border px-3 py-2 rounded-lg"
                          to={"/signup"}
                        >
                          SIGN UP
                        </Link>
                      </span>
                      <span className="sign  ">
                        <Link to={"/signin"}>SIGN IN</Link>
                      </span>
                      <span className="sign ">
                        <Link to={"/contactus"}>CONTACT US</Link>
                      </span>
                      <span className="sign ">
                        <Link to={"/aboutus"}>ABOUT US</Link>
                      </span>
                    </div>
                  </>
                )}
              </ul>
            </header>
            <div className="slider">
              {/* fade css */}
              <div className="myslide fade">
                <div className="txt">
                  <h1>Welcome to Jamboree Consulting firm</h1>
                  <p>
                    "The real power of technology is not in its ability to store
                    vast amounts of data <br /> but in our capacity to organize and
                    make sense of that data." <br /> Vint Cerf, one of the "fathers
                    of the internet."
                  </p>
                </div>
                <img src="img1.jpg " className="" />
              </div>
            </div>
          </div>
        </div>
        <Disclosure as="nav" className="bg-white  md:hidden">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center  sm:hidden">
                    {/* Mobile menu button*/}
                    <div className="space-x-32 flex">
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                      <div className="">
                        <img
                          src="logo copy.jpg"
                          alt=""
                          className="object-cover  h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <ul className="px-2 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <li className="border-b-2 ">
                        <Button className="border-none text-black text-sm  -ml-4  ">
                          <Link to={"/dashboard"}>Dashboard</Link>
                        </Button>
                      </li>
                      {adminUser.adminUser.map((user) => user.data.role) ==
                      "super admin" ? (
                        <li className="border-b-2">
                          <Button className="border-none text-black text-sm -ml-4 ">
                            <Link to={"/admin"}>Admin</Link>
                          </Button>
                        </li>
                      ) : null}

                      <li className="border-b-2">
                        <Button
                          className="border-none text-black text-sm -ml-4 "
                          onClick={() => dispatch(signOutUser())}
                        >
                          Logout
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="  text-sm text-black border-b pb-2   ">
                        <Link to={"/signin"}>Sign in</Link>
                      </li>
                      <li className=" py-2  text-sm text-black border-b pb-2  ">
                        <Link to={"/signup"}>Sign up</Link>
                      </li>{" "}
                    </>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="md:hidden">
          <div className="slider">
            {/* fade css */}
            <div className="myslide fade ">
              <div className="absolute top-44 px-6 ">
                <p className="text-blue-600 text-2xl font-bold">
                  Welcom to Jamboree Consulting frim
                </p>
                <p className="text-white font-bold text-sm pt-8 text-center ">
                  "The real power of technology is not in its ability to store
                  vast amounts of data but in our capacity to organize and make
                  sense of that data."<br /> Vint Cerf, one of the "fathers of the
                  internet."
                </p>
              </div>
              <img src="img1.jpg " className="h-full " />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white p-4 fixed  w-full bottom-0 md:py-8 py-10 ">
        <div className="container mx-auto text-center md:text-base text-sm ">
          <p>
            &copy; {new Date().getFullYear()} Jamboree File Management System
          </p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
