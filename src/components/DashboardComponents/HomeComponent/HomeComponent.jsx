import React from "react";
import ShowiItems from "../../DashboardComponents/ShowItems/ShowItems";
import { shallowEqual, useSelector } from "react-redux";

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
      userFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );
  return (
    <div className="px-20  ">
      {isLoading ? (
        <h1 className="text-center text-5xl mt-10">Loading...</h1>
      ) : (
        <>
          <ShowiItems
           
            title={"Created Folders"}
            type={"folder"}
            items={userFolders}
          />
          <ShowiItems
       
            title={"Created Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.url === null)}
          />
          <ShowiItems
        
            title={"Uploaded Files"}
            type={"upload file"}
            items={userFiles.filter((file) => file.data.data === null)}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
