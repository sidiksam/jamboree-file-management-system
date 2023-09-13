import { shallowEqual, useSelector } from "react-redux";
import Header from "../FileComponent/Header";

import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { Button } from "antd";

const FileComponent = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");
  const navigate = useNavigate();

  const { currentFile, isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.fileFolders?.getAllFiles.find(
        (file) => file.docId == fileId
      ),
      isAuthenticated: state.auth.isAuthenticated
    }),
    shallowEqual
  );
  useEffect(()=>{
    if (!isAuthenticated) {
      navigate("/")
    }
  },[isAuthenticated,navigate])

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
      setPrevFileData(currentFile?.data?.data);
    }
  }, [currentFile, currentFile?.data?.data]);

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", currentFile?.data?.url);
    element.setAttribute("download", currentFile?.data?.name);
    element.setAttribute("target", "_blank");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  
  if (isAuthenticated) 
    
  return (
    <div className="px-20 pt-4">
      {isAuthenticated && fileData !== null ? (
        <>
          <Header
            fileName={currentFile?.data?.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          <CodeEditor
            fileName={currentFile?.data?.name}
            data={fileData}
            setData={setFileData}
          />
        </>
      ) : (
        <>
          <div className=" absolute w-full h-full bg-black left-0 top-0 text-white">
            {/* sub menu bah */}
            <div className="md:relative">
              <div className=" md:justify-between items-center h-auto md:p-8 mt-5 my-0 flex  ">
                <div title={currentFile?.data?.name}>
                  {currentFile?.data?.name.length > 40
                    ? currentFile?.data?.name.slice(0, 40) +
                      "... ." +
                      currentFile?.data?.extention
                    : currentFile?.data?.name}
                </div>
                <div className="flex space-x-4">
                  <Button
                  
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 font-medium bg-black p-5 text-white  "
                  >
                  
                    <FaArrowLeft className="" /> GO BACK
                  </Button>
                  <Button
                    onClick={() => downloadFile()}
                    className="flex items-center space-x-2 font-medium  p-5 text-white bg-blue-600 hover:bg-black   "
                  >
                  
                    <FaDownload className="" />
                    Download
                  </Button>
                </div>
              </div>

              <div
                className=" w-full   text-white  "
                style={{ height: "600px" }}
              >
                {currentFile?.data?.extention.includes("png") ||
                currentFile?.data?.extention.includes("jpeg") ||
                currentFile?.data?.extention.includes("gif") ||
                currentFile?.data?.extention.includes("jpg") ? (
                  <img
                    src={currentFile?.data?.url}
                    alt={currentFile?.data?.name}
                    className="text-white w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full flex justify-center items-center h-auto">
                    <div className="text-center text-white text-2xl pt-56">
                      File type not supported. Please download the file to view
                      it
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return <div>Login first</div>
};

export default FileComponent;
