import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Avatar, Space } from "antd";
import {
  getUser,
  signOutUser,
} from "../../redux/actionCreators/authActionCreator";
import { UserOutlined } from "@ant-design/icons";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavigationComponent = () => {
  const adminUser = useSelector((state) => state.auth);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <nav className="bg-blend-overlay py-3 shadow-lg hidden md:block ">
        <div className="container md:px-24 px-5 items-center">
          <div className="flex justify-between text-white">
            <div>Logo</div>
            <div>
              <ul className="flex space-x-3 items-center">
                {isAuthenticated ? (
                  <>
                    <div>
                      <div className="flex items-center">
                        Welcome
                        <div className="text-gray-300  font-semibold ">
                          <Space direction="vertical" size={16}>
                            <Space wrap size={16} className="px-2">
                              <Avatar size="large" icon={<UserOutlined />} />
                            </Space>
                          </Space>
                          {user.displayName}
                        </div>
                      </div>
                    </div>
                    <li className="bg-black md:py-1 md:px-5 rounded ">
                      <Button className="border-none text-white md:text-sm text-xs ">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </Button>
                    </li>
                    {adminUser.adminUser.map((user) => user.data.role) ==
                    "super admin" ? (
                      <li className="bg-black md:py-1 md:px-5 rounded shadow-md ">
                        <Button className="border-none text-white text-sm ">
                          <Link to={"/superadmin"}>Admin</Link>
                        </Button>
                      </li>
                    ) : null}
                    <li className="bg-white py-1  px-5 rounded text-black ">
                      <Button
                        className="border-none text-sm "
                        onClick={() => dispatch(signOutUser())}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="bg-black py-2 px-5 rounded text-sm">
                      <Link to={"/signin"}>Sign in</Link>
                    </li>
                    <li className="bg-white py-2 px-5 rounded text-sm text-black ">
                      <Link to={"/signup"}>Sign up</Link>
                    </li>{" "}
                  
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Disclosure as="nav" className="bg-blue-800 md:hidden">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <ul className="px-2 space-y-3">
                {isAuthenticated ? (
                  <>
                    <li className="border-b-2 ">
                      <Button className="border-none text-white text-sm  -ml-4  ">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </Button>
                    </li>
                    {adminUser.adminUser.map((user) => user.data.role) ==
                    "super admin" ? (
                      <li className="border-b-2">
                        <Button className="border-none text-white text-sm -ml-4 ">
                          <Link to={"/superadmin"}>Admin</Link>
                        </Button>
                      </li>
                    ) : null}

                    <li className="border-b-2">
                      <Button
                        className="border-none text-white text-sm -ml-4 "
                        onClick={() => dispatch(signOutUser())}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="  text-sm text-white  ">
                      <Link to={"/signin"}>Sign in</Link>
                    </li>
                    <li className=" py-2  text-sm text-white ">
                      <Link to={"/signup"}>Sign up</Link>
                    </li>{" "}
                  </>
                )}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NavigationComponent;
