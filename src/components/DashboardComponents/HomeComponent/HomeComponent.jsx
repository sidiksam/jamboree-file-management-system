import React, { useState } from "react";
import ShowiItems from "../../DashboardComponents/ShowItems/ShowItems";
import { shallowEqual, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { Input } from "antd";

import { ThreeCircles } from "react-loader-spinner";

const HomeComponent = () => {
  const [filter, setFilter] = useState("");

  const { isLoading, userFolders, userFiles, getAllFiles, getAllFolders } =
    useSelector(
      (state) => ({
        isLoading: state.fileFolders.isLoading,
        userFolders: state.fileFolders.userFolders.filter(
          (folder) => folder?.data?.parent == "root"
        ),
        userFiles: state.fileFolders.userFiles.filter(
          (file) => file?.data?.parent == "root"
        ),
        getAllFolders: state.fileFolders.getAllFolders.filter(
          (folder) => folder?.data?.parent == "root"
        ),
        getAllFiles: state.fileFolders.getAllFiles.filter(
          (file) => file?.data?.parent == "root"
        ),
      }),
      shallowEqual
    );

  const adminUser = useSelector((state) => state.auth);

  let folderSearch = userFolders.filter((folder) =>
    folder.data.name.toLowerCase().includes(filter)
  );
  
  let fileSearch = userFiles.filter((folder) =>
    folder.data.name.includes(filter)
  );

  let getFolderSearch = getAllFolders.filter((folder) =>
    folder.data.name.includes(filter)
  );
  let getFileSearch = getAllFiles.filter((folder) =>
    folder.data.name.includes(filter)
  );

  return (
    <>
      <div className=" flex md:justify-center  pb-8 items-center md:mt-2 mt-5 px-2 md:ml-0 ml-4 md:px-0">
        <FiSearch className="-mr-6 z-10 text-sm text-gray-500" />
        <Input
          size="large"
          className="md:w-96   pl-8 flex items-center "
          placeholder="search here"
          onChangeCapture={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="md:px-20 ">
        {isLoading ? (
        <div className="flex items-center justify-center text-center mt-28 ">
            <div className="text-center lg:text-5xl hidden md:block">
            <ThreeCircles
              height="100"
              width="100"
              color="#041b9e"
              wrapperStyle={{ width: "100%", height: "100%", margin: "auto"}}
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
              wrapperStyle={{ width: "100%", height: "100%", margin: "auto"}}
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
          <>
            {adminUser.adminUser.map((user) => user.data.role) == "admin" ? (
              <>
                <ShowiItems
                  title={"Created Folders"}
                  type={"folder"}
                  items={folderSearch}
                />
                <ShowiItems
                  title={"Created Files"}
                  type={"file"}
                  items={fileSearch.filter((file) => file?.data?.url == null)}
                />
                <ShowiItems
                  title={"Uploaded Files"}
                  type={"upload file"}
                  items={fileSearch.filter((file) => file?.data?.data == null)}
                />
              </>
            ) : adminUser.adminUser.map((user) => user.data.role) ==
              "super admin" ? (
              <>
                <ShowiItems
                  title={"Created Folders"}
                  type={"folder"}
                  items={getFolderSearch}
                />
                <ShowiItems
                  title={"Created Files"}
                  type={"file"}
                  items={getFileSearch.filter(
                    (file) => file?.data?.url == null
                  )}
                />
                <ShowiItems
                  title={"Uploaded Files"}
                  type={"upload file"}
                  items={getFileSearch.filter(
                    (file) => file?.data?.data == null
                  )}
                />
              </>
            ) : (
              <>
                <ShowiItems
                  title={"Created Folders"}
                  type={"folder"}
                  items={getFolderSearch}
                />
                <ShowiItems
                  title={"Created Files"}
                  type={"file"}
                  items={getFileSearch.filter(
                    (file) => file?.data?.url == null
                  )}
                />
                <ShowiItems
                  title={"Uploaded Files"}
                  type={"upload file"}
                  items={getFileSearch.filter(
                    (file) => file?.data?.data == null
                  )}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomeComponent;
