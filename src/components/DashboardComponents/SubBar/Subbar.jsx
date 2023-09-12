import CreateFolder from "../CreateFolder/CreateFolder";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";
import CreateFile from "../CreateFile/CreateFile";
import UploadFile from "../UploadFile/UploadFile";
import { useEffect } from "react";
import { getUser } from "../../../redux/actionCreators/authActionCreator";

const Subbar = () => {
  const dispatch = useDispatch();
  const adminUsers = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { currentFolder, currentFolderData, userFolders, userId } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
      userFolders: state.fileFolders.userFolders,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);



  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <>
      <nav>
        {adminUsers.adminUser.map((user) => user.data.role) == "super admin" ||
        adminUsers.adminUser.map((user) => user.data.role) == "admin" ? (
          <div className="md:px-8">
            <div className="  px-4 pt-8  lg:flex md:justify-between">
              <ol className="list-reset flex text-xs text-gray-400">
                {currentFolder !== "root" ? (
                  <>
                    <div
                      className="cursor-pointer text-blue-600"
                      onClick={() => handleNavigate("/dashboard", "root")}
                    >
                      Root
                    </div>
                    {currentFolderData?.data.path.map((folder, index) => (
                      <div
                        className="cursor-pointer text-blue-600"
                        key={index}
                        onClick={() =>
                          handleNavigate(
                            `/dashboard/folder/${
                              userFolders.find((fldr) => folder === fldr.docId)
                                .docId
                            }`,
                            userFolders.find((fldr) => folder === fldr.docId)
                              .docId
                          )
                        }
                      >
                        <span className="px-2">/</span>
                        {
                          userFolders.find((fldr) => folder === fldr.docId)
                            ?.data.name
                        }
                      </div>
                    ))}
                    <span className="px-2">/</span>
                    <li className="">{currentFolderData?.data.name}</li>
                  </>
                ) : (
                  <>
                    <li className=" text-blue-600 md:pb-0 pb-4">
                      <Link to={"/dashboard"}>Root</Link>
                    </li>
                  </>
                )}
              </ol>

              <ul className="md:flex md:space-x-3  md:space-y-0 space-y-3 flex-wrap ">
                <li className="flex items-center  bg-white  md:py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm cursor-pointer">
                  <UploadFile />
                </li>
                <li className="flex items-center  bg-white md:py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm  cursor-pointer">
                  <CreateFile />
                </li>
                <li className="flex items-center  bg-white md:py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm  cursor-pointer">
                  <CreateFolder />
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Subbar;
