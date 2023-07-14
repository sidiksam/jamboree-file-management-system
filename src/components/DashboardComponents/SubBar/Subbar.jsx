import CreateFolder from "../CreateFolder/CreateFolder";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";
import CreateFile from "../CreateFile/CreateFile";
import UploadFile from "../UploadFile/UploadFile";

const Subbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
      userFolders: state.fileFolders.userFolders,
    }),
    shallowEqual
  );

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <>
      <nav>
        <div>
          <div className="container px-24 pt-8  flex justify-between">
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
                        userFolders.find((fldr) => folder === fldr.docId)?.data
                          .name
                      }
                    </div>
                  ))}
                  <span className="px-2">/</span>
                  <li className="">{currentFolderData?.data.name}</li>
                </>
              ) : (
                <>
                  <li className=" text-blue-600">
                    <Link to={"/dashboard"}>Root</Link>
                  </li>
                </>
              )}
            </ol>

            <ul className="flex space-x-3 flex-wrap ">
              <li className="flex items-center  bg-white  py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm cursor-pointer">
                <UploadFile />
              </li>
              <li className="flex items-center  bg-white py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm  cursor-pointer">
                <CreateFile />
              </li>
              <li className="flex items-center  bg-white py-1 pl-3 rounded-md border-2 border-gray-500 shadow-sm  cursor-pointer">
                <CreateFolder />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Subbar;
