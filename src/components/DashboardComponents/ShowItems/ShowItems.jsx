import { FaFolder } from "react-icons/fa";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeFolder,
  deleteFile,
  deleteFolder,
} from "../../../redux/actionCreators/fileFoldersActionCreator";
import { Button, Popconfirm, message } from "antd";
import { FiMoreVertical } from "react-icons/fi";

const ShowiItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminUsers = useSelector((state) => state.auth);

  const handleDoubleClick = (itemId) => {
    if (type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
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
                        <Popconfirm
                          className=" md:-mr-32 -mr-48"
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
                            <FiMoreVertical />
                          </Button>
                        </Popconfirm>
                      ) : null}

                      <FaFolder className="text-6xl text-yellow-400 m-2 " />
                    </div>
                  ) : (
                    <div style={{ width: "40px", margin: "2px" }}>
                      {adminUsers.adminUser.map((user) => user.data.role) ==
                      "super admin" ? (
                        <Popconfirm
                          className=" md:-mr-32 -mr-48"
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
                            <FiMoreVertical />
                          </Button>
                        </Popconfirm>
                      ) : null}

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
                              <FiMoreVertical />
                            </Button>
                          </Popconfirm>
                        ) : null}

                        <FaFolder className="text-6xl text-yellow-400 m-2 " />
                      </div>
                    ) : (
                      <div style={{ width: "40px", margin: "2px" }}>
                        {adminUsers.adminUser.map((user) => user.data.role) ==
                        "super admin" ? (
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
                              <FiMoreVertical />
                            </Button>
                          </Popconfirm>
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
    </div>
  );
};

export default ShowiItems;
