import { Link } from "react-router-dom";
import { Avatar, Button, Space } from "antd";
import { Disclosure } from "@headlessui/react";
import {
  getUser,
  signOutUser,
} from "../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";

const AboutUs = () => {
  const adminUser = useSelector((state) => state.auth);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <div>
        <div className="container mx-auto hidden md:block">
          <div>
            <header className="container flex items-center  justify-between  mt-5 fixed w-full ">
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
                        <Link to={"/dashboard"}>DASHBOARD</Link>
                      </Button>
                    </li>
                    {adminUser.adminUser.map((user) => user.data.role) ==
                    "super admin" ? (
                      <li className=" md:py-1 md:px-5 rounded shadow-md ">
                        <Button className="border-none text-white font-bold text-sm ">
                          <Link to={"/superadmin"}>ADMIN</Link>
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
                <div className="txt z-10 -mt-28">
                  <h1>Welcome to Jamboree Consulting Firm</h1>
                  <p>
                    Jamboree Consult is a public relations and marketing
                    consultancy operating in Sierra Leone. <br /> It is a
                    subsidiary of Salone Jamboree. At Jamboree Consult, we
                    ensure our clients are provided <br /> with effective
                    website design and marketing strategy.
                  </p>
                  <ul>
                    <div className="font-bold pt-4"> We also do:</div>
                    <div className="flex space-x-10">
                      <div>
                        <li>Domain Name Registration</li>
                        <li>Corporate Emails </li>
                        <li> Web Design</li>
                        <li> Mobile App Development</li>
                        <li>Social Media Marketing</li>
                        <li> Facebook Advertising</li>
                        <li> Documentary</li>
                      </div>
                      <div>
                        <li> Graphic Design</li>
                        <li> Printing</li>
                        <li> Networking</li>
                        <li>Online Radio streaming</li>
                        <li> Live Events streaming</li>
                        <li> Bulk SMS</li>
                        <li>Events</li>
                      </div>
                      <div>
                        <ul>
                          <div className="font-bold pt-4 -mt-12">
                            Our Clients:
                          </div>

                          <li>Sierra Leone Association of Journalist</li>
                          <li> AYV Radio St. George Foundation</li>
                        </ul>
                      </div>
                    </div>
                  </ul>
                </div>
                <img src="img4.jpg " className="fixed w-full " alt="img4" />
              </div>
            </div>
          </div>
        </div>
        <Disclosure as="nav" className="bg-white  md:hidden fixed w-full z-20">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center  sm:hidden ">
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
                        <Link to={"/"}>
                          <img
                            src="logo copy.jpg"
                            alt=""
                            className="object-cover cursor-pointer h-14"
                          />
                        </Link>
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
                          <Link to={"/dashboard"}>DASHBOARD</Link>
                        </Button>
                      </li>
                      {adminUser.adminUser.map((user) => user.data.role) ==
                      "super admin" ? (
                        <li className="border-b-2">
                          <Button className="border-none text-black text-sm -ml-4 ">
                            <Link to={"/superadmin"}>ADMIN</Link>
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
                      <li className=" py-2  text-sm text-black border-b pb-2  ">
                        <Link to={"/signup"}>SIGN UP</Link>
                      </li>
                      <li className="  text-sm text-black border-b pb-2   ">
                        <Link to={"/signin"}>SIGN IN</Link>
                      </li>
                      <li className=" py-2  text-sm text-black border-b pb-2  ">
                        <Link to={"/contactus"}>CONTACT US</Link>
                      </li>
                      <li className=" py-2  text-sm text-black border-b pb-2  ">
                        <Link to={"/aboutus"}>ABOUT US</Link>
                      </li>
                    </>
                  )}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="slider md:hidden block">
          {/* fade css */}
          <div className="myslide fade ">
            <div className="txt z-10 mt-28   ">
              <h2 className="text-blue-500 px-2  -mr-20 -ml-20 text-center  ">
                Welcome to Jamboree Consulting Firm
              </h2>
              <p className="-mr-20 -ml-20 text-center px- pt-4">
                Jamboree Consult is a public relations and marketing consultancy
                operating in Sierra Leone. It is a subsidiary of Salone
                Jamboree. At Jamboree Consult, we ensure our clients are
                provided with effective website design and marketing strategy.
              </p>
              <ul className="text-sm -mr-20 -ml-20 ">
                <div className="font-bold pt-4"> We also do:</div>
                <div className=" space-y-3 mb-14">
                  <div>
                    <li>Domain Name Registration</li>
                    <li>Corporate Emails </li>
                    <li> Web Design</li>
                    <li> Mobile App Development</li>
                    <li>Social Media Marketing</li>
                    <li> Facebook Advertising</li>
                    <li> Documentary</li>
                  </div>
                  <div>
                    <li> Graphic Design</li>
                    <li> Printing</li>
                    <li> Networking</li>
                    <li>Online Radio streaming</li>
                    <li> Live Events streaming</li>
                    <li> Bulk SMS</li>
                    <li>Events</li>
                  </div>
                  <div>
                    <ul>
                      <div className="font-bold pt-2 ">Our Clients:</div>

                      <li>Sierra Leone Association of Journalist</li>
                      <li> AYV Radio St. George Foundation</li>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
            <img
              src="img6.jpg "
              className="fixed w-full h-screen object-cover "
              alt="img4"
            />
          </div>
        </div>
      </div>

      {/*  */}

      <footer className="bg-gray-800 text-white p-4 z-10 fixed  w-full bottom-0 py-2  ">
        <div className="container mx-auto text-center md:text-base text-sm ">
          <p>
            &copy; {new Date().getFullYear()} Jamboree File Management System
          </p>
        </div>
      </footer>
    </>
  );
};

export default AboutUs;
