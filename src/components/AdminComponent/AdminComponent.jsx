import { useEffect, useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  updateUser,
} from "../../redux/actionCreators/fileFoldersActionCreator";
import DataTable from "react-data-table-component";
import { Button, Form, Input, Modal, Popconfirm, Select, message } from "antd";
import { FiSearch } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserFunc,
  getUser,
} from "../../redux/actionCreators/authActionCreator";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThreeCircles } from "react-loader-spinner";

const AdminComponent = () => {
  const adminUser = useSelector(
    (state) => state.auth?.adminUser[0]?.data?.role
  );

  const dispatch = useDispatch();
  const adminUsers = useSelector((state) => state.fileFolders.adminUsers);

  const users = adminUsers[0];
  const navigate = useNavigate();

  const { isLoading } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
    }),
    shallowEqual
  );

  const { isAuthenticated } = useSelector((state) => ({
    userAdmin: state.fileFolders.adminUsers,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const [selectRole, setSelectRole] = useState("");
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (isLoading) {
      <>
        <p>Loading.....</p>
      </>;
    } else {
      if (!isAuthenticated) {
        navigate("/signin");
      }
      if (adminUser == "super admin") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [adminUser]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser());
    setRecords(users);
    setLoading(false);
    if (success) {
      setRoleName("");
      setSelectRole("");
      setSuccess(false);
      setOpen(false);
      setLoading(false);
    }
  }, [success, dispatch, loading, users]);

  // goback function
  const goBack = () => {
    navigate(-1);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.data.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.data.email,
      sortable: true,
    },
    {
      name: "Uid",
      selector: (row) => row.data.uid,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => (
        <Button
          className="border-none "
          onClick={() => {
            showModal(row.data.uid);
          }}
        >
          {row.data.role}
        </Button>
      ),

      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this user account?"
            onConfirm={() => {
              deleteAccount(row.data.uid);
            }}
            onCancel={cancelDelete}
            okText="Yes"
            okType="danger"
            cancelText="No"
          >
            <Button className="border-none">
              <BsTrash />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  function handleFilter(event) {
    const newData = adminUsers[0].filter((row) => {
      return row.data.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const showModal = (uid) => {
    setSelectRole(uid);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (roleName.length > 0) {
      setLoading(true);
      e.preventDefault();
      form.resetFields();
      dispatch(updateUser(selectRole, roleName, setSuccess, setLoading));
    } else {
      toast.error("please select role");
    }
  };

  // Delete Account Function
  const deleteAccount = (userId) => {
    dispatch(deleteUserFunc(userId));
  };

  // Cancle Delete Function
  const cancelDelete = () => {
    message.error("Click on No");
  };

  return (
    <>
      <nav className="bg-white py-3 shadow-sm hidden md:block">
        <div className=" px-8 items-center">
          <div className="flex justify-between items-center text-black">
            <div>
              {" "}
              <Link to={"/"}>
                <img
                  src="logo copy.jpg"
                  alt=""
                  className="object-cover cursor-pointer  h-14"
                />
              </Link>
            </div>
            <div>
              <ul className="flex space-x-3 items-center">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center"></div>
                    <li className="bg-black py-1 px-5 rounded shadow-md ">
                      <Button className="border-none text-white text-sm ">
                        <Link to={"/dashboard"}>DASHBOARD</Link>
                      </Button>
                    </li>

                    <li className="bg-white py-1  px-5 rounded text-black shadow-md ">
                      <Button
                        className="border-none text-sm  "
                        onClickCapture={() => {
                          goBack();
                        }}
                      >
                        GO BACK
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="font-bold py-2 px-5 rounded text-sm ">
                      <Link to={"/signin"}>SIGN IN</Link>
                    </li>
                    <li className="font-bold py-2 px-5 rounded text-sm  ">
                      <Link to={"/signup"}>SIGN UP</Link>
                    </li>{" "}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Disclosure as="nav" className="bg-white md:hidden">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <div className="space-x-56 flex">
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
                        <Link to={"/dashboard"}>DASHBOARD</Link>
                      </Button>
                    </li>
                    <li className="border-b-2 ">
                      <Button
                        className="border-none text-black text-sm  -ml-4  "
                        onClickCapture={() => {
                          goBack();
                        }}
                      >
                        GO BACK
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className=" md:text-sm text-sm text-black ">
                      <Link to={"/signin"}>SIGN IN</Link>
                    </li>
                    <li className=" py-2  text-sm text-black ">
                      <Link to={"/signup"}>SIGN UP</Link>
                    </li>{" "}
                  </>
                )}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Modal
        open={open}
        title="Add Role"
        onCancel={handleCancel}
        footer={[
          <Button
            loading={loading}
            key="submit"
            type="primary"
            className=" bg-blue-600 w-full"
            onClickCapture={handleSubmit}
          >
            Role
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onSubmitCapture={handleSubmit}
        >
          <Form.Item>
            <Select
              onChange={(value) => {
                setRoleName(value);
              }}
              placeholder={"role"}
              options={[
                {
                  value: "super admin",
                  label: "super admin",
                },
                { value: "admin", label: "admin" },
                { value: "user", label: "user" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/*  */}
      <div className=" md:px-8 px-4 py-10 rounded ">
        <div className=" flex justify-end  pb-2 items-center">
          <FiSearch className="-mr-6 z-10 text-sm text-gray-500" />
          <Input
            size="large"
            className="md:w-80 pl-8 flex items-center "
            placeholder="search here"
            onChange={handleFilter}
          />
        </div>

        {isAuthenticated == true ? (
          <>
            {isLoading ? (
              <div className="flex items-center justify-center text-center mt-28 ">
                <div className="text-center lg:text-5xl hidden md:block">
                  <ThreeCircles
                    height="100"
                    width="100"
                    color="#041b9e"
                    wrapperStyle={{
                      width: "100%",
                      height: "100%",
                      margin: "auto",
                    }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor="#32f022"
                    middleCircleColor=""
                  />
                </div>
                <div className="text-center lg:text-5xl block md:hidden">
                  <ThreeCircles
                    height="50"
                    width="50"
                    color="#041b9e"
                    wrapperStyle={{
                      width: "100%",
                      height: "100%",
                      margin: "auto",
                    }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor="#32f022"
                    middleCircleColor=""
                  />
                </div>
              </div>
            ) : (
              <DataTable
                loading={loading}
                columns={columns}
                data={records}
                fixedheader
                pagination
                highlightOnHover
                noDataComponent
              />
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default AdminComponent;
