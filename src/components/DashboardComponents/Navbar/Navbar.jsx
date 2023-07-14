import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button,Avatar, Space  } from "antd";
import { signOutUser } from "../../../redux/actionCreators/authActionCreator";
import { UserOutlined } from "@ant-design/icons";



const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-50 py-3 shadow-sm">
      <div className="container px-24 items-center">
        <div className="flex justify-between text-black">
          <div>Logo</div>
          <div>
            <ul className="flex space-x-3 items-center">
              {isAuthenticated ? (
                <>
                   <div className="flex items-center">
                      Welcome
                      <div className="text-gray-700  font-semibold ">
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16} className="px-2">
                          <Avatar size="large" icon={<UserOutlined />} />
                        </Space>
                      </Space>
                        {user.displayName}
                      </div>
                      
                    </div>
                  <li className="bg-black py-1 px-5 rounded shadow-md ">
                    <Button className="border-none text-white text-sm ">
                      <Link to={"/"}>Home</Link>
                    </Button>
                  </li>

                  <li className="bg-white py-1  px-5 rounded text-black shadow-md ">
                    <Button
                      className="border-none text-sm  "
                      onClick={() => dispatch(signOutUser())}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="bg-black py-2 px-5 rounded text-sm ">
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
  );
};

export default Navbar;
