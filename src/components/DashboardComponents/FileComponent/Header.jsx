import { Button } from "antd";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/fileFoldersActionCreator";

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className=" md:flex  md:justify-between pt-4 pb-6">
      <div className="text-gray-600 font-medium"> {fileName}</div>

      {fileData !== prevFileData && (
        <div className="md:mr-96 text-yellow-500 my-0 md:text-2xl"> *[modified]</div>
      )}
      <ul className="flex md:space-x-2 space-x-3">
        <li className="cursor-pointer">
          <Button
            onClick={() => {
              dispatch(updateFileData(fileId, fileData));
            }}
            disabled={fileData == prevFileData}
            className="flex items-center space-x-2 font-medium bg-blue-700  md:p-5 text-white"
          >
            <FaSave className="" /> Save
          </Button>
        </li>
        <li className="cursor-default">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 font-medium bg-black md:p-5 text-white  "
          >
            {" "}
            <FaArrowLeft className="" /> Go Back
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
