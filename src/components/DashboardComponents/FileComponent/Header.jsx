import { Button } from "antd";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileData } from "../../../redux/actionCreators/fileFoldersActionCreator";

const Header = ({ fileName, fileId, fileData, prevFileData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className=" flex  justify-between pt-4 pb-6">
      <div className="text-gray-600 font-medium"> {fileName}</div>

      {fileData !== prevFileData && (
        <div className="mr-96 text-yellow-500 my-0 text-2xl"> *[modified]</div>
      )}
      <ul className="flex space-x-2">
        <li className="cursor-pointer">
          <Button
            onClick={() => {
              dispatch(updateFileData(fileId, fileData));
            }}
            disabled={fileData === prevFileData}
            className="flex items-center space-x-2 font-medium bg-blue-700  p-5 text-white"
          >
            <FaSave className="" /> Save
          </Button>
        </li>
        <li className="cursor-default">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 font-medium bg-black p-5 text-white  "
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
