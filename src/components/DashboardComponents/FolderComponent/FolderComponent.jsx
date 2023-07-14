import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowiItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();

  const { childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === folderId
      ),
    }),
    shallowEqual
  );

  const createdFiles =
    childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    childFiles && childFiles.filter((file) => file.data.data === null);

  return (
    <div className="px-20">
      {childFolders.length > 0 || childFiles.length > 0 ? (
        <>
          {childFolders.length > 0 && (
            <ShowiItems
             
              title={"Created Folder"}
              type={"folder"}
              items={childFolders}
              className
            />
          )}

          {createdFiles && createdFiles.length > 0 && (
            <ShowiItems
              
              title={"Created File"}
              type={"file"}
              items={createdFiles}
            />
          )}
          {uploadedFiles && uploadedFiles.length > 0 && (
            <ShowiItems
              
              title={"Uploaded File"}
              type={"file"}
              items={uploadedFiles}
            />
          )}
        </>
      ) : (
        <div className="text-center my-3">Empty Folder</div>
      )}
    </div>
  );
};

export default FolderComponent;
