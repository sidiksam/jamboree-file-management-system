import { FaFolder } from "react-icons/fa";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeFolder,
  deleteFile,
  deleteFolder,
  updateFile,
  updateFolder,
} from "../../../redux/actionCreators/fileFoldersActionCreator";
import { Button, Form, Input, Modal, Popconfirm, message } from "antd";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowiItems = ({ title, items, type }) => {
  const [success, setSuccess] = useState(false);
  const [rename, setRename] = useState("");
  const [updateName, setUpdateName] = useState("");

  //  update file
  const [fileName, setFilename] = useState(items);
  const [updateFileName, setUpdateFileName] = useState("");
  const [extension, setExtension] = useState("txt");

  const [loading, setLoading] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = (userId) => {
    setOpenFolder(true);
    setUpdateName(userId);
  };

  const fileModal = (userId, extension) => {
    setOpen(true);
    setUpdateFileName(userId, extension);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  
  const cancelFolder = () => {
    setOpenFolder(false);
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setRename("");
      setUpdateName("");
      setSuccess(false);
      setOpenFolder(false);
      setLoading(false);
    }
  }, [success, loading, rename, updateName]);

  useEffect(() => {
    if (success) {
      setFilename("");
      setExtension("");
      setUpdateFileName("");
      setSuccess(false);
      setOpen(false);
      setLoading(false);
    }
  }, [success, loading, fileName, extension, updateFileName]);

  const adminUsers = useSelector((state) => state.auth);

  const handleDoubleClick = (itemId) => {
    if (type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  const handleSubmit = (e) => {
    if (rename.length >= 4) {
      setLoading(true);
      e.preventDefault();
      form.resetFields();
      dispatch(updateFolder(updateName, rename, setSuccess, setLoading));
    } else {
      toast.error("please set folder name more than 3 char");
    }
  };

  const fileSubmit = (e) => {
    if (fileName.length >= 4) {
      setLoading(true);
      e.preventDefault();
      form.resetFields();
      dispatch(
        updateFile(updateFileName, fileName, extension, setSuccess, setLoading)
      );
    } else {
      toast.error("please set file name more than 3 char");
    }
  };

  // Folder Delete Func
  const folderFunc = async (userId) => {
    dispatch(deleteFolder(userId));
  };
  const foldercancel = () => {
    message.error("Click on No");
  };

  // File Delete Function
  const fileFunc = async (userId) => {
    dispatch(deleteFile(userId));
  };
  const filecancel = () => {
    message.error("Click on No");
  };

  return (
    <div className="">
      <div className="text-center md:text-2xl font-bold border-b-2">
        {title}
      </div>
      <div className="py-5 md:flex flex-wrap md:-mx-5 ">
        {items.map((item) => {
          return (
            <div className="p-5 md:w-56  ">
              {adminUsers.adminUser.map((user) => user.data.role) ==
                "super admin" ||
              adminUsers.adminUser.map((user) => user.data.role) == "admin" ? (
                <div
                  key={item.id}
                  className=" p-2 text-center flex-col flex-wrap flex items-center border rounded-sm
                    shadow-sm font-medium font-serif  text-sm cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(item.docId)}
                >
                  {type === "folder" ? (
                    <div>
                      {adminUsers.adminUser.map((user) => user.data.role) ==
                      "super admin" ? (
                        <>
                          <Button
                            className="border-none"
                            onClick={() => {
                              showModal(item.docId);
                            }}
                          >
                            <FiEdit />
                          </Button>
                          <Popconfirm
                            className=" md:-mr-24 -mr-48"
                            title="Delete Folder"
                            description="Are you sure to delete this folder?"
                            onConfirm={() => {
                              folderFunc(item.docId);
                            }}
                            onCancel={foldercancel}
                            okText="Yes"
                            okType="danger"
                            cancelText="No"
                          >
                            <Button className="border-none">
                              <FiTrash />
                            </Button>
                          </Popconfirm>
                        </>
                      ) : null}
                      {adminUsers.adminUser.map((user) => user.data.role) ==
                      "admin" ?( <Button
                        className="border-none"
                        onClick={() => {
                          showModal(item.docId);
                        }}
                      >
                        <FiEdit />
                      </Button>):(null)}

                      <FaFolder className="text-6xl text-yellow-400 m-2 " />
                    </div>
                  ) : (
                    <div style={{ width: "40px", margin: "2px" }}>
                      {adminUsers.adminUser.map((user) => user.data.role) ==
                      "super admin" ? (
                        <>
                          <Button
                            className="border-none"
                            onClick={() => {
                              fileModal(item.docId);
                            }}
                          >
                            <FiEdit />
                          </Button>
                          <Popconfirm
                            className=" md:-mr-24 -mr-48"
                            title="Delete File"
                            description="Are you sure to delete this file?"
                            onConfirm={() => {
                              fileFunc(item.docId);
                            }}
                            onCancel={filecancel}
                            okText="Yes"
                            okType="danger"
                            cancelText="No"
                          >
                            <Button className="border-none">
                              <FiTrash />
                            </Button>
                          </Popconfirm>
                        </>
                      ) : null}
                      {adminUsers.adminUser.map((user) => user.data.role) == "admin" ? (  <Button
                            className="border-none"
                            onClick={() => {
                              fileModal(item.docId);
                            }}
                          >
                            <FiEdit />
                          </Button> ):(null)}

                      <FileIcon
                        extension={item?.data?.extention}
                        {...defaultStyles[item?.data?.extention]}
                      />
                    </div>
                  )}
                  {item?.data?.name}
                </div>
              ) : adminUsers.adminUser.map((user) => user.data.role) ==
                "super admin" ? (
                <>
                  <div
                    key={item.id}
                    className=" p-2 text-center flex-col flex-wrap flex items-center border rounded-sm
           shadow-sm font-medium font-serif  text-sm cursor-pointer"
                    onDoubleClick={() => handleDoubleClick(item.docId)}
                  >
                    {type === "folder" ? (
                      <div>
                        {adminUsers.adminUser.map((user) => user.data.role) ==
                        "super admin" ? (
                          <>
                            <Button
                              className="border-none"
                              onClick={() => {
                                showModal(item.docId);
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Popconfirm
                              className=" -mr-32"
                              title="Delete Folder"
                              description="Are you sure to delete this folder?"
                              onConfirm={() => {
                                folderFunc(item.docId);
                              }}
                              onCancel={foldercancel}
                              okText="Yes"
                              okType="danger"
                              cancelText="No"
                            >
                              <Button>
                                <FiTrash />
                              </Button>
                            </Popconfirm>
                          </>
                        ) : null}

                          { adminUsers.adminUser.map((user) => user.data.role) == "admin" ? (  <Button
                            className="border-none"
                            onClick={() => {
                              showModal(item.docId);
                            }}
                          >
                            <FiEdit />
                          </Button>):(null)}
                        <FaFolder className="text-6xl text-yellow-400 m-2 " />
                      </div>
                    ) : (
                      <div style={{ width: "40px", margin: "2px" }}>
                
                    {adminUsers.adminUser.map((user) => user.data.role) ==
                        "super admin" ? (
                          <>
                            <Button
                              className="border-none"
                              onClick={() => {
                                fileModal(item.docId);
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Popconfirm
                              className=" -mr-32"
                              title="Delete File"
                              description="Are you sure to delete this file?"
                              onConfirm={() => {
                                fileFunc(item.docId);
                              }}
                              onCancel={filecancel}
                              okText="Yes"
                              okType="danger"
                              cancelText="No"
                            >
                              <Button>
                                <FiTrash />
                              </Button>
                            </Popconfirm>
                          </>
                        ) : null}
                        {adminUsers.adminUser.map((user) => user.data.role) ==
                        "admin" ? (
                          <Button
                            className="border-none"
                            onClick={() => {
                              fileModal(item.docId);
                            }}
                          >
                            <FiEdit />
                          </Button>
                        ) : null}
                        <FileIcon
                          extension={item?.data?.extention}
                          {...defaultStyles[item?.data?.extention]}
                        />
                      </div>
                    )}
                    {item?.data?.name}
                  </div>
                </>
              ) : (
                <>
                  <div
                    key={item.id}
                    className=" p-2 text-center flex-col flex-wrap flex items-center border rounded-sm
                      shadow-sm font-medium font-serif  text-sm disabled:opacity-50 cursor-not-allowed"
                  >
                    {type === "folder" ? (
                      <div>
                        <FaFolder className="text-6xl text-yellow-400 m-2 " />
                      </div>
                    ) : (
                      <div style={{ width: "40px", margin: "2px" }}>
                        <FileIcon
                          extension={item?.data?.extention}
                          {...defaultStyles[item?.data?.extention]}
                        />
                      </div>
                    )}
                    {item?.data?.name}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <Modal
          open={openFolder}
          title="Rename Folder"
          onCancel={cancelFolder}
          footer={[
            <Button
              loading={loading}
              key="submit"
              type="primary"
              className=" bg-blue-600 w-full"
              onClickCapture={handleSubmit}
            >
              Rename Folder
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onSubmitCapture={handleSubmit}
          >
            <Form.Item
              name="readme"
              vlaue={rename}
              onChange={(e) => setRename(e.target.value)}
            >
              <Input
                className="my-5"
                size="large"
                placeholder="Rename Folder"
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          open={open}
          title="Rename File"
          onCancel={handleCancel}
          footer={[
            <Button
              loading={loading}
              key="submit"
              type="primary"
              className=" bg-blue-600 w-full"
              onClickCapture={fileSubmit}
            >
              Rename File
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onSubmitCapture={fileSubmit}
          >
            <Form.Item
              name="readme"
              vlaue={rename}
              onChange={(e) => setFilename(e.target.value)}
            >
              <Input className="my-5" size="large" placeholder="Rename File" />
            </Form.Item>
            <Form.Item
              name="extention"
              vlaue={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              <Input
                className=""
                size="large"
                placeholder="txt"
                defaultValue={"txt"}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ShowiItems;
